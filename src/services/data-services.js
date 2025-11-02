import { Axios } from "../api/axiosInstance";

export const getData = async () => {
  try {
    const response = await Axios.get('/data_get');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

