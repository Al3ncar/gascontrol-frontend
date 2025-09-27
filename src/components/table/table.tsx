import { useState, useMemo } from "react";
import styles from "../../scss/styles/components/table.module.scss";

const DataTable = ({ data, dataHead, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const defaultData = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao@email.com",
      status: "Ativo",
      valor: 1250.5,
      data: "2024-01-15",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@email.com",
      status: "Inativo",
      valor: 890.0,
      data: "2024-01-14",
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro@email.com",
      status: "Ativo",
      valor: 2100.75,
      data: "2024-01-13",
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      email: "ana@email.com",
      status: "Pendente",
      valor: 450.25,
      data: "2024-01-12",
    },
    {
      id: 5,
      nome: "Carlos Souza",
      email: "carlos@email.com",
      status: "Ativo",
      valor: 1780.3,
      data: "2024-01-11",
    },
    {
      id: 6,
      nome: "Juliana Lima",
      email: "juliana@email.com",
      status: "Ativo",
      valor: 3200.0,
      data: "2024-01-10",
    },
    {
      id: 7,
      nome: "Ricardo Martins",
      email: "ricardo@email.com",
      status: "Inativo",
      valor: 950.6,
      data: "2024-01-09",
    },
    {
      id: 8,
      nome: "Fernanda Rocha",
      email: "fernanda@email.com",
      status: "Ativo",
      valor: 1450.9,
      data: "2024-01-08",
    },
    {
      id: 9,
      nome: "Bruno Alves",
      email: "bruno@email.com",
      status: "Pendente",
      valor: 670.4,
      data: "2024-01-07",
    },
    {
      id: 10,
      nome: "Patrícia Nunes",
      email: "patricia@email.com",
      status: "Ativo",
      valor: 2300.2,
      data: "2024-01-06",
    },
    {
      id: 11,
      nome: "Roberto Ferreira",
      email: "roberto@email.com",
      status: "Inativo",
      valor: 1100.0,
      data: "2024-01-05",
    },
    {
      id: 12,
      nome: "Amanda Dias",
      email: "amanda@email.com",
      status: "Ativo",
      valor: 1890.75,
      data: "2024-01-04",
    },
  ];
  const tableData = data || defaultData;

  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData;

    return tableData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [tableData, searchTerm]);

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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Dados da Tabela</h3>
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

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            {/* <tr>
              <th
                className={styles.tableHeaderCell}
                onClick={() => handleSort("id")}
              >
                <div className={styles.headerCellContent}>
                  ID {renderSortIcon("id")}
                </div>
              </th>
              <th
                className={styles.tableHeaderCell}
                onClick={() => handleSort("nome")}
              >
                <div className={styles.headerCellContent}>
                  Nome {renderSortIcon("nome")}
                </div>
              </th>
              <th
                className={styles.tableHeaderCell}
                onClick={() => handleSort("email")}
              >
                <div className={styles.headerCellContent}>
                  Email {renderSortIcon("email")}
                </div>
              </th>
              <th
                className={styles.tableHeaderCell}
                onClick={() => handleSort("status")}
              >
                <div className={styles.headerCellContent}>
                  Status {renderSortIcon("status")}
                </div>
              </th>
              <th
                className={styles.tableHeaderCell}
                onClick={() => handleSort("valor")}
              >
                <div className={styles.headerCellContent}>
                  Valor {renderSortIcon("valor")}
                </div>
              </th>
              <th
                className={styles.tableHeaderCell}
                onClick={() => handleSort("data")}
              >
                <div className={styles.headerCellContent}>
                  Data {renderSortIcon("data")}
                </div>
              </th>
              <th className={styles.tableHeaderCell}>
                <div className={styles.headerCellContent}>Ações</div>
              </th>
            </tr> */}
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
            {currentData.map((item) => (
              <tr key={item.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{item.id}</td>
                <td className={styles.tableCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {item.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    {item.nome}
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span
                    className={`${styles.statusBadge} ${getStatusClass(
                      item.tipo
                    )}`}
                  >
                    {item.tipo}
                  </span>
                </td>
                <td className={styles.tableCell}>{item.apartamento}</td>
                <td className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionBtn} title="Editar">
                      ✏️
                    </button>
                    <button className={styles.actionBtn} title="Excluir">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
