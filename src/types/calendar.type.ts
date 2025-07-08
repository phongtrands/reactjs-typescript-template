export interface CalendarProps {
  label?: string;
  defaultFromDate?: Date | undefined;
  defaultToDate?: Date | undefined;
  onCancel?: () => void;
  onSelect?: (fromDate: Date | undefined, toDate: Date | undefined) => void;
  className?: string;
}
