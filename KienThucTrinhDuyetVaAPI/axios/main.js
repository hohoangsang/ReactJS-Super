//Learning XMLhttprequest
// const xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     const result = JSON.parse(this.responseText)

//     let html = ''

//     result.data.forEach(item => {
//       html += `<div>${item.first_name} ${item.last_name}</div>`
//     });

//     document.getElementById("result").innerHTML = html
//   }
// }

// xhttp.open("GET", "https://reqres.in/api/users?page=2", true)
// xhttp.send()

//Learning fetch
// fetch("https://reqres.in/api/users?page=2").then((res) => {
//   if (res.ok) {
//     return res.json()
//   } else {
//     throw new Error("Failed to get data")
//   }
// }).then((res) => {
//   let html = '';

//   res.data.forEach(item => {
//     html += `<div>${item.first_name} ${item.last_name}</div>`
//   });

//   document.getElementById("result").innerHTML = html
// }).catch((error) => {
//   console.error(error)
// })

//Learning axios
// method get 

axios
  .get("https://reqres.in/api/users", {
    params: {
      page: 2
    }
  })
  .then((res) => {
    let html = "";

    res.data.data.forEach((item) => {
      html += `<div>${item.first_name} ${item.last_name}</div>`;
    });

    document.getElementById("result").innerHTML = html;
  })
  .catch((error) => {
    console.error(error.message);
  });


//method post
