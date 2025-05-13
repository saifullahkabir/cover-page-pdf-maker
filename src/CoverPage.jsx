import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const pdfRef = useRef();
  const [formData, setFormData] = useState({
    semester: '',
    year: '',
    jobNo: '',
    subjectName: '',
    subjectCode: '',
    projectTitle: '',
    studentName: '',
    rollNumber: '',
    submissionDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('assignment-cover.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 lg:p-6 flex flex-col items-center">
      <div className=" grid grid-cols-1 2xl:grid-cols-2 gap-6">
        {/* Input Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Enter Assignment Details</h2>
          <div className="space-y-3">
            {[
              { label: 'Semester', name: 'semester' },
              { label: 'Year', name: 'year' },
              { label: 'Job No', name: 'jobNo' },
              { label: 'Subject Name', name: 'subjectName' },
              { label: 'Subject Code', name: 'subjectCode' },
              { label: 'Project Title', name: 'projectTitle' },
              { label: 'Student Name', name: 'studentName' },
              { label: 'Roll Number', name: 'rollNumber' },
              { label: 'Submission Date', name: 'submissionDate' },
            ].map(({ label, name }) => (
              <div key={name} className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">{label}</span>
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cover Page Preview */}
        <div className="flex flex-col">
          <div 
            ref={pdfRef} 
            className="bg-white p-8 md:p-12 rounded-lg shadow-md flex flex-col"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            {/* University Header */}
            <div className="border-b-2 border-blue-800 pb-4 mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase">
                Chattogram Polytechnic Institue
              </h1>
              <p className="text-gray-600 mt-2">Department of Computer Science & Technology</p>
            </div>

            {/* Main Title */}
            <div className="text-center my-8 md:my-12">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
                Assignment Cover Page
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>

            {/* Assignment Details */}
            <div className="space-y-4 mb-8 md:mb-12">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Semester:</span>
                <span>{formData.semester || '-'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Year:</span>
                <span>{formData.year || '-'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Job No:</span>
                <span>{formData.jobNo || '-'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Subject:</span>
                <span>
                  {formData.subjectName || '-'} 
                  {formData.subjectCode && ` (${formData.subjectCode})`}
                </span>
              </div>
            </div>

            {/* Project Title */}
            <div className="text-center my-6 p-4 md:p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Project Title</h3>
              <h2 className="text-xl md:text-2xl font-bold text-blue-700 italic">
                {formData.projectTitle || 'Project Title Here'}
              </h2>
            </div>

            {/* Student Info */}
            <div className="mt-auto pt-8">
              <div className="flex justify-between border-t-2 border-blue-800 pt-4">
                <div>
                  <p className="font-semibold">Submitted by:</p>
                  <p>{formData.studentName || '-'}</p>
                  <p>Roll: {formData.rollNumber || '-'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Submission Date:</p>
                  <p>{formData.submissionDate || '-'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button 
            onClick={generatePDF}
            className=" mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;