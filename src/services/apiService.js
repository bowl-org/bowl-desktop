import axios from 'axios';

const baseUrl = `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_API_TOKEN}`;

export const GET = async (endPoint) => {
  return await axios.get(`${baseUrl}${endPoint}`)
};
export const POST = async (endPoint, bodyData) => {
  console.log(`${baseUrl}${endPoint}`)
  return await axios.post(`${baseUrl}${endPoint}`, bodyData);
};
export const PUT = async (endPoint, bodyData) => {
  return await axios.put(`${baseUrl}${endPoint}`, bodyData);
};
export const DELETE = async (endPoint) => {
  return await axios.delete(`${baseUrl}${endPoint}`);
};


