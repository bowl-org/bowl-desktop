import axios from 'axios';

const baseUrl = `${process.env.VUE_APP_BASE_URL}${process.env.VUE_APP_API_TOKEN}`;

export const generateAuthHeader = (token) => {
  return {'Authorization': `${token}`}
}
export const GET = async (endPoint, headers) => {
  return await axios.get(`${baseUrl}${endPoint}`, {headers: headers})
};
export const POST = async (endPoint, bodyData, headers) => {
  console.log(`${baseUrl}${endPoint}`)
  return await axios.post(`${baseUrl}${endPoint}`, bodyData, {headers: headers});
};
export const PUT = async (endPoint, bodyData, headers) => {
  return await axios.put(`${baseUrl}${endPoint}`, bodyData, {headers: headers});
};
export const DELETE = async (endPoint, headers) => {
  return await axios.delete(`${baseUrl}${endPoint}`, {headers: headers});
};


