// src/components/WeatherComponent.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '83e91ff37f7737990b899cf84013dfda';
  const CITY = 'Canada';
  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  // Weather data extraction
  const { main, weather, name } = weatherData;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <Card>
      <CardContent>
      <Typography variant="h5" gutterBottom>
              Current Weather
            </Typography>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h5">{temperature}°C</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <img src={weatherIconUrl} alt={description} />
      </CardContent>
    </Card>
  );
};

export default WeatherComponent;
