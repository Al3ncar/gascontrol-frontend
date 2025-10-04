import React, { useState, useEffect } from "react";
import "../../scss/styles/components/modal.scss";

const EditModal = ({ isOpen, onClose, onConfirm, data, fields }) => {
  const [formData, setFormData] = useState({});
  const [formDataInput, setFormDataInput] = useState();
  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data, isOpen]);

  useEffect(() => {
    setFormDataInput(fields);
  }, [fields]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  const handleInputChange = (field, value) => {
    console.log(formDataInput);

    const newFormData = formDataInput.map((item) => {
      return { ...item, [field]: value };
    });

    setFormDataInput(newFormData);
  };

  const handleConfirm = () => {
    onConfirm(formDataInput);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Registro</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {formDataInput.map((field) => {
            return (
              <div key={field.key} className="form-field">
                <label htmlFor={field.key}>{field.label}</label>
                <input
                  id={field.key}
                  type={field.type || "text"}
                  value={field[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder={`Digite ${field.label.toLowerCase()}`}
                />
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
