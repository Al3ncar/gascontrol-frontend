const menuItems = [
  {
    id: "overview",
    label: "Visão Geral",
    icon: "📊",
    path: "/dashboards",
  },
  {
    id: "Cond",
    label: "Condomínio",
    icon: "🏢",
    path: "/condominio",
    subItems: [],
  },
  {
    id: "tower",
    label: "Torres",
    icon: "🏗️",
    path: "/condominio/torres",
  },
  {
    id: "apartment",
    label: "Apartamentos",
    icon: "🏠",
    path: "/condominio/apartamentos",
  },
  {
    id: "people",
    label: "Pessoas",
    icon: "👥",
    path: "/condominio/blocos",
  },
  {
    id: "gasmetros",
    label: "Gasometros",
    icon: "🏘️",
    path: "/condominio/blocos",
  },
  {
    id: "analise ",
    label: "Análise",
    icon: "📈",
    path: "/analise",
  },
];

export default menuItems;
