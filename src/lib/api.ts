import axios from "axios";
import { Vibrate } from "phosphor-react";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// import.meta.env.VITE_API_URL
// 'http://localhost:4000'