import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import RadioText from "../../components/RadioText/RadioText";
import "./AddInventoryPage.scss";
import arrowDownIcon from "../../assets/icons/arrow_drop_down-24px.svg";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AddInventoryPage() {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const baseURL = import.meta.env.VITE_BASE_URL;

    const [formData, setFormData] = useState({
        item_name: "",
        description: "",
        category: "",
        status: "",
        quantity: 0,
        warehouse: "",
    });

    const handleChange = (value, propertyName) => {
        setFormData({ ...formData, [propertyName]: value });
        if (propertyName === "status" && value === "out-of-stock") {
            setFormData({ ...formData, quantity: 0 });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();     
        const { item_name, description, category, status, quantity, warehouse } = formData;
        if (item_name === "" || description === "" || category === "" || status === "" || quantity === 0 || warehouse === "") {
            console.log("Please fill in all fields");
        } else {
            console.log(item_name, description, category, status, quantity, warehouse);
        }
    };

    useEffect(() => {
        const fetchWarehouses = async () => {
            const {data} = await axios.get(`${baseURL}/api/warehouses`)
            setWarehouses(data);
        }
        fetchWarehouses();
    }, [baseURL]);

    return (
        <div className="add-inventory-page">
            <h1 className="add-inventory-page__title">
              <img className="add-inventory-page__title-back" src={arrowBackIcon} alt="back" onClick={() => navigate(-1)}/>
              Add New Inventory Item
            </h1>
            <div className="add-inventory-page__form">
                <form onSubmit={handleSubmit}>
                    <div className="add-inventory-page__form-group">
                        <h2 className="add-inventory-page__form-group-title">Item Details</h2>
                        <Input
                            name="item_name"
                            type="text"
                            label="Item Name"
                            placeholder="Item Name"
                            onChange={(e) => handleChange(e.target.value, "item_name")}
                        />
                        <Input
                            name="description"
                            type="text"
                            label="Description"
                            placeholder="Please enter a brief item description..."
                            box="textarea"
                            onChange={(e) => handleChange(e.target.value, "description")}
                        />
                        <Dropdown 
                            name="category"
                            label="Category"
                            placeholder="Please select"
                            onChange={(option) => handleChange(option.value, "category")}
                            options={[
                              { value: 'accessories', label: 'Accessories' },
                              { value: 'apparel', label: 'Apparel' }, 
                              { value: 'electronics', label: 'Electronics' },
                              { value: 'gear', label: 'Gear' },
                              { value: 'health', label: 'Health' },
                            ]}
                            icon={arrowDownIcon}
                        />
                    </div>
                    <div className="add-inventory-page__form-group">
                        <h2 className="add-inventory-page__form-group-title">Item Availability</h2>                            
                        <RadioText
                            name="status"
                            label="Status"
                            options={[
                                { value: 'in-stock', label: 'In Stock' },
                                { value: 'out-of-stock', label: 'Out of Stock' },
                            ]}
                            onChange={(option) => handleChange(option.value, "status")}
                        />  
                        {formData.status === "in-stock" && (
                            <Input
                                name="quantity"
                                type="number"
                                label="Quantity"
                                placeholder="Quantity"
                                defaultValue={0}
                                onChange={(e) => handleChange(e.target.value, "quantity")}
                            />
                        )}
                        <Dropdown 
                            status="default"
                            name="warehouse"
                            label="Warehouse"
                            placeholder="Please select"
                            onChange={(option) => handleChange(option.value, "warehouse")}
                            options={warehouses.map((warehouse) => ({value: warehouse.id, label: warehouse.warehouse_name}))}
                        />
                    </div>
                    <div className="add-inventory-page__form-actions">
                      <div className="add-inventory-page__form-actions-button">
                        <Button type="button" status="secondary">
                            Cancel
                        </Button>
                      </div>
                      <div className="add-inventory-page__form-actions-button"> 
                        <Button type="submit">+ Add Item</Button>
                      </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddInventoryPage;
