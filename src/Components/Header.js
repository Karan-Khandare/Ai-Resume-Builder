import React from 'react';
import { Download, FileText, BarChart3, LogOut } from 'lucide-react';

const Header = ({ onDownload, onATSClick, user, onLogout, showATSButton = false }) => {
  return (
    <div className="no-print bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Resume Builder</h1>
            <p className="text-xs text-gray-500">Powered by Claude AI</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="text-right mr-4 hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}

          {showATSButton && (
            <button
              onClick={onATSClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">ATS Score</span>
            </button>
          )}

          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          {user && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;