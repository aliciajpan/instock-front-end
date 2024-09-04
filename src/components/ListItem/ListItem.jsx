import { Link } from "react-router-dom";
import chevronRightIcon from "../../assets/icons/chevron_right-24px.svg";
import "./ListItem.scss";

const ListItem = ({ properties, actions }) => {
    return (
        <div className="list-item">
            <div className="list-item__info">
                {properties.map((property) => (
                    <div key={property.key} className="list-item__property">
                        <div className="list-item__property-name">
                            {property.name}
                        </div>

                        {property.valueHtml && (
                            <div
                                className="list-item__property-value"
                                dangerouslySetInnerHTML={{
                                    __html: property.valueHtml.toString(),
                                }}
                            />
                        )}

                        {property.value && (
                            <div className="list-item__property-value">
                                {property.link ? (
                                    <Link
                                        to={property.link}
                                        className="list-item__property-value-link"
                                    >
                                        <span className="list-item__property-value-link-text">
                                            {property.value}
                                        </span>
                                        <img
                                            className="list-item__property-value-link-icon"
                                            src={chevronRightIcon}
                                            alt="chevron-right"
                                        />
                                    </Link>
                                ) : (
                                    <span className="list-item__property-value-text">
                                        {property.value}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="list-item__actions">
                {actions.map((action) => (
                    <img
                        key={action.icon}
                        className="list-item__actions-icon"
                        src={action.icon}
                        alt={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListItem;
