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
        <div className="antialiased">
          <header className="h-[95px] bg-secondary">
            <nav className="container flex size-full w-full items-center">
              <div className="prose">
                <h1 className="">React Weather</h1>
              </div>
            </nav>
          </header>

          <main>{props.children}</main>
          <footer className="h-screen" />
        </div>
      </ThemeProvider>
    </body>
  );
};

export { BaseTemplate };
