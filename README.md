# AI Content Generator

A modern, responsive web application for generating AI-powered content for **any industry or topic** using OpenAI's GPT-4o-mini model. This project provides a user-friendly interface where users can input prompts and get AI-generated content, along with 5 sample content categories.

## Features

### 🚀 **5 Content Categories**
- **Sports**: Fitness motivation, workout tips, and mental benefits of sports
- **Yoga**: Mental health benefits, stress relief, and mindfulness tips
- **Cloud Computing**: Educational content about cloud trends and career opportunities
- **Healthy Lifestyle**: Comprehensive wellness tips covering nutrition, exercise, and mental health
- **Technology**: Emerging tech trends, AI, automation, and digital transformation

### 🎯 **Content Customization**
- **Platform Selection**: Checkbox-based platform selection (Facebook, Instagram, LinkedIn, YouTube, Twitter)
- **Recent Posts**: 4 structured fields for recent posts with prefilled examples
- **Custom prompt input**
- **Bio/Profile field** for personalized content
- **Smart priority system** for content generation

### 📱 **Modern UI/UX**
- Responsive design that works on all devices
- Beautiful gradient background and modern card-based layout
- **Platform checkboxes** with social media icons
- **Recent posts container** with organized input fields
- Smooth animations and hover effects
- Real-time content generation

### 🔧 **Technical Features**
- OpenAI GPT-4o-mini API integration
- **Dynamic Industry Detection**: AI automatically identifies and adapts to any industry
- **Smart Content Generation**: AI uses priority-based content sources
- **Prefilled Templates**: Complete examples for all content categories
- Fallback content when API is unavailable
- Loading states and notifications
- Multiple content variations generation

## Smart Content Generation

The AI follows a priority-based approach to generate content for **any industry**:

1. **User Prompt (HIGHEST PRIORITY)** - If provided, uses as the main source and primary direction
2. **User's Recent Posts (SECOND PRIORITY)** - Falls back to recent posts to understand content style and topics
3. **User Bio (THIRD PRIORITY)** - Uses profile information if no recent posts
4. **Industry-Relevant Trending Topics (LOWEST PRIORITY)** - Automatically uses industry-relevant trending topics as final fallback

**Industry Agnostic**: Whether you're in IT, healthcare, finance, education, retail, or any other industry, the AI will automatically detect your field and generate relevant content!

## How to Use

### 1. **Quick Start with Content Categories**
- Click on any of the 5 content category buttons to load pre-configured prompts
- Each category automatically sets appropriate platform settings
- Modify the generated prompt as needed

### 2. **Custom Content Generation**
- **Content Request (Highest Priority)**: Enter your main content request
- **Recent Posts (Second Priority)**: Share your recent posts or content ideas for style reference
- **Bio/Profile (Third Priority)**: Add your bio/profile information for industry context
- Select your target platform
- Click "Generate Content" to create AI-powered content

### 3. **AI Integration**
- The application uses OpenAI's GPT-4o-mini model
- **Automatically detects your industry** from your bio, posts, or prompts
- **Follows strict priority order** to ensure most relevant content generation
- Generates multiple content variations automatically
- Includes relevant hashtags and engagement elements
- Adapts content style based on platform preferences
- **Always generates content** - even with empty fields using trending topics

## Project Structure

```
AI Content Generator/
├── index.html          # Main HTML file with the user interface
├── styles.css          # CSS styling with modern design
├── script.js           # JavaScript functionality and OpenAI API integration
└── README.md           # Project documentation
```

## Content Categories

### Sports
- **Prompt**: Create an engaging post about the importance of regular exercise and sports in maintaining a healthy lifestyle
- **Context**: Focus on fitness motivation, workout tips, and the mental benefits of sports
- **Bio**: Fitness Coach & Sports Enthusiast with certification and marathon experience

### Yoga
- **Prompt**: Write a calming and informative post about yoga benefits for mental health and stress relief
- **Context**: Target people looking for stress relief and mental wellness with beginner-friendly poses
- **Bio**: Certified Yoga Instructor with 10+ years experience in mindfulness and stress management

### Cloud Computing
- **Prompt**: Create an educational post about cloud computing trends in 2025
- **Context**: Make it accessible for beginners while being informative for tech professionals
- **Bio**: Cloud Solutions Architect with AWS, Azure, GCP certifications and 8+ years experience

### Healthy Lifestyle
- **Prompt**: Write a comprehensive post about building sustainable healthy habits
- **Context**: Cover nutrition, exercise, sleep, and mental wellness with practical tips
- **Bio**: Holistic Health Coach & Nutritionist specializing in sustainable wellness practices

### Technology
- **Prompt**: Create an engaging post about emerging technology trends that will shape our future
- **Context**: Explain complex tech concepts in simple terms with real-world examples
- **Bio**: Tech Innovation Consultant & AI Researcher with 12+ years in software development

## OpenAI API Integration

The application is configured with OpenAI's GPT-4o-mini model and includes:
- Automatic content generation with multiple variations
- Platform-specific optimization
- Tone and style adaptation
- Fallback content when API is unavailable

## Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Click on content categories** to see how they work
4. **Customize prompts** and settings as needed
5. **Generate content** using AI

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Customization

### Adding New Content Categories
Edit the `sampleTemplates` object in `script.js`:

```javascript
const sampleTemplates = {
    'your-category': {
        prompt: "Your prompt here",
        context: "Your context here"
    }
    // ... existing categories
};
```

### Modifying Fallback Content
Edit the `getFallbackResponses` function to customize fallback content when the API is unavailable.

### Styling Changes
Modify `styles.css` to change colors, fonts, and layout.

## Future Enhancements

- [ ] Content history and saving
- [ ] Export to different formats (PDF, Word)
- [ ] Team collaboration features
- [ ] Analytics and performance tracking
- [ ] More content categories
- [ ] Custom AI model selection

## Contributing

Feel free to contribute to this project by:
- Adding new content categories
- Improving the UI/UX
- Adding new features
- Fixing bugs
- Improving documentation

## License

This project is open source and available under the MIT License.

## Support

If you have any questions or need help with the project, please open an issue or contact the development team.

---

**Happy Content Creating! 🎉** 