import React from 'react';
import { GraduationCap } from 'lucide-react';

const EducationSection = ({ education, updateEducation, addEducation }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Education
        </h2>
        <button
          onClick={addEducation}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add
        </button>
      </div>
      {education.map((edu, idx) => (
        <div key={idx} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
          <input
            type="text"
            placeholder="Institution Name"
            value={edu.institution}
            onChange={(e) => updateEducation(idx, 'institution', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(idx, 'degree', e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => updateEducation(idx, 'year', e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            placeholder="GPA (optional)"
            value={edu.gpa}
            onChange={(e) => updateEducation(idx, 'gpa', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default EducationSection;