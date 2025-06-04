import { TYPE_FILE } from '../../config/config';

export interface Store {
  accountNo: string | undefined;
  bankName: string | undefined;
  bankStatementDate: BankStatementDate | undefined;
  typeFile: TYPE_FILE | undefined;
}

export interface SearchPayload {
  accountNo: string | undefined;
  bankName: string | undefined;
  bankStatementDate: BankStatementDate;
}

interface BankStatementDate {
  fromDate: Date | undefined;
  toDate: Date | undefined;
}
