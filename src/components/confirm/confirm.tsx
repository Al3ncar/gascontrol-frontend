import React from "react";
import "../../scss/styles/components/confirm.scss";

const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  titulo = "Tem certeza?",
  mensagem = "Esta ação não pode ser desfeita. Confirme se deseja prosseguir.",
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  tipo = "info",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const getIcon = () => {
    switch (tipo) {
      case "danger":
        return "⚠️";
      case "warning":
        return "🔔";
      case "success":
        return "✅";
      case "info":
      default:
        return "ℹ️";
    }
  };

  const getTipoClass = () => {
    return `modal-tipo-${tipo}`;
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-confirmacao">
        <div className="modal-icon">{getIcon()}</div>

        <h3 className="modal-titulo">{titulo}</h3>

        <div className="modal-body">
          <p className="modal-mensagem">{mensagem}</p>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-cancelar"
            onClick={onClose}
            disabled={isLoading}
          >
            {textoCancelar}
          </button>
          <button
            className={`btn btn-confirmar ${getTipoClass()}`}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processando...
              </>
            ) : (
              textoConfirmar
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
