# Developer Quick Reference - New Features

## File Structure

```
src/
├── Components/
│   ├── Login.js                 # Login/Signup UI component
│   ├── ATSChecker.js            # ATS scoring UI component
│   ├── Header.js                # Updated with login/ATS buttons
│   ├── EditorPanel.js           # Updated with ATS tab
│   └── sections/
│       └── ...
├── Services/
│   ├── authService.js           # Authentication logic
│   ├── atsService.js            # ATS scoring logic
│   ├── aiService.js             # Existing AI enhancement
│   └── ...
├── App.js                       # Updated with auth & ATS state
└── ...
```

## Key Code Snippets

### Using Auth Service
```javascript
import { login, signup, logout, getCurrentUser } from './Services/authService';

// Login
const result = login(email, password);
if (result.success) {
  console.log('User:', result.user);
} else {
  console.log('Error:', result.error);
}

// Signup
const result = signup(name, email, password);

// Logout
logout();

// Get current user
const user = getCurrentUser();
```

### Using ATS Service
```javascript
import { calculateATSScore } from './Services/atsService';

const score = calculateATSScore(resumeData);
console.log('Overall Score:', score.overallScore);
console.log('Categories:', score.categories);
console.log('Recommendations:', score.recommendations);
```

### Resume Data Structure
```javascript
{
  personal: {
    fullName: string,
    email: string,
    phone: string,
    location: string,
    title: string,
    summary: string
  },
  experience: [
    {
      company: string,
      position: string,
      duration: string,
      description: string
    }
  ],
  education: [
    {
      institution: string,
      degree: string,
      year: string,
      gpa: string
    }
  ],
  skills: [string],
  projects: [
    {
      name: string,
      description: string,
      technologies: string
    }
  ]
}
```

## Component Props

### Login Component
```javascript
<Login onLoginSuccess={(user) => {}} />
```

### ATSChecker Component
```javascript
<ATSChecker resumeData={resumeData} />
```

### Header Component
```javascript
<Header 
  onDownload={() => {}}
  onATSClick={() => {}}
  user={userObject}
  onLogout={() => {}}
  showATSButton={true}
/>
```

## State Management

### App Component
```javascript
const [user, setUser] = useState(null);
const [showATS, setShowATS] = useState(false);
const [resumeData, setResumeData] = useState({...});
```

## Local Storage Keys

- `ai-resume-builder-user`: Current logged-in user
- `ai-resume-builder-users`: All registered users
- `resume-{userId}`: User's resume data

## Styling Classes Used

- Tailwind CSS gradients: `from-blue-600 to-purple-600`
- Status colors:
  - Success: `text-green-600`, `bg-green-50`
  - Warning: `text-yellow-600`, `bg-yellow-50`
  - Error: `text-red-600`, `bg-red-50`

## Icons Used (lucide-react)

- `Mail`: Email field
- `Lock`: Password field
- `User`: User account
- `Eye` / `EyeOff`: Password visibility
- `Download`: PDF download
- `FileText`: App logo
- `BarChart3`: ATS score
- `LogOut`: Logout button
- `CheckCircle` / `AlertCircle` / `XCircle`: Status indicators
- `TrendingUp`: Recommendations header

## Common Tasks

### Add a new user programmatically
```javascript
import { initializeUsers } from './Services/authService';

initializeUsers();
const users = JSON.parse(localStorage.getItem('ai-resume-builder-users'));
// Modify users array and save
localStorage.setItem('ai-resume-builder-users', JSON.stringify(users));
```

### Check if user is authenticated
```javascript
import { isAuthenticated } from './Services/authService';

if (isAuthenticated()) {
  // User is logged in
}
```

### Manually trigger ATS score calculation
```javascript
import { calculateATSScore } from './Services/atsService';

const atsResult = calculateATSScore(resumeData);
setAtsScore(atsResult);
```

### Clear all user data
```javascript
localStorage.clear(); // Clears entire localStorage
```

## Debugging

### Check saved users
```javascript
console.log(JSON.parse(localStorage.getItem('ai-resume-builder-users')));
```

### Check current user
```javascript
console.log(JSON.parse(localStorage.getItem('ai-resume-builder-user')));
```

### Check user's resume
```javascript
const user = JSON.parse(localStorage.getItem('ai-resume-builder-user'));
console.log(JSON.parse(localStorage.getItem(`resume-${user.id}`)));
```

### Test ATS scoring
```javascript
import { calculateATSScore } from './Services/atsService';

const testResume = {
  personal: { fullName: 'John Doe', email: 'john@example.com', ... },
  experience: [...],
  education: [...],
  skills: ['JavaScript', 'React'],
  projects: [...]
};

const score = calculateATSScore(testResume);
console.log(score);
```

## Performance Notes

- Auth checks happen on app mount only
- ATS scoring is calculated on component mount and when resumeData changes
- Resume data auto-saves on every change (debounced via useEffect)
- No API calls required (client-side only)

## Testing Checklist

- [ ] Login with demo account works
- [ ] Signup creates new account
- [ ] Logout clears data
- [ ] Resume data saves and loads per user
- [ ] ATS score updates when resume data changes
- [ ] Recommendations display correctly
- [ ] All icons display properly
- [ ] Responsive design works on mobile
- [ ] Print/PDF download excludes login UI

## Security Reminders

⚠️ **IMPORTANT**: Current implementation uses localStorage without encryption
- For production, implement server-side authentication
- Use HTTPS for secure communication
- Hash passwords before storage
- Implement session tokens
- Add CSRF protection
- Sanitize user input
