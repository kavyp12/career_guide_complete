// // src/Pages/AddMarks.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaPlus, FaTrash } from 'react-icons/fa';
// import '../styles/MarksEntry.css';

// interface Subject {
//   subjectName: string;
//   marks: string;
//   totalMarks: string;
// }

// const MarksEntry = () => {
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState<Subject[]>([
//     { subjectName: '', marks: '', totalMarks: '100' }
//   ]);
//   const [error, setError] = useState<string>('');

//   const handleInputChange = (index: number, field: keyof Subject, value: string) => {
//     const newSubjects = [...subjects];
//     newSubjects[index][field] = value;
    
//     // Auto-fill total marks to 100 if empty
//     if (field === 'subjectName' && value && !newSubjects[index].totalMarks) {
//       newSubjects[index].totalMarks = '100';
//     }
    
//     setSubjects(newSubjects);
//   };

//   const addSubject = () => {
//     setSubjects([...subjects, { subjectName: '', marks: '', totalMarks: '100' }]);
//   };

//   const removeSubject = (index: number) => {
//     if (subjects.length === 1) return;
//     const newSubjects = subjects.filter((_, i) => i !== index);
//     setSubjects(newSubjects);
//   };

//   const validateForm = () => {
//     for (const subject of subjects) {
//       if (!subject.subjectName.trim()) return 'All subjects must have a name';
//       if (!subject.marks || isNaN(Number(subject.marks))) return 'Invalid marks entered';
//       if (Number(subject.marks) > Number(subject.totalMarks)) return 'Marks cannot exceed total marks';
//     }
//     return '';
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please login again');
//         return;
//       }

//       const response = await fetch('http://localhost:3000/api/marks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           subjects: subjects.map(subject => ({
//             subjectName: subject.subjectName.trim(),
//             marks: parseInt(subject.marks),
//             totalMarks: parseInt(subject.totalMarks)
//           }))
//         }),
//       });

//       if (response.ok) {
//         navigate('/questionnaire');
//       } else {
//         const data = await response.json();
//         setError(data.error || 'Failed to submit marks');
//       }
//     } catch (error) {
//       console.error('Error submitting marks:', error);
//       setError('Network error. Please try again.');
//     }
//   };

//   return (
//     <div className="marks-entry-container">
//       <h1>Enter Your Academic Marks</h1>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit} className="marks-form">
//         {subjects.map((subject, index) => (
//           <div key={index} className="subject-card">
//             <div className="subject-header">
//               <h3>Subject #{index + 1}</h3>
//               {subjects.length > 1 && (
//                 <button 
//                   type="button" 
//                   className="remove-btn"
//                   onClick={() => removeSubject(index)}
//                 >
//                   <FaTrash />
//                 </button>
//               )}
//             </div>
//             <div className="subject-body">
//               <div className="form-group">
//                 <label>Subject Name:</label>
//                 <input
//                   type="text"
//                   value={subject.subjectName}
//                   onChange={(e) => handleInputChange(index, 'subjectName', e.target.value)}
//                   placeholder="Enter subject name"
//                   required
//                 />
//               </div>
//               <div className="marks-group">
//                 <div className="form-group">
//                   <label>Marks Obtained:</label>
//                   <input
//                     type="number"
//                     value={subject.marks}
//                     onChange={(e) => handleInputChange(index, 'marks', e.target.value)}
//                     placeholder="0"
//                     min="0"
//                     max={subject.totalMarks || 100}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Total Marks:</label>
//                   <input
//                     type="number"
//                     value={subject.totalMarks}
//                     onChange={(e) => handleInputChange(index, 'totalMarks', e.target.value)}
//                     placeholder="100"
//                     min="0"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="form-actions">
//           <button 
//             type="button" 
//             className="add-subject-btn"
//             onClick={addSubject}
//           >
//             <FaPlus /> Add Subject
//           </button>
//           <button type="submit" className="submit-btn">
//             Save All Marks
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Subject {
  subjectName: string;
  marks: string;
  totalMarks: string;
}

const MarksEntry = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([
    { subjectName: '', marks: '', totalMarks: '100' }
  ]);
  const [error, setError] = useState<string>('');

  const handleInputChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    
    // Auto-fill total marks to 100 if empty
    if (field === 'subjectName' && value && !newSubjects[index].totalMarks) {
      newSubjects[index].totalMarks = '100';
    }
    
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subjectName: '', marks: '', totalMarks: '100' }]);
  };

  const removeSubject = (index: number) => {
    if (subjects.length === 1) return;
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const validateForm = () => {
    for (const subject of subjects) {
      if (!subject.subjectName.trim()) return 'All subjects must have a name';
      if (!subject.marks || isNaN(Number(subject.marks))) return 'Invalid marks entered';
      if (Number(subject.marks) > Number(subject.totalMarks)) return 'Marks cannot exceed total marks';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login again');
        return;
      }

      const response = await fetch('http://localhost:3000/api/marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          subjects: subjects.map(subject => ({
            subjectName: subject.subjectName.trim(),
            marks: parseInt(subject.marks),
            totalMarks: parseInt(subject.totalMarks)
          }))
        }),
      });

      if (response.ok) {
        navigate('/questionnaire');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit marks');
      }
    } catch (error) {
      console.error('Error submitting marks:', error);
      setError('Network error. Please try again.');
    }
  };
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen w-full p-4" style={{height: "100vh",width:"100vw"}}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
            Enter Your Academic Marks
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6 flex items-center space-x-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-6">
              {subjects.map((subject, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Subject #{index + 1}
                    </h3>
                    {subjects.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="flex items-center px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        <FaTrash className="mr-1" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Subject Name:
                      </label>
                      <input
                        type="text"
                        value={subject.subjectName}
                        onChange={(e) => handleInputChange(index, 'subjectName', e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter subject name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Marks Obtained:
                        </label>
                        <input
                          type="number"
                          value={subject.marks}
                          onChange={(e) => handleInputChange(index, 'marks', e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                          placeholder="0"
                          min="0"
                          max={subject.totalMarks || 100}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Total Marks:
                        </label>
                        <input
                          type="number"
                          value={subject.totalMarks}
                          onChange={(e) => handleInputChange(index, 'totalMarks', e.target.value)}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                          placeholder="100"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={addSubject}
                  className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  <FaPlus className="mr-2" /> Add Subject
                </button>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Save All Marks
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarksEntry;