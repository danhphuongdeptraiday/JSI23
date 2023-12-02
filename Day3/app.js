fetch("https://jsonplaceholder.typicode.com/photos")
  .then(function (response) {
    return response.json();
  })

  .then(function (data_vua_lay) {
    console.log(data_vua_lay[0].url);
  });
