/* eslint-disable react/prop-types */


const Button = ({ onClick, children, type = 'button',className, }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
