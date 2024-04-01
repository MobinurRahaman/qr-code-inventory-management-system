import PropTypes from "prop-types";
import "./IconButton.css";

/**
 * Button component with an icon.
 * @param {object} props - Component props.
 * @param {string} props.title - Title for the button.
 * @param {string} props.icon - URL of the icon image.
 * @param {string} [props.shape="rounded"] - Shape of the button ("rounded" or "square").
 * @param {string} [props.variant="regular"] - Variant of the button ("regular" or "contained").
 * @param {Function} props.onClick - Function to handle button click.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {object} [props.style={}] - Inline styles for the button.
 * @returns {JSX.Element} Button component with an icon.
 */
function IconButton({
  title,
  icon,
  variant,
  shape,
  onClick,
  disabled,
  className,
  style,
}) {
  return (
    <button
      className={`iconBtn ${variant} ${shape} ${className}`}
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <img src={icon} alt={title} />
    </button>
  );
}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(["rounded", "square"]),
  variant: PropTypes.oneOf(["regular", "contained"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

IconButton.defaultProps = {
  shape: "rounded",
  variant: "regular",
  disabled: false,
  className: "",
  style: {},
};

export default IconButton;
