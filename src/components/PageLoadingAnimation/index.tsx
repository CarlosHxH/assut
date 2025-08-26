'use client';

import { useEffect, useState } from 'react';

interface PageLoadingAnimationProps {
    isLoading: boolean;
    duration?: number;
    children: React.ReactNode;
}

const PageLoadingAnimation: React.FC<PageLoadingAnimationProps> = ({
    isLoading,
    duration = 800,
    children,
}) => {
    const [showContent, setShowContent] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<'loading' | 'fadeOut' | 'complete'>('loading');

    useEffect(() => {
        if (!isLoading) {
            setAnimationPhase('fadeOut');

            const timer = setTimeout(() => {
                setAnimationPhase('complete');
                setShowContent(true);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (animationPhase === 'complete') {
        return (
            <div className="animate-fadeIn">
                {children}
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Loading Overlay */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-opacity duration-500 ${animationPhase === 'fadeOut' ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {/* Main Loading Animation */}
                <div className="relative">
                    {/* Outer Ring */}
                    <div className="w-32 h-32 border-4 border-purple-200/20 rounded-full animate-spin">
                        <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                    </div>

                    {/* Middle Ring */}
                    <div className="absolute inset-2 w-28 h-28 border-4 border-pink-200/30 rounded-full animate-spin animate-reverse">
                        <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
                    </div>

                    {/* Inner Circle */}
                    <div className="absolute inset-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse shadow-2xl shadow-purple-500/30">
                        <div className="absolute inset-2 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full animate-ping opacity-75"></div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -inset-16">
                        <div className="absolute top-4 left-8 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100 opacity-60"></div>
                        <div className="absolute bottom-6 right-4 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300 opacity-60"></div>
                        <div className="absolute top-12 right-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-500 opacity-60"></div>
                        <div className="absolute bottom-12 left-4 w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-700 opacity-60"></div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-0"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="text-white text-lg font-light mt-4 animate-pulse tracking-wider">
                        Carregando
                    </p>
                </div>
            </div>

            {/* Page Content (hidden during loading) */}
            <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                {children}
            </div>
        </div>
    );
};

export default PageLoadingAnimation;