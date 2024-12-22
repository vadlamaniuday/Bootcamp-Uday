import { WeatherWidget } from "./weatherWidget.js";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  new WeatherWidget("weather-widget");
});
