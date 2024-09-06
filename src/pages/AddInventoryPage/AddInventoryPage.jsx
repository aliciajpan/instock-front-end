import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import RadioText from "../../components/RadioText/RadioText";
import "./AddInventoryPage.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../components/Toast/Toast";

function AddInventoryPage() {
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const propertyNameLabelMap = {
        item_name: "Item Name",
        description: "Description",
        category: "Category",
        status: "Status",
        quantity: "Quantity",
        warehouse_id: "Warehouse",
    };

    const initialErrors = {
        item_name: "",
        description: "",
        category: "",
        quantity: "",
        warehouse_id: "",
    };

    const initialFormData = {
        item_name: "",
        description: "",
        category: "",
        status: "In Stock",
        quantity: 0,
        warehouse_id: "",
    };
    const positiveIntFields = ["quantity"];

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [toast, setToast] = useState(null);

    const handleChange = (value, propertyName) => {
        if (propertyName === "status" && value === "Out of Stock") {
            setFormData((prevFormData) => ({ ...prevFormData, quantity: 0 }));
        }
        const {errorMessage, parsedValue} = getValidationResult(value, propertyName);
        if (errorMessage) {
          setErrors((prevErrors) => ({
              ...prevErrors,
              [propertyName]: errorMessage,
          }));
      } else {
          setFormData((prevFormData) => ({
              ...prevFormData,
              [propertyName]: parsedValue,
          }));
          setErrors((prevErrors) => ({
              ...prevErrors,
              [propertyName]: "",
          }));
      }
    };

    const getValidationResult = (value, propertyName) => {
        let errorMessage = null;
        let parsedValue = value;
        if (positiveIntFields.includes(propertyName)) {
            parsedValue = parseInt(value);
            if (parsedValue <= 0 && formData.status === "In Stock") {
                errorMessage = `${propertyNameLabelMap[propertyName]} must be a positive integer`;
            }
        }
        if (value === "") {
            errorMessage = `${propertyNameLabelMap[propertyName]} is required`;
        }
        return {errorMessage, parsedValue};
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const propertyNamesToValidate = [
            "item_name",
            "description",
            "category",
            "status",
            "quantity",
            "warehouse_id",
        ];
        const errors =propertyNamesToValidate.reduce((acc, propertyName) => {
            const {errorMessage} = getValidationResult(formData[propertyName], propertyName);
            if (errorMessage) {
                acc[propertyName] = errorMessage;
            }
            else {
                acc[propertyName] = "";
            }
            return acc;
        }, initialErrors);
        setErrors(errors);
        if (Object.values(errors).some((error) => error !== "")) {
            return;
        }
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
            const { data } = await axios.get(`${baseURL}/api/warehouses`);
            setWarehouses(data);
        };
        fetchWarehouses();
    }, [baseURL]);

    return (
        <div className="add-inventory-page">
            <h1 className="add-inventory-page__title">
                <img
                    className="add-inventory-page__title-back"
                    src={arrowBackIcon}
                    alt="back"
                    onClick={() => navigate(-1)}
                />
                Add New Inventory Item
            </h1>
            <div className="add-inventory-page__form">
                <form onSubmit={handleSubmit}>
                    <div className="add-inventory-page__form-groups">
                        <div className="add-inventory-page__form-group">
                            <h2 className="add-inventory-page__form-group-title">
                                Item Details
                            </h2>
                            <Input
                                width="100%"
                                name="item_name"
                                type="text"
                                label="Item Name"
                                placeholder="Item Name"
                                onChange={(e) =>
                                    handleChange(e.target.value, "item_name")
                                }
                                status={errors.item_name ? "error" : "default"}
                                error={errors.item_name}
                            />
                            <Input
                                width="100%"
                                name="description"
                                type="text"
                                label={propertyNameLabelMap.description}
                                placeholder="Please enter a brief item description..."
                                box="textarea"
                                onChange={(e) =>
                                    handleChange(e.target.value, "description")
                                }
                                status={
                                    errors.description ? "error" : "default"
                                }
                                error={errors.description}
                            />
                            <Dropdown
                                name="category"
                                width="100%"
                                label={propertyNameLabelMap.category}
                                placeholder="Please select"
                                onChange={(option) =>
                                    handleChange(option.value, "category")
                                }
                                options={[
                                    {
                                        value: "Accessories",
                                        label: "Accessories",
                                    },
                                    { value: "Apparel", label: "Apparel" },
                                    {
                                        value: "Electronics",
                                        label: "Electronics",
                                    },
                                    { value: "Gear", label: "Gear" },
                                    { value: "Health", label: "Health" },
                                ]}
                                status={errors.category ? "error" : "default"}
                                error={errors.category}
                            />
                        </div>
                        <div className="add-inventory-page__form-group">
                            <h2 className="add-inventory-page__form-group-title">
                                Item Availability
                            </h2>
                            <RadioText
                                name="status"
                                label={propertyNameLabelMap.status}
                                options={[
                                    { value: "In Stock", label: "In Stock" },
                                    {
                                        value: "Out of Stock",
                                        label: "Out of Stock",
                                    },
                                ]}
                                onChange={(option) =>
                                    handleChange(option.value, "status")
                                }
                            />
                            {formData.status === "In Stock" && (
                                <Input
                                    width="100%"
                                    name="quantity"
                                    type="number"
                                    label={propertyNameLabelMap.quantity}
                                    placeholder="Quantity"
                                    defaultValue={0}
                                    onChange={(e) =>
                                        handleChange(e.target.value, "quantity")
                                    }
                                    status={
                                        errors.quantity ? "error" : "default"
                                    }
                                    error={errors.quantity}
                                />
                            )}
                            <Dropdown
                                width="100%"
                                name="warehouse_id"
                                label={propertyNameLabelMap.warehouse_id}
                                placeholder="Please select"
                                onChange={(option) =>
                                    handleChange(option.value, "warehouse_id")
                                }
                                options={warehouses.map((warehouse) => ({
                                    value: warehouse.id,
                                    label: warehouse.warehouse_name,
                                }))}
                                status={
                                    errors.warehouse_id ? "error" : "default"
                                }
                                error={errors.warehouse_id}
                            />
                        </div>
                    </div>
                    <div className="add-inventory-page__form-actions">
                        <div className="add-inventory-page__form-actions-button">
                            <Button
                                type="button"
                                status="secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div className="add-inventory-page__form-actions-button">
                            <Button type="submit">+ Add Item</Button>
                        </div>
                    </div>
                </form>
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    status={toast.status}
                    onClose={() => {
                        setToast(null);
                    }}
                />
            )}
        </div>
    );
}

export default AddInventoryPage;
