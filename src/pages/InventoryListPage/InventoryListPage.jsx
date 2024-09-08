import InventoryList from "../../components/InventoryList/InventoryList";
import { useState } from "react";
import searchIcon from "../../assets/icons/search-24px.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./InventoryListPage.scss";

function InventoryListPage({}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState(null);
    const [urlSearch, setUrlSearch] = useState(null);

    function submitSearch() {
        setUrlSearch(search);
    }

    function handleChange (event) {
        setSearch(event.target.value.toString().trim().toLowerCase());
    }

    const headerItems = [
        { key: "item_name", name: "Inventory Item", sortable: true },
        { key: "category", name: "Category", sortable: true },
        { key: "status", name: "Status", sortable: true },
        { key: "quantity", name: "Qty", sortable: true },
        { key: "warehouse_name", name: "Warehouse", sortable: true },
        { key: "actions", name: "Actions", sortable: false },
    ];

    return (
        <div className="inventory-list-page">
            <div className="inventory-list-page__header">
                <h1 className="inventory-list-page__title">Inventory</h1>
                <div className="inventory-list-page__actions">
                    <Input onChange={handleChange} icon={searchIcon} placeholder="Search..." onIconClick={submitSearch}/>
                    <Button onClick={() => navigate("/inventories/add")}>
                        + Add New Item
                    </Button>
                </div>
            </div>
            <InventoryList
                headerItems={headerItems}
                search={search}
                urlSearch={urlSearch}
            />
        </div>
    );
}

export default InventoryListPage;
