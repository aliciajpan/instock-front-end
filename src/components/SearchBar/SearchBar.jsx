import "./SearchBar.scss";
import searchIcon from "../../assets/icons/search-24px.svg";

const SearchBar = () => {
    return (
    <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>
            <img className="search-bar__icon" src={searchIcon} alt="search icon"/>
        </button>
    </div>);
}

export default SearchBar;
