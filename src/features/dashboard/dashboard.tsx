// components/MetricCard.jsx
import { useState } from "react";
import "../../scss/styles/dashboards/dashboard.scss";

import Sidebar from "../../components/sidebar/sidebar";
import Chat from "../../components/chat/chat";
import MetricCard from "../../components/metrics/metricsCard";
import DataTable from "../../components/table/table";

import LineChart from "./charts/line/chart-line";
import BarChart from "./charts/bar/chart-bar";
import PieChart from "./charts/pie/charts-pie";
import AreaChart from "./charts/area/charts-area";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [supportChat, setSupportChat] = useState([
    { type: "bot", text: "Olá! Como posso ajudá-lo hoje?" },
  ]);
  const [teamChat, setTeamChat] = useState([
    { type: "bot", text: "Chat da equipe - todos online" },
  ]);

  const chartData = [
    {
      name: "Seg",
      usuarios: 400,
      sessões: 240,
      receita: 2400,
      meta: 2000,
      crescimento: 12,
    },
    {
      name: "Ter",
      usuarios: 300,
      sessões: 139,
      receita: 1398,
      meta: 1500,
      crescimento: 18,
    },
    {
      name: "Qua",
      usuarios: 200,
      sessões: 980,
      receita: 9800,
      meta: 8000,
      crescimento: 22,
    },
    {
      name: "Qui",
      usuarios: 278,
      sessões: 390,
      receita: 3908,
      meta: 3500,
      crescimento: 15,
    },
    {
      name: "Sex",
      usuarios: 189,
      sessões: 480,
      receita: 4800,
      meta: 4500,
      crescimento: 8,
    },
    {
      name: "Sáb",
      usuarios: 239,
      sessões: 380,
      receita: 3800,
      meta: 4000,
      crescimento: 25,
    },
    {
      name: "Dom",
      usuarios: 349,
      sessões: 430,
      receita: 4300,
      meta: 4200,
      crescimento: 30,
    },
  ];

  const pieData = [
    { name: "Mobile", value: 45 },
    { name: "Desktop", value: 35 },
    { name: "Tablet", value: 15 },
    { name: "Outros", value: 5 },
  ];

  const areaData = [
    { name: "Jan", crescimento: 12 },
    { name: "Fev", crescimento: 18 },
    { name: "Mar", crescimento: 15 },
    { name: "Abr", crescimento: 22 },
    { name: "Mai", crescimento: 25 },
    { name: "Jun", crescimento: 30 },
    { name: "Jul", crescimento: 28 },
    { name: "Ago", crescimento: 32 },
    { name: "Set", crescimento: 35 },
    { name: "Out", crescimento: 40 },
    { name: "Nov", crescimento: 38 },
    { name: "Dez", crescimento: 45 },
  ];

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: "📊", path: "#" },
    { id: "users", label: "Usuários", icon: "👥", path: "#" },
    { id: "analytics", label: "Analytics", icon: "📈", path: "#" },
    { id: "chats", label: "Chats", icon: "💬", path: "#" },
    { id: "settings", label: "Configurações", icon: "⚙️", path: "#" },
  ];

  const metrics = [
    { title: "Total de Usuários", value: "1,250", change: 12, icon: "👥" },
    { title: "Receita Mensal", value: "R$ 25.4k", change: 5, icon: "💰" },
    { title: "Taxa de Conversão", value: "3.2%", change: -2, icon: "📊" },
    { title: "Sessões Ativas", value: "892", change: 8, icon: "🔍" },
  ];

  const handleSupportMessage = (message) => {
    setSupportChat((prev) => [...prev, { type: "user", text: message }]);
    // Simular resposta do bot
    setTimeout(() => {
      setSupportChat((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Obrigado pela sua mensagem! Vamos analisar sua solicitação.",
        },
      ]);
    }, 1000);
  };

  const handleTeamMessage = (message) => {
    setTeamChat((prev) => [...prev, { type: "user", text: message }]);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={true} menuItems={menuItems} activeItem={activeTab} />

      <div className="main-panel">
        <div className="panel-header">
          <h1>Análise do painel</h1>
          <div className="header-actions">
            <button className="btn-primary">Exportar</button>
            <button className="btn-secondary">Filtrar</button>
          </div>
        </div>

        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard key={index} id={index} {...metric} />
          ))}
        </div>

        <div className="content-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Visão Geral
          </button>
          <button
            className={`tab ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            Estatisticas
          </button>
          <button
            className={`tab ${activeTab === "chats" ? "active" : ""}`}
            onClick={() => setActiveTab("chats")}
          >
            Chats
          </button>
          <button
            className={`tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Detalhes
          </button>
        </div>

        

        {(activeTab === "data" || activeTab === "overview") && (
          <>
            <h2>Dados</h2>
            <div className="tab-content">
              <DataTable />
            </div>
          </>
        )}
        {(activeTab === "data" || activeTab === "overview") && (
          <>
            <h2>Estatisticas</h2>
            <div className="tab-content">
              <LineChart
                data={chartData}
                title="Usuários vs Sessões (Últimos 7 dias)"
              />
              <BarChart data={chartData} title="Receita vs Meta Mensal" />
              <PieChart data={pieData} title="Dispositivos dos Usuários" />
              <AreaChart data={areaData} title="Crescimento Anual (%)" />
            </div>
          </>
        )}
        {(activeTab === "chats" || activeTab === "overview") && (
          <>
            <h2>Chat</h2>
            <div className="tab-content">
              <div className="chat-system">
                <Chat
                  title="Suporte ao Cliente"
                  messages={supportChat}
                  onSendMessage={handleSupportMessage}
                />
                <Chat
                  title="Chat da Equipe"
                  messages={teamChat}
                  onSendMessage={handleTeamMessage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
