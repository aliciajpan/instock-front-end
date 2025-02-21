import './Button.scss';

const Button = ({ children, type, onClick, disabled, status="primary" }) => {
  return (
    <button className={`button button--${status}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;