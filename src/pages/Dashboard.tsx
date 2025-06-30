import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Volume2,
  Clock,
  DollarSign,
} from "lucide-react";
import { User } from "../types";

interface Complaint {
  _id?: string;
  title?: string;
  subject?: string;
  description?: string;
  details?: string;
  createdAt?: string;
  [key: string]: any;
}

const Dashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]); // recent complaints for activity list
  const [allComplaints, setAllComplaints] = useState<Complaint[]>([]); // full list for stats
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [complaintsError, setComplaintsError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  // Fetch complaints
  useEffect(() => {
    setLoadingComplaints(true);
    setComplaintsError(null);
    fetch("api/complaint/get-all", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch complaints");
        const data = await res.json();
        // Backend returns { "All complaints": [...] }
        const complaintsArr = Array.isArray(data["All complaints"]) ? data["All complaints"] : [];
        setAllComplaints(complaintsArr); // store full array
        // Sort descending by createdAt, then take the first 6 for recent activity
        const sorted = complaintsArr.sort((a, b) => new Date(b.createdAt || b.dateOfIncident || 0).getTime() - new Date(a.createdAt || a.dateOfIncident || 0).getTime());
        setComplaints(sorted.slice(0, 6));
      })
      .catch((err) => {
        setComplaintsError(err.message || "Error fetching complaints");
      })
      .finally(() => setLoadingComplaints(false));
  }, []);

  // Fetch users
  useEffect(() => {
    setLoadingUsers(true);
    setUsersError(null);
    fetch("api/user/all", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        // Backend returns { users: [...] } or just array
        const usersArr = Array.isArray(data["All users"]) ? data["All users"] : [];
        setUsers(usersArr);
      })
      .catch((err) => {
        setUsersError(err.message || "Error fetching users");
      })
      .finally(() => setLoadingUsers(false));
  }, []);

  // Compute stats from real data
  const totalUsers = users.length;
  const activeUsers = users.length;
  const totalCases = allComplaints.length;
  const activeCases = allComplaints.filter(
    (c) => c.status === "investigating" || c.status === "open"
  ).length;
  const criticalCases = allComplaints.filter(
    (c) => c.priority === "critical"
  ).length;
  // Financial Impact: sum of all moneyScammed from complaints
  const totalLoss = allComplaints.reduce((sum, c) => sum + (c.moneyScammed || 0), 0);
  const totalVoiceSamples = allComplaints.reduce(
    (sum, c) => sum + (c.voiceSamples || 0),
    0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          {/* <Shield className="h-8 w-8 text-blue-600 mr-3" /> */}
          <img src="./CyVox.svg" alt="logo"></img>
          CyVox Dashboard
        </h1>
        <p className="text-slate-600 mt-2">
          Voice Recognition System - Admin Overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-slate-900">
                {loadingUsers ? "-" : activeUsers}
              </p>
              {usersError && <p className="text-red-500 text-xs">{usersError}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Total Cases</p>
              <p className="text-2xl font-bold text-slate-900">{totalCases}</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Active Cases</p>
              <p className="text-2xl font-bold text-slate-900">{activeCases}</p>
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">
                Critical Cases
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {criticalCases}
              </p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="h-6 w-6 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-900">
              Financial Impact
            </h3>
          </div>
          <p className="text-3xl font-bold text-orange-600 mb-2">
            {formatCurrency(totalLoss)}
          </p>
          <p className="text-sm text-slate-600">
            Total estimated loss from reported cases
          </p>
        </div>

        {/* <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <Volume2 className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-900">
              Voice Analysis
            </h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">
            {totalVoiceSamples}
          </p>
          <p className="text-sm text-slate-600">
            Total voice samples collected
          </p>
        </div> */}
      </div>

      {/* Recent Activity - Complaints */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center mb-6">
          <Clock className="h-6 w-6 text-slate-600 mr-2" />
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          {loadingComplaints ? (
            <div className="text-slate-500">Loading complaints...</div>
          ) : complaintsError ? (
            <div className="text-red-500">{complaintsError}</div>
          ) : complaints.length === 0 ? (
            <div className="text-slate-500">No recent complaints found.</div>
          ) : (
            complaints.map((complaint, idx) => (
              <div
                key={complaint._id || idx}
                className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
              >
                <div className="p-2 rounded-full bg-blue-100">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {complaint.complainSubject || complaint.title || complaint.subject || "Untitled Complaint"}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {complaint.incidentDescription || complaint.description || complaint.details || "No description."}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {complaint.createdAt ? new Date(complaint.createdAt).toLocaleString() : ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
