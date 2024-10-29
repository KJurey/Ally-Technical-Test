import type { Metadata } from "next";
import {
  StyledEngineProvider,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { theme } from "./theme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Ally Dashboard",
  description: "Kevin Juarez Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledEngineProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={nunito.className}>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
