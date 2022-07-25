using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class WeatherInfo
    {
        public string Day { get; set; }
        public DateTime Date { get; set; }
        public int Low { get; set; }
        public int High { get; set; }
        public string Text { get; set; }
        public int? Code { get; set; }
    }

}
