import "./RadioText.scss";
import { useState } from "react";
const RadioText = ({ options, label, defaultSelectedOptionValue = options[0]?.value, onChange }) => {
    const [selectedOptionValue, setSelectedOptionValue] = useState(defaultSelectedOptionValue);

    const handleChange = (option) => {
        setSelectedOptionValue(option.value);
        onChange(option);
    };

    if (!options || options?.length === 0) {
        return null;
    }

    return (
        <div className="radio-text">
            {label && <label className="radio-text__label">{label}</label>}
            <div className="radio-text__options">
                {options.map((option) => (
                    <div
                        className="radio-text__option"
                        key={option.value}
                        onClick={() => handleChange(option)}
                    >
                        <input
                            type="radio"
                            id={option.value}
                            name="radioGroup"
                            className="radio-text__option-input"
                            checked={option.value === selectedOptionValue}
                            onChange={() => handleChange(option)}
                        />
                        <label
                            htmlFor={option.value}
                            className={`radio-text__option-label ${
                                option.value === selectedOptionValue
                                    ? "radio-text__option-label--active"
                                    : ""
                            }`}
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioText;
