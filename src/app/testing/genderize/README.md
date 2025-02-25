# Genderize Name Predictor

A simple Next.js application that predicts the gender of a given name using the Genderize.io API.

## Features

- Modern, responsive UI with Tailwind CSS
- Real-time gender prediction
- Modal popup with gender results
- Click-outside-to-close functionality
- Gender-specific icons (male/female)
- Probability indicator for predictions

## How to Use

1. Access the application at: [http://localhost:3000/testing/genderize](http://localhost:3000/testing/genderize)
2. Enter a name in the input field
3. Click "Submit" or press Enter
4. View the result in a popup window showing:
   - The predicted gender
   - A gender-specific icon
   - The probability of the prediction

## Technical Implementation

- Built with Next.js 13+ and TypeScript
- Uses React hooks (useState, useEffect, useRef)
- Implements client-side API calls to Genderize.io
- Styled with Tailwind CSS
- Uses React Icons for visual elements

## API Integration

The application integrates with the Genderize.io API:
- Endpoint: `https://api.genderize.io`
- Query parameter: `name`
- Response includes: gender, probability, and count

## Component Features

- Form validation and handling
- Modal popup implementation
- Click-outside detection
- Responsive design
- Error handling for API calls
