// AI Enhancement Service with fallback templates
// Note: This uses template-based enhancement. For real AI API, add your API key to .env

const ACTION_VERBS = [
  'Led', 'Managed', 'Developed', 'Designed', 'Implemented', 'Created',
  'Improved', 'Increased', 'Reduced', 'Achieved', 'Built', 'Deployed',
  'Enhanced', 'Optimized', 'Coordinated', 'Executed', 'Spearheaded',
  'Pioneered', 'Transformed', 'Accelerated'
];

const METRICS_TEMPLATES = [
  'increased efficiency by %',
  'reduced costs by %',
  'improved performance by %',
  'achieved % success rate',
  'delivered % faster',
  'grew team by %',
  'processed % transactions',
  'served % users',
  '% ROI improvement'
];

// Generate enhanced text based on context
const generateEnhancedText = (type, data, prompt) => {
  const randomVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const randomMetric = METRICS_TEMPLATES[Math.floor(Math.random() * METRICS_TEMPLATES.length)];
  
  if (type === 'summary') {
    const title = data.personal.title || 'professional';
    const skills = data.skills.slice(0, 3).join(', ') || 'technical expertise';
    
    return `${randomVerb} ${title} with proven expertise in ${skills}. Dedicated to delivering high-impact solutions and driving organizational success through innovative problem-solving and strategic execution. Seeking to leverage comprehensive experience to contribute meaningfully to challenging projects.`;
  }
  
  if (type === 'experience') {
    const templates = [
      `${randomVerb} cross-functional teams to design and implement solutions that ${randomMetric}`,
      `${randomVerb} technical initiatives resulting in ${randomMetric}`,
      `${randomVerb} project delivery ensuring ${randomMetric}`,
      `${randomVerb} process improvements that delivered ${randomMetric}`,
      `${randomVerb} development efforts achieving ${randomMetric}`
    ];
    
    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
    return `• ${selectedTemplate}\n• Collaborated with stakeholders to identify requirements and deliver solutions\n• Documented processes and trained team members on best practices`;
  }
  
  if (type === 'project') {
    const skills = data.skills.slice(0, 2).join(' and ') || 'cutting-edge technologies';
    
    return `Developed an innovative solution using ${skills} that ${randomMetric}. Implemented best practices in code quality and user experience, resulting in a robust and scalable application. Successfully demonstrated project outcomes and received positive feedback from stakeholders.`;
  }
  
  return '';
};

// Main AI Enhancement function with proper error handling
export const enhanceWithAI = async (type, resumeData, index = null) => {
  try {
    let prompt = '';
    
    if (type === 'summary') {
      prompt = `Professional Summary Enhancement`;
    } else if (type === 'experience') {
      if (!resumeData.experience[index]) {
        throw new Error('Invalid experience index');
      }
      prompt = `Experience Enhancement`;
    } else if (type === 'project') {
      if (!resumeData.projects[index]) {
        throw new Error('Invalid project index');
      }
      prompt = `Project Enhancement`;
    }

    // Check if API key is configured
    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
    
    if (apiKey && apiKey.startsWith('sk-')) {
      // Use Claude API if configured
      return await callClaudeAPI(type, resumeData, index, apiKey);
    } else {
      // Use intelligent template-based enhancement as fallback
      return generateEnhancedText(type, resumeData, prompt);
    }
  } catch (error) {
    console.error('AI Enhancement Error:', error);
    // Return template-based enhancement as fallback
    return generateEnhancedText(type, resumeData, '');
  }
};

// Claude API Integration (optional - requires API key in .env)
const callClaudeAPI = async (type, resumeData, index, apiKey) => {
  let prompt = '';
  
  if (type === 'summary') {
    prompt = `Write a compelling professional summary for a ${resumeData.personal.title || 'professional'} with the following background: ${JSON.stringify(resumeData)}. Keep it to 2-3 sentences, impactful and ATS-friendly.`;
  } else if (type === 'experience') {
    const exp = resumeData.experience[index];
    prompt = `Enhance this job description for ${exp.position} at ${exp.company}: "${exp.description}". Make it achievement-focused with metrics, use strong action verbs, and keep it to 3-4 bullet points.`;
  } else if (type === 'project') {
    const proj = resumeData.projects[index];
    prompt = `Enhance this project description: "${proj.description}". Make it impressive, technical, and highlight impact. Keep it to 2-3 sentences.`;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
};