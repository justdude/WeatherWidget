using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IFetchingWeatherProvider
    {
        Task<WeatherInfo[]> FetchInfos(string location);
    }
}
