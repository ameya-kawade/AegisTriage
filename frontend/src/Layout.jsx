import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Stethoscope, Users, LayoutDashboard } from 'lucide-react';

export default function Layout() {
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                        <Activity className="w-8 h-8" />
                        AegisTriage
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">v2.0 Enterprise</p>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    <Link
                        to="/nurse"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/nurse')
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Stethoscope className="w-5 h-5" />
                        Nurse Dashboard
                    </Link>

                    <Link
                        to="/doctor"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/doctor')
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        Doctor Dashboard
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {isActive('/nurse') ? 'Nurse Triage Station' : 'Clinical Decision Support'}
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                {isActive('/nurse') ? 'N' : 'D'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
