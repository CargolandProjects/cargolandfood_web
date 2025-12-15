import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateWComma(date: Date | string | number) {
  const d = new Date(date);

  const day = new Intl.DateTimeFormat("en-us", { day: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat("en-us", { month: "short" }).format(d);
  const year = new Intl.DateTimeFormat("en-us", { year: "numeric" }).format(d);

  return ` ${day} ${month}, ${year}`;
}
