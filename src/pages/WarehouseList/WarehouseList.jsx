import "./WarehouseList.scss";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import ListItem from "../../components/ListItem/ListItem";
import TableHeaderWithSorting from "../../components/TableHeaderWithSorting/TableHeaderWithSorting";
import searchIcon from "../../assets/icons/search-24px.svg";
import axios from "axios";

const WarehouseList = () => {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [warehouses, setWarehouses] = useState(null);
    const actions = [
        {
            name: "Delete",
            icon: deleteIcon,
            onClick: (warehouseId) => {
                console.log("delete", warehouseId);
                navigate(`/warehouses/delete/${warehouseId}`);
            },
        },
        {
            name: "Edit",
            icon: editIcon,
            onClick: (warehouseId) => {
                console.log("edit", warehouseId);
                navigate(`/warehouses/edit/${warehouseId}`);
            },
        },
    ];

    const getActions = (warehouse) => {
        return actions.map((action) => ({
            icon: action.icon,
            name: action.name,
            onClick: () => action.onClick(warehouse.id),
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

    const sortByProperty = (property) => {
        console.log(property);
    };
    const sortDirection = (direction) => {
        console.log(direction);
    };
    useEffect(() => {
        const fetchWarehouses = async () => {
            if (!baseURL) {
                console.error("VITE_API_URL is not set");
                return;
            }
            const {data} = await axios.get(`${baseURL}/api/warehouses`);
            setWarehouses(data);
        };
        fetchWarehouses();
    }, [baseURL]);
    if (!warehouses) return <div>Loading...</div>;
    return (
        <div className="warehouse-list">
            <div className="warehouse-list__header">
                <h1 className="warehouse-list__title">Warehouses</h1>
                <div className="warehouse-list__actions">
                    <FormField icon={searchIcon} placeholder="Search..." />
                    <Button onClick={() => navigate("/warehouses/add")}>
                        + Add New Warehouse
                    </Button>
                </div>
            </div>
            <div className="warehouse-list__container">
                <TableHeaderWithSorting
                    headerItems={headerItems}
                    sortByProperty={sortByProperty}
                    sortDirection={sortDirection}
                />
                {warehouses.map((warehouse) => (
                    <ListItem
                        key={warehouse.id}
                        properties={getProperties(warehouse)}
                        actions={getActions(warehouse)}
                    />
                ))}
            </div>
        </div>
    );
};

export default WarehouseList;
