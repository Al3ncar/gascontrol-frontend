import { useState, useMemo, useEffect } from "react";
import styles from "../../scss/styles/components/table.module.scss";
import EmptySlot from "../emptySlot/emptySlot";
import ModalConfirm from "../confirm/confirm";
import sendAxiosApi from "../../utils/api/api-methods";
import EditModal from "../modal/modal";

const DataTable = ({
  type = "default",
  titleTable = "Dados da Tabela",
  data,
  dataHead,
  itemsPerPage = 10,
  style = {},
}) => {
  const [tableDataArray, setTableDataArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalConfirm, setModalConfirm] = useState(false);
  const [isModalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const [modalInputs, setModalInputs] = useState([]);

  const typeTable: string = {
    overview: "",
    cond: "condominio",
    tower: "torres",
    apartment: "apartamento",
    people: "pessoas",
    gasmetros: "gasometros",
    // analise: "analise",
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const modalFields = {
    tower: [
      {
        key: "identificacao",
        label: "Identificação: ",
        type: "text",
        typeRender: "torres",
      },
      {
        key: "numero",
        label: "Numero: ",
        type: "number",
        typeRender: "torres",
      },
      {
        key: "condominioName",
        label: "Condominio: ",
        type: "text",
        typeRender: "torres",
      },
    ],
    apartment: [
      {
        key: "numero",
        label: "Numero: ",
        type: "number",
        typeRender: "apartamentos",
      },
      {
        key: "torre",
        label: "ID Torre: ",
        type: "text",
        typeRender: "apartamentos",
      },
    ],
    people: [
      {
        key: "nome",
        label: "Nome:",
        type: "text",
        typeRender: "pessoas",
      },
      {
        key: "tipo",
        label: "Relação com imovel: ",
        type: "text",
        typeRender: "pessoas",
      },
      {
        key: "apartamento",
        label: "Apartamento: ",
        type: "text",
        typeRender: "pessoas",
      },
    ],
    gasmetros: [
      {
        key: "codigo",
        label: "Codigo:",
        type: "text",
        typeRender: "gasometros",
      },
      {
        key: "apartamento",
        label: "ID do Apartamento: ",
        type: "number",
        typeRender: "gasometros",
      },
    ],
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setIsModalOpen(true);
  };

  const handleConfirmEdit = (updatedData) => {
    console.log("updatedData", updatedData);
    // const getDataOpen = currentData.find((item) => item.id === Number(id));

    const typeApis: string = {
      condominio: "condominio",
      torres: "torres",
      apartamentos: "apartamentos",
      pessoas: "pessoas",
      gasometros: "gasometros",
    };

    const newUpdated = updatedData.map((item) => {
      if (typeApis[updatedData[0].typeRender] === "torres") {
        return {
          identificacao: item.identificacao,
          numero: item.numero,
          condominio: Number(item.condominio),
        };
      } else if (typeApis[updatedData[0].typeRender] === "apartamentos") {
        return {
          torre: Number(item.torre),
          numero: item.numero,
        };
      } else if (typeApis[updatedData[0].typeRender] === "pessoas") {
        return {
          nome: item.nome,
          tipo: item.tipo,
          apartamento: item.apartamento,
        };
      } else if (typeApis[updatedData[0].typeRender] === "gasometros") {
        return {
          codigo: item.codigo,
          apartamento: item.apartamento,
        };
      } else return;
    });
    console.log("newUpdated", newUpdated);

    const linkApi = `${typeApis[updatedData[0].typeRender]}/${
      updatedData[0].id
    }`;
    editData(newUpdated[0], linkApi);
  };

  const editData = async (dataApi, link) => {
    const response = await sendAxiosApi("put", dataApi, link);

    const newTable = tableDataArray.map((item) => {
      if (item.id === response.id) {
        return {
          ...item,
          ...response,
        };
      }
      return item;
    });
    setTableDataArray(newTable);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTableDataArray(currentData);
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "DONO":
        return styles.statusDONO;
      case "INQUILINO":
        return styles.statusINQUILINO;
      case "MORADOR":
        return styles.statusMORADOR;
      default:
        return "";
    }
  };

  // const formatCurrency = (value) => {
  //   return new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).format(value);
  // };

  // const formatDate = (dateString) => {
  //   return new Date(dateString).toLocaleDateString("pt-BR");
  // };

  const openConfirmDelete = (e) => {
    const { id } = e.target;

    const getDataOpen = currentData.find((item) => item.id === Number(id));
    setModalData(getDataOpen);
    setModalConfirm(!!getDataOpen);

    console.log(id);
    console.log(getDataOpen);
  };

  const openConfirmEdit = (e) => {
    const { id } = e.target;
    const getDataOpen = currentData.find((item) => item.id === Number(id));

    const dataFieds = modalFields[type].map((item) => {
      console.log(item);
      return {
        ...item,
        ...getDataOpen,
        [item.key]: getDataOpen[item.key],
        id: Number(id),
      };
    });

    setIsModalOpen(true);
    setModalInputs(dataFieds);
    console.log("getDataOpen", getDataOpen);
  };

  const deleteDataTable = async (e) => {
    try {
      const { id } = isModalData;
      const newTable = tableDataArray.filter((item) => {
        return item.id !== id;
      });

      setTableDataArray(newTable);
      await sendAxiosApi("delete", null, `${typeTable[type]}/${id}`);
    } catch (err) {
      console.log("Não foi possivel seguir com essa ação!");
    } finally {
      setModalConfirm(false);
    }
  };

  return (
    <div className={styles.tableContainer} style={style}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>{titleTable}</h3>
        <div className={styles.tableControls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <div className={styles.tableInfo}>
            Itens encontrados: {sortedData.length}
          </div>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmEdit}
        data={editingData}
        fields={modalInputs}
      />

      <ModalConfirm
        isOpen={isModalConfirm}
        onClose={() => setModalConfirm(false)}
        tipo="danger"
        onConfirm={() => deleteDataTable()}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              {dataHead.map((coluna) => (
                <th
                  key={coluna.chave}
                  className={styles.tableHeaderCell}
                  onClick={
                    coluna.sortable ? () => handleSort(coluna.chave) : undefined
                  }
                  style={{
                    width: coluna.width,
                    textAlign: coluna.align || "left",
                  }}
                >
                  <div className={styles.headerCellContent}>
                    {coluna.label}
                    {coluna.sortable && renderSortIcon(coluna.chave)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDataArray && tableDataArray.length > 0 ? (
              tableDataArray.map((item) => (
                <tr key={item.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.id}</td>
                  {type === "gasmetros" && (
                    <>
                      <td className={styles.tableCell}>{item.codigo}</td>
                      <td className={styles.tableCell}>{item.apartamento}</td>
                    </>
                  )}
                  {type === "apartment" && (
                    <td className={styles.tableCell}>{item.numero}</td>
                  )}
                  <td className={styles.tableCell}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {(type === "tower" ||
                          type === "apartment" ||
                          type === "gasmetros") &&
                          item.identificacao
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        {(type === "" || type === "people") &&
                          item.nome
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                      </div>
                      {(type === "tower" ||
                        type === "apartment" ||
                        type === "gasmetros") &&
                        item.identificacao}
                      {(type === "" || type === "people") && item.nome}
                    </div>
                  </td>
                  {type === "gasmetros" && (
                    <td className={styles.tableCell}>{item.condName}</td>
                  )}
                  {type === "apartment" && (
                    <>
                      <td className={styles.tableCell}>{item.numberTower}</td>
                      <td className={styles.tableCell}>{item.condName}</td>
                    </>
                  )}
                  {(type === "" || type === "people") && (
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          item.tipo
                        )}`}
                      >
                        {item.tipo}
                      </span>
                    </td>
                  )}
                  {(type === "tower" || type === "" || type === "people") && (
                    <>
                      {type === "tower" && (
                        <>
                          <td className={styles.tableCell}>{item.numero}</td>
                          <td className={styles.tableCell}>
                            {item.condominioName}
                          </td>
                          <td className={styles.tableCell}>{item.local}</td>
                        </>
                      )}
                      {(type === "" || type === "people") && (
                        <td className={styles.tableCell}>{item.apartamento}</td>
                      )}
                    </>
                  )}
                  {type === "people" && (
                    <>
                      <td className={styles.tableCell}>{item.identificacao}</td>
                      <td className={styles.tableCell}>{item.condName}</td>
                    </>
                  )}

                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button
                        id={item.id}
                        className={styles.actionBtn}
                        title="Editar"
                        onClick={(e) => openConfirmEdit(e)}
                      >
                        ✏️
                      </button>
                      <button
                        id={item.id}
                        className={styles.actionBtn}
                        title="Excluir"
                        onClick={(e) => openConfirmDelete(e)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={dataHead.length}>
                  <EmptySlot
                    icon="👥"
                    title="Nenhum usuário encontrado"
                    msg="Não há usuários cadastrados no sistema."
                    action={() => console.log("Adicionar usuário")}
                    actionText="Cadastrar Usuário"
                    hight="300px"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>

          <div className={styles.paginationPages}>
            {(() => {
              // Lógica para determinar quais páginas mostrar
              let startPage, endPage;

              if (totalPages <= 5) {
                // Menos de 5 páginas: mostra todas
                startPage = 1;
                endPage = totalPages;
              } else {
                // Mais de 5 páginas: lógica de páginação
                if (currentPage <= 3) {
                  startPage = 1;
                  endPage = 5;
                } else if (currentPage >= totalPages - 2) {
                  startPage = totalPages - 4;
                  endPage = totalPages;
                } else {
                  startPage = currentPage - 2;
                  endPage = currentPage + 2;
                }
              }

              // Cria array de páginas
              const pages = [];
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }

              return pages.map((pageNum) => (
                <button
                  key={pageNum}
                  className={`${styles.paginationPage} ${
                    currentPage === pageNum ? styles.active : ""
                  }`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              ));
            })()}
          </div>

          <button
            className={styles.paginationBtn}
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Próxima →
          </button>
        </div>


      )} */}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>

          <div className={styles.paginationPages}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`${styles.paginationPage} ${
                    currentPage === pageNum ? styles.active : ""
                  }`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className={styles.paginationBtn}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
