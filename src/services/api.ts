import axios from "axios";
import { useApiStore } from "@/stores/api";

export function createApi() {
  const { apiUrl } = useApiStore()
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
