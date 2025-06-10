export interface Job {
  id: number;
  title: string;
  client: string;
  location: string;
  roleLevel: string;
  skills: string[];
  workMode: 'WFH' | 'WFO' | 'Hybrid';
  shiftOptions: string[];
  yoeMin: number;
  yoeMax: number;
  jdSummary: string;
}
