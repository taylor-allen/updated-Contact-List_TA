import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
  const { store, dispatch } = useGlobalReducer(); // Get store & dispatch from reducer

  const style = { width: "45%" };

  return (
    <div className="card my-3" style={style}>
      <div className="card-body">
        <h5 className="card-title">{contact?.name}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Phone:</strong> {contact?.phone}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {contact?.email}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> {contact?.address}
          </li>
        </ul>
        <div className="icon-group">
          {contact?.id && (
            <Link to={`/edit-contact/${contact.id}`}>
              <button
                className="btn btn-primary mt-2"
                onClick={() => dispatch({ type: "update_contact", contact })}
              >
                <i className="far fa-edit" />
              </button>
            </Link>
          )}
          <button
            className="btn btn-danger icon-button ms-3 mt-2"
            onClick={() => dispatch({ type: "delete_contact", id: contact.id })}
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
};