import "./Input.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

const Input = ({ 
    type = "text",
    icon = null, 
    placeholder, 
    label = null, 
    status = "default", 
    name = null, 
    error = null, 
    onChange,
    ...props 
}) => {
    
    return (
        <div className="input">
            <div className="input__container">
                {label && 
                    <label className="input__label" htmlFor={name}>{label}</label>
                }
                <input
                    id={name}
                    name={name}
                    className={`input__input input__input--${status}`}
                    type={type}
                    placeholder={placeholder}
                    {...props}
                    onChange={onChange}
                />
                {icon && (
                    <img className="input__icon" src={icon} alt="icon" />
                )}
            </div>
                {status === "error" && <div className="input__error">
                    <img className="input__error-icon" src={errorIcon} alt="error" />
                    <span className="input__error-text">{error || "This field is required"}</span>
                </div>}
        </div>
    );
};

export default Input;
