import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";


function Password({ label, value, name, id, onChange, placeholder }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="w-full mt-4">
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                />
                <button
                    type="button"
                    onClick={handleClickShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                >
                    {showPassword ? <HiEyeOff /> : <HiEye />}
                </button>
            </div>
        </div>
    );
}

export default Password;
