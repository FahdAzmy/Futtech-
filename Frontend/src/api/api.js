import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;
// Get Insuruments
export const GetInstruments = async () => {
  try {
    const response = await axios.get(`${API_URL}/instruments`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Error Get Insuruments",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const GetInstrument = async (symbol) => {
  try {
    const response = await axios.get(`${API_URL}/instrument/${symbol}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "Error Get Insuruments",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
