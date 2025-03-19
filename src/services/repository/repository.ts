import { Api } from "../../helpers";


  export default class Repository {
    static async getData(): Promise<[]> {
      try {
        const response = await Api.get<[]>('/get');
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    static async addData(): Promise<[]> {
      try {
        const response = await Api.post<[]>('/posts', {name: 'test123'});
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }