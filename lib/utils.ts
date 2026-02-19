import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateWComma(date: Date | string) {
  return ` ${format(date, "d MMM")}, ${format(date, "yyyy")}`;
}

export function formatPrettyDate(date: Date | string) {
  return `${format(date, "EEEE")}, ${format(date, "do")} ${format(
    date,
    "MMMM, h:mm a"
  )}`;
}

export function formatDMY(date: Date | string) {
  return `${format(date, "dd/mm/yyyy")}`;
}

export function formatTime(date: Date | string) {
  return format(date, "h:mm a");
}

export function fallbackImg(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string
) {
  const img = e.currentTarget;

  // prevent infinite loop if fallback also fails
  // img.onerror = null;

  // The dataset guard is stronger because it survives React re-renders.
  if (img.dataset.fallbackApplied === "true") return;

  img.dataset.fallbackApplied = "true";
  img.src = fallbackSrc;
}

export const getCategoryPath = (categoryId: string) => {
  switch (categoryId) {
    case "Restaurant":
      return "restaurants";
    case "Groceries":
      return "groceries";
    case "Markets":
      return "markets";
  }
};
