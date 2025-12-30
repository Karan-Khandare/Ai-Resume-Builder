# 🚀 AI Resume Builder

An intelligent resume building application with user authentication, AI-powered content enhancement, and ATS compatibility scoring.

## ✨ Features

### 1. 🔐 User Authentication
- Secure login and signup system
- Per-user resume data storage
- Auto-save functionality
- Demo account included (demo@example.com / demo123)

### 2. 🤖 AI-Powered Enhancement
- Enhance professional summaries
- Improve experience descriptions
- Upgrade project highlights
- **Works immediately** (no setup needed!)
- Optional Claude API integration for real AI

### 3. 📊 ATS Compatibility Scoring
- 5-category analysis (formatting, keywords, structure, content, length)
- Overall score (0-100)
- Personalized recommendations
- Real-time updates

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- npm or yarn package manager

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3001
```

### First Login
Use demo account or create new:
- **Email**: demo@example.com
- **Password**: demo123

## 📖 Documentation

Complete documentation available:
- **[COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** - Full feature guide
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick help card
- **[AI_ENHANCEMENT_GUIDE.md](AI_ENHANCEMENT_GUIDE.md)** - AI system details
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - Technical reference
- **[FEATURES.md](FEATURES.md)** - Detailed features
- **[PROJECT_COMPLETE.md](PROJECT_COMPLETE.md)** - Project summary

## 🎯 How to Use

### 1. Create Resume
- Login or signup
- Fill resume sections (Personal, Experience, Education, Skills, Projects)
- Content auto-saves

### 2. Enhance with AI
- Click "✨ Enhance with AI" buttons
- Get professional content instantly
- Edit if needed

### 3. Check ATS Score
- Click "ATS Score" button
- Review compatibility analysis
- Follow recommendations

### 4. Export Resume
- Click "Download PDF"
- Save and send to employers

## 💻 Tech Stack

- **React 19** - UI library
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons
- **LocalStorage** - Data persistence
- **Create React App** - Build tool

## 🔒 Security & Privacy

- ✅ All data stored locally (no server)
- ✅ Password protected accounts
- ✅ User data isolation
- ✅ No external tracking
- ✅ Secure logout

## 🎨 Features in Detail

### Resume Sections
- **Personal**: Name, email, phone, location, title, summary
- **Experience**: Company, position, duration, achievements
- **Education**: Institution, degree, year, GPA
- **Skills**: Technical and soft skills
- **Projects**: Project name, description, technologies

### ATS Scoring
Analyzes resume across:
1. **Formatting** (15%) - Layout and visual presentation
2. **Keywords** (25%) - Industry terms and skills
3. **Structure** (20%) - Clear organization
4. **Content** (25%) - Quality and relevance
5. **Length** (15%) - Appropriate detail level

### AI Enhancement
Generates content with:
- Strong action verbs
- Quantifiable metrics
- Professional language
- Achievement focus

## 🌐 Browser Support

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ All modern browsers

## 📱 Responsive Design

Works on:
- Desktop
- Tablet
- Mobile
- Print (PDF)

## 🛠️ Development

### Project Structure
```
src/
├── Components/        # React components
├── Services/          # Business logic
├── App.js            # Main app
└── index.js          # Entry point
```

### Key Components
- **Login.js** - Authentication UI
- **ATSChecker.js** - ATS scoring UI
- **EditorPanel.js** - Resume editor
- **ResumePreview.js** - Live preview

### Key Services
- **authService.js** - User authentication
- **atsService.js** - ATS calculation
- **aiService.js** - AI enhancement

## 📊 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3001](http://localhost:3001)

### `npm test`
Launches the test runner

### `npm run build`
Builds the app for production

### `npm run eject`
Ejects from Create React App (one-way operation)

## 🔑 Optional: Claude API Setup

For real AI-generated content (template-based works without this):

1. Get API key: https://console.anthropic.com/
2. Create `.env` file with:
   ```
   REACT_APP_CLAUDE_API_KEY=sk-ant-your-key-here
   ```
3. Restart the app

## 🐛 Troubleshooting

### Can't login?
- Check credentials
- Try demo account: demo@example.com / demo123
- Clear browser cache

### AI enhancement not working?
- It works offline with templates
- Check browser console for errors
- Try again - may be network issue

### ATS score seems wrong?
- Fill in more resume sections
- Add more content
- Refresh the page

### Resume not saving?
- Check if localStorage enabled
- Try different browser
- Refresh page

## 📞 Support

Check documentation files:
- Stuck? → [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- Need details? → [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)
- Technical? → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- AI question? → [AI_ENHANCEMENT_GUIDE.md](AI_ENHANCEMENT_GUIDE.md)

## 📝 License

This project is open source. Feel free to use and modify!

## 🎉 Ready to Build Your Resume?

1. Run `npm start`
2. Open http://localhost:3001
3. Login or create account
4. Build amazing resume
5. Check ATS compatibility
6. Download and apply!

---

**Happy resume building! 🚀**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
