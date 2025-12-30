import React from 'react';
import PersonalInfoSection from './sections/PersonalInfoSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ATSChecker from './ATSChecker';

const EditorPanel = ({
  activeSection,
  setActiveSection,
  resumeData,
  updatePersonal,
  updateExperience,
  updateEducation,
  updateProject,
  updateSkills,
  addExperience,
  addEducation,
  addProject,
  onAIEnhance,
  isGenerating
}) => {
  const sections = ['personal', 'experience', 'education', 'skills', 'projects', 'ats'];

  return (
    <div className="no-print space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeSection === section
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Section Content */}
        {activeSection === 'personal' && (
          <PersonalInfoSection
            data={resumeData.personal}
            updatePersonal={updatePersonal}
            onAIEnhance={onAIEnhance}
            isGenerating={isGenerating}
          />
        )}

        {activeSection === 'experience' && (
          <ExperienceSection
            experience={resumeData.experience}
            updateExperience={updateExperience}
            addExperience={addExperience}
            onAIEnhance={onAIEnhance}
            isGenerating={isGenerating}
          />
        )}

        {activeSection === 'education' && (
          <EducationSection
            education={resumeData.education}
            updateEducation={updateEducation}
            addEducation={addEducation}
          />
        )}

        {activeSection === 'skills' && (
          <SkillsSection
            skills={resumeData.skills}
            updateSkills={updateSkills}
          />
        )}

        {activeSection === 'projects' && (
          <ProjectsSection
            projects={resumeData.projects}
            updateProject={updateProject}
            addProject={addProject}
            onAIEnhance={onAIEnhance}
            isGenerating={isGenerating}
          />
        )}

        {activeSection === 'ats' && (
          <ATSChecker resumeData={resumeData} />
        )}
      </div>
    </div>
  );
};

export default EditorPanel;