import "./WarehouseListPage.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import ListItem from "../../components/ListItem/ListItem";
import TableHeaderWithSorting from "../../components/TableHeaderWithSorting/TableHeaderWithSorting";
import searchIcon from "../../assets/icons/search-24px.svg";
import axios from "axios";
import DeleteWarehouseModal from "../../components/DeleteWarehouseModal/DeleteWarehouseModal";
import Toast from '../../components/Toast/Toast';

const WarehouseListPage = () => {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [warehouses, setWarehouses] = useState(null);
    const [warehouseToBeDeleted, setWarehouseToBeDeleted] = useState(null);
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState(null);
    const [urlSearch, setUrlSearch] = useState(null);

    function submitSearch() {
        setUrlSearch(search);
    }

    function handleChange (event) {
        setSearch(event.target.value.toString().trim().toLowerCase());
    }

    const [sortKey, setSortKey] = useState(null);
    const [sortOrderBy, setSortOrderBy] = useState(null);

    function sortToggle(headerItemKey) {
        if (headerItemKey === "contact_information") {
            headerItemKey = "contact_email";
        }

        if (headerItemKey === sortKey) {
            if (sortOrderBy === null) {
                setSortOrderBy("asc");
            }

            else if (sortOrderBy === "asc") {
                setSortOrderBy("desc");
            }

            else if (sortOrderBy === "desc") {
                setSortOrderBy(null);
                setSortKey(null);
            }

            else {
                console.error("Not a valid sorting order_by");
                setSortOrderBy(null);
            }
        }

        else {
            setSortKey(headerItemKey);
            setSortOrderBy("asc");
        }
    }

    function sortByKey(array, key, orderBy) {
        const arrayCopy = [...array];
        return arrayCopy.sort(function(a, b) {
            const x = a[key]; 
            const y = b[key];

            if (x < y) {
                if (orderBy === "desc") {
                    return 1;
                }
                return -1;
            }

            else if (x > y) {
                if (orderBy === "desc") {
                    return -1;
                }
                return 1;
            }

            else {
                return 0;
            }
        });
    }

    const actions = [
        {
            name: "Delete",
            icon: deleteIcon,
            onClick: (warehouse) => {
                setWarehouseToBeDeleted(warehouse);
            },
        },
        {
            name: "Edit",
            icon: editIcon,
            onClick: (warehouse) => {
                navigate(`/warehouses/${warehouse.id}/edit`);
            },
        },
    ];

    const getActions = (warehouse) => {
        return actions.map((action) => ({
            icon: action.icon,
            name: action.name,
            onClick: () => action.onClick(warehouse),
        }));
    };

    const headerItems = [
        { key: "warehouse_name", name: "Warehouse", sortable: true },
        { key: "address", name: "Address", sortable: true },
        { key: "contact_name", name: "Contact Name", sortable: true },
        {
            key: "contact_information",
            name: "Contact Information",
            sortable: true,
        },
        { key: "actions", name: "Actions", sortable: false },
    ];

    const getProperties = (warehouse) =>
        headerItems
            .filter(({ sortable }) => sortable)
            .map(({ key, name }) => ({
                key,
                value: key !== "contact_information" ? warehouse[key] : null,
                valueHtml:
                    key === "contact_information"
                        ? `<div>${warehouse.contact_phone}</div><div>${warehouse.contact_email}</div>`
                        : null,
                name,
                link:
                    key === "warehouse_name"
                        ? `/warehouses/${warehouse.id}`
                        : null,
            }));

    useEffect(() => {
        const fetchWarehouses = async () => {
            if (baseURL) {
                let url = `${baseURL}/api/warehouses`;
                if (sortKey) {
                    url += `?sort_by=${sortKey}`;
        
                    if (sortOrderBy) {
                        url += `&order_by=${sortOrderBy}`;
                    }
        
                    if (urlSearch) {
                        url += `&s=${urlSearch}`;
                    }
                }
        
                else {
                    if (urlSearch) {
                        url += `?s=${urlSearch}`;
                    }
                }

                try {
                    const { data } = await axios.get(url);
                    setWarehouses(data);
                }

                catch (error) {
                    console.error(error);
                    setToast({
                        message: 'Failed to fetch warehouses',
                        status: 'error',
                    });
                    setWarehouses([]);
                }
            }   
        };
        fetchWarehouses();
    }, [baseURL, urlSearch, sortKey, sortOrderBy]);

    const sortedWarehouses = sortKey ? sortByKey(warehouses, sortKey, sortOrderBy): warehouses;

    const filteredWarehouses = search ? 
        sortedWarehouses.filter((inventory) => {
            return (
                inventory.warehouse_name.toLowerCase().includes(search) ||
                inventory.address.toLowerCase().includes(search) ||
                inventory.city.toLowerCase().includes(search) ||
                inventory.country.toLowerCase().includes(search) ||
                inventory.contact_name.toLowerCase().includes(search) ||
                inventory.contact_position.toLowerCase().includes(search) ||
                inventory.contact_phone.toLowerCase().includes(search) ||
                inventory.contact_email.toLowerCase().includes(search)
            )
        })
        : sortedWarehouses;

    return (
        <>
            <div className="warehouse-list">
                <div className="warehouse-list__header">
                    <h1 className="warehouse-list__title">Warehouses</h1>
                    <div className="warehouse-list__actions">
                        <Input onChange={handleChange} icon={searchIcon} placeholder="Search..." onIconClick={submitSearch}/>
                        <Button onClick={() => navigate("/warehouses/add")}>
                            + Add New Warehouse
                        </Button>
                    </div>
                </div>
                <div className="warehouse-list__container">
                    {warehouses ? 
                    <>
                        {
                            warehouses.length > 0 ?
                            <TableHeaderWithSorting headerItems={headerItems} sortToggle={sortToggle}/>
                            : <></>
                        }
                    
                        {
                            filteredWarehouses.map((warehouse) => (
                                <ListItem
                                    key={warehouse.id}
                                    properties={getProperties(warehouse)}
                                    actions={getActions(warehouse)}
                                />
                            ))
                        }
                    </> 
                    : <div>Loading...</div>}                 
                </div>
            </div>
            <DeleteWarehouseModal
                warehouse={warehouseToBeDeleted}
                onClose={() => setWarehouseToBeDeleted(null)}
                isOpen={!!warehouseToBeDeleted}
                onDelete={() => {
                    setWarehouses(
                        warehouses.filter(
                            (warehouse) =>
                                warehouse.id !== warehouseToBeDeleted.id
                        )
                    );
                }}
            />
            {toast && <Toast message={toast.message} status={toast.status} onClose={()=>{setToast(null)}}/>}
        </>
    );
};

export default WarehouseListPage;
