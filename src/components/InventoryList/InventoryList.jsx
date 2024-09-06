import "./InventoryList.scss";
import { useNavigate } from "react-router-dom";
import TableHeaderWithSorting from "../../components/TableHeaderWithSorting/TableHeaderWithSorting";
import ListItem from "../../components/ListItem/ListItem";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import { renderToStaticMarkup } from "react-dom/server";
import Tag from "../../components/Tag/Tag";
import DeleteInventoryModal from "../../components/DeleteInventoryModal/DeleteInventoryModal";
import { useState } from "react";

const InventoryList = ({headerItems, inventories: initialInventories}) => {
    const navigate = useNavigate();
    const [inventories, setInventories] = useState(initialInventories);
    const [inventoryToBeDeleted, setInventoryToBeDeleted] = useState(null);
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
                navigate(`/inventories/edit/${inventory.id}`);
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

    if (!inventories) return <div>Loading...</div>;
    return (
        <div className="inventory-list">
            <div className="inventory-list__container">
                <TableHeaderWithSorting
                    headerItems={headerItems}
                />
                {inventories.map((inventory) => (
                    <ListItem
                        key={inventory.id}
                        properties={getProperties(inventory)}
                        actions={getActions(inventory)}
                    />
                ))}
            </div>
            <DeleteInventoryModal 
                inventory={inventoryToBeDeleted} 
                onClose={() => setInventoryToBeDeleted(null)} 
                isOpen={!!inventoryToBeDeleted}
                onDelete={() => {setInventories(inventories.filter(inventory => inventory.id !== inventoryToBeDeleted.id))}}
            />
        </div>
    );
};


export default InventoryList;