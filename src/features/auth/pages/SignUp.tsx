import { useState, useEffect, Fragment, useRef } from "react";
import "../../../scss/styles/pages/sign.scss";

import GasLogo from "../../../assets/logo/logo-1.png";
import sendAxiosApi from "../../../utils/api/api-methods";
import inputFormData from "../../../utils/data/sign-data";
import Notification from "../../../components/notification/notification";

export default function LoginPage() {
  const [showNotif, setShowNotif] = useState({
    type: "waring",
    text: "Exemplo de texto",
    show: false,
  });
  const [inputsValue, setInputsValue] = useState<any>([
    {
      fullName: "",
      relation: "",
      apartmentId: "",
      tower: "",
      numberTower: "",
      condominiumName: "",
      condominiumLocation: "",
      gasometerCode: "",
    },
  ]);

  const refs = useRef<any>({
    fullName: null,
    relation: null,
    apartmentId: null,
    tower: null,
    numberTower: null,
    block: null,
    condominiumName: null,
    condominiumLocation: null,
    gasometerCode: null,
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newInputsValue = inputsValue.slice()[0];
    newInputsValue[id] = value;
    setInputsValue([newInputsValue]);
  };

  const classType = (className: string) =>
    className === "name" ? "email" : className;

  const sendCondominiumData = async (
    condominiumName: string,
    condominiumLocation: string
  ) => {
    const data = { nome: condominiumName, local: condominiumLocation };
    try {
      return await sendAxiosApi("post", data, "condominios");
    } catch (error) {
      const newShowNotif: any = {
        type: "waring",
        text: "Verifique os dados do condominio.",
        show: true,
      };
      setShowNotif(newShowNotif);
    }
  };

  const sendTowerData = async (
    numberTower: string,
    tower: string,
    condominiumId: number
  ) => {
    const data = {
      numero: numberTower,
      identificacao: tower,
      condominio: condominiumId,
    };
    try {
      return await sendAxiosApi("post", data, "torres");
    } catch (error) {
      const newShowNotif: any = {
        type: "waring",
        text: "Verifique os dados da torre.",
        show: true,
      };
      setShowNotif(newShowNotif);
      throw error;
    }
  };

  const sendApartmentData = async (apartmentId: string, towerId: number) => {
    const data = { numero: apartmentId, torre: towerId };
    return await sendAxiosApi("post", data, "apartamentos");
  };

  const sendUserData = async (
    fullName: string,
    relation: string,
    apartmentId: number
  ) => {
    const data = { nome: fullName, tipo: relation, apartamento: apartmentId };
    try {
      return await sendAxiosApi("post", data, "pessoas");
    } catch (error) {
      const newShowNotif: any = {
        type: "waring",
        text: "Verifique os dados do usuario.",
        show: true,
      };
      setShowNotif(newShowNotif);
      throw error;
    }
  };

  const sendGasometerData = async (
    gasometerCode: string,
    apartmentId: number
  ) => {
    const data = { codigo: gasometerCode, apartamento: apartmentId };
    try {
      return await sendAxiosApi("post", data, "gasometros");
    } catch (error) {
      const newShowNotif: any = {
        type: "waring",
        text: "Verifique os dados do gasometro.",
        show: true,
      };
      setShowNotif(newShowNotif);
      throw error;
    }
  };

  const backLogin = () => {
    location.href = "/login";
  };

  const loadCloseNotification = () => {
    setTimeout(() => {
      const newShowNotif: any = {
        show: false,
      };
      setShowNotif(newShowNotif);
    }, 3000);
  };

  const verifyEmptyInputs = () => {
    const inputValues = inputsValue[0];
    for (const key in inputValues) {
      if (inputValues[key as keyof typeof inputValues] === "") {
        const validateKey: any = {
          fullName: "NOME COMPLETO",
          relation: "RELAÇÃO COM IMOVÉL",
          apartmentId: "IDENTIFICAÇÃO DO APARTAMENTO",
          tower: "IDENTIFICAÇÃO DA TORRE",
          numberTower: "NUMERO DA TORRE",
          condominiumName: "NOME DO CONDOMINIO",
          condominiumLocation: "LOCALIZAÇÃO DO CONDOMINIO",
          gasometerCode: "CODIGO DO GASOMETRO",
        };

        const newShowNotif: any = {
          type: "waring",
          text: `Por favor, preencha o campo ${validateKey[key]} todos os campos.`,
          show: true,
        };
        setShowNotif(newShowNotif);
        loadCloseNotification();
        return true;
      }
    }
  };

  const sendDataApi = async () => {
    try {
      const {
        fullName,
        relation,
        apartmentId,
        tower,
        numberTower,
        condominiumName,
        condominiumLocation,
        gasometerCode,
      } = inputsValue[0];

      if (verifyEmptyInputs()) return;
      console.log("testando");

      const responseCondominiumData = await sendCondominiumData(
        condominiumName,
        condominiumLocation
      );
      const responseTowerData = await sendTowerData(
        numberTower,
        tower,
        responseCondominiumData.id
      );
      const responseApartmentData = await sendApartmentData(
        apartmentId,
        responseTowerData.id
      );
      const responseUserData = await sendUserData(
        fullName,
        relation,
        responseApartmentData.id
      );

      await sendGasometerData(gasometerCode, responseUserData.id);
      const newShowNotif: any = {
        type: "success",
        text: `Dados enviados com sucesso!`,
        show: true,
      };
      setShowNotif(newShowNotif);
      
      setTimeout(() => {
        backLogin();
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    } finally {
      loadCloseNotification();
    }
  };

  return (
    <section className="gas-signup">
      {showNotif.show && (
        <Notification type={showNotif.type} text={showNotif.text} />
      )}

      <div className="gas-signup__boxs">
        <form
          action=""
          method="post"
          className="gas-signup__boxs--form"
          onSubmit={(e) => submitForm(e)}
        >
          <h2>Cadastro</h2>
          <div className="gas-signup__boxs--form--signup">
            {inputFormData(inputsValue, handleInputChange).map(
              (input, index) => (
                <Fragment key={index}>
                  <h3>{input.title}</h3>
                  <div
                    className={`gas-signup__boxs--form--signup--${input.className}`}
                  >
                    {input.children.map((data: any, index) => (
                      <div
                        key={index}
                        onClick={() => refs.current[data.id].focus()}
                        className={`gas-signup__boxs--form--signup--${classType(
                          data.name
                        )}`}
                      >
                        <div
                          className={`gas-signup__boxs--form--signup--${classType(
                            data.name
                          )}--divisor`}
                        ></div>
                        <div
                          className={`gas-signup__boxs--form--signup--${classType(
                            data.name
                          )}--input`}
                        >
                          <label htmlFor={`${classType(data.name)}`}>
                            {classType(data.label)}{" "}
                          </label>
                          {data.label === "Relação com Imovél: " ? (
                            <div className="select-wrapper">
                              <select
                                name="relation"
                                id="relation"
                                onChange={data.onChange}
                                value={data.value}
                              >
                                <option value="" disabled selected>
                                  Selecione
                                </option>
                                <option value="DONO" className="props">
                                  Dono/Dona
                                </option>
                                <option value="MORADOR">Morador</option>
                                <option value="INQUILINO">Inquilino</option>
                              </select>
                            </div>
                          ) : (
                            <input
                              ref={(el: any) => (refs.current[data.id] = el)}
                              value={data.value}
                              type={data.type}
                              name={data.name}
                              placeholder={data.placeholder}
                              id={data.id}
                              onChange={data.onChange}
                              maxLength={data.maxLength}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Fragment>
              )
            )}
          </div>
          <div className="gas-signup__boxs--form--signup--send">
            <input
              type="submit"
              value="Cadastrar"
              onClick={() => sendDataApi()}
            />
            <button onClick={() => (location.href = "/")}>Entrar</button>
          </div>
        </form>
        <div className="gas-signup__boxs--description">
          <img src={GasLogo} alt="Gas Control Logo" />
        </div>
      </div>
    </section>
  );
}
