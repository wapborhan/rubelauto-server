const Header = ({ isActive, handleToggle }) => {
  return (
    <nav
      id="topbar"
      className="topbar navbar navbar-expand navbar-light bg-white  mb-4 static-top shadow flex justify-between px-4 items-center"
    >
      <div className="sidebars-button text-dark " onClick={handleToggle}>
        {isActive ? (
          <i className="pi pi-bars"></i>
        ) : (
          <i className="pi pi-align-left"></i>
        )}
        {/* <FaBars /> */}
        <div className={isActive ? "dashboard" : "dashboard-show"}>
          Rubel Auto
        </div>
      </div>

      <h2 id="nameTitle" className="text-center text-dark">
        Rubel Auto
      </h2>
      <div className="account ">
        <a href="#">
          <i className="pi pi-user"></i>
        </a>
      </div>
    </nav>
  );
};

export default Header;
