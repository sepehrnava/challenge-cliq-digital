import "@/styles/global.css";

import { Roboto as FontSans } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "../lib/utils";

const fontSans = FontSans({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans" as any,
});

const BaseTemplate = (props: { children: React.ReactNode }) => {
  return (
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        (fontSans as any).variable,
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="w-full px-1 antialiased">
          <div className="mx-auto max-w-screen-md">
            <header className="border-b border-gray-300">
              <div className="flex justify-between">
                <nav className="prose flex h-[95px] items-center">
                  <h1>React Weather</h1>
                </nav>
              </div>
            </header>

            <main>{props.children}</main>
          </div>
        </div>
      </ThemeProvider>
    </body>
  );
};

export { BaseTemplate };
