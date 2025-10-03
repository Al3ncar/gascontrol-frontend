import { useState, useEffect } from "react";
import TowerPage from "./pages/tower";
import ApartmentPage from "./pages/apartment";
import PeoplePage from "./pages/people";
import sendAxiosApi from "../../utils/api/api-methods";
import DataTable from "../../components/table/table";
import LogoLoader from "../../components/loading/loading";
import Logo from "../../assets/logo/logo-1.png";

const Tables = ({
  activeTab,
  tableDataTower,
  tableDataApart,
  tableDataPeople,
  tableDataGas,
}) => {
  const [isLoading, setLoading] = useState(true);

  const [tableCondData, setTableCondData] = useState([]);
  const [tableApartData, setTableApartData] = useState([]);
  const [tablePeopleData, setTablePeopleData] = useState([]);
  const [tableGasData, setTableGasData] = useState([]);

  const tableHeadCond = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "nome", label: "Nome da Torre", sortable: true },
    { chave: "number", label: "Numero da Torre", sortable: true },
    { chave: "cond", label: "Condominio", sortable: true },
    { chave: "local", label: "Estado, UF", sortable: true },
    { chave: "", label: "", sortable: false },
  ];

  const tableHeadApart = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "number", label: "Numero do Apartamento", sortable: true },
    { chave: "towerName", label: "Nome da Torre", sortable: true },
    { chave: "numberTower", label: "Numero da Torre", sortable: true },
    { chave: "condName", label: "Condominio", sortable: true },
    { chave: "", label: "", sortable: false },
  ];
  const tableHeadPeople = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "fullName", label: "Nome Completo", sortable: true },
    { chave: "relationApt", label: "Relação com Imovel", sortable: true },
    { chave: "numberApt", label: "Numero da Apartamento", sortable: true },
    { chave: "tower", label: "Nome da Torre", sortable: true },
    { chave: "condName", label: "Condominio", sortable: true },
    { chave: "", label: "", sortable: false },
  ];
  const tableHeadGas = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "code", label: "Codigo Gasometro", sortable: true },
    { chave: "numberApt", label: "Numero da Apartamento", sortable: true },
    { chave: "tower", label: "Nome da Torre", sortable: true },
    { chave: "condName", label: "Condominio", sortable: true },
    { chave: "", label: "", sortable: false },
  ];

 

  const validModeActiveTab = (tabString: string) => activeTab === tabString;

  const renderTableTower = async () => {
    if (!tableDataTower || tableDataTower.length === 0) return;

    try {
      const getIDCond = tableDataTower.map((item) => item.condominio);
      const dataCond = await sendAxiosApi(
        "get",
        null,
        `condominios/${getIDCond[0]}`
      );

      const dataTable = tableDataTower.map((item) => {
        const dataPushItem = {
          condominioName: dataCond.nome,
          local: dataCond.local,
        };
        return { ...item, ...dataPushItem };
      });

      renderTableApartment(dataTable);
      setTableCondData(dataTable);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };
  const renderTableApartment = (towerData) => {
    const groupByTableData = tableDataApart.map((apt) => {
      const childrenDaTorre = towerData.filter((child) => {
        return child.id === apt.torre;
      });

      return {
        ...apt,
        identificacao: childrenDaTorre[0].identificacao,
        condName: childrenDaTorre[0].condominioName,
        numberTower: childrenDaTorre[0].numero,
      };
    });

    const newGroup = groupByTableData.slice();

    setTableApartData(groupByTableData);
    renderTablePeople(newGroup);
    // renderTableGas(newGroup)
  };
  const renderTablePeople = (apartmentData) => {
    const groupByTableData = tableDataPeople.map((people) => {
      const childrenDaTorre = apartmentData.filter((apt) => {
        return apt.id === people.apartamento;
      });

      console.log("childrenDaTorre", childrenDaTorre);
      return {
        ...people,
        identificacao: childrenDaTorre[0].identificacao,
        condName: childrenDaTorre[0].condName,
      };
    });
    const newGroup = groupByTableData.slice();
    renderTableGas(newGroup);
    setTablePeopleData(groupByTableData);
  };
  const renderTableGas = (person) => {
    const groupByTableData = tableDataGas.map((people) => {
      const childrenDaTorre = person.filter((apt) => {
        return apt.id === people.apartamento;
      });

      console.log("childrenDaTorre", childrenDaTorre);
      return {
        ...people,
        identificacao: childrenDaTorre[0].identificacao,
        condName: childrenDaTorre[0].condName,
      };
    });

    console.log(groupByTableData);
    setTableGasData(groupByTableData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await renderTableTower();
    };
    fetchData();
  }, [tableDataTower, tableDataApart]);

  return (
    <div>
      {(validModeActiveTab("tower") || validModeActiveTab("Cond")) && (
        <>
          <div className="table-content">
            <div className="tab-content">
              <DataTable
                type="tower"
                titleTable="TABELA DE TORRES"
                style={{ width: "100%" }}
                data={tableCondData}
                dataHead={tableHeadCond}
              />
            </div>
          </div>
        </>
      )}
      {(validModeActiveTab("apartment") || validModeActiveTab("Cond")) && (
        <>
          <div className="table-content">
            <div className="tab-content">
              <DataTable
                type="apartment"
                titleTable="TABELA DE APARTAMENTOS"
                style={{ width: "100%" }}
                data={tableApartData}
                dataHead={tableHeadApart}
              />
            </div>
          </div>
        </>
      )}
      {(validModeActiveTab("people") || validModeActiveTab("Cond")) && (
        <>
          <div className="table-content">
            <div className="tab-content">
              <DataTable
                type="people"
                titleTable="PESSOAS"
                style={{ width: "100%" }}
                data={tablePeopleData}
                dataHead={tableHeadPeople}
              />
            </div>
          </div>
        </>
      )}
      {(validModeActiveTab("gasmetros") || validModeActiveTab("Cond")) && (
        <>
          <div className="table-content">
            <div className="tab-content">
              <DataTable
                type="gasmetros"
                titleTable="Tabela de Gasometros"
                style={{ width: "100%" }}
                data={tableGasData}
                dataHead={tableHeadGas}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tables;
