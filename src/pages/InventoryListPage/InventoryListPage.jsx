import InventoryList from "../../components/InventoryList/InventoryList";
import { useState, useEffect } from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./InventoryListPage.scss";
import axios from "axios";
import Toast from "../../components/Toast/Toast";

function InventoryListPage({}) {
    const navigate = useNavigate();
    const [inventories, setInventories] = useState(null);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const {data} = await axios.get(`${baseURL}/api/inventories`)
                setInventories(data);                
            } catch (error) {
                console.error(error);
                setToast({
                    message: "Failed to fetch inventories",
                    status: "error",
                });
            }
        }
        fetchInventories();
    }, [baseURL]);
    
    const headerItems = [
        { key: "item_name", name: "Inventory Item", sortable: true },
        { key: "category", name: "Category", sortable: true },
        { key: "status", name: "Status", sortable: true },
        { key: "quantity", name: "Qty", sortable: true },
        { key: "warehouse_name", name: "Warehouse", sortable: true },
        { key: "actions", name: "Actions", sortable: false },
    ];

    if (!inventories) return <div>Loading...</div>;
    return (
        <div className="inventory-list-page">
            <div className="inventory-list-page__header">
                <h1 className="inventory-list-page__title">Inventory</h1>
                <div className="inventory-list-page__actions">
                    <Input icon={searchIcon} placeholder="Search..." />
                    <Button onClick={() => navigate("/inventories/add")}>
                        + Add New Item
                    </Button>
                </div>
            </div>
            <InventoryList
                inventories={inventories}
                headerItems={headerItems}
            />
            {toast && <Toast message={toast.message} status={toast.status} />}
        </div>
    );
}

export default InventoryListPage;
