import Modal from "../Modal/Modal";
import axios from "axios";
import { useState } from "react";
import Toast from "../Toast/Toast";

const DeleteInventoryModal = ({ inventory, onClose, isOpen, onDelete }) => {
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
                        `${API_BASE_URL}/api/inventories/${inventory.id}`
                    );
                    onDelete();
                    setToast({
                        message: "Inventory deleted successfully",
                        status: "success",
                    });
                    setTimeout(() => {
                        onClose();
                    }, 100);
                } catch (error) {
                    console.error(error);
                    setToast({
                        message: "Failed to delete inventory",
                        status: "error",
                    });
                }
            },
        },
    ];
    return (
        <>
            {inventory && (
                <Modal
                    isOpen={isOpen}
                    title={`Delete ${inventory.item_name} inventory item?`}
                    buttons={buttons}
                >
                    <div className="modal__body">
                        Please confirm that you’d like to delete {inventory.item_name} from the inventory list.
                        You won’t be able to undo this action.
                    </div>
                </Modal>
            )}
            {toast && (
                <Toast
                    message={toast.message}
                    status={toast.status}
                    onClose={() => {
                        setToast(null);
                    }}
                />
            )}
        </>
    );
};

export default DeleteInventoryModal;
