import React from "react";
import { Link } from "react-router-dom";

export default function EditContact() {
  return (
    <div className=" container w-50 my-5 p-4 rounded border bg-success-subtle text-success-emphasis">
      <form className="row g-3 ">
        <div className="col">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="inputName" placeholder="e.g., John Doe"/>
        </div>
        <div >
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="inputEmail4" placeholder="johndoe@email.com"/>
        </div>
        <div>
          <label htmlFor="inputPhone" className="form-label">
            Phone
          </label>
          <input type="tel" className="form-control" id="inputPhone" placeholder="###-###-####"/>
        </div>
        <div>
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="d-flex justify-content-between">
            <Link to={"/"}>
          <button type="submit" className="btn btn-outline-secondary">
            Go Back
          </button>
          </Link>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
