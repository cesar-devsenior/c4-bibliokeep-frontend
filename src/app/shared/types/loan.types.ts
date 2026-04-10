export interface LoanRequest {
  bookId: number;
  contactName: string;
  loanDate: string; // ISO
  dueDate: string; // ISO
}

export interface LoanResponse extends LoanRequest {
  id: number;
  returned: boolean;
}
