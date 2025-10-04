import { useState, useEffect, Fragment, useRef } from "react";
import "../../../scss/styles/pages/sign.scss";

import GasLogo from "../../../assets/logo/logo-1.png";
import sendAxiosApi from "../../../utils/api/api-methods";
import inputFormData from "../../../utils/data/sign-data";
import Notification from "../../../components/notification/notification";
import ProgressSteps from "../../../components/progress/progress";

export default function Signup({ inputCond }) {
  const [idApiResponse, setIdApiResponse] = useState();
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

  const stapsTitle = {
    1: "TORRES",
    2: "APARTAMENTOS",
    3: "PESSOAS",
    4: "GASOMETROS",
    5: "LEITURAS",
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newInputsValue = inputsValue.slice()[0];
    newInputsValue[id] = value;

    console.log(newInputsValue);
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

  const successNotification = () => {
    const newShowNotif: any = {
      type: "success",
      text: `Dados enviados com sucesso!`,
      show: true,
    };
    setShowNotif(newShowNotif);
  };

  const stapsSand = async () => {
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

    switch (stapsTitle[currentStep]) {
      case "TORRES":
        try {
          const responseTowerData = await sendTowerData(
            numberTower,
            tower,
            inputCond[0].id
          );
          setIdApiResponse(responseTowerData);
          successNotification();
          setCurrentStep(currentStep + 1);
        } catch (err) {
          console.log("err", err);
        } finally {
          loadCloseNotification();
          console.log(inputsValue);
          setInputsValue(inputsValue);
        }

        return;

      case "APARTAMENTOS":
        try {
          const responseApartmentData = await sendApartmentData(
            apartmentId,
            idApiResponse.id
          );

          setIdApiResponse(responseApartmentData);
          successNotification();
          setCurrentStep(currentStep + 1);
        } catch (err) {
          console.log("err", err);
        } finally {
          loadCloseNotification();
        }

        return;
      case "PESSOAS":
        try {
          const responseUserData = await sendUserData(
            fullName,
            relation,
            idApiResponse.id
          );

          setIdApiResponse(responseUserData);
          successNotification();
          setCurrentStep(currentStep + 1);
        } catch (err) {
          console.log("err", err);
        } finally {
          loadCloseNotification();
        }

        return;
      case "GASOMETROS":
        try {
          await sendGasometerData(gasometerCode, idApiResponse.id);
          successNotification();
          setCurrentStep(currentStep + 1);
        } catch (err) {
          console.log("err", err);
        } finally {
          loadCloseNotification();
        }
        return;

      default:
        window.location.reload();
        return;
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

      await stapsSand();

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

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep <= totalSteps) {
      const sendDataApi = async () => {
        await stapsSand();
      };
      sendDataApi();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderSteps = (input, indes) => {
    const renderPage = input.children.filter((data, index) => {
      return data?.staps === currentStep ? data : null;
    });

    console.log("nput.children", input.children);
    return renderPage;
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
          <h2>CADASTRO {stapsTitle[currentStep]}</h2>
          <ProgressSteps
            currentStep={currentStep}
            totalSteps={totalSteps}
            showLabels={true}
            labels={[
              "Torres",
              "Pessoas",
              "Apartamentos",
              "Gasometros",
              "Confirmação",
            ]}
          />
          <div className="gas-signup__boxs--form--signup">
            {inputFormData(inputsValue, handleInputChange).map(
              (input, index) => (
                <Fragment key={index}>
                  <div
                    className={`gas-signup__boxs--form--signup--${input.className}`}
                  >
                    {input.children.map((data: any, index) => {
                      console.log(input.children);
                      if (data.staps === currentStep)
                        return (
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

                              {data?.children && data?.children.length > 0 ? (
                                <>
                                  <div className="select-wrapper">
                                    <select
                                      name="relation"
                                      id="relation"
                                      onChange={data.onChange}
                                      value={data.value}
                                    >
                                      {data?.children.map((child) => (
                                        <option
                                          value={child.value}
                                          className="props"
                                        >
                                          {child.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {data.staps === currentStep && (
                                    <div>
                                      <input
                                        ref={(el: any) =>
                                          (refs.current[data.id] = el)
                                        }
                                        value={inputsValue[data.value]}
                                        type={data.type}
                                        name={data.name}
                                        placeholder={data.placeholder}
                                        id={data.id}
                                        onChange={data.onChange}
                                        maxLength={data.maxLength}
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </Fragment>
              )
            )}
          </div>
          <div className="gas-signup__boxs--form--signup--send">
            <button
              onClick={() => handlePrev()}
              disabled={currentStep < totalSteps && currentStep === 1}
            >
              Voltar
            </button>
            <input
              type="submit"
              value={
                currentStep >= totalSteps ? "Finalizar Cadastro" : "Proximo"
              }
              onClick={() => handleNext()}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
