using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("weatherforecast")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private FetchingWeatherProvider _weatherProvider;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            _weatherProvider = new FetchingWeatherProvider();
        }

        [HttpGet]
        [Route("/weather/{location}")]
        public async Task<IEnumerable<WeatherInfo>> GetWeather(string location)
        {
            try
            {
                return await _weatherProvider.FetchInfos(location);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return new List<WeatherInfo>();
            }
        }
    }
}
