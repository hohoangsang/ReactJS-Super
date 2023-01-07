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
const userApi = axios.create({
  baseURL: "https://reqres.in/api"
})

userApi.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error);
})

userApi.interceptors.response.use(function (response) {
  console.log(response)
  return {
    data: response.data.data,
    pagination: {
      page: response.data.page,
      per_page: response.data.per_page,
      total: response.data.total,
      total_pages: response.data.total_pages
    }
  }
}, function (error) {
  return Promise.reject(error);
})

// method get

userApi
  .get("/users?page=2", {
    params: {
      page: 2,
    }
  })
  .then((res) => {
    console.log(res)
    let html = "";

    res.data.forEach((item) => {
      html += `<div>${item.first_name} ${item.last_name}</div>`;
    });

    document.getElementById("result").innerHTML = html;
  })
  .catch((error) => {
    console.error(error.message);
  });

//method post
// userApi
//   .post("/users", {
//     name: "Sang",
//     job: "Frontend Dev",
//   })
//   .then((res) => {
//     // console.log(res);
//   })
//   .catch((error) => {
//     console.warn(error);
//   });