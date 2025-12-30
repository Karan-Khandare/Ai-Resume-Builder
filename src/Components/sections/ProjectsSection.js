import React from 'react';
import { FileText, Wand2, Loader2 } from 'lucide-react';

const ProjectsSection = ({ projects, updateProject, addProject, onAIEnhance, isGenerating }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Projects
        </h2>
        <button
          onClick={addProject}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add
        </button>
      </div>
      {projects.map((proj, idx) => (
        <div key={idx} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
          <input
            type="text"
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => updateProject(idx, 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Technologies Used"
            value={proj.technologies}
            onChange={(e) => updateProject(idx, 'technologies', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-600">Description</label>
              <button
                onClick={() => onAIEnhance('project', idx)}
                disabled={isGenerating}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:shadow-md transition-all disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                Enhance
              </button>
            </div>
            <textarea
              placeholder="Project description and impact..."
              value={proj.description}
              onChange={(e) => updateProject(idx, 'description', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;