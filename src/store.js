export const initialStore = () => {
  return {
    contacts: [], // Always ensure it's an array
  };
};

export default function storeReducer(store = initialStore(), action = {}) {
  if (action.type === "load_contacts") {
    return {
      ...store,
      contacts: action.contacts || [], // Ensure contacts is always an array
    };
  }

  if (action.type === "add_contact") {
    return {
      ...store,
      contacts: [...store.contacts, action.contact],
    };
  }

  if (action.type === "update_contact") {
    return {
      ...store,
      contacts: store.contacts.map((contact) =>
        contact.id === action.contact.id ? action.contact : contact
      ),
    };
  }

  if (action.type === "delete_contact") {
    return {
      ...store,
      contacts: store.contacts.filter((contact) => contact.id !== action.id),
    };
  }

  return store; // Default return
}
