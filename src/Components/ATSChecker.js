import React, { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, AlertCircle, XCircle, TrendingUp } from 'lucide-react';
import { calculateATSScore } from '../Services/atsService';

const ATSChecker = ({ resumeData }) => {
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateScore();
  }, [resumeData]);

  const calculateScore = () => {
    setLoading(true);
    try {
      const score = calculateATSScore(resumeData);
      setAtsScore(score);
    } catch (error) {
      console.error('ATS Calculation Error:', error);
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreLabelColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'high':
        return 'border-l-4 border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing ATS compatibility...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!atsScore) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600">Unable to calculate ATS score</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className={`rounded-xl shadow-lg p-8 border ${getScoreBgColor(atsScore.overallScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BarChart3 className={`w-8 h-8 ${getScoreColor(atsScore.overallScore)}`} />
            <h2 className="text-2xl font-bold text-gray-900">ATS Compatibility Score</h2>
          </div>
        </div>

        <div className="flex items-end gap-6">
          <div className="flex-1">
            <div className="text-6xl font-bold mb-2">
              <span className={getScoreColor(atsScore.overallScore)}>
                {atsScore.overallScore}
              </span>
              <span className="text-3xl text-gray-600">/100</span>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  atsScore.overallScore >= 80
                    ? 'bg-green-500'
                    : atsScore.overallScore >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${atsScore.overallScore}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-600">
              {atsScore.overallScore >= 80
                ? '✓ Your resume is very ATS-friendly'
                : atsScore.overallScore >= 60
                ? '⚠ Your resume needs some improvements'
                : '✗ Your resume needs significant improvements'}
            </p>
          </div>

          <div className={`px-4 py-2 rounded-lg font-semibold ${getScoreLabelColor(atsScore.overallScore)}`}>
            {atsScore.overallScore >= 80
              ? 'EXCELLENT'
              : atsScore.overallScore >= 60
              ? 'GOOD'
              : 'NEEDS WORK'}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(atsScore.categories).map(([categoryName, categoryData]) => (
          <div key={categoryName} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {categoryName}
              </h3>
              <div className={`text-2xl font-bold ${getScoreColor(categoryData.score)}`}>
                {categoryData.score}
              </div>
            </div>

            {/* Mini Score Bar */}
            <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  categoryData.score >= 80
                    ? 'bg-green-500'
                    : categoryData.score >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${categoryData.score}%` }}
              ></div>
            </div>

            {/* Sub-checks */}
            <div className="space-y-2">
              {categoryData.checks.map((check, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{check.name}</span>
                  <span className={`font-semibold ${getScoreColor(check.score)}`}>
                    {check.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      {atsScore.recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Recommendations</h3>
          </div>

          <div className="space-y-4">
            {atsScore.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg flex gap-4 ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getPriorityIcon(rec.priority)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">{rec.category}</p>
                  <p className="text-sm text-gray-700">{rec.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-4">ATS Optimization Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✓ Use standard fonts (Arial, Calibri, Times New Roman)</li>
          <li>✓ Stick to simple formatting without graphics or tables</li>
          <li>✓ Include relevant keywords from job descriptions</li>
          <li>✓ Use bullet points to organize your experience</li>
          <li>✓ Keep clear section headers (Experience, Education, Skills, etc.)</li>
          <li>✓ Use standard date formats (MM/YYYY or Month Year)</li>
          <li>✓ Include quantifiable metrics and achievements</li>
          <li>✓ Save as PDF or DOC format when submitting</li>
        </ul>
      </div>
    </div>
  );
};

export default ATSChecker;
