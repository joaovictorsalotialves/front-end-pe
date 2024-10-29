export interface IExpense {
  idExpense?: number,
  valueExpense: number,
  description?: string,
  registrationDate: Date,
  paymentDate?: Date,
  dueDate: Date,
  statusExpense: string,
  nameExpenseCategory: string,
}
