import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from './assets/cpi-logo.png'

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
        experimentDate: '',
        submissionDate: '',
        group: '',
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
                            { label: 'Project Title', name: 'projectTitle' },
                            { label: 'Subject Name', name: 'subjectName' },
                            { label: 'Subject Code', name: 'subjectCode' },
                            { label: 'Job No', name: 'jobNo' },
                            { label: 'Experiment Date', name: 'experimentDate' },
                            { label: 'Submission Date', name: 'submissionDate' },

                            { label: 'Student Name', name: 'studentName' },
                            { label: 'Semester', name: 'semester' },
                            { label: 'Year', name: 'year' },
                            { label: 'Group', name: 'group' },
                            { label: 'Roll Number', name: 'rollNumber' },

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
                        <div className="border-b-2 border-blue-800 pb-4 mb-8 text-center ">
                            <div className='flex justify-center items-center gap-6'>
                                <img className='w-20 h-20 -ml-6' src={logo} alt="" />
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase">
                                        Chattogram Polytechnic Institue
                                    </h1>
                                    <p className="text-gray-600 mt-2">Department of Computer Science & Technology</p>
                                </div>
                            </div>
                        </div>

                        {/* Project Title */}
                        <div className="text-center my-6 p-4 md:p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-lg md:text-xl font-semibold mb-2 uppercase">Assignment Title </h3>
                            <h2 className="text-xl md:text-2xl font-bold text-blue-700 italic">
                                {formData.projectTitle || 'Project Title Here'}
                            </h2>
                        </div>

                        {/* Assignment Details */}
                        <div className="space-y-4 mb-8 md:mb-12 border p-6">
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold">Subject Name:</span>
                                <span>{formData.subjectName || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold">Subject Code:</span>
                                <span>{formData.subjectCode || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold">Job No:</span>
                                <span>{formData.jobNo || '-'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold">Experiment Date:</span>
                                <span>
                                    {formData.experimentDate || '-'}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="font-semibold">Submission Date:</span>
                                <span>
                                    {formData.submissionDate || '-'}
                                </span>
                            </div>
                        </div>

                        <div className='flex justify-between gap-5 '>
                            {/* Personal Details */}
                            <div className="space-y-4 mb-8 md:mb-12 border rounded-l-md p-4 flex-1">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Name:</span>
                                    <span>{formData.studentName || '-'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Semester:</span>
                                        <span>{formData.semester || '-'}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="font-semibold">Year:</span>
                                        <span>{formData.year || '-'}</span>
                                    </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Group:</span>
                                    <span>{formData.group || '-'}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="font-semibold">Roll Number:</span>
                                    <span>{formData.rollNumber || '-'}</span>
                                </div>
                            </div>

                            {/* Teacher Details */}
                            <div>
                                {/* Teacher Evaluation Box */}
                                <div className="w-[250px]">
                                    <div className=" border p-4 rounded-r-md">
                                        <h3 className="text-lg font-bold mb-2 text-center">Teacher's Evaluation</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-semibold">Remarks:</p>
                                                <p className="min-h-14 p-2 bg-gray-50 rounded">
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Grade:</p>
                                                <p className="min-h-14 p-2 bg-gray-50 rounded">
                                                </p>
                                            </div>
                                        </div>

                                        <div className="">
                                            <div>
                                                <p className="font-semibold">Teacher's Signature:</p>
                                                <p className="mt-2">{formData.teacherSignature || '_____________________________'}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Date:</p>
                                                <p className="mt-2">{formData.evaluationDate || '_____________________________'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
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