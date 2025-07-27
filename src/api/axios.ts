import axios from "axios";

const instance =axios.create({
  baseURL: "https://note-taking-backend-wmdl.vercel.app/api",
  withCredentials: true,
});

export default instance;
