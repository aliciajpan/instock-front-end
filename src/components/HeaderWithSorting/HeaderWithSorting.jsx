import sortIcon from '../../assets/icons/sort-24px.svg';
import "./HeaderWithSorting.scss";

const HeaderWithSorting = ({ headerItems, sortByProperty, sortDirection }) => {
    return (
        <div className="header-with-sorting">
                {headerItems.map((item) => (
                     item.sortable 
                     ? <div key={item.key} className="header-with-sorting__sortable-item" 
                     >
                        <span>{item.name}</span>
                        <img src={sortIcon} alt="sort" onClick={() => sortByProperty(item.name)}/>
                    </div>
                    : <div><div key={item} className="header-with-sorting__item"
                     >{item.name}</div></div>
            ))}
        </div>
    )
};

export default HeaderWithSorting;