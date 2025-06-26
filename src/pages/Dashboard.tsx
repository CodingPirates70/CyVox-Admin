import React from "react";
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Volume2,
  Shield,
  Clock,
  DollarSign,
} from "lucide-react";
import { mockUsers, mockComplaints } from "../data/mockData";

const Dashboard: React.FC = () => {
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const totalCases = mockComplaints.length;
  const activeCases = mockComplaints.filter(
    (c) => c.status === "investigating" || c.status === "open"
  ).length;
  const criticalCases = mockComplaints.filter(
    (c) => c.priority === "critical"
  ).length;
  const totalLoss = mockComplaints.reduce((sum, c) => sum + c.estimatedLoss, 0);
  const totalVoiceSamples = mockComplaints.reduce(
    (sum, c) => sum + c.voiceSamples,
    0
  );

  const recentActivity = [
    {
      type: "case",
      message: "New complaint CYV-2024-005 assigned to Agent Jennifer Wu",
      time: "2 hours ago",
    },
    {
      type: "analysis",
      message: "Voice analysis completed for case CYV-2024-002",
      time: "4 hours ago",
    },
    {
      type: "user",
      message: "Detective Sarah Johnson updated case status to investigating",
      time: "6 hours ago",
    },
    {
      type: "alert",
      message: "Critical priority case requires immediate attention",
      time: "8 hours ago",
    },
    {
      type: "system",
      message: "System backup completed successfully",
      time: "12 hours ago",
    },
  ];

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
              <p className="text-2xl font-bold text-slate-900">{activeUsers}</p>
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

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-600">Active Cases</p>
              <p className="text-2xl font-bold text-slate-900">{activeCases}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
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
        </div>
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

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
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
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center mb-6">
          <Clock className="h-6 w-6 text-slate-600 mr-2" />
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
            >
              <div
                className={`p-2 rounded-full ${
                  activity.type === "case"
                    ? "bg-blue-100"
                    : activity.type === "analysis"
                    ? "bg-purple-100"
                    : activity.type === "user"
                    ? "bg-green-100"
                    : activity.type === "alert"
                    ? "bg-red-100"
                    : "bg-slate-100"
                }`}
              >
                {activity.type === "case" ? (
                  <FileText className="h-4 w-4 text-blue-600" />
                ) : activity.type === "analysis" ? (
                  <Volume2 className="h-4 w-4 text-purple-600" />
                ) : activity.type === "user" ? (
                  <Users className="h-4 w-4 text-green-600" />
                ) : activity.type === "alert" ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <Shield className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">{activity.message}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
