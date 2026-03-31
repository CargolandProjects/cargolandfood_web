import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { TransactionStatus } from "./services/wallet.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateWComma(date: Date | string, wComma: boolean = true) {
  if (!date) return null;

  return ` ${format(date, `d MMM${wComma ? "," : ""} yyyy`)} `;
}

export function formatDateWCommaB(date: Date | string) {
  if (!date) return null;

  return `${format(date, "MMM do, yyyy")}`;
}
export function formatPrettyDate(date: Date | string) {
  if (!date) return null;

  return `${format(date, "EEEE")}, ${format(date, "do")} ${format(
    date,
    "MMMM, h:mm a"
  )}`;
}

export function formatDMY(date: Date | string) {
  if (!date) return null;
  return `${format(date, "dd/mm/yyyy")}`;
}

export function formatTime(date: Date | string) {
  if (!date) return null;
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

    default:
      return null;
  }
};

/**
 * Group transaction records by month and transform to UI format
 * Converts flat TransactionRecord[] into grouped TransactionGroup[] by "Month Year"
 */
export function groupTransactionsByMonth(
  records: Array<{
    id: string;
    walletId: string;
    type: "CREDIT" | "DEBIT";
    amount: string;
    reference: string;
    description: string | null;
    status: TransactionStatus;
    createdAt: string;
  }>
): Array<{
  month: string;
  transactions: Array<{
    id: string;
    walletId: string;
    type: "CREDIT" | "DEBIT";
    amount: string;
    reference: string;
    description: string | null;
    status: TransactionStatus;
    createdAt: string;
  }>;
}> {
  // Guard clause: Handle empty, null, undefined, or non-array inputs
  if (!records || !Array.isArray(records) || records.length === 0) {
    return [];
  }

  // 1. Sort by date (newest first)
  const sorted = [...records].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // 2. Group by "Month Year"
  const grouped = sorted.reduce(
    (acc, record) => {
      const date = new Date(record.createdAt);
      const monthYear = format(date, "MMMM yyyy"); // "September 2025"

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }

      acc[monthYear].push({
        id: record.id,
        walletId: record.walletId,
        type: record.type,
        amount: record.amount,
        reference: record.reference,
        description: record.description,
        status: record.status,
        createdAt: record.createdAt,
      });

      return acc;
    },
    {} as Record<
      string,
      Array<{
        id: string;
        walletId: string;
        type: "CREDIT" | "DEBIT";
        amount: string;
        reference: string;
        description: string | null;
        status: TransactionStatus;
        createdAt: string;
      }>
    >
  );

  // 3. Convert to array format UI expects
  return Object.entries(grouped).map(([month, transactions]) => ({
    month,
    transactions,
  }));
}
