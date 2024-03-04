// middleware/auth.js

import jwt from 'jsonwebtoken';
import { getCookie } from '../utils/cookie';
import { useRouter } from 'next/router';

const authMiddleware = (allowedRoles = []) => (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    // Get token from cookie
    const token = getCookie('token');

    // Redirect if token is not present or expired
    if (!token) {
      router.push('/login');
      return null;
    }

    // Decode token to get user role
    const decodedToken = decodeToken(token);

    // Check if user role is allowed
    if (!allowedRoles.includes(decodedToken.role)) {
      router.push('/unauthorized');
      return null;
    }

    // If role is allowed, render the component
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default authMiddleware;
