export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'investigator';
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  casesAssigned: number;
  phoneNumber: string;
  clearanceLevel: 'L1' | 'L2' | 'L3' | 'L4';
}

export interface Complaint {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: string;
  status: 'open' | 'investigating' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  fraudType: 'phone_scam' | 'voice_phishing' | 'impersonation' | 'other';
  voiceSamples: number;
  estimatedLoss: number;
  victimContact: string;
  location: string;
  evidenceFiles: string[];
  lastUpdated: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}