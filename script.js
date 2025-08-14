// OpenAI API Configuration
const OPENAI_API_KEY =
  "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";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Sample templates for different content categories
const sampleTemplates = {
  sports: {
    prompt:
      "Create an engaging post about the importance of regular exercise and sports in maintaining a healthy lifestyle. Include motivational tips and benefits.",
    context:
      "Focus on fitness motivation, workout tips, and the mental benefits of sports. Include actionable advice for beginners.",
    bio: "🏃‍♂️ Fitness Coach & Sports Enthusiast | Helping people achieve their health goals through sustainable exercise routines | Certified Personal Trainer | Marathon Runner | Building a community of motivated individuals 💪",
  },
  yoga: {
    prompt:
      "Write a calming and informative post about yoga benefits for mental health and stress relief. Include simple poses and mindfulness tips.",
    context:
      "Target people looking for stress relief and mental wellness. Include beginner-friendly yoga poses and breathing techniques.",
    bio: "🧘‍♀️ Yoga Instructor & Wellness Coach | 10+ years helping people find inner peace through mindfulness | RYT-500 Certified | Stress Management Expert | Creating a calmer world, one breath at a time ✨",
  },
  "cloud-computing": {
    prompt:
      "Create an educational post about cloud computing trends in 2025. Explain key concepts and career opportunities in simple terms.",
    context:
      "Make it accessible for beginners while being informative for tech professionals. Include practical examples and future predictions.",
    bio: "☁️ Cloud Solutions Architect | 8+ years in cloud computing & DevOps | AWS, Azure, GCP Certified | Helping businesses scale with cloud technology | Tech Mentor & Speaker | Building the future of digital infrastructure 🚀",
  },
  "healthy-lifestyle": {
    prompt:
      "Write a comprehensive post about building sustainable healthy habits. Cover nutrition, exercise, sleep, and mental wellness.",
    context:
      "Focus on practical, achievable tips that can be implemented daily. Include science-backed information and personal success stories.",
    bio: "🌟 Holistic Health Coach & Nutritionist | Transforming lives through sustainable wellness practices | Certified Health Coach | Plant-based Nutrition Expert | Helping busy professionals prioritize their health 🌱",
  },
  technology: {
    prompt:
      "Create an engaging post about emerging technology trends that will shape our future. Focus on AI, automation, and digital transformation.",
    context:
      "Explain complex tech concepts in simple terms. Include real-world examples and how these technologies affect everyday life.",
    bio: "🚀 Tech Innovation Consultant & AI Researcher | Exploring the future of technology | 12+ years in software development | AI/ML Specialist | Digital Transformation Expert | Making tech accessible to everyone 💻",
  },
};

// DOM elements
const userPromptInput = document.getElementById("userPrompt");
const userRecentPostsInput = document.getElementById("userRecentPosts");
const userBioInput = document.getElementById("userBio");
const platformSelect = document.getElementById("platform");
const generateBtn = document.getElementById("generateBtn");
const outputDiv = document.getElementById("output");

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Sample button click handlers
  document.querySelectorAll(".sample-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const template = this.getAttribute("data-template");
      loadSampleTemplate(template);
    });
  });

  // Generate button click handler
  generateBtn.addEventListener("click", generateContent);
});

// Load sample template
function loadSampleTemplate(templateType) {
  const template = sampleTemplates[templateType];
  if (template) {
    userPromptInput.value = template.prompt;
    userRecentPostsInput.value = template.context; // Load context from template
    userBioInput.value = template.bio; // Load bio from template

    // Auto-select appropriate platform and tone based on category
    if (templateType === "cloud-computing" || templateType === "technology") {
      platformSelect.value = "linkedin";
    } else if (
      templateType === "yoga" ||
      templateType === "healthy-lifestyle"
    ) {
      platformSelect.value = "instagram";
    } else {
      platformSelect.value = "all";
    }

    // Show success message
    showNotification("Template loaded successfully!", "success");
  }
}

// Generate content using OpenAI API
async function generateContent() {
  let prompt = userPromptInput.value.trim();
  let bio = userBioInput.value.trim();
  let context = userRecentPostsInput.value.trim();
  const platform = platformSelect.value;

  if (!prompt && !context && !bio) {
    prompt = `Create engaging ${platform} posts based on these trending topics in India`;
  }

  showLoading();

  try {
    const response = await callOpenAI(prompt, bio, context, platform);
    displayGeneratedContent(response, platform);
    showNotification("Content generated successfully!", "success");
  } catch (error) {
    console.error("Error generating content:", error);
    showNotification("Failed to generate content. Please try again.", "error");
  } finally {
    hideLoading();
  }
}

// Call OpenAI API
async function callOpenAI(prompt, bio, context, platform) {
  const systemPrompt = `
    You are a versatile social media content assistant specializing in creating short, engaging posts for any industry or topic.
    
    Priority Rules:
    1. If the user prompt exists → Use it as the main direction.
    2. Else if recent posts exist → Match their style, tone, and topics.
    3. Else if bio exists → Use it to determine their field and audience.
    4. Else → Use trending topics for their industry, localized to India if possible.
    
    Content Rules:
    - Keep posts under 500 characters.
    - Ensure all content is fresh, unique, and factually accurate.
    - Avoid sensitive, political, or controversial topics.
    - If recent posts exist, mimic their tone, vocabulary, and style.
    - Make content region-appropriate for India with subtle localization.
    - Hashtags: relevant, non-generic, and placed at the end. 
      - Instagram: 2–3 hashtags
      - LinkedIn: 1–2 hashtags
    - Output **exactly** 2–3 variations in this format:
      Variation 1: [Post text]
      Variation 2: [Post text]
      Variation 3: [Post text]
    
    User Data:
    Prompt: ${prompt}
    Recent Posts: ${context}
    Bio: ${bio}
    Platform: ${platform}
    
    Now, based on the above priority and rules, generate engaging post variations for the ${platform} platform.
    `;

  const userPrompt = `Please provide 2-3 variations of the content with different approaches for ${platform} platform.`;

  const requestBody = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 1000,
  };

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return parseOpenAIResponse(data.choices[0].message.content);
}

// Parse OpenAI response into structured format
function parseOpenAIResponse(content) {
  // Split content into variations (assuming OpenAI returns numbered variations)
  const variations = content.split(/\d+\./).filter((v) => v.trim());

  if (variations.length === 0) {
    // If parsing fails, return the content as a single variation
    return [
      {
        title: "Generated Content",
        content: content,
        image: "📱 Relevant image for your content",
      },
    ];
  }

  return variations.map((variation, index) => ({
    title: `Variation ${index + 1}`,
    content: variation.trim(),
    image: "📱 Relevant image for your content",
  }));
}

// Fallback responses for when API fails
function getFallbackResponses(templateType) {
  const fallbackContent = {
    sports: [
      {
        title: "Sports Motivation",
        content:
          "🏃‍♂️ Ready to crush your fitness goals? Remember, every champion started as a beginner!\n\n💪 Consistency beats perfection every time. Start where you are, use what you have, do what you can.\n\n🔥 Pro tip: Find a workout buddy or join a community. Accountability is the secret sauce to success!\n\nWhat's your fitness goal for this month? Drop it below! 👇\n\n#FitnessMotivation #SportsLife #HealthyLiving #WorkoutGoals #StayActive",
        image: "🏃‍♂️ Person running with determination",
      },
    ],
    yoga: [
      {
        title: "Yoga for Wellness",
        content:
          "🧘‍♀️ Take a deep breath and center yourself. Yoga isn't just about flexibility—it's about finding peace in chaos.\n\n✨ Simple poses to try today:\n• Child's Pose for relaxation\n• Mountain Pose for grounding\n• Cat-Cow for spine health\n\n🌿 Remember: The goal isn't to be perfect, it's to be present.\n\nHow do you practice mindfulness? Share your favorite techniques below! 💭\n\n#YogaLife #Mindfulness #Wellness #StressRelief #InnerPeace",
        image: "🧘‍♀️ Person in meditation pose",
      },
    ],
    "cloud-computing": [
      {
        title: "Cloud Computing Insights",
        content:
          "☁️ The cloud isn't just a buzzword—it's revolutionizing how businesses operate in 2025.\n\n🚀 Key trends to watch:\n• Multi-cloud strategies\n• Edge computing\n• AI-powered automation\n• Serverless architecture\n\n💡 Whether you're a developer or business leader, understanding cloud computing is essential for future success.\n\nWhat's your experience with cloud technologies? Let's discuss below! 💻\n\n#CloudComputing #TechTrends #DigitalTransformation #Innovation #FutureTech",
        image: "☁️ Cloud computing visualization",
      },
    ],
    "healthy-lifestyle": [
      {
        title: "Healthy Living Tips",
        content:
          "🌟 Small changes, big impact! Your health journey starts with one positive choice at a time.\n\n🥗 Today's healthy habit: Start your day with a glass of water and a nutritious breakfast.\n\n💤 Sleep tip: Create a bedtime routine and stick to it. Quality sleep is the foundation of good health.\n\n🧘‍♂️ Mental wellness: Take 5 minutes daily for deep breathing or meditation.\n\nWhat healthy habit are you working on? Share your journey below! 🌱\n\n#HealthyLiving #Wellness #SelfCare #HealthyHabits #Lifestyle",
        image: "🌟 Wellness and health symbols",
      },
    ],
    technology: [
      {
        title: "Tech Trends 2025",
        content:
          "🚀 Technology is evolving faster than ever! Here's what's shaping our digital future:\n\n🤖 AI and Machine Learning are becoming mainstream\n🌐 Web3 and blockchain are transforming industries\n📱 Edge computing is bringing power closer to users\n🔒 Cybersecurity is more critical than ever\n\n💡 The key is to stay curious and keep learning!\n\nWhich tech trend excites you most? Let's discuss the future! 🔮\n\n#TechTrends #Innovation #DigitalFuture #AI #Technology",
        image: "🚀 Futuristic technology concept",
      },
    ],
    // Add generic industry-agnostic fallbacks
    generic: [
      {
        title: "Industry Insights",
        content:
          "💡 Every industry has its unique challenges and opportunities. The key to success? Staying informed and adaptable!\n\n🔍 What's trending in your field today? Share your insights and let's learn from each other.\n\n📈 Remember: Innovation often comes from cross-industry collaboration and fresh perspectives.\n\nWhat industry trend are you most excited about? Drop your thoughts below! 👇\n\n#IndustryInsights #Innovation #ProfessionalGrowth #TrendingTopics #Networking",
        image: "💡 Lightbulb with industry symbols",
      },
      {
        title: "Professional Development",
        content:
          "🚀 Growth happens outside your comfort zone! Whether you're in tech, healthcare, finance, or any other industry, continuous learning is your superpower.\n\n📚 Pro tip: Follow industry leaders, join professional communities, and never stop asking questions.\n\n💪 Your expertise is valuable—share it, teach others, and watch your network grow!\n\nWhat skill are you developing this month? Let's motivate each other! 🌟\n\n#ProfessionalDevelopment #ContinuousLearning #IndustryGrowth #SkillBuilding #CareerAdvancement",
        image: "🚀 Professional growth concept",
      },
    ],
  };

  return fallbackContent[templateType] || fallbackContent["generic"];
}

// Display generated content
function displayGeneratedContent(responses, platform) {
  outputDiv.innerHTML = "";

  responses.forEach((response, index) => {
    const contentDiv = document.createElement("div");
    contentDiv.className = "generated-content";

    contentDiv.innerHTML = `
      <h4>${response.title}</h4>
      <p>${response.content}</p>
      <p><strong>Suggested Image:</strong> ${response.image}</p>
      <p class="hashtags"><strong>Platform:</strong> ${platform}</p>
    `;

    outputDiv.appendChild(contentDiv);
  });
}

// Show loading state
function showLoading() {
  outputDiv.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>Generating content with AI...</span>
    </div>
  `;
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<div class="spinner"></div> Generating...';
}

// Hide loading state
function hideLoading() {
  generateBtn.disabled = false;
  generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Content';
}

// Get template type from prompt
function getTemplateTypeFromPrompt(prompt) {
  if (!prompt) {
    return "generic"; // Default to generic for any industry
  }

  const lowerPrompt = prompt.toLowerCase();

  if (
    lowerPrompt.includes("sports") ||
    lowerPrompt.includes("exercise") ||
    lowerPrompt.includes("fitness")
  ) {
    return "sports";
  } else if (
    lowerPrompt.includes("yoga") ||
    lowerPrompt.includes("meditation") ||
    lowerPrompt.includes("mindfulness")
  ) {
    return "yoga";
  } else if (
    lowerPrompt.includes("cloud") ||
    lowerPrompt.includes("computing") ||
    lowerPrompt.includes("tech")
  ) {
    return "cloud-computing";
  } else if (
    lowerPrompt.includes("healthy") ||
    lowerPrompt.includes("lifestyle") ||
    lowerPrompt.includes("wellness")
  ) {
    return "healthy-lifestyle";
  } else if (
    lowerPrompt.includes("technology") ||
    lowerPrompt.includes("ai") ||
    lowerPrompt.includes("digital")
  ) {
    return "technology";
  } else {
    return "generic"; // Default to generic for any industry
  }
}

// Show notification
function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  let icon = "info-circle";
  if (type === "success") icon = "check-circle";
  else if (type === "error") icon = "exclamation-circle";

  notification.innerHTML = `
    <i class="fas fa-${icon}"></i>
    <span>${message}</span>
  `;

  // Add styles
  let backgroundColor = "#667eea"; // Default blue for info
  if (type === "success") backgroundColor = "#28a745";
  else if (type === "error") backgroundColor = "#dc3545";

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${backgroundColor};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    animation: slideIn 0.3s ease;
  `;

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
