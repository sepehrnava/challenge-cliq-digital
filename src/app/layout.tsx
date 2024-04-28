import type { Metadata } from "next";
import { Roboto as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { BaseTemplate } from "@/templates/BaseTemplate";

export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

const fontSans = FontSans({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans" as any,
});

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          (fontSans as any).variable,
        )}
      >
        <BaseTemplate>
          <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
        </BaseTemplate>
      </body>
    </html>
  );
}
