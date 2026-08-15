"use client";

import { useState } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(getInitialTheme);

  function setTheme(next: "light" | "dark") {
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setThemeState(next);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, setTheme, toggleTheme };
}