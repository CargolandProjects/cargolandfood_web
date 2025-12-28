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

}
