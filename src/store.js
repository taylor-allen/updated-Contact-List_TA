export const initialStore=()=>{
  return{
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  if(action.type === "load_contacts"){
    const {contacts} = action;

    return {
      ...store,
      contacts: contacts
    }
  }    
}
