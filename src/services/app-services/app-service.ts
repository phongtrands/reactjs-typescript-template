import Repository from "../repository/repository";

  export default class AppService {
    static async getData(): Promise<[]> {
      try {
        return await Repository.getData();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    static async createData(): Promise<[]> {
      try {
        return await Repository.addData();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }