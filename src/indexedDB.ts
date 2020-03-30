// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB ||
//   window.msIndexedDB;

// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction ||
//   window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange ||
//   window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
export default () => { }
// const dataData = [
//   { id: "00-01", name: "gopal", age: 35, email: "gopal@tutorialspoint.com" },
//   { id: "00-02", name: "prasad", age: 32, email: "prasad@tutorialspoint.com" }
// ];

let db: any
var request = window.indexedDB.open('e-tutor', 392)

request.onerror = function (e) {
  console.log("error: ")
}

request.onsuccess = function (e) {
  db = request.result
  console.log("success:" + db)
}

request.onupgradeneeded = function (event) {
  //@ts-ignore
  var db = event.target.result;
  var objectStore = db.createObjectStore("data")

  // for (var i in dataData) {
  //   objectStore.add(dataData[i], Math.random() * 1000)
  // }
}

export async function getToken(): Promise<string> {
  // @ts-ignore
  var transaction = db.transaction(['data', 'readonly'])
  var objectStore = transaction.objectStore('data');


  let token = await objectStore.get("token")
  return token

  // request.onerror = function (e) {
  //   alert("Unable to retrieve data from database!")
  // }

  // request.onsuccess = function (e: any) {
  //   if (request.result) {
  //     // alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
  //     callback(request.result)
  //   } else {
  //     // alert("Kenny could not be found in your db")
  //     // return ''
  //   }
  // }
}

export function setTokenNew(token: string) {
  var request = db.transaction(['data'], 'readwrite')
    .objectStore('data')
    .add(token, 'token')

  // request.onsuccess = function (event) {
  //   // alert("Kenny has been added to your database")
  // }

  // request.onerror = function (event) {
  //   // alert("Unable to add data\r\nKenny is aready exist in your database! ")
  // }
}

export function setTokenRemove() {
  var request = db.transaction(['data'], "readwrite")
    .objectStore("data")
    .delete("token")

  // request.onsuccess = function (event) {
  //   alert("Kenny's entry has been removed from your database.")
  // }
}
