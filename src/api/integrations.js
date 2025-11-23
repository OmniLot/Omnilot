import apiClient from './client.js';


export async function invokeLLM({ prompt, response_json_schema, options }) {
  const response = await apiClient.post('/integrations/llm', {
    prompt,
    response_json_schema,
    options
  });
  return response.data.data; 
}

export async function checkIntegrationHealth() {
  const response = await apiClient.get('/integrations/health');
  return response.data;
}

