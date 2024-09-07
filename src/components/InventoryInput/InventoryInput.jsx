import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import RadioText from "../../components/RadioText/RadioText";
import "./InventoryInput.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../../components/Toast/Toast";

function InventoryInput({title, defaultValues, buttons, onSubmit, warehouses}) {
    const navigate = useNavigate();
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
    useEffect(() => {
        if (defaultValues) {
            setFormData(defaultValues);
        }
    }, [defaultValues]);
    const handleChange = (value, propertyName) => {
        if (propertyName === "status" && value === "Out of Stock") {
            setFormData((prevFormData) => ({ ...prevFormData, quantity: 0 }));
        }
        const { errorMessage, parsedValue } = getValidationResult(
            value,
            propertyName
        );
        if (errorMessage) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [propertyName]: errorMessage,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [propertyName]: "",
            }));
        }
        setFormData((prevFormData) => ({
          ...prevFormData,
            [propertyName]: parsedValue,
        }));
    };

    const getValidationResult = (value, propertyName) => {
        let errorMessage = "";
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
        return { errorMessage, parsedValue };
    };

    const isFormValid = () => {
        const propertyNamesToValidate = [
            "item_name",
            "description",
            "category",
            "status",
            "quantity",
            "warehouse_id",
        ];
        const errors = propertyNamesToValidate.reduce((acc, propertyName) => {
            const { errorMessage } = getValidationResult(
                formData[propertyName],
                propertyName
            );
            if (errorMessage) {
                acc[propertyName] = errorMessage;
            } else {
                acc[propertyName] = "";
            }
            return acc;
        }, initialErrors);
        setErrors((prevErrors) => ({
          ...prevErrors,
            ...errors,
        }));
        if (Object.values(errors).some((error) => error !== "")) {
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            onSubmit({formData, setToast});
        }
    };

    return (
        <div className="inventory-input">
            <h1 className="inventory-input__title">
                <img
                    className="inventory-input__title-back"
                    src={arrowBackIcon}
                    alt="back"
                    onClick={() => navigate(-1)}
                />
                {title}
            </h1>
            <div className="inventory-input__form">
                <form onSubmit={handleSubmit}>
                    <div className="inventory-input__form-groups">
                        <div className="inventory-input__form-group">
                            <h2 className="inventory-input__form-group-title">
                                Item Details
                            </h2>
                            <Input
                                width="100%"
                                name="item_name"
                                type="text"
                                label={propertyNameLabelMap.item_name}
                                placeholder={propertyNameLabelMap.item_name}
                                defaultValue={formData.item_name}
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
                                defaultValue={formData.description}
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
                                defaultValue={defaultValues 
                                    ? {label: defaultValues.category, value: defaultValues.category} 
                                    : null}
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
                        <div className="inventory-input__form-group">
                            <h2 className="inventory-input__form-group-title">
                                Item Availability
                            </h2>
                            <RadioText
                                name="status"
                                label={propertyNameLabelMap.status}
                                value={defaultValues 
                                    ? {label: defaultValues.status, value: defaultValues.status} 
                                    : {label: "In Stock", value: "In Stock"}}
                                defaultValue={formData.status}
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
                                    defaultValue={formData.quantity}
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
                                defaultValue={defaultValues 
                                    ? {label: defaultValues.warehouse_name, value: defaultValues.warehouse_id} 
                                    : null}
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
                    <div className="inventory-input__form-actions">
                        {buttons.map((button) => (
                            <div key={button.label} className="inventory-input__form-actions-button">
                                <Button
                                    type={button.type}
                                    status={button.status}
                                    onClick={button.onClick}
                                >
                                    {button.label}
                                </Button>
                            </div>
                        ))}
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

export default InventoryInput;
