// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as dbRefImage,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
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
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvMgz8-hRZc871K0Kzn7bWxY1mGSuWTtM",
  authDomain: "jsi23-login-signup.firebaseapp.com",
  databaseURL: "https://jsi23-login-signup-default-rtdb.firebaseio.com",
  projectId: "jsi23-login-signup",
  storageBucket: "jsi23-login-signup.appspot.com",
  messagingSenderId: "669024590253",
  appId: "1:669024590253:web:db1994de93a0dd9f54e924",
  measurementId: "G-HT6VB07XHE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

let user_name_input = document.getElementById("user_name");
let user_age_input = document.getElementById("user_age");
let user_favor_input = document.getElementById("user_favor");
let add_user_btn = document.getElementById("add_user");
let read_data = document.getElementById("read_data");
let update_btn = document.getElementById("update");
let delete_btn = document.getElementById("delete");

/////////////////////////////////////////////// upload image
const fileInput = document.getElementById("fileInput"); // Input element for file selection
const imageGallery = document.getElementById("imageGallery"); // Container for displaying images

var imageURL = "";

fileInput.addEventListener("change", async function (e) {
  const file = e.target.files[0]; // Get the selected file

  // Create a storage reference
  const storageRef = dbRefImage(storage, "images/" + file.name);

  try {
    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL after successful upload
    const downloadURL = await getDownloadURL(snapshot.ref);
    imageURL = downloadURL;
    console.log(downloadURL);

    // Store downloadURL in Firebase Database for retrieval
    const dbImagesRef = ref(database, "images");
    push(dbImagesRef, {
      imageURL: downloadURL,
    });

    // window.location.reload();
  } catch (error) {
    // Handle any errors while uploading
    console.error(error);
  }
});

///////////////////////////////////////////// Create
add_user_btn.addEventListener("click", function () {
  // let userRef = ref(database, "users/" + user_name_input.value);

  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${user_name_input.value}`)).then((snapshot) => {
    // nếu tên người dùng bạn nhập trùng với tên có rồi trong firebase thì snap.exists() == true
    // => Lúc này mình thể add 1 user có tên như vậy nữa
    // nếu tên người dùng bạn nhập trùng ko với tên có rồi trong firebase thì snap.exists() == false
    // => Cho phép user đó đc add vào trong firebase
    if (snapshot.exists() == false) {
      set(ref(database, "users/" + user_name_input.value), {
        username: user_name_input.value,
        userage: user_age_input.value,
        user_avatar: imageURL,
      });

      alert("Tạo tài khoản thành công");
    } else {
      alert("Tên này đã được sử dụng, vui lòng nhập tên khác");
      // alert(snapshot.val());
    }
  });
});

///////////////////////////////////////////////////// Read
read_data.addEventListener("click", function () {
  onValue(ref(database, `users/${user_name_input.value}`), (snap) => {
    let data = snap.val();
    console.log(data);
  });
});

/////////////////////////////////////////////////// Update
update_btn.addEventListener("click", function () {
  update(ref(database, "users/" + user_name_input.value), {
    userfavor: user_favor_input.value,
  });
});

/////////////////////////////////////////////////////// Delete
delete_btn.addEventListener("click", function () {
  remove(ref(database, "users/" + user_name_input.value));
});
