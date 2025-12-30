import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

const SkillsSection = ({ skills, updateSkills }) => {
  const [rawInput, setRawInput] = useState(skills.join(', '));

  // Update raw input when skills prop changes
  useEffect(() => {
    setRawInput(skills.join(', '));
  }, [skills]);

  const handleChange = (e) => {
    const value = e.target.value;
    setRawInput(value); // Show what user is typing
    updateSkills(value); // Also update the skills array
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Award className="w-5 h-5 text-blue-600" />
        Skills
      </h2>
      <p className="text-sm text-gray-600">
        Enter skills separated by commas or line breaks (e.g., React, Node.js, Python or React↵Node.js↵Python)
      </p>
      <textarea
        placeholder="Example: JavaScript, React, Node.js, Python, AWS&#10;Or type each skill on a new line"
        value={rawInput}
        onChange={handleChange}
        rows="5"
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
      />
      {skills.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-2">Preview (how it appears on resume):</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Resume display: {skills.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;