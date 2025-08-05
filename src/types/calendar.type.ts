export interface CalendarProps {
  label?: string;
  defaultFromDate?: Date;
  defaultToDate?: Date;
  onChange?: (fromDate: Date, toDate: Date) => void;
}
