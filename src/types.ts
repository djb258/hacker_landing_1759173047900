export interface Step {
  unique_id: string;
  process_id: string;
  altitude: number;
  tool_id?: string;
  table_reference?: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface Process {
  id: string;
  name: string;
  description: string;
  steps: Step[];
}

export type AltitudeLevel = 30000 | 20000 | 10000;

export interface PhaseGroup {
  altitude: AltitudeLevel;
  title: string;
  color: 'red' | 'yellow' | 'green';
  steps: Step[];
}