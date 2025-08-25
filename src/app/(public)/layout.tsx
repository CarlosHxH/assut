import AppBar from '@/components/Appbar';
import Footer from '@/components/footer';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

    return (
        <section>
            <AppBar />
            {children}
            <Footer />
        </section>
    );
}
