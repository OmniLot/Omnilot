import axios from 'axios';

const BASE44_API_BASE = process.env.BASE44_API_BASE || 'https://app.base44.com/api';
const BASE44_API_KEY = process.env.BASE44_API_KEY;
const BASE44_APP_ID = process.env.BASE44_APP_ID;

if (!BASE44_API_KEY) {
  console.warn('⚠️  BASE44_API_KEY is not set in environment variables');
}

if (!BASE44_APP_ID) {
  console.warn('⚠️  BASE44_APP_ID is not set in environment variables');
}

export async function invokeLLM({ prompt, response_json_schema, options = {} }) {
  if (!BASE44_API_KEY) {
    throw new Error('BASE44_API_KEY is not configured');
  }

  if (!BASE44_APP_ID) {
    throw new Error('BASE44_APP_ID is not configured');
  }

  if (!prompt) {
    throw new Error('Prompt is required');
  }

  const endpoint = `${BASE44_API_BASE}/integrations/Core/InvokeLLM`;

  try {
    const requestBody = {
      prompt,
      ...(response_json_schema && { response_json_schema }),
      ...options
    };

    const response = await axios.post(endpoint, requestBody, {
      headers: {
        'Authorization': `Bearer ${BASE44_API_KEY}`,
        'Content-Type': 'application/json',
        'X-App-Id': BASE44_APP_ID,
      },
      timeout: 1200000, // 20 minute timeout for complex website generation
    });

    return response.data;
  } catch (error) {
    console.error('Base44 API Error Details:');
    console.error('- Status:', error.response?.status);
    console.error('- Status Text:', error.response?.statusText);
    console.error('- Response Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('- Request URL:', endpoint);
    console.error('- Error Message:', error.message);
    
    // Provide helpful error messages
    if (error.response) {
      // API responded with error status
      const errorMsg = error.response.data?.message || error.response.data?.error || error.response.statusText;
      throw new Error(
        `Base44 API Error (${error.response.status}): ${errorMsg}`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Base44 API: No response received. Please check the API endpoint and network connection.');
    } else {
      // Error in request setup
      throw new Error(`Base44 API Error: ${error.message}`);
    }
  }
}

