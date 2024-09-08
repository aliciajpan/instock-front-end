import "./InventoryList.scss";
import { useNavigate } from "react-router-dom";
import TableHeaderWithSorting from "../../components/TableHeaderWithSorting/TableHeaderWithSorting";
import ListItem from "../../components/ListItem/ListItem";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import { renderToStaticMarkup } from "react-dom/server";
import Tag from "../../components/Tag/Tag";
import DeleteInventoryModal from "../../components/DeleteInventoryModal/DeleteInventoryModal";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../Toast/Toast";

const InventoryList = ({headerItems, warehouseId = null}) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [inventories, setInventories] = useState(null);
    const [inventoryToBeDeleted, setInventoryToBeDeleted] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const url = warehouseId ? `${baseURL}/api/warehouses/${warehouseId}/inventories` : `${baseURL}/api/inventories`;
        const fetchInventories = async () => {
            try {
                const { data } = await axios.get(url);
                setInventories(data);
            }

            catch (error) {
                console.error(error);
                setToast({
                    message: "Failed to fetch inventories",
                    status: "error",
                });
                setInventories([]);
            }
        };
        fetchInventories();
    }, [baseURL]);

    const actions = [
        {
            name: "Delete",
            icon: deleteIcon,
            onClick: (inventory) => {
                setInventoryToBeDeleted(inventory);
            },
        },
        {
            name: "Edit",
            icon: editIcon,
            onClick: (inventory) => {
                navigate(`/inventories/${inventory.id}/edit`);
            },
        },
    ];

    const getActions = (inventory) => {
        return actions.map((action) => ({
            icon: action.icon,
            name: action.name,
            onClick: () => action.onClick(inventory),
        }));
    };

    const getProperties = (inventory) =>
        headerItems
            .filter(({ sortable }) => sortable)
            .map(({ key, name }) => ({
                key,
                value: key !== "status" ? inventory[key] : null,
                valueHtml:
                    key === "status"
                    ? renderToStaticMarkup(<Tag tag={inventory.status} status={inventory.status === "In Stock" ? "default" : "warning"} />)
                    : null,
                name,
                link:
                    key === "item_name" ? `/inventories/${inventory.id}` : null,
            }));
    
    return (
        <>
            <div className="inventory-list">
                <div className="inventory-list__container">
                    <TableHeaderWithSorting
                        headerItems={headerItems}
                    />
                    {inventories ? inventories.map((inventory) => (
                        <ListItem
                            key={inventory.id}
                            properties={getProperties(inventory)}
                            actions={getActions(inventory)}
                        />
                    )) : <div>Loading...</div>}
                </div>
                <DeleteInventoryModal 
                    inventory={inventoryToBeDeleted} 
                    onClose={() => setInventoryToBeDeleted(null)} 
                    isOpen={!!inventoryToBeDeleted}
                    onDelete={() => {setInventories(inventories.filter(inventory => inventory.id !== inventoryToBeDeleted.id))}}
                />
            </div>
            {toast && <Toast message={toast.message} status={toast.status} onClose={()=>{setToast(null)}}/>}
        </>
    );
};


export default InventoryList;