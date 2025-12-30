import React from 'react';
import { Mail, Sparkles, Loader2 } from 'lucide-react';

const PersonalInfoSection = ({ data, updatePersonal, onAIEnhance, isGenerating }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Mail className="w-5 h-5 text-blue-600" />
        Personal Information
      </h2>
      <input
        type="text"
        placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => updatePersonal('fullName', e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="text"
        placeholder="Professional Title (e.g., Full Stack Developer)"
        value={data.title}
        onChange={(e) => updatePersonal('title', e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => updatePersonal('email', e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => updatePersonal('phone', e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <input
        type="text"
        placeholder="Location"
        value={data.location}
        onChange={(e) => updatePersonal('location', e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Professional Summary</label>
          <button
            onClick={() => onAIEnhance('summary')}
            disabled={isGenerating}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:shadow-md transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            AI Enhance
          </button>
        </div>
        <textarea
          placeholder="Brief professional summary..."
          value={data.summary}
          onChange={(e) => updatePersonal('summary', e.target.value)}
          rows="4"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;