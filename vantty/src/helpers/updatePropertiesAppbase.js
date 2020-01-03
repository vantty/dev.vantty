import { server, elastic } from "../utils/axios";
export default async (userId, field, value) => {
  try {
    const elasticConfig = {
      headers: {
        "Content-type": "application/json",
        Authorization: process.env.REACT_APP_ELASTIC_TOKEN
      }
    };
    const resImages = await server.get(`/images/${userId}`);
    const pictures = resImages.data;
    const datum = { doc: { [field]: value } };
    pictures.map(pic => {
      elastic.post(`/${pic.elasticId}/_update`, datum, elasticConfig);
    });
  } catch (error) {
    console.log(error);
  }
};
