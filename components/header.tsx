import { FC } from 'react';

interface HeaderProps {
    title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
    return (
        <div className="bg-white shadow p-4">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}

