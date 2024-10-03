const Input = ({ errors, label, value, name, onHadleChange, ...rest }) => {
  return (
    <label className="block my-4">
      <span className="block mb-1 after:content-['*'] after:ml-1 after:text-[red]">
        {label}
      </span>
      <input
        type="text"
        onChange={onHadleChange}
        value={value}
        name={name}
        className="w-full border border-[lightgray] p-2 rounded focus:outline-none focus:ring-1 focus:ring-cyan-600"
        {...rest}
      />
      {errors[name] && <span className="text-[red]">{errors[name]}</span>}
    </label>
  );
};

export default Input;
