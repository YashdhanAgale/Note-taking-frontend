import axios from "axios";

const instance =axios.create({
  baseURL: "https://note-taking-backend-j048upkg0-yashodhans-projects-7e631381.vercel.app/api",
  withCredentials: true,
});

export default instance;
