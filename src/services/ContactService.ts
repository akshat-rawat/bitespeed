import ContactEntity from "../db/entity/Contact";
import { LinkPrecedenceEnum, returnHelper } from "../utils/helper";
import { FilterOperators } from "typeorm";

export const createContact = async ({
  email,
  phoneNumber,
}: Partial<ContactEntity>): Promise<Object> => {
  if (!email && !phoneNumber)
    throw new Error("Email or Phone number is required");

  const contact = new ContactEntity();
  let primaryContact = contact;

  contact.email = email;
  contact.phoneNumber = phoneNumber;
  contact.linkPrecedence = LinkPrecedenceEnum.PRIMARY;

  const sameEmailContacts = email ? await getContacts({ email }) : [];
  const samePhoneNumContacts = phoneNumber
    ? await getContacts({ phoneNumber })
    : [];

  if (sameEmailContacts.length && samePhoneNumContacts.length) {
    const primaryEmailContact = await getContactById(
      sameEmailContacts[0].linkedId ?? sameEmailContacts[0].id
    );
    const primaryPhoneNumContact = await getContactById(
      samePhoneNumContacts[0].linkedId ?? samePhoneNumContacts[0].id
    );

    primaryContact = primaryEmailContact;
    if (primaryEmailContact.createdAt < primaryPhoneNumContact.createdAt)
      await updateContactsToSecondary(
        primaryEmailContact.id,
        primaryPhoneNumContact
      );
    else if (primaryEmailContact.createdAt > primaryPhoneNumContact.createdAt) {
      await updateContactsToSecondary(
        primaryPhoneNumContact.id,
        primaryEmailContact
      );
      primaryContact = primaryPhoneNumContact;
    }
  } else if (sameEmailContacts.length) {
    primaryContact = await getContactById(
      sameEmailContacts[0].linkedId ?? sameEmailContacts[0].id
    );
    contact.linkedId = primaryContact.id;
    contact.linkPrecedence = LinkPrecedenceEnum.SECONDARY;
    if (phoneNumber) await contact.save();
  } else if (samePhoneNumContacts.length) {
    primaryContact = await getContactById(
      samePhoneNumContacts[0].linkedId ?? samePhoneNumContacts[0].id
    );
    contact.linkedId = primaryContact.id;
    contact.linkPrecedence = LinkPrecedenceEnum.SECONDARY;
    if (email) await contact.save();
  } else await contact.save();

  const secondaryContacts = await getContacts({ linkedId: primaryContact.id });
  return returnHelper(primaryContact, secondaryContacts);
};

const getContactById = async (id: number) => {
  return await ContactEntity.findOne({ where: { id } });
};

export const getContacts = async ({
  email,
  phoneNumber,
  linkedId,
}: Partial<ContactEntity>): Promise<Array<ContactEntity>> => {
  const whereClause: FilterOperators<ContactEntity> = {};
  if (email) whereClause.email = email.toLowerCase();
  if (phoneNumber) whereClause.phoneNumber = phoneNumber;
  if (linkedId) whereClause.linkedId = linkedId;
  return await ContactEntity.find({ where: whereClause });
};

export const updateContactsToSecondary = async (
  primaryContactId: number,
  targetContact: ContactEntity
): Promise<void> => {
  const contactsToUpdate = [
    targetContact,
    ...(await getContacts({ linkedId: targetContact.id })),
  ];
  for (const contact of contactsToUpdate) {
    contact.linkedId = primaryContactId;
    contact.linkPrecedence = LinkPrecedenceEnum.SECONDARY;
    await contact.save();
  }
};
