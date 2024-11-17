export interface IExpense {
  idExpense: number;
  valueExpense: number;
  description?: string;
  registrationDate: string;
  paymentDate?: string;
  dueDate: string;
  statusExpense: string;
  idExpenseCategory: number;
  nameExpenseCategory: string;
}
