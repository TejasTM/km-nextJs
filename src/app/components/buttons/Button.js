// // components/Button.js
// import React from 'react';


// export const PrimaryButton = ({ label, onClick, type }) => {
//   const buttonClasses = `2xl:w-44 xl:w-36 lg:w-32 md:w-28 2xl:h-12 xl:h-12 lg:h-10 md:h-9 bg-blue-800 hover:bg-blue-600 focus:ring-blue-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`;

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={buttonClasses}
//     >
//       {label}
//     </button>
//   );
// };

// export const SecondaryButton =  ({ label, onClick, type }) => {
//   const buttonClasses = `2xl:w-44 xl:w-36 lg:w-32 md:w-28 2xl:h-12 xl:h-12 lg:h-10 md:h-9 bg-indigo-800 hover:bg-indigo-600 focus:ring-indigo-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`;

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={buttonClasses}
//     >
//       {label}
//     </button>
//   )
// };

// export const TertiaryButton = ({ label, onClick, type }) => {
//   const buttonClasses = `2xl:w-44 xl:w-36 lg:w-32 md:w-28 2xl:h-12 xl:h-12 lg:h-10 md:h-9 bg-red-800 hover:bg-red-600 focus:ring-red-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`;

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={buttonClasses}
//     >
//       {label}
//     </button>
//   )
// };
// components/Button.js
import React from 'react';

const Button = ({ label, onClick, type, color }) => {
  const buttonClasses = `2xl:w-44 xl:w-36 lg:w-32 md:w-28 2xl:h-12 xl:h-12 lg:h-10 md:h-9 bg-${color}-800 hover:bg-${color}-600 focus:ring-${color}-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
    >
      {label}
    </button>
  );
};

const withColor = (WrappedComponent, color) => {
  return (props) => <WrappedComponent {...props} color={color} />;
};

export const PrimaryButton = withColor(Button, 'blue');
export const SecondaryButton = withColor(Button, 'indigo');
export const TertiaryButton = withColor(Button, 'red');
