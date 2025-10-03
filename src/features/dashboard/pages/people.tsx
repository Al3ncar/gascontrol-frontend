import { useState, useEffect } from "react";
import DataTable from "../../../components/table/table";
import sendAxiosApi from "../../../utils/api/api-methods";

const PeoplePage = ({
  personData,
  apartmentData,
  onGetDataRenderTable = () => {},
}) => {
  const [tableApartData, setTableApartData] = useState([]);
  const tableHeadApart = [
    { chave: "id", label: "ID", sortable: true },
    { chave: "number", label: "Numero do Apartamento", sortable: true },
    { chave: "towerName", label: "Nome da Torre", sortable: true },
    { chave: "numberTower", label: "Numero da Torre", sortable: true },
    { chave: "condName", label: "Condominio", sortable: true },
    { chave: "", label: "", sortable: false },
  ];

  const renderTableApartment = () => {
    // const fatherWithChildren = apartmentData.map((apt) => {
    //   const childrenDaTorre = towerData.filter((child) => {
    //     return child.id === apt.torre;
    //   });
    //   return {
    //     ...apt,
    //     identificacao: childrenDaTorre[0].identificacao,
    //     condName: childrenDaTorre[0].condominioName,
    //     numberTower: childrenDaTorre[0].numero,
    //   };
    // });
    // console.log("fatherWithChildren", fatherWithChildren);
    // setTableApartData(fatherWithChildren);
  };

  useEffect(() => {
    renderTableApartment();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default PeoplePage;
