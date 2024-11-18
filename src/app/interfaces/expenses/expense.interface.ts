export interface IExpense {
  idExpense: number;
  valueExpense: number;
  description: string | null;
  registrationDate: string;
  paymentDate: string | null;
  dueDate: string;
  statusExpense: string;
  idExpenseCategory: number;
  nameExpenseCategory: string;
}
