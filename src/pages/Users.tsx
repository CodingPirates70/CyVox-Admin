import React, { useEffect, useState } from "react";
import { mockUsers } from "../data/mockData";
import ExpandableListItem from "../components/ExpandableListItem";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Activity,
  FileText,
  Clock,
} from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import { UserData } from "../types";

const Users: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
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

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [userList, setUserList] = useState<UserData[]>([]);
  const { data, loading, error } = useFetch(`/api/user/all`);

  useEffect(() => {
    if (data && data["All users"]) {
      setUserList(data["All users"]);
    }
  }, [data]);

  return loading ? (
    <Loading />
  ) : (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <User className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">
            Users Management
          </h1>
        </div>
        <p className="text-slate-600">
          Manage system users, roles, and permissions
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {userList.length}
            </div>
            <div className="text-sm text-slate-600">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {userList.filter((u) => "active").length}
            </div>
            <div className="text-sm text-slate-600">Active Users</div>
          </div>
          {/* <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mockUsers.filter((u) => u.role === "admin").length}
            </div>
            <div className="text-sm text-slate-600">Administrators</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockUsers.reduce((sum, u) => sum + u.casesAssigned, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Cases</div>
          </div> */}
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {userList.reduce(
                (sum, u) => sum + (u.previousComplaints?.length || 0),
                0
              )}
            </div>
            <div className="text-sm text-slate-600">Total Complaints</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {userList.map((user: any) => (
          <ExpandableListItem
            key={user._id}
            title={user.username || "Unknown"}
            subtitle={`User • Department`} // no department field available
            status={user.status || "active"} // default fallback
            statusColor={getStatusColor(user.status || "active")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Personal Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Email:</span>
                    <span className="ml-2 text-slate-900">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Phone:</span>
                    <span className="ml-2 text-slate-900">
                      {user.phoneNumber}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Join Date:</span>
                    <span className="ml-2 text-slate-900">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Clearance Level:</span>
                    <span className="ml-2 text-slate-900">Standard</span>{" "}
                    {/* not in backend */}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Complaints Filed:</span>
                    <span className="ml-2 text-slate-900 font-medium">
                      {user.previousComplaints?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Last Login:</span>
                    <span className="ml-2 text-slate-900">N/A</span>{" "}
                    {/* not in backend */}
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">Department:</span>
                    <span className="ml-2 text-slate-900">N/A</span>{" "}
                    {/* not in backend */}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors">
                      Edit User
                    </button>
                    <button className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-slate-200 transition-colors">
                      View Complaints
                    </button>
                    {user.status === "active" ? (
                      <button className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full hover:bg-red-200 transition-colors">
                        Suspend
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full hover:bg-green-200 transition-colors">
                        Activate
                      </button>
                    )}
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

export default Users;
