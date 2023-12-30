let card_container = document.querySelector(".card_container");
fetch("https://jsonplaceholder.typicode.com/photos")
  .then(function (response) {
    return response.json();
  })

  .then(function (data_vua_lay) {
    let empty_string = "";
    for (let i = 0; i < 5; i++) {
      // Cách 1
      empty_string =
        empty_string +
        `<div class="card">
            <img src="${data_vua_lay[i].url}" alt="" />
            <h1 class="heading">${data_vua_lay[i].title}</h1>
            <div id="container">
            <b> ID: </b>
            <span id="item_id">${data_vua_lay[i].id}</span>
            </div>
        </div>`;

      // Cách 2
      //   let div = document.createElement("div");
      //   div.className = "card";

      //   let h1 = document.createElement("h1");
      //   h1.innerText = data_vua_lay[i].title;

      //   let img = document.createElement("img");
      //   img.src = data_vua_lay[i].url;

      //   let div_container_id = document.createElement("div");

      //   let b = document.createElement("b");
      //   b.innerText = "ID: ";
      //   let span = document.createElement("span");
      //   span.id = "id_item";
      //   span.innerText = data_vua_lay[i].id;

      //   div_container_id.appendChild(b);
      //   div_container_id.appendChild(span);

      //   div.appendChild(img);
      //   div.appendChild(h1);
      //   div.appendChild(div_container_id);
      //   card_container.appendChild(div);
    }
    card_container.innerHTML = empty_string;
  });

// t = t + t + t + t + t;
// console.log(t);

let box = document.querySelector(".box");
// let name = prompt("Enter name ");
box.innerHTML = `<h1>${name}</h1>` + "<p>Danh Phương</p>";

// let h1 = document.createElement("h1");
// h1.innerText = "Hello";
// box.appendChild(h1);
