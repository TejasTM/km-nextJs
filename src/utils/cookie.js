import Cookies from 'js-cookie';

// Function to set a cookie
export const setCookie = (key, value, options = {}) => {
    Cookies.set(key, value, options);
};

// Function to get a cookie
export const getCookie = (key) => {
    return Cookies.get(key);
};

// Function to delete a cookie
export const removeCookie = (key) => {
    Cookies.remove(key);
};