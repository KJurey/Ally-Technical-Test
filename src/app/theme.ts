"use client";

import { createTheme } from "@mui/material/styles";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: nunito.style.fontFamily,
    fontSize: 16,
  },
});
