import { useState, useRef, useEffect } from "react";
import dropdownIcon from "../../assets/icons/arrow_drop_down-24px.svg";
import dropdownActiveIcon from "../../assets/icons/arrow_drop_down-active-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import "./Dropdown.scss";

const Dropdown = ({
    options,
    label,
    placeholder,
    status = "default",
    error = null,
    onChange,
    width = null,
    value = null,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption((prevOption) => {
            if (prevOption && prevOption.value === option.value) {
                return null;
            }
            return option;
        });
        setIsOpen(false);
        onChange(option);
    };

    useEffect(() => {
        if (value) {
            setSelectedOption(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef} style={width ? { width } : {}}>
            <div className="dropdown__wrapper">
                {label && <label className="dropdown__label">{label}</label>}
                <div
                    className={`dropdown__selected 
                        ${ isOpen ? "dropdown__selected--open" : "" } 
                        ${ selectedOption === null ? "dropdown__selected--empty" : "" }
                        ${ status === "error" ? "dropdown__selected--error" : "" }`}
                    onClick={toggleDropdown}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                    <div className="dropdown__icon">
                        <img
                            src={isOpen ? dropdownActiveIcon : dropdownIcon}
                            alt="Dropdown"
                        />
                    </div>
                </div>
                {status === "error" && (
                    <div className="dropdown__error">
                        <img
                            className="dropdown__error-icon"
                            src={errorIcon}
                            alt="error"
                        />
                        <span className="dropdown__error-text">
                            {error || "This field is required"}
                        </span>
                    </div>
                )}
                <ul
                    className={`dropdown__options ${
                        isOpen ? "dropdown__options--open" : ""
                    }`}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="dropdown__option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
