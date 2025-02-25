// // pages/Dashboard.tsx
// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// const Dashboard: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-100" style={{ height:"100vh" ,width:"100vw"}}>
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <h1 className="text-xl font-bold text-gray-900">Career Guidance Platform</h1>
//             </div>
//             <div className="flex items-center">
//               <button
//                 onClick={logout}
//                 className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="bg-white shadow rounded-lg p-6">
//             <div className="mb-4">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Welcome, {user?.firstName} {user?.lastName}
//               </h2>
//               <p className="text-gray-600">Status: {user?.status}</p>
//             </div>

//             <div className="border-t pt-4">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Test Completion</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     user?.status === 'test_done' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user?.status === 'test_done' ? 'Completed' : 'Pending'}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Report Status</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     user?.status === 'report_generated' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user?.status === 'report_generated' ? 'Generated' : 'Pending'}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Final Report</span>
//                   <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                     user?.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user?.status === 'sent' ? 'Sent' : 'Pending'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// pages/Dashboard.tsx
// Replace your existing Dashboard component with this updated version
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState("Pending");
  const [reportPath, setReportPath] = useState<string | null>(null);

  useEffect(() => {
    const checkReportStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('/api/questionnaire/report-status', {
          headers: { 
            "Authorization": `Bearer ${token}`,
          }
        });

        if (!response.ok) throw new Error("Failed to fetch status");
        
        const data = await response.json();
        setStatus(data.status);
        setReportPath(data.reportPath);

        // Continue polling if still analyzing
        if (data.status === 'Analyzing') {
          setTimeout(checkReportStatus, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        console.error("Error checking report status:", error);
      }
    };

    checkReportStatus();
  }, []);

  const handleDownload = async () => {
    if (!user || !user.firstName || !user.lastName) {
      console.error("User details are missing.");
      return;
    }
  
    // Generate the expected filename based on user name
    const reportFilename = `${user.firstName}_${user.lastName}_Career_Report.pdf`.replace(/\s+/g, "_");
  
    try {
      const token = localStorage.getItem("token");
  
      // Use the correct backend URL and change method to GET
      const backendUrl = `http://localhost:3001/api/download-report/${reportFilename}`;
  
      const response = await fetch(backendUrl, {
        method: "GET",  // Change from POST to GET
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to download report");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = reportFilename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      alert("Failed to download report. Please try again.");
    }
  };
  
  



  return (
    <div className="min-h-screen bg-gray-100" style={{ height:"100vh" ,width:"100vw"}}>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Career Guidance Platform</h1>
            </div>
            <div className="flex items-center">
              <button onClick={logout} className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-600">Status: {status}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Test Completion</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    status === "Analyzing" ? "bg-yellow-100 text-yellow-800" :
                    status === "Successful" ? "bg-blue-100 text-blue-800" :
                    status === "Final Report Successful" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {status}
                  </span>
                </div>
              </div>

              {reportPath && (
                <div className="mt-6">
                  <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Download Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
