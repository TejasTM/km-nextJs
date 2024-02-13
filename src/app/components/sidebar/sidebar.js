import Link from 'next/link';

function Sidebar() {
    return (
        <div className="flex fixed top-0 z-10 h-screen w-56 bg-gray-800">
            {/* Sidebar */}
            <div className="bg-gray-800 p-6">
                {/* Logo and Name */}
                <div className="flex items-center mb-8">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
                    <span className="text-white text-xl font-semibold">Your App</span>
                </div>
                {/* Border */}
                <div className="border-b-2 border-white w-full mb-8"></div>
                {/* Links */}
                <nav className="space-y-4">
                    <Link className="flex items-center text-white hover:text-gray-300" href="/dashboard">

                        <img src="../assets/dashboard.png" alt="Dashboard" className="w-6 h-6 mr-2" />
                        Dashboard

                    </Link>
                    <Link className="flex items-center text-white hover:text-gray-300" href="/settings">

                        <img src="/settings-icon.png" alt="Settings" className="w-6 h-6 mr-2" />
                        Settings

                    </Link>
                    <Link className="flex items-center text-white hover:text-gray-300" href="/preferences">

                        <img src="/preferences-icon.png" alt="Preferences" className="w-6 h-6 mr-2" />
                        Preferences

                    </Link>
                    <Link className="flex items-center text-white hover:text-gray-300" href="/users">

                        <img src="/users-icon.png" alt="Users" className="w-6 h-6 mr-2" />
                        Users

                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
