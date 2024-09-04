import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="../../src/assets/logo/instock-logo.svg" alt="Instock logo" />
      </div>
      <nav className="header__nav">
        <a href="#" className="active">
          Warehouses
        </a>
        <a href="#">Inventory</a>
      </nav>
    </header>
  );
}

export default Header;
