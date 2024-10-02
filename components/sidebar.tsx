import Link from 'next/link';
import { FC } from 'react';

export const Sidebar: FC = () => {
    return (
        <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
            <nav className="space-y-4">
                <Link href="/api/about"
                    className="block p-2 rounded hover:bg-blue-800">About Section
                </Link>
                <Link href="/api/careers"
                     className="block p-2 rounded hover:bg-blue-800">Careers Page
                </Link>
                <Link href="/api/services"
                     className="block p-2 rounded hover:bg-blue-800">Services Section
                </Link>
                <Link href="/api/faq"
                     className="block p-2 rounded hover:bg-blue-800">FAQ Section
                </Link>
            </nav>
        </div>
    );
}


