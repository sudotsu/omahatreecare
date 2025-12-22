export type RiskLevel = 'high' | 'moderate' | 'low';
export type AilmentType = 'pest' | 'disease' | 'environmental';
export type Severity = 'critical' | 'serious' | 'moderate';

export interface Tree {
  name: string;
  scientificName: string;
  riskLevel: RiskLevel;
  characteristics: string[];
  commonIssues: string[];
  maintenanceNotes: string;
  size: string;
  strengths?: string[];
}

export interface Ailment {
  name: string;
  type: AilmentType;
  severity: Severity;
  symptoms: string[];
  affectedSpecies: string[];
  treatment: string;
  prevention: string;
  timing: string;
}

export interface Service {
  name: string;
  description: string;
  priceRange: string;
  typical: string;
  factors: string[];
}

export interface DIYTask {
  name: string;
  category: 'safe-diy' | 'risky-diy' | 'professional-only';
  description: string;
  safety: string[];
  tools?: string[];
  whenToCall: string;
}
