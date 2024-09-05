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
    defaultValue = null,
    onChange,
    onIconClick,
    box = "input",
    ...props 
}) => {
    const properties = {
        id: name,
        name: name,
        placeholder: placeholder,
        type: type,
        defaultValue: defaultValue,
        onChange: onChange,
        ...props,
    };
    return (
        <div className="input">
            <div className="input__container">
                {label && 
                    <label className="input__label" htmlFor={name}>{label}</label>
                }
                <div className="input__box">
                    {box === "input" && (
                        <input
                        className={`input__input input__input--${status}`}
                        {...properties}
                    />
                    )}
                    {box === "textarea" && (
                        <textarea
                            className={`input__textarea input__textarea--${status}`}
                            {...properties}
                        />
                    )}
                    {icon && (
                        <img className="input__icon" src={icon} alt="icon" onClick={onIconClick}/>
                    )}
                </div>
            </div>
            {status === "error" && <div className="input__error">
                <img className="input__error-icon" src={errorIcon} alt="error" />
                <span className="input__error-text">{error || "This field is required"}</span>
            </div>}
        </div>
    );
};

export default Input;
