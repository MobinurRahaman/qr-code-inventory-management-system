import PropTypes from "prop-types";
import "./Input.css";

/**
 * Input component for forms.
 * @param {object} props - Component props.
 * @param {string} props.id - ID for the input element.
 * @param {string} props.name - Name for the input element.
 * @param {string} props.label - Label for the input element.
 * @param {string} [props.type="text"] - Type of the input element.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {string|number} [props.value=""] - Value of the input element.
 * @param {Function} props.onChange - Function to handle input change.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {string} [props.max] - Maximum value for the input element.
 * @param {object} [props.style={}] - Inline styles for the input element.
 * @returns {JSX.Element} Input component.
 */
function Input({
  id,
  name,
  label,
  type,
  required,
  value,
  onChange,
  className,
  disabled,
  max,
  style = {},
}) {
  return (
    <>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={`input ${className}`}
        disabled={disabled}
        max={max}
        style={style}
      />
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "password",
    "email",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "color",
    "submit",
  ]),
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  max: PropTypes.string,
  style: PropTypes.object,
};

Input.defaultProps = {
  type: "text",
  required: false,
  value: "",
  className: "",
  disabled: false,
  style: {},
};

export default Input;
