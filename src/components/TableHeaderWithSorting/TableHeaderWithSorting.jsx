import sortIcon from '../../assets/icons/sort-24px.svg';
import "./TableHeaderWithSorting.scss";

const TableHeaderWithSorting = ({ headerItems }) => {
    return (
        <div className="header-with-sorting">
                {headerItems.map((item) => (
                     item.sortable 
                     ? <div key={item.key} className="header-with-sorting__sortable-item" 
                     >
                        <span>{item.name}</span>
                        <img className="header-with-sorting__sort-icon"  src={sortIcon} alt="sort"/>
                    </div>
                    : <div className='header-with-sorting__item' key={item.key}>
                        <div className="header-with-sorting__item-name">{item.name}</div>
                    </div>
            ))}
        </div>
    )
};

export default TableHeaderWithSorting;