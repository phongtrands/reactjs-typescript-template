export interface CalendarProps {
  label?: string;
  defaultFromDate?: Date | null;
  defaultToDate?: Date | null;
  onChange?: (fromDate: Date | null, toDate: Date | null) => void;
}
