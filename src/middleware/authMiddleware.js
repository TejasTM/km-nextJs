// middleware.js

import { getCookie } from '../utils/cookie';
import { useRouter,usePathname } from 'next/navigation';

const authMiddleware = () => (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    const pathname = usePathname()

    // Get userType from cookie
    const userType = getCookie('usertype');

    // Redirect if userType is not present
    if (!userType) {
      router.push('/auth/login');
      return null;
    }

    // Redirect to dashboard if user is already authenticated
    if (pathname === '/auth/login' || pathname === '/auth/register') {
      if (userType === 'user') {
        router.push('/user-dashboard');
      } else if (userType === 'admin') {
        router.push('/admin-dashboard');
      }
      return null;
    }

    // Redirect based on userType
    if (userType === "user") {
      // Allow access to user pages, redirect if accessing admin pages
      if (pathname.startsWith('/admin')) {
        router.push('/pages/user/dashboard');
        return null;
      }
    } else if (userType === "admin") {
      // Allow access to admin pages, redirect if accessing user pages
      if (pathname.startsWith('/user')) {
        router.push('/pages/admin/admindashboard');
        return null;
      }
    } else {
      // If userType is not defined or invalid, redirect to login
      router.push('/auth/login');
      return null;
    }

    // Render the wrapped component if userType is allowed
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default authMiddleware;
