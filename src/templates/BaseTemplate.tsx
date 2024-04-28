import "@/styles/global.css";

import { ThemeProvider } from "@/components/theme-provider";

const BaseTemplate = (props: { children: React.ReactNode }) => {
  return (
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
  );
};

export { BaseTemplate };
