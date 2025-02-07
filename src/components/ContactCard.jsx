import { Link, useNavigate } from "react-router-dom";
export const ContactCard = ({ contact }) => {
  const style = { width: "45%" };
  const nav = useNavigate();

  return (
    <div className="card my-3" style={style}>
      {/* Self-closing tags MUST have the trailing forward slash. */}
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
        <Link to="/edit-contact">
          <button>View Contact Card</button>
        </Link>
      </div>
    </div>
  );
};
