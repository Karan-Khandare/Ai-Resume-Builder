// atsService.js - ATS Scoring System

const ATS_RULES = {
  formatting: {
    weight: 15,
    checks: [
      { name: 'Simple formatting', score: (data) => checkSimpleFormatting(data) },
      { name: 'No graphics or images', score: (data) => checkNoGraphics(data) },
      { name: 'Standard fonts', score: (data) => checkStandardFonts(data) }
    ]
  },
  keywords: {
    weight: 25,
    checks: [
      { name: 'Job keywords present', score: (data) => checkKeywords(data) },
      { name: 'Technical skills', score: (data) => checkTechnicalSkills(data) },
      { name: 'Action verbs', score: (data) => checkActionVerbs(data) }
    ]
  },
  structure: {
    weight: 20,
    checks: [
      { name: 'Clear sections', score: (data) => checkSections(data) },
      { name: 'Contact info', score: (data) => checkContactInfo(data) },
      { name: 'Proper formatting of entries', score: (data) => checkEntryFormatting(data) }
    ]
  },
  content: {
    weight: 25,
    checks: [
      { name: 'Bullet points used', score: (data) => checkBulletPoints(data) },
      { name: 'Quantifiable achievements', score: (data) => checkMetrics(data) },
      { name: 'Relevant experience', score: (data) => checkRelevantExperience(data) }
    ]
  },
  length: {
    weight: 15,
    checks: [
      { name: 'Appropriate length', score: (data) => checkLength(data) },
      { name: 'No missing sections', score: (data) => checkCompleteness(data) }
    ]
  }
};

// Scoring functions
const checkSimpleFormatting = (data) => {
  return 100; // Text-based resumes are ATS friendly by default
};

const checkNoGraphics = (data) => {
  // In a real app, this would check for actual images/graphics
  return 100;
};

const checkStandardFonts = (data) => {
  return 100;
};

const checkKeywords = (data) => {
  const commonKeywords = ['experience', 'skills', 'education', 'project', 'achievement'];
  const text = getFullText(data).toLowerCase();
  const foundKeywords = commonKeywords.filter(kw => text.includes(kw));
  return (foundKeywords.length / commonKeywords.length) * 100;
};

const checkTechnicalSkills = (data) => {
  const techSkills = data.skills.length > 0 ? 100 : 0;
  const techPattern = /javascript|python|java|react|node|sql|aws|azure|docker|kubernetes|git|html|css/gi;
  const skillsText = data.skills.join(' ') + ' ' + (data.experience.map(e => e.description).join(' ') || '');
  const techMatches = (skillsText.match(techPattern) || []).length;
  return techMatches > 0 ? 100 : 50;
};

const checkActionVerbs = (data) => {
  const actionVerbs = ['led', 'managed', 'developed', 'designed', 'implemented', 'created', 'improved', 'increased', 'reduced', 'achieved', 'built', 'deployed', 'enhanced', 'optimized', 'coordinated'];
  const experienceText = data.experience.map(e => e.description).join(' ').toLowerCase();
  const projectText = data.projects.map(p => p.description).join(' ').toLowerCase();
  const allText = (experienceText + ' ' + projectText).toLowerCase();
  
  const foundVerbs = actionVerbs.filter(verb => allText.includes(verb)).length;
  return Math.min((foundVerbs / actionVerbs.length) * 100, 100);
};

const checkSections = (data) => {
  let score = 100;
  if (!data.personal.fullName) score -= 25;
  if (data.experience.length === 0) score -= 20;
  if (data.education.length === 0) score -= 20;
  if (data.skills.length === 0) score -= 20;
  return Math.max(score, 0);
};

const checkContactInfo = (data) => {
  let score = 100;
  if (!data.personal.email) score -= 25;
  if (!data.personal.phone) score -= 25;
  if (!data.personal.fullName) score -= 25;
  return Math.max(score, 0);
};

const checkEntryFormatting = (data) => {
  let score = 100;
  
  // Check experience entries
  data.experience.forEach(exp => {
    if (!exp.company || !exp.position || !exp.duration) score -= 5;
  });
  
  // Check education entries
  data.education.forEach(edu => {
    if (!edu.institution || !edu.degree || !edu.year) score -= 5;
  });
  
  return Math.max(score, 0);
};

const checkBulletPoints = (data) => {
  const expDescriptions = data.experience.map(e => e.description || '').join(' ');
  const projDescriptions = data.projects.map(p => p.description || '').join(' ');
  const allText = (expDescriptions + ' ' + projDescriptions).toLowerCase();
  
  // Check if content appears to be in bullet point format
  const bulletPattern = /^[-•*]\s|[\n][-•*]\s/m;
  return bulletPattern.test(allText) ? 100 : 70;
};

const checkMetrics = (data) => {
  const numberPattern = /\d+(%|x|times|projects|years?|months?)?/gi;
  const experienceText = data.experience.map(e => e.description).join(' ');
  const projectText = data.projects.map(p => p.description).join(' ');
  const allText = experienceText + ' ' + projectText;
  
  const metrics = (allText.match(numberPattern) || []).length;
  return Math.min((metrics / 10) * 100, 100);
};

const checkRelevantExperience = (data) => {
  if (data.experience.length === 0) return 0;
  
  let relevanceScore = 0;
  const experienceText = data.experience.map(e => e.description + ' ' + e.position).toLowerCase();
  const fullText = experienceText.join(' ');
  
  // Check for relevant keywords
  const relevantKeywords = ['project', 'led', 'team', 'responsibility', 'achievement', 'developed', 'managed'];
  const foundKeywords = relevantKeywords.filter(kw => fullText.includes(kw)).length;
  
  return (foundKeywords / relevantKeywords.length) * 100;
};

const checkLength = (data) => {
  const totalWords = getFullText(data).split(/\s+/).length;
  // Ideal resume length is 300-600 words
  if (totalWords >= 300 && totalWords <= 600) return 100;
  if (totalWords >= 200 && totalWords <= 800) return 85;
  if (totalWords >= 100) return 70;
  return 50;
};

const checkCompleteness = (data) => {
  let score = 100;
  if (!data.personal.fullName) score -= 20;
  if (!data.personal.email) score -= 15;
  if (data.experience.length === 0) score -= 20;
  if (data.education.length === 0) score -= 20;
  if (data.skills.length === 0) score -= 20;
  return Math.max(score, 0);
};

const getFullText = (data) => {
  return [
    data.personal.fullName || '',
    data.personal.title || '',
    data.personal.summary || '',
    data.experience.map(e => e.company + ' ' + e.position + ' ' + e.description).join(' '),
    data.education.map(e => e.institution + ' ' + e.degree).join(' '),
    data.skills.join(' '),
    data.projects.map(p => p.name + ' ' + p.description).join(' ')
  ].join(' ');
};

export const calculateATSScore = (resumeData) => {
  const categories = {};
  let totalWeightedScore = 0;
  let totalWeight = 0;

  Object.entries(ATS_RULES).forEach(([category, config]) => {
    const categoryScores = config.checks.map(check => check.score(resumeData));
    const categoryAverage = categoryScores.reduce((a, b) => a + b, 0) / categoryScores.length;
    
    categories[category] = {
      score: Math.round(categoryAverage),
      weight: config.weight,
      checks: config.checks.map((check, idx) => ({
        name: check.name,
        score: Math.round(categoryScores[idx])
      }))
    };
    
    totalWeightedScore += categoryAverage * config.weight;
    totalWeight += config.weight;
  });

  const overallScore = Math.round(totalWeightedScore / totalWeight);

  return {
    overallScore,
    categories,
    recommendations: generateRecommendations(categories, resumeData)
  };
};

const generateRecommendations = (categories, data) => {
  const recommendations = [];

  // Formatting recommendations
  if (categories.formatting.score < 80) {
    recommendations.push({
      category: 'Formatting',
      suggestion: 'Use simple formatting with standard fonts. Avoid graphics, tables, and complex layouts.',
      priority: 'high'
    });
  }

  // Keywords recommendations
  if (categories.keywords.score < 80) {
    recommendations.push({
      category: 'Keywords',
      suggestion: 'Include more industry-specific keywords and technical terms relevant to your target job.',
      priority: 'high'
    });
  }

  // Structure recommendations
  if (categories.structure.score < 80) {
    if (!data.personal.email) {
      recommendations.push({
        category: 'Contact Info',
        suggestion: 'Add your email address at the top of your resume.',
        priority: 'critical'
      });
    }
    if (!data.personal.phone) {
      recommendations.push({
        category: 'Contact Info',
        suggestion: 'Include your phone number for better ATS compatibility.',
        priority: 'high'
      });
    }
  }

  // Content recommendations
  if (categories.content.score < 80) {
    recommendations.push({
      category: 'Content',
      suggestion: 'Use bullet points and include quantifiable achievements with numbers and percentages.',
      priority: 'high'
    });
  }

  // Length recommendations
  if (categories.length.score < 80) {
    const wordCount = data.personal.fullName.split(/\s+/).length +
      data.experience.map(e => (e.description || '').split(/\s+/).length).reduce((a, b) => a + b, 0);
    
    if (wordCount < 300) {
      recommendations.push({
        category: 'Length',
        suggestion: 'Add more content to your resume. Aim for at least 300 words.',
        priority: 'medium'
      });
    }
  }

  if (data.skills.length === 0) {
    recommendations.push({
      category: 'Skills',
      suggestion: 'Add relevant technical and soft skills that match job descriptions.',
      priority: 'critical'
    });
  }

  return recommendations;
};
