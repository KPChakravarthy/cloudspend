export interface CloudSpendData {
  monthlySpend: MonthlySpend;
  spendHistoryLast12Months: SpendHistory[];
  spendByService: SpendByService[];
  spendByEnvironment: SpendByEnvironment[];
  crashFreeSessions: CrashFreeSessions;
  crashFreeSessionsGraph: CrashFreeSessionsGraph[];
}

export interface MonthlySpend {
  currentMonth: number;
  previousMonth: number;
  changePercentage: number;
}

export interface SpendHistory {
  month: string;
  spend: number;
}

export interface SpendByService {
  service: string;
  spend: number;
  percentage: number;
}

export interface SpendByEnvironment {
  environment: string;
  spend: number;
  percentage: number;
}

export interface CrashFreeSessions {
  percentage: number;
  previousMonthPercentage: number;
  changePercentage: number;
}

export interface CrashFreeSessionsGraph {
  month: string;
  percentage: number;
}
