

export const handleDeleteContact = async (contactID, store, dispatch) => {
    const contactUrl = "https://playground.4geeks.com/contact/";
    console.log(contactID, typeof contactID, "id!!!!!")
  
      await fetch(
        contactUrl + "agendas/taylor/contacts/" + contactID,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    const newContactList= store.contacts.filter((contact)=> contact.id != contactID)
      console.log(newContactList)
        dispatch({
          type: "set_contacts",
          payload: newContactList,
        });

        return newContactList;
   
  };