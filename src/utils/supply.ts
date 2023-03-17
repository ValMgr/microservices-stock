import axios from 'axios';

export const supplyNeeded = async (productId: string) => {
  axios.post('https://microservices-2.vercel.app/api/supply-needed', { productId });
};
