# ipl-win-predictor
IPL Predictor Pro 🏏🤖

Welcome to IPL Predictor Pro! This is a secure, serverless Machine Learning application that calculates the live win probability of a cricket run-chase in real-time.

This application runs its Machine Learning natively in the browser, while utilizing Vercel Serverless Functions to securely proxy AI LLM calls—preventing API key exposure and maintaining a lightweight, zero-maintenance architecture.

✨ Features

In-Browser ML Engine: The Logistic Regression model is built entirely in Vanilla JS. It trains dynamically on client devices using Gradient Descent.

Live CSV Training: Users upload their own ipl_ball_by_ball_clean.csv to dynamically train the model on the fly.

Auto-Feature Engineering: Calculates Required Run Rate and Wickets Left automatically.

Gemini AI Integration (Secure): Generates live, thrilling match commentary and strategic advice using the Gemini API, protected via backend proxy.

Franchise Insights: Automatically aggregates top run-scorers and wicket-takers directly from the uploaded dataset.

🚀 How to Deploy on Vercel

Step 1: Push to GitHub

Create a new repository on your GitHub account (e.g., ipl-predictor-pro).

Upload the index.html file into the root folder.

Create a folder named api and upload analyze.js into it.

Upload this README.md.

Commit your changes.

(Repository Structure)

/
├── index.html
├── README.md
└── api/
    └── analyze.js


Step 2: Deploy & Configure Environment Variables

Log in to Vercel and click Add New... -> Project.

Import your newly created GitHub repository.

In the deployment configuration screen, open the Environment Variables dropdown.

Add the following key:

Key: GEMINI_API_KEY

Value: Paste your actual Google AI Studio API key here.

Click Deploy.

Vercel will automatically build the site, recognize the api folder, and securely generate your serverless backend endpoint, protecting your key from the public web!

📂 Data Format Requirements

To use the dashboard, users must upload a CSV file with historical ball-by-ball data.
The CSV must contain (at minimum) the following columns:

batting_team

bowling_team

is_chasing

runs_required

balls_remaining

innings_wickets_so_far

current_run_rate

required_run_rate

batting_team_won
