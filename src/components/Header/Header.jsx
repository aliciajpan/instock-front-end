import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__banner">
        <div className="header__logo">
          <img src="../../src/assets/logo/instock-logo.svg" alt="Instock logo" />
        </div>
        <nav className="header__nav">
          <li>
            <a href="#" className="active">
            Warehouses
          </a>
            </li>
            <li>

          <a href="#">Inventory</a>
            </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
