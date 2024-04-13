import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
  update,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSYnEdrRTEEFFhuWX-PcFgljEBL_G-xuE",
  authDomain: "jsi28-fe47b.firebaseapp.com",
  databaseURL: "https://jsi28-fe47b-default-rtdb.firebaseio.com",
  projectId: "jsi28-fe47b",
  storageBucket: "jsi28-fe47b.appspot.com",
  messagingSenderId: "814956298867",
  appId: "1:814956298867:web:35dbfb58ff2c4e12316006",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM
let create_course = document.getElementById("create_course");
let input_product_name = document.getElementById("product_name_update");
let input_product_price = document.getElementById("product_price_update");
let input_product_image = document.getElementById("product_image_update");
let input_product_detail = document.getElementById("product_detail_update");
let save_btn = document.getElementById("save");
let product_interface = document.querySelector(".product");
let show_edit = document.querySelector(".show_edit");
show_edit.style.display = "none";

// input edit
let update_name = document.getElementById("update_name");
let update_price = document.getElementById("update_price");
let update_image = document.getElementById("update_img");
let update_details = document.getElementById("update_details");
let save_edit = document.querySelector(".show_edit button");
let name_edit = document.getElementById("name_edit");

///////////////////////////////////////////// Create
create_course.addEventListener("click", function () {
  // let userRef = ref(database, "users/" + user_name_input.value);
  const dbRef = ref(getDatabase()); // path cua data
  get(child(dbRef, `All_Products/${input_product_name.value}`)).then(
    (snapshot) => {
      // nếu tên người dùng bạn nhập trùng với tên có rồi trong firebase thì snap.exists() == true
      // => Lúc này mình thể add 1 user có tên như vậy nữa
      // nếu tên người dùng bạn nhập trùng ko với tên có rồi trong firebase thì snap.exists() == false
      // => Cho phép user đó đc add vào trong firebase
      if (snapshot.exists() == false) {
        set(ref(database, `All_Products/${input_product_name.value}`), {
          product_name: input_product_name.value,
          product_price: input_product_price.value,
          product_image: input_product_image.value,
          product_details: input_product_detail.value,
        });
        alert("Tạo sản phẩm thành công");

        // Clear input
        input_product_name.value = "";
        input_product_price.value = "";
        input_product_image.value = "";
        input_product_detail.value = "";
        window.location.reload();
      } else {
        // exists == true
        alert("Tên này đã được sử dụng, vui lòng nhập tên sản phẩm khác");
      }
    }
  );
});

save_btn.addEventListener("click", function () {
  if (
    input_product_name &&
    input_product_image &&
    input_product_price &&
    input_product_detail
  ) {
    product_interface.innerHTML = `
          <img src="${input_product_image.value}" alt="" />
          <div class="product_name">${input_product_name.value}</div>
          <div class="product_price">
            <span>${input_product_price.value}</span>
            <span>VND</span>
          </div>
          `;
  } else {
    alert("Bạn đang điền thiếu thông tin vui lòng nhập lại");
  }
});

// Code buổi 13
let read_full_course = document.getElementById("read_full_course");
read_full_course.addEventListener("click", function () {
  onValue(ref(database, "All_Products"), (snap) => {
    let data = snap.val();
    data = Object.values(data);
    console.log(data);
    localStorage.setItem("course_data_admin", JSON.stringify(data));
  });

  let data = JSON.parse(localStorage.getItem("course_data_admin"));
  render_course_admin(data);
});

let all_course = document.querySelector(".all_course");
function render_course_admin(courses) {
  for (let i = 0; i < courses.length; i++) {
    let div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>

      <img src="${courses[i].product_image}" alt="" />
      <div class="product_name">${courses[i].product_name}</div>
      <div class="product_price">
        <span>${courses[i].product_price}</span>
        <span>VND</span>
      </div>
      `;

    all_course.appendChild(div);
  }

  let list_edit_btn = document.querySelectorAll(".all_course .product .edit");

  for (let i = 0; i < list_edit_btn.length; i++) {
    list_edit_btn[i].addEventListener("click", () => {
      if (show_edit.style.display == "none") {
        name_edit.innerText = courses[i].product_name;
        show_edit.style.display = "block";
      } else {
        show_edit.style.display = "none";
      }
    });
  }
}

// Save Edit
save_edit.addEventListener("click", function () {
  console.log(name_edit);
  update(ref(database, `All_Products/${name_edit.innerText}`), {
    product_name: update_name.value,
    product_price: update_price.value,
    product_image: update_image.value,
    product_details: update_details.value,
  }).then(() => {
    alert("update thành công");
  });
});
