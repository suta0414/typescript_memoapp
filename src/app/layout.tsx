import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Header } from "../components/Header";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "MemoApp",
  description: "memoアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <MantineProvider>
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
