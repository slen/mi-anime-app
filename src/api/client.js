import axios from 'axios';

// Obtiene la URL base de los ajustes guardados, o usa localhost por defecto
const getBaseUrl = () => {
  return localStorage.getItem('anime_api_url') || 'http://localhost:3001';
};

const getApiKey = () => {
  return localStorage.getItem('anime_api_key') || '';
};

// Cliente Axios preconfigurado
const apiClient = axios.create({
  timeout: 15000,
});

// Interceptor para inyectar dinámicamente la URL y el API Key en cada peticion
apiClient.interceptors.request.use((config) => {
  config.baseURL = getBaseUrl();
  const apiKey = getApiKey();
  
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }
  
  return config;
});

export const api = {
  searchAnime: async (query, domain = 'animeav1.com') => {
    const response = await apiClient.get(`/api/v1/anime/search?q=${encodeURIComponent(query)}&domain=${domain}`);
    return response.data;
  },
  
  getAnimeInfo: async (url) => {
    const response = await apiClient.get(`/api/v1/anime/info?url=${encodeURIComponent(url)}`);
    return response.data;
  },
  
  getEpisodeLinks: async (url) => {
    const response = await apiClient.get(`/api/v1/anime/episode?url=${encodeURIComponent(url)}`);
    return response.data;
  }
};

export default api;
