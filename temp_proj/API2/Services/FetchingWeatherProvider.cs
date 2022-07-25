using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace API.Services
{
    public class FetchingWeatherProvider : IFetchingWeatherProvider
    {
        const string RapidKey = "37c9993b09mshc41dc4f6dc793fap181029jsnf7fa2596915f";
        const string RapidHost = "yahoo-weather5.p.rapidapi.com";

        private const string FetchWeatherURL =
            "https://yahoo-weather5.p.rapidapi.com/weather?location={LOCATION_INPUT}&format=json&u=f";

        public async Task<WeatherInfo[]> FetchInfos(string location)
        {
            if (string.IsNullOrWhiteSpace(location)) 
                throw new NotSupportedException("Empty string, please check input");

            var strNormalizedLocation = location.ToLower();
            HttpClient client = new HttpClient();

            client.DefaultRequestHeaders.Add("X-RapidAPI-Key", RapidKey);
            client.DefaultRequestHeaders.Add("X-RapidAPI-Host", RapidHost);

            var url = FetchWeatherURL.Replace("{LOCATION_INPUT}", strNormalizedLocation);

            var responce =await client.GetAsync(url);
            var tempContent = await responce.Content.ReadAsStringAsync();

            JObject parsedObj = JObject.Parse(tempContent);
            var jItems = parsedObj["forecasts"];
            List<WeatherInfo> elements = new List<WeatherInfo>();
            foreach (var item in jItems)
            {
                //TODO check path and way
               //var convertedItem = item.ToObject<WeatherInfo>();

                var convertedItem = new WeatherInfo();
                try
                {
                    TimeSpan time = TimeSpan.FromMilliseconds(item["date"].Value<long>());
                    DateTime startdate = new DateTime(1970, 1, 1) + time;
                    convertedItem.Date = startdate;
                    convertedItem.Day = item["day"].Value<string>();
                    convertedItem.Code = item["code"].Value<int?>();
                    convertedItem.Text = item["text"].Value<string>();
                    convertedItem.High = item["low"].Value<int>();
                    convertedItem.Low = item["low"].Value<int>();
                    elements.Add(convertedItem);
                }
                catch { return new WeatherInfo[]{}; }
            }

            return elements.ToArray();
        }
    }
}
