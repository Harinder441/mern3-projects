import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid
} from "@mui/material";
import { Search } from "@mui/icons-material";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [timer,setTimer] = useState(null);
  const handleSearch = async () => {};
  async function getWebData  (query){
    try{
        let url = `http://api.weatherapi.com/v1/current.json?key=e50fb8e42489468ebff54652232510&q=${query}&aqi=no`;
        const response = await axios.get(url);
        const data =  response.data;
        setWeatherData(data);
    }
    catch(error){
        console.log(error);
        setWeatherData(null);
    }
  };
  function debounce (location, timerId){ 
    clearTimeout(timerId);
    let newId = setTimeout(() => getWebData(location), 1000) ;
    setTimer(newId);
} 

useEffect(() => {
    debounce(location, timer);
  }, [location]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Weather App</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <TextField
          label="Search location"
          variant="outlined"
          fullWidth
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          InputProps={{
            endAdornment: (
              <Search onClick={handleSearch} style={{ cursor: "pointer" }} />
            )
          }}
        />
        {weatherData && (
          <Card sx={{my:2}}>
            <CardContent>
              <Typography variant="h5">
                {weatherData.location.name}, {weatherData.location.country}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography variant="subtitle1">
                    Temperature: {weatherData.current.temp_f}°F / {weatherData.current.temp_c}°C
                  </Typography>
                  <Typography variant="subtitle1">
                    Humidity: {weatherData.current.humidity}%
                  </Typography>
                  <Typography variant="subtitle1">
                  Cloud Wind Speed: {weatherData.current.wind_kph}kph
                  </Typography>
                  <Typography variant="subtitle1">
                  HumidCoverage: {weatherData.current.cloud}
                  </Typography>
                  <Typography variant="subtitle1">
                  Last Updated: {weatherData.current.last_updated}
                  </Typography>
        

                </Grid>
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    image={`https:${weatherData.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                  <Typography variant="subtitle1">
                    Condition: {weatherData.current.condition.text}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default WeatherApp;
