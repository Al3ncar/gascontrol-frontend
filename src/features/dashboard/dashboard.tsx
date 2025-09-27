// components/MetricCard.jsx
import { useEffect, useMemo, useState } from "react";
import "../../scss/styles/dashboards/dashboard.scss";

import Sidebar from "../../components/sidebar/sidebar";
import Chat from "../../components/chat/chat";
import MetricCard from "../../components/metrics/metricsCard";
import DataTable from "../../components/table/table";
import Calendario from "../../components/calendar/calendar";
import GasControlSystem from "../../components/registerGasometros/register";

import LineChart from "./charts/line/chart-line";
import BarChart from "./charts/bar/chart-bar";
import PieChart from "./charts/pie/charts-pie";
import AreaChart from "./charts/area/charts-area";
import sendAxiosApi from "../../utils/api/api-methods";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [metricCondPie, setMetricCondPie] = useState([]);
  const [metricCondBar, setMetricCondBar] = useState([]);
  const [metricCard, setMetricCard] = useState<any[]>([]);
  const [tableInfo, setTableInfo] = useState<any[]>([]);
  const [metricsResident, setMetricsResident] = useState({
    title: "Total de Residentes",
    value: "0",
    change: 0,
    icon: "🏠",
  });
  const [gasMetrics, setGasMetrics] = useState({
    title: "Total Consumo de Gasometro por Mês: ",
    value: "0 m3",
    change: 0,
    icon: "📊",
  });
  const [towerMetrics, setTowerMetrics] = useState({
    title: "Sessões Ativas: ",
    value: "5",
    change: 5,
    icon: "🔍",
  });
  const [supportChat, setSupportChat] = useState([
    { type: "bot", text: "Olá! Como posso ajudá-lo hoje?" },
  ]);
  const [teamChat, setTeamChat] = useState([
    { type: "bot", text: "Chat da equipe - todos online" },
  ]);

  const colunas = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "nome", label: "Nome", sortable: true },
    { chave: "tipo", label: "Tipo", sortable: true },
    { chave: "apartamento", label: "Apartamento", sortable: true },
    { chave: "acoes", label: "Ações", sortable: false },
  ];

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: "📊", path: "#" },
    { id: "users", label: "Usuários", icon: "👥", path: "#" },
    { id: "analytics", label: "Analytics", icon: "📈", path: "#" },
    { id: "chats", label: "Chats", icon: "💬", path: "#" },
    { id: "settings", label: "Configurações", icon: "⚙️", path: "#" },
    {
      id: "register",
      label: "Registrar Gasometros",
      icon: "+",
      path: "#registergameters",
    },
  ];
  //   { title: "Total de Usuários", value: "1,250", change: 12, icon: "👥" },
  //   { title: "Receita Mensal", value: "R$ 25.4k", change: 5, icon: "💰" },
  //   { title: "Taxa de Conversão", value: "3.2%", change: -2, icon: "📊" },
  //   { title: "Sessões Ativas", value: "892", change: 8, icon: "🔍" },
  // ];

  const validDataAndAddedInState = (
    id: number | string,
    array: any[],
    obj: any
  ) => {
    const newArrayData = array.map((item: string | number, index: number) => {
      return index === id ? obj : item;
    });
    return newArrayData;
  };
  const calcWeekValue = (array: any[]) => {
    const data: any = {
      SEMANAL: 5,
      MENSAL: 1,
      BIMESTRAL: 2,
      SEMESTRAL: 6,
    };

    const newArray = array.map((item) => {
      return Number(item.consumo_m3) / data[item.periodicidade];
    });

    return newArray;
  };
  const renderDataMetrics = async () => {
    const dataRead = await sendAxiosApi("get", null, `leituras`);
    const dataPeople = await sendAxiosApi("get", null, `pessoas`);
    const dataCond = await sendAxiosApi("get", null, `condominios`);
    setTableInfo(dataPeople);

    const calcConsume = calcWeekValue(dataRead);
    const dataArrayStructure = Object.groupBy(dataCond, (item) => item.nome);
    // const dataArrayStructureBar = Object.groupBy(dataCond, (item) => item.nome);
    const added = calcConsume.reduce((total, item: any) => {
      return total + parseFloat(item);
    }, 0);

    const infoGruposPie: any = Object.entries(dataArrayStructure).map(
      ([nome, items]) => ({
        name: nome,
        value: items.length,
        // ids: items.map((item) => item.id),
      })
    );
    const infoGruposBar: any = Object.entries(dataArrayStructure).map(
      ([nome, items]) => ({
        name: nome,
        crescimento: items.length,
        // ids: items.map((item) => item.id),
      })
    );

    console.log(infoGruposBar);

    const objDataConfig: any = [
      {
        ...metricsResident,
        value: dataPeople.length.toString(),
        change: dataPeople.length,
      },
      towerMetrics,
      {
        ...gasMetrics,
        value: added.toFixed(4) + " m3",
        change: added.toFixed(2),
      },
    ];

    setMetricCondBar(infoGruposBar);
    setMetricCondPie(infoGruposPie);
    setMetricCard(objDataConfig);
  };

  const handleSupportMessage = (message) => {
    setSupportChat((prev) => [...prev, { type: "user", text: message }]);
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

  useEffect(() => {
    return () => {
      const fetchData = async () => {
        await renderDataMetrics();
      };
      fetchData();
    };
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={true} menuItems={menuItems} activeItem={activeTab} />

      <div className="main-panel">
        <div className="panel-header">
          <h1>APRESENTAÇÃO DASHBOARD</h1>
          <div className="header-actions">
            <button className="btn-primary">Exportar</button>
            <button
              className="btn-secondary"
              onClick={() => (location.href = "/login")}
            >
              Sair
            </button>
          </div>
        </div>

        <div className="metrics-content">
          <div className="metrics-grid">
            {metricCard.map((metric, index) => (
              <MetricCard key={index} id={index} {...metric} />
            ))}
          </div>
          <div className="metrics-card">
            <PieChart data={metricCondPie} title="Condominios: " />
          </div>
        </div>

        <div className="content-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Visão Geral
          </button>
          <button
            className={`tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Detalhes
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
            Chat
          </button>
        </div>

        {(activeTab === "overview" || activeTab === "details") && (
          <div className="table-content">
            <h2>Dados</h2>
            <div className="tab-content">
              <Calendario />
              <DataTable data={tableInfo} dataHead={colunas} />
            </div>
          </div>
        )}
        {(activeTab === "data" || activeTab === "overview") && (
          <div className="table-content">
            <h2>Estatisticas</h2>
            <div className="tab-contents">
              {/* <LineChart data={chartData} title="Condominio" /> */}
              {/* <BarChart data={chartData} title="Receita vs Meta Mensal" /> */}
              {/* <PieChart data={metricCondPie} title="Condominios: " /> */}
              <AreaChart data={metricCondBar} title="Crescimento Anual (%)" />
              <GasControlSystem />
            </div>
          </div>
        )}

        {(activeTab === "chats" || activeTab === "overview") && (
          <div className="table-content">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
