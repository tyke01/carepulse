"use server"

import { CreateUserParams } from "@/types";
import { users } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";


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

    return parseStringify(newUser)

  } catch (error: any) {
    console.error("Error creating user:", error)
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);

      return documents?.users[0];
    }
  }
};
