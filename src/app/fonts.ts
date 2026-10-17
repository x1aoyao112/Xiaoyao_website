import localFont from "next/font/local";

export const zodiak = localFont({
  src: "./fonts/Zodiak-Variable.woff2",
  variable: "--font-zodiak",
  weight: "100 900",
  style: "normal",
  display: "block",
  preload: true,
  adjustFontFallback: "Times New Roman",
});

export const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "block",
  preload: true,
  adjustFontFallback: "Arial",
});
