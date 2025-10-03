import React from "react";
import "../../scss/styles/components/emptySlot.scss";

const EmptySlot = ({
  icon = "📊",
  title = "Nenhum dado encontrado",
  msg = "Não há registros para exibir no momento.",
  action = null,
  actionText = "Adicionar Novo",
  hight = "400px"
}) => {
  return (
    <div className="slot-vazio" style={{ height: hight }}>
      <div className="slot-vazio-content">
        <div className="slot-vazio-icone">
          {icon}
        </div>
        
        <div className="slot-vazio-texto">
          <h3 className="slot-vazio-titulo">{title}</h3>
          <p className="slot-vazio-mensagem">{msg}</p>
        </div>

        {action && (
          <button 
            className="slot-vazio-botao"
            onClick={action}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptySlot;