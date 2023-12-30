let input_place = "England";
fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input_place}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    let latitude = data.results[0].latitude;
    let longitude = data.results[0].longitude;

    // truy vấn để lấy latitude và longitude

    console.log(latitude);
    console.log(longitude);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (weather_data) {
        console.log(weather_data);
      });
  });

let container = document.querySelector(".container");
container.style.backgroundImage = "url('./')";

let myName = "2023-12-16T12:45";
console.log(myName.length);
let t = myName.substring(myName.length - 5, myName.length); // 1 -> 6
console.log(t);
