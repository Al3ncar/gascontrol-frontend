import { useEffect, useMemo, useState } from "react";
import "../../scss/styles/dashboards/dashboard.scss";
import Logo from "../../assets/logo/logo-1.png";

import Sidebar from "../../components/sidebar/sidebar";
import Chat from "../../components/chat/chat";
import MetricCard from "../../components/metrics/metricsCard";
import DataTable from "../../components/table/table";
import Calendario from "../../components/calendar/calendar";
import GasControlSystem from "../../components/registerGasometros/register";
import menuItems from "../../utils/data/sidebar";
import Tables from "./table-data";

import LineChart from "./charts/line/chart-line";
import BarChart from "./charts/bar/chart-bar";
import PieChart from "./charts/pie/charts-pie";
import AreaChart from "./charts/area/charts-area";
import sendAxiosApi from "../../utils/api/api-methods";
import TowerPage from "./pages/tower";
import ApartmentPage from "./pages/apartment";
import LogoLoader from "../../components/loading/loading";
import Signup from "../auth/pages/SignUp";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  const [inputDataCond, setInputDataCond] = useState([]);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const [metricCondPie, setMetricCondPie] = useState([]);
  const [metricCondBar, setMetricCondBar] = useState([]);
  const [metricCard, setMetricCard] = useState<any[]>([]);

  const [tableDataGas, setTableDataGas] = useState([]);
  const [tableDataTower, setTableDataTower] = useState([]);
  const [tableDataApart, setTableDataApart] = useState([]);
  const [tableDataPeople, setTableDataPeople] = useState<any[]>([]);

  const [metricsResident, gasMetrics, towerMetrics] = [
    {
      title: "Total de Residentes",
      value: "0",
      change: 0,
      icon: "🏠",
    },
    {
      title: "Total Consumo de Gasometro por Mês: ",
      value: "0 m3",
      change: 0,
      icon: "📊",
    },
    {
      title: "Sessões Ativas: ",
      value: "5",
      change: 5,
      icon: "🔍",
    },
  ];

  const [supportChat, setSupportChat] = useState([
    { type: "bot", text: "Olá! Como posso ajudá-lo hoje?" },
  ]);
  const [teamChat, setTeamChat] = useState([
    { type: "bot", text: "Chat da equipe - todos online" },
  ]);

  const validModeActiveTab = (tabString: string) => activeTab === tabString;

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

  const formmattedArrayToPie = (dataAp, dataTow) => {
    const fatherWithChildren = dataTow.map((torre) => {
      const childrenDaTorre = dataAp.filter(
        (child) => child.torre === torre.id
      );

      return {
        ...torre,
        children: childrenDaTorre,
      };
    });

    const seetingArrayToPieChart = fatherWithChildren.map((item) => {
      return {
        name: item.identificacao,
        value: item.children.length,
      };
    });

    return seetingArrayToPieChart;
  };

  const renderDataMetrics = async () => {
    try {
      const dataRead = await sendAxiosApi("get", null, `leituras`);
      const dataPeople = await sendAxiosApi("get", null, `pessoas`);
      const dataCond = await sendAxiosApi("get", null, `condominios`);
      const dataTower = await sendAxiosApi("get", null, `torres`);
      const dataApart = await sendAxiosApi("get", null, `apartamentos`);
      const dataGas = await sendAxiosApi("get", null, `gasometros`);

      const pieFormatted = formmattedArrayToPie(dataApart, dataTower);
      const calcConsume = calcWeekValue(dataRead);

      const dataArrayStructure = Object.groupBy(
        dataTower,
        (item) => item.identificacao
      );
      const added = calcConsume.reduce((total, item: any) => {
        return total + parseFloat(item);
      }, 0);

      const infoGruposBar: any = Object.entries(dataArrayStructure).map(
        ([nome, items]) => ({
          name: nome,
          crescimento: items.length,
        })
      );

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

      setInputDataCond(dataCond);

      setMetricCard(objDataConfig);
      setMetricCondPie(pieFormatted);
      setMetricCondBar(infoGruposBar);

      setTableDataGas(dataGas);
      setTableDataTower(dataTower);
      setTableDataApart(dataApart);
      setTableDataPeople(dataPeople);
    } catch (err) {
      console.log("não foi possivel carregar os dados");
    } finally {
      setLoading(false);
    }
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

  const titlePage: string = {
    overview: "DASHBOARD",
    Cond: "DADOS CONDOMINIO",
    tower: "TORRES",
    apart: "APARTAMENTO",
    people: "PESSOAS",
    gasmetros: "GASOMETROS",
    cadastrar: "CADASTRAR",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={true}
        menuItems={menuItems}
        activeItem={activeTab}
        onChangeState={(actionType) => setActiveTab(actionType)}
      />

      {isLoading && (
        <>
          <LogoLoader
            logo={Logo}
            size="large"
            showText={true}
            text="Carregando dados..."
            className="light"
          />
        </>
      )}

      <div className="main-panel">
        <div className="panel-header">
          <h1>APRESENTAÇÃO {titlePage[activeTab]}</h1>
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

        <Tables
          activeTab={activeTab}
          tableDataTower={tableDataTower}
          tableDataApart={tableDataApart}
          tableDataPeople={tableDataPeople}
          tableDataGas={tableDataGas}
        />

        {validModeActiveTab("cadastrar") && (
          <>
            <Signup inputCond={inputDataCond} />
          </>
        )}
        {validModeActiveTab("overview") && (
          <>
            <div className="metrics-content">
              <div className="metrics-grid">
                {metricCard.map((metric, index) => (
                  <MetricCard key={index} id={index} {...metric} />
                ))}
              </div>
              <div className="metrics-card">
                <PieChart
                  data={metricCondPie}
                  title="Torres: "
                  pieDescriptionTitle="Apartamentos"
                />
              </div>
            </div>

            <div className="content-tabs">
              <button
                className={`tab ${
                  validModeActiveTab("overview") ? "active" : ""
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Visão Geral
              </button>
              <button
                className={`tab ${
                  validModeActiveTab("details") ? "active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Detalhes
              </button>
              <button
                className={`tab ${validModeActiveTab("data") ? "active" : ""}`}
                onClick={() => setActiveTab("data")}
              >
                Estatisticas
              </button>
              <button
                className={`tab ${validModeActiveTab("chats") ? "active" : ""}`}
                onClick={() => setActiveTab("chats")}
              >
                Chat
              </button>
            </div>
          </>
        )}
        {(validModeActiveTab("details") || validModeActiveTab("overview")) && (
          <div className="table-content">
            <h2>Dados</h2>
            <div className="tab-content">
              <Calendario />

              <Tables
                activeTab={activeTab}
                tableDataTower={tableDataTower}
                tableDataApart={tableDataApart}
                tableDataPeople={tableDataPeople}
                tableDataGas={tableDataGas}
              />
            </div>
          </div>
        )}
        {(validModeActiveTab("data") || validModeActiveTab("overview")) && (
          <div className="table-content">
            <h2>Estatisticas</h2>
            <div className="tab-contents">
              {/* <LineChart data={chartData} title="Condominio" /> */}
              {/* <BarChart data={chartData} title="Receita vs Meta Mensal" /> */}
              {/* <PieChart data={metricCondPie} title="Condominios: " /> */}
              <AreaChart data={metricCondBar} title="Crescimento Anual (%)" />
              <GasControlSystem dataGas={tableDataGas} />
            </div>
          </div>
        )}
        {(validModeActiveTab("chats") || validModeActiveTab("overview")) && (
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
