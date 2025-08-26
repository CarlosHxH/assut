import { useEffect, useState } from "react";

export default function SimpleAnimate({ time = 200, children }: { time?: number, children: React.ReactNode }) {
    const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
    useEffect(() => {
        const timer1 = setTimeout(() => setIsContentVisible(true), time);
        return () => {
            clearTimeout(timer1);
        };
    }, []);
    return (
        <main className={`min-h-screen bg-white/95 dark:bg-gray-900 backdrop-blur-lg shadow-2xl p-8 md:p-12 transform transition-all duration-1000 ${isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            {children}
        </main>
    );
}
