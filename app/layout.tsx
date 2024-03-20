import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Header from "./home/header";
import Footer from "./home/footer";
import { Providers } from "./providers";

const font = Rajdhani({ 
    subsets: ["latin"],
    weight: ['300']
});

export const metadata: Metadata = {
    title: "sorival",
    description: "break sorare rival games",
};

export default function RootLayout({ 
    children,
}: Readonly<{
    children: React.ReactNode; 
}>) {
    return (
        <html lang="en" className="dark">
            <body className={font.className}>
                <Providers>
                    <div className="root">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
