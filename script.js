$(document).ready(function () {
  $("#form").click(function(){
    window.location.href = "form.html";
  });

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
      console.log(response);

      var casesG = response.cases;
      var criticalG = response.critical;
      var deathsG = response.deaths;
      var recoveredG = response.recovered;
  
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
      console.log(response);

      var nameC = response.country;
      var casesC = response.cases;
      var deathsC = response.deaths;
      var recoveredC = response.recovered;
      var activeC = response.active;
      var criticalC = response.critical;
      var testsC = response.tests;
      var imageC = response.countryInfo.flag;
  
      //display into html the country's content
      $("#countryInfo").html("<p><b>Cases</b><br>" + casesC + "</p>" +
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
      console.log(response);
  
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

        $("#details").append("<h6>" + countryA + "</h6>");
        $("#details").append("<h5>" + casesA + "</h5>");

        // rename div to avoid conflict in next loop
        document.getElementById("details").id = "detailsDone";
        document.getElementById("allCountryFlag").id = "allCountryFlagDone";
      }
    });
  }
  getAllCountries();

  //retrieve localstorage item 
  $("#country").html(localStorage.getItem('country'));//--> gets replaced with malaysia 


  let countryList = [];
  if (localStorage.getItem('countryList')) {
    //check whether there's localstorage first then we assign
    countryList = JSON.parse(localStorage.getItem('countryList'));
    let countryInfo = "";
    //decide where to display our things...
    for (var i = 0; i < countryList.length; i++) {
      //print our details
      console.log('Country Name', countryList[i].name);
      //backticks are template literals ``
      //${} --> inside a template literal is a variable
      countryInfo = `${countryInfo} <tr><td> ${countryList[i].name}</td><td> ${countryList[i].deaths}</td><td> ${countryList[i].cases}</td><td> ${countryList[i].recoveries}</td>
    </tr>`;

      //alternate method
      //countryInfo = countryInfo + <whatever..>
      /*
      countryInfo += "<tr> <td>" + countryList[i].name + "</td>" + "<td>" + countryList[i].deaths + "</td>" + 
      "<td>" + countryList[i].cases + "</td>" + 
      "<td>" + countryList[i].recoveries + "</td>";
      */
    }//end loop
    //target country list and replace with data 
    $("#country-list").html(countryInfo);
  } else {
    console.log('no localstorage data found');
  }
})
