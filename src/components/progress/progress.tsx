import "../../scss/styles/components/progress.scss";
// ProgressSteps.jsx (versão com labels opcionais)
const ProgressSteps = ({
  currentStep = 1,
  totalSteps = 5,
  showLabels = false,
  labels = [],
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  // Labels padrão se não forem fornecidos
  const defaultLabels = [
    "Cadastro",
    "Informações",
    "Pagamento",
    "Confirmação",
    "Finalizado",
  ];

  const stepLabels = labels.length > 0 ? labels : defaultLabels;

  return (
    <div className="progress-steps">
      <div className="progress-steps__container">
        {/* Barra de progresso */}
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>
        </div>

        {/* Etapas */}
        <div className="steps">
          {steps.map((step) => (
            <div
              key={step}
              className={`step ${step === currentStep ? "step--active" : ""} ${
                step < currentStep ? "step--completed" : ""
              }`}
            >
              <div className="step__circle">
                {step < currentStep ? (
                  <span className="step__check">✓</span>
                ) : (
                  <span className="step__number">{step}</span>
                )}
              </div>
              {showLabels && stepLabels[step - 1] && (
                <span className="step__label">{stepLabels[step - 1]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
