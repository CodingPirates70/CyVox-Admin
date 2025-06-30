import React from "react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

interface ComplaintDetailsProps {
  userId: string;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({ userId }) => {
  const { data, loading, error } = useFetch(`/api/complaint/user/${userId}`);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error.message || 'An error occurred.'}</div>;

  // Handle backend response structure
  const complaints = data?.complaints || [];

  if (!complaints.length) return <div>No complaint data found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Complaint Details</h2>
      {complaints.map((complaint: any) => (
        <div
          key={complaint._id || complaint.complaint_id}
          className="mb-6 p-6 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(complaint).map(([key, value]) => {
              // Render audio player for any field with 'audio' in the key and a valid URL value
              if (
                key.toLowerCase().includes('audio') &&
                typeof value === 'string' &&
                value.trim() !== '' &&
                (value.startsWith('http://') || value.startsWith('https://'))
              ) {
                // Make label more readable
                const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b[aA]udio\b/, 'Audio').trim();
                return (
                  <div key={key} className="flex flex-col gap-1 mt-2">
                    <span className="font-semibold text-blue-700">{label}:</span>
                    <audio controls className="w-full mt-1 rounded">
                      <source src={value} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                );
              }
              // Generalized rendering for any array of objects (matchedResults, matchedScammerComplaints, etc.)
              if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                // Collect all unique keys from all objects in the array
                const allKeys: string[] = Array.from(
                  value.reduce((keys: Set<string>, obj: Record<string, any>) => {
                    Object.keys(obj).forEach(k => keys.add(k));
                    return keys;
                  }, new Set<string>())
                );
                const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/\b[aA]udio\b/, 'Audio').trim();
                return (
                  <div key={key} className="mt-4">
                    <span className="font-semibold text-green-700 block mb-2">{label.charAt(0).toUpperCase() + label.slice(1)}:</span>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                          <tr>
                            {allKeys.map((colKey) => (
                              <th key={String(colKey)} className="px-3 py-2 border-b text-left text-sm font-semibold text-gray-700">
                                {String(colKey).replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                              </th>
                            ))} 
                          </tr>
                        </thead>
                        <tbody>
                          {value.map((item: any, idx: number) => (
                            <tr key={idx} className="hover:bg-gray-100">
                              {allKeys.map((colKey) => (
                                <td key={String(colKey)} className="px-3 py-2 border-b text-xs text-gray-900">
                                  {typeof item[String(colKey)] === 'object' && item[String(colKey)] !== null && '$oid' in item[String(colKey)]
                                    ? item[String(colKey)].$oid
                                    : typeof item[String(colKey)] === 'number'
                                      ? item[String(colKey)].toFixed(4)
                                      : item[String(colKey)] != null
                                        ? String(item[String(colKey)])
                                        : '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }
              // Default rendering for other fields
              return (
                <div key={key} className="flex flex-row gap-2 items-baseline">
                  <span className="font-semibold text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>
                  <span className="text-gray-900">{String(value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintDetails;
