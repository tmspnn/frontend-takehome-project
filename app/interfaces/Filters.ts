export default interface Filters {
  keyword: string;
  selectedYear: number;
  selectedMonth: number;
  selectedTypes: Array<{ value: string; label: string }>;
}
