export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "investigator";
  department: string;
  joinDate: string;
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
  casesAssigned: number;
  phoneNumber: string;
  clearanceLevel: "L1" | "L2" | "L3" | "L4";
}

export interface Complaint {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: string;
  status: "open" | "investigating" | "closed" | "pending";
  priority: "low" | "medium" | "high" | "critical";
  assignedTo: string;
  fraudType: "phone_scam" | "voice_phishing" | "impersonation" | "other";
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

export interface PreviousComplaint {
  complaint_id: string;
  complaint_date: string;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  clerkUserId: string;
  createdAt: string;
  updatedAt: string;
  audioUrl?: string;
  previousComplaints?: PreviousComplaint[];
  status?: string;
}

export interface MatchedResult {
  matched_id: string;
  matched_score: number;
}

export interface ComplaintData {
  _id: string;
  username: string;
  userId: string;
  clerkUserId: string;
  email: string;
  userPhoneNumber: string;
  scammerPhoneNumber: string;
  callFrequency: number;
  userConversationAudioUrl: string | null;
  city: string;
  district: string;
  state: string;
  pincode: string;
  streetAddress: string;
  complainSubject: string;
  incidentDescription: string;
  moneyScammed: number;
  createdAt: string;
  updatedAt: string;
  scammerAudioUrl: string;
  matchedResults: MatchedResult[];
}
