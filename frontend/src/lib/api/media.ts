import { Axios } from "axios";

export class Media {
  axios: Axios;
  constructor(axios: Axios) {
    this.axios = axios;
  }
  async upload(file: File) {
    const formData = new FormData();
    formData.append("files", file);
    const { data: response } = await this.axios.post("/media/upload", formData);
    return response;
  }
}
