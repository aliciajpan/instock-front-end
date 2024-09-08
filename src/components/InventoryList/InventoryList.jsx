import { useNavigate } from "react-router-dom";
import TableHeaderWithSorting from "../../components/TableHeaderWithSorting/TableHeaderWithSorting";
import ListItem from "../../components/ListItem/ListItem";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import { renderToStaticMarkup } from "react-dom/server";
import Tag from "../../components/Tag/Tag";
import Toast from "../Toast/Toast";
import DeleteInventoryModal from "../../components/DeleteInventoryModal/DeleteInventoryModal";
import { useState, useEffect } from "react";
import axios from "axios";
import "./InventoryList.scss";

const InventoryList = ({headerItems, warehouseId = null, sortKey, sortOrderBy, sortToggle, search = null, urlSearch = null}) => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [inventories, setInventories] = useState(null);
    const [inventoryToBeDeleted, setInventoryToBeDeleted] = useState(null);
    function sortByKey(array, key, orderBy) {
        return array.sort(function(a, b) {
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

    useEffect(() => {
        let url = warehouseId ? `${baseURL}/api/warehouses/${warehouseId}/inventories` : `${baseURL}/api/inventories`;

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
    }, [baseURL, urlSearch]);

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
            })
    );

    const sortedInventories = sortKey ? sortByKey(inventories, sortKey, sortOrderBy): inventories;

    const filteredInventories = search ?
        sortedInventories.filter((inventory) => {
            return (
                inventory.item_name.toLowerCase().includes(search) ||
                inventory.warehouse_name.toLowerCase().includes(search) ||
                inventory.description.toLowerCase().includes(search) ||
                inventory.category.toLowerCase().includes(search)
            )
        })
        : sortedInventories
    
    return (
        <>
            <div className="inventory-list">
                <div className="inventory-list__container">
                    {inventories ? 
                    <>
                        {
                            inventories.length > 0 ? 
                                <TableHeaderWithSorting headerItems={headerItems} sortToggle={sortToggle}/> 
                                : <></>
                        }

                        {
                            filteredInventories.map((inventory) => (
                                <ListItem
                                    key={inventory.id}
                                    properties={getProperties(inventory)}
                                    actions={getActions(inventory)}
                                />
                            ))
                        }
                    </> 
                    : <div>Loading...</div>}
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