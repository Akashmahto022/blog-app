import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost({slug}){
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabseID,
            config.appwriteCollectionID,
            slug
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
  }

  async getPost({slug}){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabseID,
            config.appwriteCollectionID,
            slug
        )
    } catch (error) {
        console.log(error)
    }
  }
  
  async getPosts(queries = [Query.equal("status", "active")]){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabseID,
            config.appwriteCollectionID,
            queries
        )
    } catch (error) {
        console.log(error)
    }
  }

  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(error)
        return false
    }
  }

  async deletefile(fileId){
    try {
       await this.bucket.deleteFile(
        config.appwriteBucketID,
        fileId
       )
       return true;
    } catch (error) {
        console.log(error)
        return false
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketID,
        fileId
    )
  }


}

const service = new Services();
export default service;

