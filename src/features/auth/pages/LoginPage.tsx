import { useState, useRef, useEffect, use } from "react";
import "../../../scss/styles/pages/login.scss";

import axios from "axios";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import GasLogo from "../../../assets/logo/logo-1.png";
import sendAxiosApi from "../../../utils/api/api-methods";
import Notification from "../../../components/notification/notification";

export default function LoginPage({ isValid = (valid: boolean) => {} }) {
  const [isViewPassword, setViewPassword] = useState<boolean>(false);
  const [saveDataInStorage, setSaveDataInStorage] = useState<boolean>(false);
  const [showNotif, setShowNotif] = useState({
    type: "waring",
    text: "Exemplo de texto",
    show: false,
  });
  const [inputsValue, setInputsValue] = useState<any>([
    {
      numberApt: "",
      gasometerCode: "",
    },
  ]);

  const nameCondRef = useRef(null);
  const codGas = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newInputsValue: any = inputsValue.slice()[0];
    newInputsValue[id] = value;
    setInputsValue([newInputsValue]);
  };

  const inputFormData = [
    {
      label: "Numero do Apartamento: ",
      type: "number",
      name: "number",
      placeholder: "Numero...",
      ref: nameCondRef,
      value: inputsValue.numberApt,
      id: "numberApt",
      onChange: (e: any) => handleInputChange(e),
    },
    {
      label: "Codigo gasometro: ",
      type: isViewPassword ? "text" : "password",
      name: "code",
      placeholder: "123-456-789",
      ref: codGas,
      value: inputsValue.gasometerCode,
      id: "gasometerCode",
      onChange: (e: any) => handleInputChange(e),
    },
  ];

  useEffect(() => {
    const getStoredToken = localStorage.getItem("user");
    setSaveDataInStorage(!!getStoredToken);
    isValid(!!getStoredToken);
  }, []);

  const sendGasData = async (numberApt: number, gasometerCode: string) => {
    try {
      const dataGas = await sendAxiosApi("get", null, `gasometros`);
      const getValid = dataGas.find((data: any) => {
        return (
          gasometerCode.trim().toLowerCase() ===
            data.codigo.trim().toLowerCase() &&
          Number(numberApt) === data.apartamento
        );
      });

      if (getValid) {
        const newShowNotif: any = {
          type: "success",
          text: "Login realizado com sucesso!",
          show: true,
        };
        setShowNotif(newShowNotif);
        isValid(true);
        localStorage.setItem("validUser", JSON.stringify(newShowNotif));
        saveDataInStorage &&
          localStorage.setItem("user", JSON.stringify(getValid));
        // location.href = "/dashboards";
      } else {
        const newShowNotif: any = {
          type: "waring",
          text: "Por favor, verifique os dados do NUMERO DO APARTAMENTO ou CODIGO DO GASOMETRO.",
          show: true,
        };
        setShowNotif(newShowNotif);
      }
    } catch (error) {
      const newShowNotif: any = {
        type: "waring",
        text: "Por favor, verifique os dados do NUMERO DO APARTAMENTO ou CODIGO DO GASOMETRO.",
        show: true,
      };
      setShowNotif(newShowNotif);
      isValid(false);
      throw error;
    } finally {
      loadCloseNotification();
    }
  };

  const sendLoginData = async () => {
    const { numberApt, gasometerCode } = inputsValue[0];

    try {
      const dataGas = await sendGasData(numberApt, gasometerCode);
    } catch (error) {
    } finally {
      loadCloseNotification();
    }
  };

  const loadCloseNotification = () => {
    setTimeout(() => {
      const newShowNotif: any = {
        show: false,
      };
      setShowNotif(newShowNotif);
    }, 3000);
  };

  const focusInputs = (inputRef: any) => inputRef.current.focus();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault();

  const actionSingUp = () => (location.href = "/signup");

  useEffect(() => {
    fetch("http://localhost:8000/admin/login/?next=/admin/", {
      method: "post",
      body: JSON.stringify({ username: "example" }),
    });
  });

  return (
    <section className="gas-login">
      {showNotif.show && (
        <Notification type={showNotif.type} text={showNotif.text} />
      )}
      <div className="gas-login__box">
        <div className="gas-login__box--description">
          <div className="gas-login__box--description--text">
            <h2>
              Olá, <span>Bem vindo!</span>{" "}
            </h2>
            <p>
              Tenha clareza e controle sobre os seus dados em poucos cliques,
              cadastre medidores, registre consumos e muito mais.
            </p>
            <button onClick={() => actionSingUp()}>
              Ir para tela de Cadastrar
            </button>
          </div>
        </div>
        <form
          action=""
          method="post"
          className="gas-login__box--form"
          onSubmit={(e) => submitForm(e)}
        >
          <div className="gas-login__box--form--logo">
            <img src={GasLogo} alt="Gas Control Logo" />
          </div>

          {inputFormData.map((input, index) => (
            <div
              key={index}
              className={`gas-login__box--form--${input.name}`}
              onClick={() => focusInputs(input.ref)}
            >
              <div
                className={`gas-login__box--form--${input.name}--divisor`}
              ></div>
              <div className={`gas-login__box--form--${input.name}--input`}>
                <label htmlFor={`${input.name}`}>{input.label}</label>

                {input.label === "Relação com Imovél: " ? (
                  <div className="select-wrapper">
                    <select
                      name="relation"
                      id="relation"
                      onChange={input.onChange}
                      value={input.value}
                    >
                      <option value="" disabled selected>
                        Selecionar...
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
                    ref={input.ref}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    id={input.id}
                    onChange={input.onChange}
                  />
                )}
              </div>
              {input.name === "code" && (
                <div className="gas-login__box--form--password--eyes">
                  <button
                    onClick={() => setViewPassword(!isViewPassword)}
                    type="button"
                  >
                    {isViewPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="gas-login__box--form--remember-me">
            <div>
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onClick={() => setSaveDataInStorage(!saveDataInStorage)}
              />
              <label htmlFor="checkbox"> Lembrar de mim </label>
            </div>
            <div className="gas-login__box--form--remember-me--not-remember">
              Esqueci a senha?
            </div>
          </div>

          <div className="gas-login__box--form--send">
            <input
              type="submit"
              value="Entrar"
              onClick={() => sendLoginData()}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
