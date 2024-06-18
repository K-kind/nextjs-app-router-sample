import "./globals.css";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const theme = createTheme({
  /** Put your mantine theme override here */
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Router Sample",
  description: "Sample app using Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-svh`}>
        <header className="bg-blue-400">
          <nav className="container mx-auto p-4">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/" className="text-lg">
                  App Router Sample
                </Link>
              </li>
              <li>
                <Link href="/coffees">Coffees</Link>
              </li>
              <li>
                <Link href="/ui-sample">UI Sample</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4 flex-grow">
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </main>
        <footer className="bg-blue-400">
          <div className="container mx-auto p-4">
            <p className="text-center">
              &copy; {new Date().getFullYear()} App Router Sample
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
