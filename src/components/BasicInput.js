
export default (label, { onChange, placeholder, required, value, pattern, type, style }, styleParent) => (
    <div style={styleParent}>
        <p>{label + (required ? ' *' : '')}</p>
        <input
            onChange={onChange}
            placeholder={placeholder}
            className='login-form-input'
            type={type || "text"}
            pattern={pattern}
            value={value}
            style={style}
            required={required}
        />
    </div>
);
