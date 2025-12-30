// App.js
import React, { useState, useRef, useEffect } from 'react';
import Header from './Components/Header';
import EditorPanel from './Components/EditorPanel';
import ResumePreview from './Components/ResumePreview';
import Login from './Components/Login';
import { enhanceWithAI } from './Services/aiService';
import { getCurrentUser, logout, initializeUsers } from './Services/authService';


const App = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showATS, setShowATS] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  });
  const resumeRef = useRef(null);

  // Check for existing user on mount
  useEffect(() => {
    initializeUsers();
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Load saved resume data from localStorage
      const savedResume = localStorage.getItem(`resume-${currentUser.id}`);
      if (savedResume) {
        setResumeData(JSON.parse(savedResume));
      }
    }
  }, []);

  // Auto-save resume data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`resume-${user.id}`, JSON.stringify(resumeData));
    }
  }, [resumeData, user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActiveSection('personal');
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setResumeData({
      personal: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: []
    });
  };

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  const updateProject = (index, field, value) => {
    const updated = [...resumeData.projects];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, projects: updated }));
  };

  const updateSkills = (value) => {
    // Split by commas or new lines, trim whitespace, and filter empty strings
    let skillsArray = value
      .split(/[,\n]/) // Split by comma or newline
      .map(s => s.trim())
      .filter(s => s && s.length > 0);
    setResumeData(prev => ({ ...prev, skills: skillsArray }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', gpa: '' }]
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '' }]
    }));
  };

  const handleAIEnhance = async (type, index = null) => {
    setIsGenerating(true);
    try {
      const enhancedText = await enhanceWithAI(type, resumeData, index);
      
      if (type === 'summary') {
        updatePersonal('summary', enhancedText);
      } else if (type === 'experience') {
        updateExperience(index, 'description', enhancedText);
      } else if (type === 'project') {
        updateProject(index, 'description', enhancedText);
      }
    } catch (error) {
      console.error('AI Enhancement Error:', error);
      alert('AI enhancement failed. Please try again.');
    }
    setIsGenerating(false);
  };

  const downloadPDF = () => {
    window.print();
  };

  // Show login page if not authenticated
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <Header 
        onDownload={downloadPDF}
        onATSClick={() => setShowATS(!showATS)}
        user={user}
        onLogout={handleLogout}
        showATSButton={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showATS ? (
          <div>
            <button
              onClick={() => setShowATS(false)}
              className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
            >
              ← Back to Editor
            </button>
            <EditorPanel
              activeSection="ats"
              setActiveSection={setActiveSection}
              resumeData={resumeData}
              updatePersonal={updatePersonal}
              updateExperience={updateExperience}
              updateEducation={updateEducation}
              updateProject={updateProject}
              updateSkills={updateSkills}
              addExperience={addExperience}
              addEducation={addEducation}
              addProject={addProject}
              onAIEnhance={handleAIEnhance}
              isGenerating={isGenerating}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EditorPanel
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              resumeData={resumeData}
              updatePersonal={updatePersonal}
              updateExperience={updateExperience}
              updateEducation={updateEducation}
              updateProject={updateProject}
              updateSkills={updateSkills}
              addExperience={addExperience}
              addEducation={addEducation}
              addProject={addProject}
              onAIEnhance={handleAIEnhance}
              isGenerating={isGenerating}
            />

            <ResumePreview
              resumeData={resumeData}
              resumeRef={resumeRef}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;