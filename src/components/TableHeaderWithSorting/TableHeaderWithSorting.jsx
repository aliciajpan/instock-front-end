import sortIcon from '../../assets/icons/sort-24px.svg';
import "./TableHeaderWithSorting.scss";

const TableHeaderWithSorting = ({ headerItems, sortByProperty }) => {
    return (
        <div className="header-with-sorting">
                {headerItems.map((item) => (
                     item.sortable 
                     ? <div key={item.key} className="header-with-sorting__sortable-item" 
                     >
                        <span>{item.name}</span>
                        <img src={sortIcon} alt="sort" onClick={() => sortByProperty(item.name)}/>
                    </div>
                    : <div className='header-with-sorting__item' key={item.key}>
                        <div className="header-with-sorting__item-name">{item.name}</div>
                    </div>
            ))}
        </div>
    )
};

export default TableHeaderWithSorting;