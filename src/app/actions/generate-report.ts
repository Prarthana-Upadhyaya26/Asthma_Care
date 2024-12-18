import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: 'AIzaSyBRqRIkLoQX2MAdQ-AvPo_fPOXBxKni3a0', // Use the API key from .env
});

export async function generateReport(formData: any) {
  try {
    const prompt = `
      As a medical AI assistant, analyze the following patient information for an asthma diagnosis.
      Provide a comprehensive but concise report including:
      1. Preliminary Assessment: Based on the symptoms and history
      2. Key Findings: Most significant symptoms and triggers
      3. Recommendations:
         - Lifestyle modifications (dos and don'ts)
         - Environmental changes
         - Suggested medical follow-up
      4. Potential Treatment Considerations (Note: These are suggestions to discuss with a healthcare provider)

      Patient Information:
      ${JSON.stringify(formData, null, 2)}

      Format the response in clear sections using Markdown.
      Important: Include a disclaimer about consulting healthcare professionals.
    `

    const { text } = await generateText({
      model: google('gemini-pro'),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return text
  } catch (error) {
    console.error('Error generating report:', error)
    return `
# Error Generating Report

We apologize, but there was an error generating your report. This could be due to:
- Temporary service interruption
- Invalid or incomplete form data

Please try again or contact support if the problem persists.

Note: Always consult with healthcare professionals for medical advice and diagnosis.
    `
  }
}

