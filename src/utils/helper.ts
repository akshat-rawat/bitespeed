import ContactEntity from "../db/entity/Contact";

export enum LinkPrecedenceEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export const returnHelper = (
  primaryContact: ContactEntity,
  secondaryContacts: ContactEntity[]
): Object => {
  const primaryContatctId = primaryContact.id;
  const emails = [
    ...new Set(
      [primaryContact.email].concat(
        secondaryContacts.map((contact) => contact.email)
      )
    ),
  ];
  const phoneNumbers = [
    ...new Set(
      [primaryContact.phoneNumber].concat(
        secondaryContacts.map((contact) => contact.phoneNumber)
      )
    ),
  ];
  const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

  return {
    contact: { primaryContatctId, emails, phoneNumbers, secondaryContactIds },
  };
};
