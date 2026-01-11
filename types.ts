
export type SourceType = 'X' | 'Gmail' | 'Drive' | 'System';

export interface PromptSource {
  id: string;
  type: SourceType;
  title: string;
  originalContent: string;
  timestamp: string;
  url?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  userVariables: string[];
  category: string;
  tags: string[];
  status: 'draft' | 'ready' | 'active';
  usageCount: number;
}

export interface ScanningStats {
  totalProcessed: number;
  sourcesConnected: number;
  templatesGenerated: number;
  isScanning: boolean;
}
