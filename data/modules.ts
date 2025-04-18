export type LearningModule = {
  id: string
  title: string
  description: string
  icon: string
  lessons: number
  estimatedTime: number
  difficulty: "beginner" | "intermediate" | "advanced"
  prerequisites?: string[]
  content: ModuleContent[]
}

export type ModuleContent = {
  id: string
  type: "reading" | "video" | "interactive" | "quiz"
  title: string
  content: string
  quizQuestions?: QuizQuestion[]
}

export type QuizQuestion = {
  id: string
  question: string
  type: "multiple-choice" | "fill-in-blank"
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "web-fundamentals",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build interactive websites.",
    icon: "🌐",
    lessons: 5,
    estimatedTime: 120,
    difficulty: "beginner",
    content: [
      {
        id: "intro-to-html",
        type: "reading",
        title: "Introduction to HTML",
        content: `
          <h2>HTML: The Building Blocks of the Web</h2>
          <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages.</p>
          
          <h3>Basic Structure</h3>
          <p>Every HTML document has a basic structure that includes the following elements:</p>
          <ul>
            <li><strong>&lt;!DOCTYPE html&gt;</strong> - Declares the document type</li>
            <li><strong>&lt;html&gt;</strong> - The root element</li>
            <li><strong>&lt;head&gt;</strong> - Contains meta-information</li>
            <li><strong>&lt;title&gt;</strong> - Specifies the title of the document</li>
            <li><strong>&lt;body&gt;</strong> - Contains the visible content</li>
          </ul>
          
          <h3>Common HTML Elements</h3>
          <p>Here are some common HTML elements you'll use frequently:</p>
          <ul>
            <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings</li>
            <li><strong>&lt;p&gt;</strong> - Paragraph</li>
            <li><strong>&lt;a&gt;</strong> - Hyperlink</li>
            <li><strong>&lt;img&gt;</strong> - Image</li>
            <li><strong>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</strong> - Lists</li>
            <li><strong>&lt;div&gt;</strong> - Division or section</li>
            <li><strong>&lt;span&gt;</strong> - Inline container</li>
          </ul>
        `,
      },
      {
        id: "css-basics",
        type: "reading",
        title: "CSS Basics",
        content: `
          <h2>CSS: Styling Your Web Pages</h2>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages. It controls how HTML elements are displayed on screen.</p>
          
          <h3>CSS Syntax</h3>
          <p>CSS consists of selectors and declarations:</p>
          <pre>
          selector {
            property: value;
            property: value;
          }
          </pre>
          
          <h3>Ways to Add CSS</h3>
          <ul>
            <li><strong>External CSS</strong> - Link to an external .css file</li>
            <li><strong>Internal CSS</strong> - Use a &lt;style&gt; element in the &lt;head&gt; section</li>
            <li><strong>Inline CSS</strong> - Use the style attribute on HTML elements</li>
          </ul>
          
          <h3>Common CSS Properties</h3>
          <ul>
            <li><strong>color</strong> - Text color</li>
            <li><strong>background-color</strong> - Background color</li>
            <li><strong>font-family</strong> - Type of font</li>
            <li><strong>font-size</strong> - Size of the font</li>
            <li><strong>margin</strong> - Space outside an element</li>
            <li><strong>padding</strong> - Space inside an element</li>
            <li><strong>border</strong> - Border around an element</li>
          </ul>
        `,
      },
      {
        id: "intro-to-js",
        type: "reading",
        title: "Introduction to JavaScript",
        content: `
          <h2>JavaScript: Adding Interactivity</h2>
          <p>JavaScript is a programming language that allows you to implement complex features on web pages. It enables interactive elements, dynamic content updates, and much more.</p>
          
          <h3>Basic JavaScript Concepts</h3>
          <ul>
            <li><strong>Variables</strong> - Store data values</li>
            <li><strong>Functions</strong> - Reusable blocks of code</li>
            <li><strong>Events</strong> - Actions that can be detected</li>
            <li><strong>Conditionals</strong> - Make decisions in code</li>
            <li><strong>Loops</strong> - Repeat actions</li>
          </ul>
          
          <h3>Adding JavaScript to HTML</h3>
          <p>You can add JavaScript to your HTML in three ways:</p>
          <ul>
            <li><strong>Internal JavaScript</strong> - Using the &lt;script&gt; tag in HTML</li>
            <li><strong>External JavaScript</strong> - Linking to an external .js file</li>
            <li><strong>Inline JavaScript</strong> - Using event attributes in HTML tags</li>
          </ul>
          
          <h3>Simple JavaScript Example</h3>
          <pre>
          // Change text when button is clicked
          document.getElementById("myButton").addEventListener("click", function() {
            document.getElementById("demo").innerHTML = "Hello JavaScript!";
          });
          </pre>
        `,
      },
      {
        id: "web-fundamentals-quiz",
        type: "quiz",
        title: "Web Fundamentals Quiz",
        content: "Test your knowledge of HTML, CSS, and JavaScript basics.",
        quizQuestions: [
          {
            id: "q1",
            question: "Which HTML tag is used to create a hyperlink?",
            type: "multiple-choice",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctAnswer: "<a>",
            explanation:
              "The <a> (anchor) tag is used to create hyperlinks in HTML. The href attribute specifies the URL the link goes to.",
          },
          {
            id: "q2",
            question: "Which CSS property is used to change the text color?",
            type: "multiple-choice",
            options: ["text-color", "font-color", "color", "text-style"],
            correctAnswer: "color",
            explanation: 'The "color" property is used to set the color of text in CSS.',
          },
          {
            id: "q3",
            question: "In JavaScript, how do you declare a variable?",
            type: "multiple-choice",
            options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
            correctAnswer: "var myVar;",
            explanation:
              'In JavaScript, you can declare variables using "var", "let", or "const". The example shows the "var" keyword.',
          },
          {
            id: "q4",
            question: "Fill in the blank: To add a background color in CSS, you use the ________ property.",
            type: "fill-in-blank",
            correctAnswer: "background-color",
            explanation: 'The "background-color" property sets the background color of an element in CSS.',
          },
        ],
      },
    ],
  },
  {
    id: "data-science-intro",
    title: "Introduction to Data Science",
    description: "Learn the fundamentals of data analysis, visualization, and basic statistics.",
    icon: "📊",
    lessons: 4,
    estimatedTime: 90,
    difficulty: "intermediate",
    content: [
      {
        id: "data-science-overview",
        type: "reading",
        title: "What is Data Science?",
        content: `
          <h2>Understanding Data Science</h2>
          <p>Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data.</p>
          
          <h3>Key Components of Data Science</h3>
          <ul>
            <li><strong>Statistics</strong> - The mathematical foundation</li>
            <li><strong>Data Analysis</strong> - Examining, cleaning, and modeling data</li>
            <li><strong>Machine Learning</strong> - Algorithms that learn from data</li>
            <li><strong>Data Visualization</strong> - Communicating findings visually</li>
          </ul>
          
          <h3>The Data Science Process</h3>
          <ol>
            <li>Define the question or problem</li>
            <li>Collect and gather data</li>
            <li>Clean and preprocess the data</li>
            <li>Explore and analyze the data</li>
            <li>Build and train models</li>
            <li>Communicate results and insights</li>
            <li>Deploy and maintain solutions</li>
          </ol>
        `,
      },
      {
        id: "data-visualization",
        type: "interactive",
        title: "Data Visualization Basics",
        content: `
          <h2>The Power of Data Visualization</h2>
          <p>Data visualization is the graphical representation of information and data. It helps to communicate complex data relationships and patterns in a visual, accessible way.</p>
          
          <h3>Common Visualization Types</h3>
          <ul>
            <li><strong>Bar Charts</strong> - Compare quantities across categories</li>
            <li><strong>Line Charts</strong> - Show trends over time</li>
            <li><strong>Scatter Plots</strong> - Show relationships between variables</li>
            <li><strong>Pie Charts</strong> - Show composition or parts of a whole</li>
            <li><strong>Heatmaps</strong> - Show patterns of intensity</li>
          </ul>
          
          <h3>Principles of Effective Visualization</h3>
          <ul>
            <li><strong>Clarity</strong> - Keep it simple and focused</li>
            <li><strong>Accuracy</strong> - Represent data truthfully</li>
            <li><strong>Efficiency</strong> - Maximize the data-to-ink ratio</li>
            <li><strong>Aesthetics</strong> - Use color and design effectively</li>
          </ul>
          
          <div class="interactive-element" data-type="chart-builder">
            <!-- This would be an interactive chart builder in a real implementation -->
            <p>Interactive chart builder would be implemented here</p>
          </div>
        `,
      },
      {
        id: "data-science-quiz",
        type: "quiz",
        title: "Data Science Fundamentals Quiz",
        content: "Test your understanding of data science concepts.",
        quizQuestions: [
          {
            id: "ds-q1",
            question: "Which of the following is NOT typically considered a step in the data science process?",
            type: "multiple-choice",
            options: ["Data collection", "Data cleaning", "Data encryption", "Data visualization"],
            correctAnswer: "Data encryption",
            explanation:
              "While data security is important, data encryption is not typically considered one of the main steps in the data science process. The main steps include data collection, cleaning, exploration, analysis, modeling, and visualization.",
          },
          {
            id: "ds-q2",
            question: "Which chart type is best for showing trends over time?",
            type: "multiple-choice",
            options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"],
            correctAnswer: "Line chart",
            explanation:
              "Line charts are ideal for showing trends and changes over time because they clearly show the continuity and direction of the data.",
          },
          {
            id: "ds-q3",
            question:
              "Fill in the blank: The process of removing errors and inconsistencies from data is called data ________.",
            type: "fill-in-blank",
            correctAnswer: "cleaning",
            explanation:
              "Data cleaning (or data cleansing) is the process of detecting and correcting (or removing) corrupt or inaccurate records from a dataset.",
          },
        ],
      },
    ],
  },
  {
    id: "creative-writing",
    title: "Creative Writing Workshop",
    description: "Develop your storytelling skills and learn techniques for engaging writing.",
    icon: "✍️",
    lessons: 6,
    estimatedTime: 150,
    difficulty: "beginner",
    content: [],
  },
  {
    id: "mobile-app-dev",
    title: "Mobile App Development",
    description: "Learn to build mobile applications for iOS and Android platforms.",
    icon: "📱",
    lessons: 8,
    estimatedTime: 180,
    difficulty: "advanced",
    prerequisites: ["web-fundamentals"],
    content: [],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Essentials",
    description: "Master the fundamentals of online marketing strategies and tools.",
    icon: "🚀",
    lessons: 5,
    estimatedTime: 120,
    difficulty: "intermediate",
    content: [],
  },
  {
    id: "photography-basics",
    title: "Photography Fundamentals",
    description: "Learn composition, lighting, and camera settings for better photos.",
    icon: "📷",
    lessons: 7,
    estimatedTime: 160,
    difficulty: "beginner",
    content: [],
  },
]
