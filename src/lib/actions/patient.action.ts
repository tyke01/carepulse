"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import { CreateUserParams, RegisterUserParams } from "@/types";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Starting user creation with data:", user);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log("User created successfully:", newUser);

    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [Query.equal("userId", userId)]);
    return parseStringify(patients.documents[0])
  } catch (error) {
    console.log(error);
  }
};


export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const blob = identificationDocument.get("blobFile") as Blob;
      if (!blob) {
        throw new Error("Invalid identification document");
      }
      
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const fileName = identificationDocument.get("fileName") as string;
      if (!fileName) {
        throw new Error("Missing file name");
      }

      const inputFile = InputFile.fromBuffer(buffer, fileName);
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    console.log({gender: patient.gender});

    if (!DATABASE_ID || !PATIENT_COLLECTION_ID) {
      throw new Error("Missing database configuration");
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file ? 
          `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}` : 
          null,
        ...patient
      }
    );

    if (!newPatient) {
      throw new Error("Failed to create patient record");
    }

    return parseStringify(newPatient);
  } catch (error: any) {
    console.error("Error details:", {
      message: error?.message,
      code: error?.code,
      response: error?.response,
    });
    throw error; // Re-throw the error so it can be caught by the calling function
  }
};
