import axios from 'axios';

// Using a public API for demonstration
const API_URL = 'https://wttr.in/';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${API_URL}${city}?format=%C+%t+%h+%w`);
    return response.data;
  } catch (error) {
    throw new Error('City not found');
  }
};
