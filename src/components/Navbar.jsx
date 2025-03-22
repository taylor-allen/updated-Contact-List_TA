import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation(); // Get current route path

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo & Brand */}
        <a className="navbar-brand me-auto" href="/">
          <img
            src="https://banner2.cleanpng.com/20180623/rvz/kisspng-computer-icons-telephone-call-email-life-sciences-5b2e86c966af22.8580213515297758174206.jpg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-3"
          />
          Contact Pro
        </a>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active-page" : ""}`}
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/add-contact"
                className={`nav-link ${location.pathname === "/add-contact" ? "active-page" : ""}`}
                aria-current={location.pathname === "/add-contact" ? "page" : undefined}
              >
                Add a New Contact
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="https://playground.4geeks.com/contact/docs#/"
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                4Geeks Playground API Docs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
