import { useState, useEffect } from "react";
import "../../scss/styles/components/gasregister.scss";
import { GiGasPump } from "react-icons/gi";
import { PiBuildings } from "react-icons/pi";

const GasControlSystem = ({ dataGas }) => {
  const [formData, setFormData] = useState({
    gasometer: "",
    readingDate: "",
    consumption: "",
    periodicity: "MENSAL",
  });
  const [gasometers, setGasometers] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const apiConfig = {
    baseUrl: "http://localhost:8000/api",
    endpoints: {
      gasometers: "/gasometros/",
      readings: "/leituras/",
      apartments: "/apartamentos/",
    },
  };

  const fetchGasometers = async () => {
    try {
      setIsLoading(true);
      setGasometers(dataGas);
    } catch (error) {
      console.error("Erro ao carregar gasômetros:", error);
      showMessage("Erro ao carregar a lista de gasômetros.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const getCSRFToken = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  const registerReading = async (readingData) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${apiConfig.baseUrl}${apiConfig.endpoints.readings}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
          },
          body: JSON.stringify(readingData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage("Leitura registrada com sucesso!", "success");
        setFormData({
          gasometer: "",
          readingDate: new Date().toISOString().split("T")[0],
          consumption: "",
          periodicity: "MENSAL",
        });
        return data;
      } else {
        const errorMsg = data.detail || data.message || JSON.stringify(data);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Erro ao registrar leitura:", error);
      showMessage(`Erro: ${error.message}`, "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gasometer) {
      showMessage("Por favor, selecione um gasômetro.", "error");
      return;
    }

    if (!formData.readingDate) {
      showMessage("Por favor, selecione uma data.", "error");
      return;
    }

    if (!formData.consumption || parseFloat(formData.consumption) <= 0) {
      showMessage("Por favor, informe um consumo válido.", "error");
      return;
    }

    const readingData = {
      gasometro: formData.gasometer,
      data_leitura: formData.readingDate,
      consumo_m3: parseFloat(formData.consumption),
      periodicidade: formData.periodicity,
    };

    try {
      await registerReading(readingData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchGasometers();

    setFormData((prevState) => ({
      ...prevState,
      readingDate: new Date().toISOString().split("T")[0],
    }));
  }, []);

  return (
    <div className="gas-control-system">
      <div className="system-container">
        <div className="system-header">
          <h1>Registro de Leituras</h1>
          <p>Controle de consumo de gás para condomínios</p>
        </div>

        <div className="system-content">
          <div
            style={{
              fontSize: "4vw",
              textAlign: "center",
              padding: "3%",
            }}
          >
            <GiGasPump />
            <PiBuildings style={{ marginLeft: "5px" }} />
          </div>

          {message.text && (
            <div className={`system-message system-message--${message.type}`}>
              {message.text}
            </div>
          )}

          <form className="reading-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <div>
                <label htmlFor="gasometer">
                  <i className="fas fa-water"></i> Gasômetro:
                </label>
                <select
                  id="gasometer"
                  name="gasometer"
                  value={formData.gasometer}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Selecione o gasômetro</option>
                  {gasometers.map((gasometer) => (
                    <option key={gasometer.id} value={gasometer.id}>
                      {gasometer.apartamento_info
                        ? `${gasometer.codigo} - ${gasometer.apartamento_info}`
                        : `${gasometer.codigo} - Apto ${
                            gasometer.apartamento_numero ||
                            gasometer.apartamento
                          }`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="readingDate">
                  <i className="far fa-calendar-alt"></i> Data da Leitura:
                </label>
                <input
                  type="date"
                  id="readingDate"
                  name="readingDate"
                  value={formData.readingDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="consumption">
                  <i className="fas fa-fire"></i> Consumo (m³):
                </label>
                <input
                  type="number"
                  id="consumption"
                  name="consumption"
                  value={formData.consumption}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="periodicity">
                  <i className="fas fa-history"></i> Periodicidade:
                </label>
                <select
                  id="periodicity"
                  name="periodicity"
                  value={formData.periodicity}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="MENSAL">Mensal</option>
                  <option value="SEMANAL">Semanal</option>
                  <option value="BIMESTRAL">Bimestral</option>
                  <option value="SEMESTRAL">Semestral</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              <i className="fas fa-save"></i> Registrar Leitura
            </button>

            {isLoading && (
              <div className="loading-indicator">
                <i className="fas fa-spinner fa-spin"></i> Processando...
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GasControlSystem;
