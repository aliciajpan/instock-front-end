import InventoryList from "../../components/InventoryList/InventoryList";
import { useParams } from "react-router-dom";

function WarehousePage() {
    const { id } = useParams();

    const inventoryListHeaderItems = [
        { key: "item_name", name: "Inventory Item", sortable: true },
        { key: "category", name: "Category", sortable: true },
        { key: "status", name: "Status", sortable: true },
        { key: "quantity", name: "Qty", sortable: true },
        { key: "actions", name: "Actions", sortable: false },
    ];

    return (
        <div className="warehouse-page">
            <InventoryList
                warehouseId={id}
                headerItems={inventoryListHeaderItems}
            />
        </div>
    );
}

export default WarehousePage;
