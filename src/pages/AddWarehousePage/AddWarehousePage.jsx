import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./AddWarehousePage.scss";
import arrowBackIcon from "../../assets/icons/arrow_back-24px.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../components/Toast/Toast";
import { phoneRegex, emailRegex } from "../../utils/regexUtils";

function AddWarehouse() {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL;
    const propertyNameLabelMap = {
        warehouse_name: "Warehouse Name",
        address: "Street Address",
        city: "City",
        country: "Country",
        contact_name: "Contact Name",
        contact_position: "Position",
        contact_phone: "Phone Number",
        contact_email: "Email",
    };

    const initialErrors = {
        warehouse_name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
    };

    const initialFormData = {
        warehouse_name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState(initialErrors);
    const [toast, setToast] = useState(null);

    const handleChange = (value, propertyName) => {
        const { errorMessage } = getValidationResult(
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
            [propertyName]: value,
        }));
    };

    const getValidationResult = (value, propertyName) => {
        let errorMessage = "";
        if (value === "") {
            errorMessage = `${propertyNameLabelMap[propertyName]} is required`;
        } else if (
            propertyName === "contact_phone" &&
            !phoneRegex.test(value)
        ) {
            errorMessage = "Invalid phone number";
        } else if (
            propertyName === "contact_email" &&
            !emailRegex.test(value)
        ) {
            errorMessage = "Invalid email address";
        }
        return { errorMessage };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const propertyNamesToValidate = [
            "warehouse_name",
            "address",
            "city",
            "country",
            "contact_name",
            "contact_position",
            "contact_phone",
            "contact_email",
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
            return;
        }
        try {
            await axios.post(`${baseURL}/api/warehouses`, formData);
            setToast({
                message: "Warehouse added successfully",
                status: "success",
            });
            setTimeout(() => {
                navigate("/warehouses");
            }, 500);
        } catch (error) {
            console.error(error);
            setToast({
                message: "Failed to add warehouse",
                status: "error",
            });
        }
    };

    return (
        <div className="add-warehouse-page">
            <h1 className="add-warehouse-page__title">
                <img
                    className="add-warehouse-page__title-back"
                    src={arrowBackIcon}
                    alt="back"
                    onClick={() => navigate(-1)}
                />
                Add New Warehouse
            </h1>
            <div className="add-warehouse-page__form">
                <form onSubmit={handleSubmit}>
                    <div className="add-warehouse-page__form-groups">
                        <div className="add-warehouse-page__form-group">
                            <h2 className="add-warehouse-page__form-group-title">
                                Warehouse Details
                            </h2>
                            <Input
                                width="100%"
                                name="warehouse_name"
                                type="text"
                                label={propertyNameLabelMap.warehouse_name}
                                placeholder={
                                    propertyNameLabelMap.warehouse_name
                                }
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        "warehouse_name"
                                    )
                                }
                                status={
                                    errors.warehouse_name ? "error" : "default"
                                }
                                error={errors.warehouse_name}
                            />
                            <Input
                                width="100%"
                                name="address"
                                type="text"
                                label={propertyNameLabelMap.address}
                                placeholder={propertyNameLabelMap.address}
                                onChange={(e) =>
                                    handleChange(e.target.value, "address")
                                }
                                status={errors.address ? "error" : "default"}
                                error={errors.address}
                            />
                            <Input
                                width="100%"
                                name="city"
                                type="text"
                                label={propertyNameLabelMap.city}
                                placeholder={propertyNameLabelMap.city}
                                onChange={(e) =>
                                    handleChange(e.target.value, "city")
                                }
                                status={errors.city ? "error" : "default"}
                                error={errors.city}
                            />
                            <Input
                                width="100%"
                                name="country"
                                type="text"
                                label={propertyNameLabelMap.country}
                                placeholder={propertyNameLabelMap.country}
                                onChange={(e) =>
                                    handleChange(e.target.value, "country")
                                }
                                status={errors.country ? "error" : "default"}
                                error={errors.country}
                            />
                        </div>
                        <div className="add-warehouse-page__form-group">
                            <h2 className="add-warehouse-page__form-group-title">
                                Contact Details
                            </h2>
                            <Input
                                width="100%"
                                name="contact_name"
                                type="text"
                                label={propertyNameLabelMap.contact_name}
                                placeholder={propertyNameLabelMap.contact_name}
                                onChange={(e) =>
                                    handleChange(e.target.value, "contact_name")
                                }
                                status={
                                    errors.contact_name ? "error" : "default"
                                }
                                error={errors.contact_name}
                            />
                            <Input
                                width="100%"
                                name="contact_position"
                                type="text"
                                label={propertyNameLabelMap.contact_position}
                                placeholder={
                                    propertyNameLabelMap.contact_position
                                }
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        "contact_position"
                                    )
                                }
                                status={
                                    errors.contact_position
                                        ? "error"
                                        : "default"
                                }
                                error={errors.contact_position}
                            />
                            <Input
                                width="100%"
                                name="contact_phone"
                                type="text"
                                label={propertyNameLabelMap.contact_phone}
                                placeholder={propertyNameLabelMap.contact_phone}
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        "contact_phone"
                                    )
                                }
                                status={
                                    errors.contact_phone ? "error" : "default"
                                }
                                error={errors.contact_phone}
                            />
                            <Input
                                width="100%"
                                name="contact_email"
                                type="text"
                                label={propertyNameLabelMap.contact_email}
                                placeholder={propertyNameLabelMap.contact_email}
                                onChange={(e) =>
                                    handleChange(
                                        e.target.value,
                                        "contact_email"
                                    )
                                }
                                status={
                                    errors.contact_email ? "error" : "default"
                                }
                                error={errors.contact_email}
                            />
                        </div>
                    </div>
                    <div className="add-warehouse-page__form-actions">
                        <div className="add-warehouse-page__form-actions-button">
                            <Button
                                type="button"
                                status="secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div className="add-warehouse-page__form-actions-button">
                            <Button type="submit">+ Add Warehouse</Button>
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

export default AddWarehouse;
