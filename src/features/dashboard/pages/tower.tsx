import { useState, useEffect } from "react";
import DataTable from "../../../components/table/table";
import sendAxiosApi from "../../../utils/api/api-methods";

const TowerPage = ({ towerData = [] }) => {
  const [tableCondData, setTableCondData] = useState([]);
  const tableHeadCond = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "nome", label: "Nome da Torre", sortable: true },
    { chave: "number", label: "Numero da Torre", sortable: true },
    { chave: "cond", label: "Condominio", sortable: true },
    { chave: "local", label: "Estado, UF", sortable: true },
    { chave: "", label: "", sortable: false },
  ];

  const renderTableTower = async () => {
    const getIDCond = towerData.map((item) => {
      return item.condominio;
    });
    const dataCond = await sendAxiosApi(
      "get",
      null,
      `condominios/${getIDCond[0]}`
    );
    const dataTable = towerData.map((item) => {
      const dataPushItem = {
        condominioName: dataCond.nome,
        local: dataCond.local,
      };
      return { ...item, ...dataPushItem };
    });
    setTableCondData(dataTable);  };

  useEffect(() => {
    return () => {
      const fetchData = async () => {
        await renderTableTower();
      };
      fetchData();
    };
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default TowerPage;
