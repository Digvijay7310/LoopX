import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/Axios';
import { MdCancel, MdReportGmailerrorred } from 'react-icons/md'

function ReportVideoComponent({ videoId, videoTitle }) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const reportOptions = [
    { value: '', label: 'Select a reason' },
    { value: 'spam', label: 'Spam or misleading' },
    { value: 'abuse', label: 'Abusive content' },
    { value: 'copyright', label: 'Copyright violation' },
    { value: 'other', label: 'Other' },
  ];

  const handleReport = async () => {
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/video/${videoId}/report`, { reason });
      toast.success(res.data.message);
      setShowModal(false);
      setReason('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error reporting video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 text-white gap-1 flex items-center p-1 rounded-2xl text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <MdReportGmailerrorred size={20} />
        Report
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-grayscale-55 bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-video-title"
        >
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 id="report-video-title" className="text-lg font-semibold mb-4">
              Report Video 
            </h2>
            {videoTitle && (
                <p className='text-sm text-gray-600 mb-4'>
                    Reporting: <span className='font-medium'>{videoTitle}</span>
                </p>
            )}

            <label htmlFor="reportReason" className="block mb-2 text-sm font-medium text-gray-700">
              Reason
            </label>
            <select
              id="reportReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {reportOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="px-2 py-1 text-red-600 bg-white"
                >
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center gap-1 px-3 py-1 rounded-md border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
               <MdCancel />Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <MdReportGmailerrorred size={20} />{loading ? 'Reporting...' : 'Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReportVideoComponent;
