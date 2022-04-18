import react from "react";

function Navbar({ currentPage, handlePageChange }) {
  return (
    <div classname="navBarContainer">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="#home"
            onClick={() => handlePageChange("Home")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#schools"
            onClick={() => handlePageChange("Schools")}
            className={
              currentPage === "Schools" ? "nav-link active" : "nav-link"
            }
          >
            Schools
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#departments"
            onClick={() => handlePageChange("Departments")}
            className={
              currentPage === "Departments" ? "nav-link active" : "nav-link"
            }
          >
            Departments
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#students"
            onClick={() => handlePageChange("Students")}
            className={
              currentPage === "Students" ? "nav-link active" : "nav-link"
            }
          >
            Students
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#logout"
            onClick={() => handlePageChange("Logout")}
            className={
              currentPage === "Logout" ? "nav-link active" : "nav-link"
            }
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Navbar