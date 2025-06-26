import React, { useEffect, useState } from "react";
import { mockComplaints } from "../data/mockData";
import ExpandableListItem from "../components/ExpandableListItem";
import {
  FileText,
  User,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  AlertTriangle,
  Clock,
  Paperclip,
  Volume2,
} from "lucide-react";
import { ComplaintData } from "../types";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

const Complaints: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatFraudType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const { data, loading, error } = useFetch(`/api/complaint/get-all`);
  const [complaintList, setComplaintList] = useState<ComplaintData[]>([]);

  useEffect(() => {
    if (data && data["All complaints"]) {
      setComplaintList(data["All complaints"]);
    }
  }, [data]);

  return loading ? (
    <Loading />
  ) : (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">
            Complaints Management
          </h1>
        </div>
        <p className="text-slate-600">
          Track and manage cyber fraud complaints and voice analysis cases
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {complaintList.length}
            </div>
            <div className="text-sm text-slate-600">Total Complaints</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {complaintList.filter((c) => "investigating").length}
            </div>
            <div className="text-sm text-slate-600">Under Investigation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {complaintList.filter((c) => "critical").length}
            </div>
            <div className="text-sm text-slate-600">Critical Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(
                complaintList.reduce((sum, c) => sum + c.moneyScammed, 0)
              )}
            </div>
            <div className="text-sm text-slate-600">Total Est. Loss</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {complaintList.map((complaint) => (
          <ExpandableListItem
            key={complaint._id}
            title={`${complaint._id} - ${complaint.complainSubject}`}
            subtitle={`Reported by ${complaint.username} • ${formatDate(
              complaint.createdAt
            )}`}
            // status={complaint.status}
            status={"open"}
            statusColor={getStatusColor("open")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Case Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-600 font-medium">
                      Description:
                    </span>
                    <p className="mt-1 text-slate-900">
                      {complaint.incidentDescription}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Priority:</span>
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        "critical" // Replace with complaint.priority if available
                      )}`}
                    >
                      {/* {complaint.priority.toUpperCase()} */}
                      {"Critical"}
                    </span>
                  </div>
                  {/* <div className="flex items-center">
                    <Phone className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Fraud Type:</span>
                    <span className="ml-2 text-slate-900">
                      {formatFraudType(complaint.fraudType)}
                    </span>
                  </div> */}
                  {/* <div className="flex items-center">
                    <User className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Assigned To:</span>
                    <span className="ml-2 text-slate-900">
                      {complaint.assignedTo}
                    </span>
                  </div> */}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Evidence & Impact
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Volume2 className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Voice Samples:</span>
                    <span className="ml-2 text-slate-900 font-medium">
                      {complaint.userConversationAudioUrl}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Estimated Loss:</span>
                    <span className="ml-2 text-slate-900 font-medium">
                      {formatCurrency(complaint.moneyScammed)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Location:</span>
                    <span className="ml-2 text-slate-900">
                      {complaint.city}, {complaint.district}, {complaint.state},{" "}
                      {complaint.pincode}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Last Updated:</span>
                    <span className="ml-2 text-slate-900">
                      {new Date(complaint.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Paperclip className="h-4 w-4 text-slate-400 mr-2" />
                    <span className="text-slate-600 font-medium text-sm">
                      Evidence Files:
                    </span>
                  </div>
                  <div className="space-y-1">
                    {/* {complaint.evidenceFiles.map((file, index) => (
                      <div
                        key={index}
                        className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        {file}
                      </div>
                    ))} */}
                    {complaint.scammerAudioUrl || "not available"}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full hover:bg-purple-200 transition-colors">
                      Voice Analysis
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors">
                      Contact Victim
                    </button>
                    <button className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full hover:bg-orange-200 transition-colors">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ExpandableListItem>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
