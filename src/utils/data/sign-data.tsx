const inputFormData = (inputsValue: any, handleInputChange: any) => [
  {
    title: "Informações Pessoais",
    className: "info",
    children: [
      {
        staps: 3,

        label: "Nome Completo: ",
        type: "text",
        name: "name",
        placeholder: "Nome...",
        id: "fullName",
        value: inputsValue.fullName,
        onChange: (e: any) => handleInputChange(e),
      },
      {
        staps: 3,

        label: "Relação com Imovél: ",
        type: "text",
        name: "email",
        placeholder: "exemplo@gmail.com",
        id: "relation",
        value: inputsValue.relation,
        onChange: (e: any) => handleInputChange(e),
        children: [
          { id: 0, value: "", label: "Selecione" },
          { id: 1, value: "DONO", label: " Dona/Dono" },
          { id: 2, value: "MORADOR", label: " Moradora/Morador" },
          { id: 3, value: "INQUILINO", label: " Inquilina/Inquilino" },
        ],
      },
    ],
  },
  {
    title: "Informações do Imovél",
    className: "info",
    children: [
      {
        staps: 1,
        label: "Identificação da Torre: ",
        type: "text",
        name: "name",
        placeholder: "Nome da torre...",
        id: "tower",
        maxLength: 10,
        value: inputsValue.tower,
        onChange: (e: any) => handleInputChange(e),
      },
      {
        staps: 1,
        label: "Numero da Torre: ",
        type: "text",
        name: "name",
        placeholder: "Numero Torre...",
        id: "numberTower",
        value: inputsValue.numberTower,
        onChange: (e: any) => handleInputChange(e),
      },
      {
        staps: 2,
        label: "Identificação do Apartamento: ",
        type: "text",
        name: "name",
        placeholder: "Identificação...",
        id: "apartmentId",
        value: inputsValue.apartmentId,
        onChange: (e: any) => handleInputChange(e),
      },
      {
        staps: 4,
        label: "Codigo do Gasometro: ",
        type: "text",
        name: "name",
        placeholder: "Codigo...",
        id: "gasometerCode",
        value: inputsValue.gasometerCode,
        onChange: (e: any) => handleInputChange(e),
      },
    ],
  },
];

export default inputFormData;
