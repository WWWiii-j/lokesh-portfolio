export interface Project {
  title: string
  description: string
  language: string
  tech: string[]
  repo: string
  demo?: string
  status?: string
  source: string
}

export const projects: Project[] = [
  {
    title: 'Internal-SIH — E-Consultation AI (PS-25035)',
    description:
      'NLP and ML-based platform for sentiment analysis and analysis of stakeholder comments received through the Government e-Consultation module. Built for Smart India Hackathon 2025 (Problem Statement PS-25035), it classifies sentiment, extracts keywords and themes, and generates executive-style summaries of stakeholder feedback across two phases.',
    language: 'TypeScript',
    tech: ['React', 'TypeScript', 'Vite', 'NLP / Sentiment Analysis', 'Data Visualization', 'AI'],
    repo: 'https://github.com/WWWiii-j/Internal-SIH',
    demo: 'https://internal-sih-phase2.vercel.app',
    status: 'SIH 2025 · PS-25035',
    source: 'repo-readme',
  },
  {
    title: 'Smart Accident Analysis & Rule-Based Risk Prediction System',
    description:
      'Analyzes road accident data using Python libraries such as Pandas, NumPy, and Plotly. Identifies patterns based on time, location, and causes of accidents, and implements a rule-based risk prediction model that classifies accidents into low, medium, and high risk categories.',
    language: 'Python',
    tech: ['Python', 'Pandas', 'NumPy', 'Plotly', 'Data Analysis', 'Rule-Based Risk Prediction'],
    repo: 'https://github.com/WWWiii-j/Smart-Accident-Analysis-and-Rule-Based-Risk-Prediction-System',
    source: 'repo-readme',
  },
  {
    title: 'SIH',
    description:
      'A Python application deployed as a Streamlit web app, developed as part of the Smart India Hackathon effort to deliver a practical, technology-based solution to a real-world problem.',
    language: 'Python',
    tech: ['Python', 'Streamlit', 'Web App'],
    repo: 'https://github.com/WWWiii-j/SIH',
    demo: 'https://gqjbu2mie9rdfc39jwsb9s.streamlit.app/',
    status: 'SIH',
    source: 'repo-metadata',
  },
]
