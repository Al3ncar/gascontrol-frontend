import axios from "axios";

const sendAxiosApi = async (
  type: "post" | "get" | "put",
  data: any,
  link: string
) => {
  const method = axiosMethods[type];
  if (!method) {
    console.error("Método HTTP inválido:", type);
    return;
  }

  try {
    const response = await method(`http://localhost:8000/api/${link}/`, data);
    return response.data;
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

const axiosMethods = {
  post: (link: string, data: any) => axios.post(link, data),
  get: (link: string) => axios.get(link),
  put: (link: string, data: any) => axios.put(link, data),
};

export default sendAxiosApi;
