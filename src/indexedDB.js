// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
//   window.msIndexedDB;

// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
//   window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange ||
//   window.webkitIDBKeyRange || window.msIDBKeyRange

// if (!window.indexedDB) {
//   window.alert("Your browser doesn't support a stable version of IndexedDB.")
// }

// const employeeData = [
//   { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
//   { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
// ];

// var db
// var request = window.indexedDB.open('e-tutor', 1)

// request.onerror = function (e) {
//   console.log("error: ")
// }

// request.onsuccess = function (e) {
//   db = request.result
//   console.log("success:" + db)
// }

// request.onupgradeneeded = function (event) {
//   //@ts-ignore
//   var db = event.target.result;
//   var objectStore = db.createObjectStore("employee", {
//     keyPath: "id"
//   })

//   for (var i in employeeData) {
//     objectStore.add(employeeData[i])
//   }
// }

// function read() {
//   var transaction = db.transaction(['employee'])
//   var objectStore = transaction.objectStore('employee');
//   var request = objectStore.get("00-03-hiep294")

//   request.onerror = function (e) {
//     alert("Unable to retrieve data from database!")
//   }

//   request.onsuccess = function (e) {
//     if (request.result) {
//       alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
//     } else {
//       alert("Kenny could not be found in your db")
//     }
//   }
// }
