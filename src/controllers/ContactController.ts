import { Request, Response } from "express";
import { createContact, getContacts } from "../services/ContactService";

export const createContactController = async (req: Request, res: Response) => {
  try {
    const contact = await createContact(req.body ?? {});
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).send("Internal Server Error");
  }
};
