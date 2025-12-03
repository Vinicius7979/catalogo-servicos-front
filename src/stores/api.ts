import { defineStore } from "pinia";
import _ from 'lodash'

export const useApiStore = defineStore("api", () => {
  const apiDomain: string = import.meta.env.VITE_API_DOMAIN;
  const apiPrefix: string = import.meta.env.VITE_API_PREFIX || "";

  const apiUrl = apiDomain + apiPrefix;

  function getUrl(path: string): string {
    if (_.isEmpty(apiDomain)) {
      throw new TypeError(
        "VITE_API_DOMAIN está vazia. Configure a URL da API no arquivo .env."
      );
    }
    return new URL(apiPrefix + path, apiDomain).href;
  }

  return { apiUrl, getUrl };
});
