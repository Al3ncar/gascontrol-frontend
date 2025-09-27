import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosClose, IoMdAlert } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";
import "../../scss/styles/components/notification.scss";

const Notification = (object: any) => {
  const successType = () => {
    return (
      <div className="notification--success">
        <div className="content">
          <div className="icon">
            <FaCheckCircle />
          </div>
          <div className="text">
            <h2>Sucesso</h2>
            <p>Ação realizada com sucesso!</p>
          </div>
        </div>
        <button className="close">
          <IoIosClose />
        </button>
      </div>
    );
  };

  const ErrorType = () => {
    console.log(object.text);
    return (
      <div className="notification--error">
        <div className="content">
          <div className="icon">
            <BiSolidError />
          </div>
          <div className="text">
            <h2>Erro</h2>
            <p>{object.text}</p>
          </div>
        </div>
        <button className="close">
          <IoIosClose />
        </button>
      </div>
    );
  };
  const WaringType = () => {
    return (
      <div className="notification--waring">
        <div className="content">
          <div className="icon">
            <IoMdAlert />
          </div>
          <div className="text">
            <h2>Atenção</h2>
            <p>{object.text}</p>
          </div>
        </div>
        <button className="close">
          <IoIosClose />
        </button>
      </div>
    );
  };

  const notifContent: any = {
    success: successType(),
    error: ErrorType(),
    waring: WaringType(),
  };

  return notifContent[object.type] || <> tesxzte</>;
};

export default Notification;
