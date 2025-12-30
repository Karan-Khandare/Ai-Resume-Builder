import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ResumePreview = ({ resumeData, resumeRef }) => {
  return (
    <div className="lg:sticky lg:top-8 h-fit">
      <div id="resume-preview" ref={resumeRef} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resumeData.personal.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-blue-600 font-medium mb-3">
            {resumeData.personal.title || 'Professional Title'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {resumeData.personal.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {resumeData.personal.email}
              </span>
            )}
            {resumeData.personal.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {resumeData.personal.phone}
              </span>
            )}
            {resumeData.personal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {resumeData.personal.location}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.personal.summary && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resumeData.personal.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              WORK EXPERIENCE
            </h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-2">{exp.company}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                    <p className="text-sm text-blue-600">{edu.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{edu.year}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              TECHNICAL SKILLS
            </h2>
            <p className="text-sm text-gray-700">
              {resumeData.skills.join(', ')}
            </p>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
              PROJECTS
            </h2>
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="font-semibold text-gray-900">{proj.name || 'Project Name'}</h3>
                {proj.technologies && (
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Technologies: {proj.technologies}
                  </p>
                )}
                <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;