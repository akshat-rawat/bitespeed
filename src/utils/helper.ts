import ContactEntity from "../db/entity/Contact";

export enum LinkPrecedenceEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export const getPrimaryContact = (
  contactList: ContactEntity[]
): ContactEntity => {
  for (let index = 0; index < contactList.length; index++) {
    const contact = contactList[index];
    if (contact.linkPrecedence === LinkPrecedenceEnum.PRIMARY) return contact;
  }
};
