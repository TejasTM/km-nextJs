// utils/cookie.js

import Cookies from 'js-cookie';
import ApiSetup from '@/app/auth/api/apiSetup';
import {USER_LOGOUT} from "@/app/auth/api/endPoints"
// Function to set a cookie
export const setCookie = (key, value, options = {}) => {
    Cookies.set(key, value, options);
};

// Function to get a cookie from the server
export const getCookie = async () => {
    try {
        const response = await ApiSetup.get('/verifytoken');
        if (!response.status === 200) {
            throw new Error('Failed to fetch cookie from server');
        }
        return <>
        {response.data} 
        {console.log(response.data,"response.data")}
        </> 
    } catch (error) {
        console.error('Error fetching cookie from server:', error);
        return null;
    }
};

// Function to delete a cookie from the server
export const removeCookie = async (key) => {
    try {
        const response = await ApiSetup.post(USER_LOGOUT, { key }); // Replace '/api/remove-cookie' with your endpoint
        if (!response.status === 200) {
            throw new Error('Failed to remove cookie on the server');
        }
        // Assuming the server successfully removes the cookie
        console.log('Cookie removed successfully');
    } catch (error) {
        console.error('Error removing cookie:', error);
        // Handle error if necessary
    }
};
