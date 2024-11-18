export interface IExpenseRequest {
  valueExpense: number;
  description?: string;
  paymentDate?: string;
  dueDate: string;
  idExpenseCategory: number;
}
