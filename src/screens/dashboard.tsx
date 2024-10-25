
import { NextPage } from 'next';

export const Dashboard: NextPage = () => {
    return (
        <div className="flex min-h-screen">
           
            <div className="flex-1">
           
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
                    <p className="text-lg">Use the sidebar to navigate between different sections of the website and make changes in real-time.</p>
                </div>
            </div>
        </div>
    );
}


