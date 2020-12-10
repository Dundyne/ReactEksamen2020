import http from './http';

export const sendEmail = async (data) => {
  try {
    return await http.post("/sendMails", data);
  } catch (err) {
    return err.response;
  }
};