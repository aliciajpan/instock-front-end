import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InventoryInput from "../../components/InventoryInput/InventoryInput";
import { useNavigate } from "react-router-dom";
import Toast from '../../components/Toast/Toast';

function EditInventoryPage() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState(null);
    const { id } = useParams();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [warehouses, setWarehouses] = useState([]);

    const buttons = [
        {
            label: "Cancel",
            type: "button",
            status: "secondary",
            onClick: () => navigate(-1),
        },
        {
            label: "Save",
            type: "submit",
            status: "primary",
        },
    ];
    const [toast, setToast] = useState(null);
    const handleSubmit = async ({ formData, setToast }) => {
        try {
            const { warehouse_name: _, ...formDataToBeUpdated } = formData;
            await axios.put(
                `${baseURL}/api/inventories/${id}`,
                formDataToBeUpdated
            );
            setToast({
                message: "Inventory updated successfully",
                status: "success",
            });
            setTimeout(() => {
                navigate("/inventories");
            }, 500);
        } catch (error) {
            console.error(error);
            setToast({
                message: "Failed to update inventory",
                status: "error",
            });
        }
    };

    useEffect(() => {
        const fetchWarehousesAndInventory = async () => {
            try {
                const { data: warehousesFromAPI } = await axios.get(
                    `${baseURL}/api/warehouses`
                );
                setWarehouses(warehousesFromAPI);
                const { data: inventoryFromAPI } = await axios.get(
                    `${baseURL}/api/inventories/${id}`
                );
                inventoryFromAPI.warehouse_id = warehousesFromAPI.find(
                    (warehouse) =>
                        warehouse.warehouse_name ===
                        inventoryFromAPI.warehouse_name
                ).id;
                setInventory(inventoryFromAPI);
            } catch (error) {
                console.error(error);
                setToast({
                    message: "Failed to fetch warehouses/inventory",
                    status: "error",
                });
                setInventory({});
            }
        };
        fetchWarehousesAndInventory();
    }, [id, baseURL]);

    if (!inventory) return <div>Loading...</div>;

    return (
        <div className="edit-inventory-page">
            <InventoryInput
                title="Edit Inventory Item"
                defaultValues={inventory}
                buttons={buttons}
                onSubmit={handleSubmit}
                warehouses={warehouses}
            />
            {toast && <Toast message={toast.message} status={toast.status} onClose={()=>{setToast(null)}}/>}
        </div>
    );
}

export default EditInventoryPage;
