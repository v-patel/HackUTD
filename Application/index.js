// const request = require('request');
var algoliasearch = require('algoliasearch');

//setup api
var client = algoliasearch('IZR31RKRWX', '16d28b0b3e91d76d67a22bcf2f7c7505');
var indexFinRate = client.initIndex('rating_fin_variance');
var indexMSA = client.initIndex('zipCodeToMSA');
var indexCrimRate = client.initIndex('crime_rate');



var func = function()
{

    var userInput = document.getElementById("search").value;
    //map request
    var mapRequest = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCKlb558ITAWNBvFfuNGx0T0xRX4FE3KKQ&q="+userInput;

    document.getElementById("map").src = mapRequest;
    var zipCode = userInput;


    //address request
    // var zipCode = "75080";
    // var addressRequest =  "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=AIzaSyCKlb558ITAWNBvFfuNGx0T0xRX4FE3KKQ&input="+userInput;
    // var rq = new XMLHttpRequest();
    //
    // request(addressRequest, (err, response, body) => {
    //     console.log(response);
    //
    //   })






      //INTERNAL
      // zipCode = zipCode.substring(0,3);
      //query
      indexFinRate.search({ query: zipCode.substring(0,3) }, (err, content) => {
        if (err) {
          console.log(err);
          console.log(err.debugData);
          return;
        }
        console.log(zipCode);
        console.log(content.hits[0].average);
        document.getElementById("zip").innerText = "Zip Code is: " + zipCode;
        document.getElementById("credScore").innerText = "Financial credibility rating is: "+ content.hits[0].average + " (" + content.hits[0].meanVariance.toString().substring(0,4) + ")";

      });


      indexMSA.search({ query: zipCode }, (err, content) => {
        if (err) {
          console.log(err);
          console.log(err.debugData);
          return;
        }

        indexCrimRate.search({ query: content.hits[0]["MSA Name"] }, (err, content) => {
          if (err) {
            console.log(err);
            console.log(err.debugData);
            return;
          }
          console.log(content.hits[0]["MSA"]);
          console.log(content.hits[0]["crime rate"]);
          document.getElementById("nameMSA").innerText = "MSA name is: " + content.hits[0]["MSA"];
          document.getElementById("crimScore").innerText = "Crime rating (per 100,000 people) is: "+ content.hits[0]["crime rate"];

        });
      });


}


global.func = func;
// Global.func = func;

//var zipCode = prompt("enter zipcode");
