import "../../scss/styles/components/chat.scss";
import { useState } from "react";
const Chat = ({ title, messages, onSendMessage }: any) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>{title}</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg: any, index: number) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
