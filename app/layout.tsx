import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });



export const metadata: Metadata = {
    title: "Posts",
    description: "Create post",
    icons: { icon: "/logo.png📝" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={poppins.className}
            >
                {children}
            </body>
        </html>
    );
}
