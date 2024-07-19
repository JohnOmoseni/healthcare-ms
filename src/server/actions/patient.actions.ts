"use server";

import { handleApiError, parseStringify } from "@/lib/utils";
import { ID, Query } from "node-appwrite";
import {
  API_KEY,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appWrite.config";
import { CreateUserParams, RegisterUserParams } from "@/types";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

const storageEndpoint = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files`;

export async function createUser(user: CreateUserParams) {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    handleApiError(error, "An error occurred while creating a new user:");
  }
}

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    handleApiError(
      error,
      "An error occurred while retrieving the user details:",
    );
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userid", [userId])],
    );

    if (!patients) throw new Error("Patient not found");
    return parseStringify(patients.documents[0]);
  } catch (error) {
    handleApiError(
      error,
      "An error occurred while retrieving the patient details:",
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Create new patient document
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...patient,
      },
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    handleApiError(error, "An error occurred while creating a new patient");
  }
};
