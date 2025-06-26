import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableListItemProps {
  title: string;
  subtitle: string;
  status?: string;
  statusColor?: string;
  children: React.ReactNode;
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  title,
  subtitle,
  status,
  statusColor = "bg-slate-100 text-slate-800",
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-medium text-slate-900">{title}</h3>
              {status && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                >
                  {status}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-slate-100 bg-slate-50">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default ExpandableListItem;
