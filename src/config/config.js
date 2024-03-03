const config = {
    appwriteURL: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectID: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabseID: String(process.env.REACT_APP_APPWRITE_DATABSE_ID),
    appwriteCollectionID: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketID: String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
}

export default config;