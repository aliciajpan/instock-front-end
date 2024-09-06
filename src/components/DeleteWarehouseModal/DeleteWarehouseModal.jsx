import Modal from "../Modal/Modal";
import "./DeleteWarehouse.scss";
import { useState } from "react";
import axios from "axios";
import Toast from "../Toast/Toast";

const DeleteWarehouse = ({ warehouse, onClose, isOpen, onDelete }) => {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const [toast, setToast] = useState(null);

    const buttons = [
        {
            id: "cancel",
            text: "Cancel",
            status: "secondary",
            onClick: () => {
                onClose();
            },
        },
        {
            id: "delete",
            text: "Delete",
            status: "delete",
            onClick: async () => {
                try {
                    await axios.delete(
                        `${API_BASE_URL}/api/warehouses/${warehouse.id}`
                    );
                    onDelete();
                    setToast({
                        message: "Warehouse deleted successfully",
                        status: "success",
                    });
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                } catch (error) {
                    console.error(error);
                    setToast({
                        message: "Failed to delete warehouse",
                        status: "error",
                    });
                }
            },
        },
    ];
    return (
        <>
            {warehouse && (
                <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}
                title={`Delete ${warehouse.name} Warehouse`}
                buttons={buttons}
            >
                <div>
                    Please confirm that you’d like to delete the{" "}
                    <span>{warehouse.name}</span> from the list of warehouses.
                    You won’t be able to undo this action.
                </div>
            </Modal>
            )}
            <Toast message={toast.message} status={toast.status} />
        </>
    );
};

export default DeleteWarehouse;
