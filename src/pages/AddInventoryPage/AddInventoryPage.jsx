import "./AddInventoryPage.scss";
import InventoryInput from "../../components/InventoryInput/InventoryInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AddInventoryPage() {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const buttons = [
        {
            label: "Cancel",
            type: "button",
            status: "secondary",
            onClick: () => navigate(-1),
        },
        {
            label: "+ Add Item",
            type: "submit",
            status: "primary",
        },
    ];
    const handleSubmit = async ({ formData, setToast }) => {
        try {
            await axios.post(`${baseURL}/api/inventories`, formData);
            setToast({
                message: "Inventory added successfully",
                status: "success",
            });

            setTimeout(() => {
                navigate("/inventories");
            }, 500);
        } catch (error) {
            console.error(error);
            setToast({
                message: "Failed to add inventory",
                status: "error",
            });
        }
    };
    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const { data: warehousesFromAPI } = await axios.get(
                    `${baseURL}/api/warehouses`
                );
                setWarehouses(warehousesFromAPI);
            } catch (error) {
                console.error(error);
                setToast({
                    message: "Failed to fetch warehouses",
                    status: "error",
                });
            }
        };
        fetchWarehouses();
    }, [baseURL]);
    return (
        <div className="add-inventory-page">
            <InventoryInput
                title="Add New Inventory Item"
                buttons={buttons}
                onSubmit={handleSubmit}
                warehouses={warehouses}
            />
            {toast && <Toast message={toast.message} status={toast.status} />}
        </div>
    );
}

export default AddInventoryPage;
