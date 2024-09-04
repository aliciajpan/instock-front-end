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

const warehouseList = [
    {
        id: 1,
        warehouse_name: "Manhattan",
        address: "503 Broadway New York, USA",
        city: "New York",
        country: "USA",
        contact_name: "Parmin Aujla",
        contact_position: "Warehouse Manager",
        contact_phone: "+1 (646) 123-1234",
        contact_email: "paujla@instock.com",
    },
    {
        id: 2,
        warehouse_name: "Washington",
        address: "33 Pearl Street SW, Washington, USA",
        city: "Washington",
        country: "USA",
        contact_name: "Greame Lyon",
        contact_position: "Warehouse Manager",
        contact_phone: "+1 (646) 123-1234",
        contact_email: "glyon@instock.com",
    },
];

const WarehouseList = () => {
    const navigate = useNavigate();
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
                        ? `<p>${warehouse.contact_phone}</p><p>${warehouse.contact_email}</p>`
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
            // const response = await axios.get(`${import.meta.env.VITE_API_URL}/warehouses`);
            // const data = await response.json();
            const data = warehouseList;
            setWarehouses(data);
        };
        fetchWarehouses();
    }, []);
    if (!warehouses) return <div>Loading...</div>;
    return (
        <div className="warehouse-list">
            <h2>Warehouses</h2>
            <FormField icon={searchIcon} placeholder="Search..." />
            <Button onClick={() => navigate("/warehouses/add")}>
                + Add New Warehouse
            </Button>
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
