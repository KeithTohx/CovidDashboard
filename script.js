$(document).ready(function () {
  // get current Date & Time
  var today = new Date();
  $("#currentDate").html(`Today is ${today.toDateString()}`);

  // for total global cases data
  function getGlobal() {
    var settings = {
      "url": "https://disease.sh/v3/covid-19/all", 
      "method": "GET",
      "timeout": 0,
      "headers": {
        //"Cookie": "__cfduid=d4e60a8e28f2e90c24e2a1fdcaaea8ead1611282633"
      },
    };

    $.ajax(settings).done(function (response) {
      var casesG = response.cases;
      var criticalG = response.critical;
      var deathsG = response.deaths;
      var recoveredG = response.recovered;

      //format numbers with , as thousands separators
      casesG = casesG.toLocaleString('en-US');
      criticalG = criticalG.toLocaleString('en-US');
      deathsG = deathsG.toLocaleString('en-US');
      recoveredG = recoveredG.toLocaleString('en-US');
  
      //display into html the global's content
      $("#globalCases").append(casesG);
      $("#globalCritical").append(criticalG);
      $("#globalDeaths").append(deathsG);
      $("#globalRecovered").append(recoveredG);
    });
  }
  getGlobal();

  //@TODO select the id of the drop down
  //retrieve the value of the drop down
  //pass in the value of the drop down to the function getCountry()
  $("#selectCountry").on('change', function () {
    var country = $(this).find("option:selected").text();
    if (country == "~")
    {
      // $("#countryFlag").html(" ");
      // $("#countryInfo").html(" ");
      $("#countryFlag").html(" ");
      $("#countryInfo").html(" ");
    }
    else
    {
      getCountry(country);
    }
  });

  function getCountry(country) {
    countrycode = country;
    var settings = {
      "url": "https://disease.sh/v3/covid-19/countries/" + countrycode, 
      "method": "GET",
      "timeout": 0,
      "headers": {
        //"Cookie": "__cfduid=d4e60a8e28f2e90c24e2a1fdcaaea8ead1611282633"
      },
    };

    $.ajax(settings).done(function (response) {
      var nameC = response.country;
      var casesC = response.cases;
      var deathsC = response.deaths;
      var recoveredC = response.recovered;
      var activeC = response.active;
      var criticalC = response.critical;
      var testsC = response.tests;
      var imageC = response.countryInfo.flag;

      //format numbers with , as thousands separators
      casesC = casesC.toLocaleString('en-US');
      criticalC = criticalC.toLocaleString('en-US');
      deathsC = deathsC.toLocaleString('en-US');
      recoveredC = recoveredC.toLocaleString('en-US');
      activeC = activeC.toLocaleString('en-US');
      testsC = testsC.toLocaleString('en-US');
  
      //display into html the country's content
      $("#countryInfo").html("<p><b>Total Cases</b><br>" + casesC + "</p>" +
      "<p><b>Deaths</b><br>" + deathsC + "</p>" +
      "<p><b>Recovered</b><br>" + recoveredC + "</p>" + 
      "<p><b>Active</b><br>" + activeC + "</p>" +
      "<p><b>Critical</b><br>" + criticalC + "</p>" +
      "<p><b>Tests Done</b><br>" + testsC + "</p>");

      $("#countryFlag").html("<h4>" + nameC + "</h4>");

      var img = document.createElement("img");
      img.src = imageC;
      img.className = "img-fluid";
      img.width = 240;
      img.id = "countryFlag";
      var loc = document.getElementById("countryFlag");
      loc.appendChild(img);
    });
  }

  // for cases data of all countries
  function getAllCountries() {
    var settings = {
      "url": "https://disease.sh/v3/covid-19/countries", 
      "method": "GET",
      "timeout": 0,
      "headers": {
        //"Cookie": "__cfduid=d4e60a8e28f2e90c24e2a1fdcaaea8ead1611282633"
      },
    };

    $.ajax(settings).done(function (response) {
      //display into html the global's content
      for (var i=0; i<(response).length; i++)
      {
        var casesA = response[i].cases;
        var countryA = response[i].country;
        var imageA = response[i].countryInfo.flag;

        var div = document.createElement("div");
        div.id = "details";
        var src = document.getElementById("allCountriesDetails");
        src.appendChild(div);

        var img = document.createElement("img");
        img.src = imageA;
        //img.className = "img-fluid";
        img.width = 40;
        img.id = "allCountryFlag";
        var loc = document.getElementById("details");
        loc.appendChild(img);

        //format numbers with , as thousands separators
        casesA = casesA.toLocaleString('en-US');

        $("#details").append("<h6>" + countryA + "</h6>");
        $("#details").append("<h5>" + casesA + "</h5>");

        // rename div to avoid conflict in next loop
        document.getElementById("details").id = "detailsDone";
        document.getElementById("allCountryFlag").id = "allCountryFlagDone";
      }
    });
  }
  getAllCountries();
})
