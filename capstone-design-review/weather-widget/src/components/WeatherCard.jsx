function WeatherCard({ weather }) {
  return (
    <div className="w-full max-w-md mt-8 bg-slate-800 rounded-xl p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{weather.name}</h2>
          <p className="text-slate-400">{weather.sys.country}</p>
        </div>
        <div className="text-5xl font-bold">
          {Math.round(weather.main.temp)}°C
        </div>
      </div>

      <div className="mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-20 h-20"
        />
        <p className="text-xl capitalize">{weather.weather[0].description}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-400">Feels Like</p>
          <p className="text-2xl font-bold">
            {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-400">Humidity</p>
          <p className="text-2xl font-bold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-400">Wind Speed</p>
          <p className="text-2xl font-bold">{weather.wind.speed} m/s</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-400">Pressure</p>
          <p className="text-2xl font-bold">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
