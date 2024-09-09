import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo/instock-logo.svg';
import './Header.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__banner">
                <div className="header__logo">
                    <NavLink to='/'>
                        <img src={logo} alt="Instock logo" />
                    </NavLink>
                </div>
                <nav className="header__nav">
                <li>
                    <NavLink to='/warehouses' href="#">
                        Warehouses
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/inventories' href="#">
                        Inventory
                    </NavLink>
                </li>
                </nav>
            </div>
        </header>
    );
}

export default Header;
