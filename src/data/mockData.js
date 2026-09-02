export const courses = [
  {
    id: 1,
    title: "Data Analytics Fundamentals",
    description:
      "Learn the basics of data analytics, from collection to visualization, and how it drives business decisions.",
    category: "IT & Software",
    level: "Beginner",
    duration: "6h 30m",
    rating: "",
    image:
      "https://img.freepik.com/free-photo/data-analysis-chart_23-2149151162.jpg",
    modules: [
      { id: 1, title: "Introduction", completed: true },
      { id: 2, title: "Data Collection", completed: true },
      { id: 3, title: "Data Analysis", completed: false },
      { id: 4, title: "Data Visualization", completed: false },
    ],
  },
  {
    id: 2,
    title: "Python for Beginners",
    description:
      "A hands-on introduction to Python programming for absolute beginners, covering syntax through small projects.",
    category: "IT & Software",
    level: "Beginner",
    duration: "8h 00m",
    rating: "",
    image:
      "https://img.freepik.com/free-photo/programming-background-concept_23-2149151158.jpg",
    modules: [
      { id: 1, title: "Python Basics", completed: true },
      { id: 2, title: "Control Flow", completed: false },
      { id: 3, title: "Functions", completed: false },
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Essentials",
    description:
      "Master the fundamentals of digital marketing including SEO, social media, and paid advertising strategy.",
    category: "Business",
    level: "Intermediate",
    duration: "5h 45m",
    rating: "",
    image:
      "https://img.freepik.com/free-photo/digital-marketing-concept_23-2149151160.jpg",
    modules: [
      { id: 1, title: "Marketing Foundations", completed: false },
      { id: 2, title: "SEO Basics", completed: false },
    ],
  },
];

export const quizQuestions = {
  1: [
    {
      id: 1,
      prompt: "What is the primary goal of data analytics?",
      options: [
        "To store data securely",
        "To turn raw data into actionable insights",
        "To design user interfaces",
        "To write backend APIs",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      prompt: "Which of these is a type of quantitative data?",
      options: [
        "Customer feedback text",
        "Product color",
        "Monthly revenue",
        "Interview transcript",
      ],
      correctIndex: 2,
    },
    {
      id: 3,
      prompt: "What does 'data cleaning' primarily involve?",
      options: [
        "Deleting all data",
        "Fixing or removing incorrect, incomplete, or duplicate data",
        "Encrypting data",
        "Visualizing data",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      prompt: "Which chart is best for showing change over time?",
      options: ["Pie chart", "Line chart", "Scatter plot", "Donut chart"],
      correctIndex: 1,
    },
    {
      id: 5,
      prompt: "What is a dashboard in the context of data analytics?",
      options: [
        "A car component",
        "A single database table",
        "A visual display of key metrics and KPIs",
        "A type of survey",
      ],
      correctIndex: 2,
    },
  ],
  2: [
    {
      id: 1,
      prompt: "Which keyword defines a function in Python?",
      options: ["func", "def", "function", "lambda"],
      correctIndex: 1,
    },
    {
      id: 2,
      prompt: "What data type is the result of 5 / 2 in Python 3?",
      options: ["int", "float", "str", "bool"],
      correctIndex: 1,
    },
    {
      id: 3,
      prompt: "Which of these is a mutable data type in Python?",
      options: ["tuple", "string", "list", "int"],
      correctIndex: 2,
    },
  ],
};

export const trainers = [
  {
    id: 1,
    name: "Vishal Aggarwal",
    role: "IT & Software Instructor",
    rating: "",
    students: "",
    courses: "",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Morgan&background=6b7280&color=fff",
  },
  {
    id: 2,
    name: "Aman Singh",
    role: "Business Instructor",
    rating: "",
    students: "",
    courses: "",
    avatar:
      "https://ui-avatars.com/api/?name=Jordan+Lee&background=6b7280&color=fff",
  },
  {
    id: 3,
    name: "Mohammad Sharif",
    role: "Leadership Coach",
    rating: "",
    students: "",
    courses: "",
    avatar:
      "https://ui-avatars.com/api/?name=Sam+Rivera&background=6b7280&color=fff",
  },
  {
    id: 4,
    name: "Sarvesh Kumar",
    role: "Personal Development Coach",
    rating: "",
    students: "",
    courses: "",
    avatar:
      "https://ui-avatars.com/api/?name=Taylor+Brooks&background=6b7280&color=fff",
  },
  {
    id: 5,
    name: "Faizan Mahmood",
    role: "Communication Skills Trainer",
    rating: "",
    students: "",
    courses: "",
    avatar:
      "https://ui-avatars.com/api/?name=Casey+Nguyen&background=6b7280&color=fff",
  },
  {
    id: 6,
    name: "Shubham kumar",
    role: "Data & Analytics Instructor",
    rating: "",
    students: "",
    courses: "",
    avatar:
      "https://ui-avatars.com/api/?name=Riley+Chen&background=6b7280&color=fff",
  },
];

export const assessments = [
  {
    id: 1,
    courseId: 1,
    title: "Data Analytics Quiz",
    duration: "30 min",
    questions: 20,
  },
  {
    id: 2,
    courseId: 2,
    title: "Python Basics Quiz",
    duration: "25 min",
    questions: 15,
  },
];
