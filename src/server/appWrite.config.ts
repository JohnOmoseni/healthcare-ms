export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_STORAGE_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// app-write's node client library
import * as sdk from "node-appwrite";

// setup appwrite node client
const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

// export the functionaliites you need from appwrite client - these exposes appwrite's sdks
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
