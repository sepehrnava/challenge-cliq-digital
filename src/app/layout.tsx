import type { Metadata } from "next";

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

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <BaseTemplate>
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </BaseTemplate>
    </html>
  );
}
