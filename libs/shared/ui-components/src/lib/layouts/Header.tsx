const Header = () => {
  return (
    <header className="header">
    <div className="top-bar d-flex align-items-center px-3 py-2 position-relative">
        <div className="logo me-3"></div>
        <h1 className="title position-absolute start-50 translate-middle-x mb-0 fs-4 text-white">
        Finance Interface
        </h1>
    </div>
    <div className="bottom-bar d-flex justify-content-between align-items-center px-3 py-1">
      <div className="left text-white fst-italic">* SAP Portal</div>
      <div className="right d-flex align-items-center text-white">
        <span>Hello&nbsp;</span>
        <strong>dh_ldap</strong>
        <span className="mx-2">|</span>
        <a href="#" className="logout text-white fw-bold text-decoration-none">Logout</a>
      </div>
    </div>
  </header>
  );
};

export default Header;
