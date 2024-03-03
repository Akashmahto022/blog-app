import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({email,password})
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }


  async getCurrentUser(){
    try {
       return await this.account.get();
    } catch (error) {
        throw error
    }
  }


  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        throw error
    }
  }
}

const authServices = new AuthServices();

export default authServices;
