import axios from "axios";

const HttpClient = axios.create({
  baseURL: `${process.env.HOST || "http://localhost:8080"}/api/v1`,
});

export default HttpClient;
