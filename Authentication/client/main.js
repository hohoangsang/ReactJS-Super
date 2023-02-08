//Khởi tạo đối tượng Http
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000",
      timeout: 10000,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const access_token = localStorage.getItem("access_token")
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (config) => {
        return config.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }
}

function getProfile() {
  const http = new Http();

  http
    .get("/profile")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getProducts() {
  const http = new Http();

  http
    .get("/products")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

function login(body) {
  const http = new Http();

  http
    .post("/login", body)
    .then((res) => {
      console.log(res);
      localStorage.setItem("access_token", res.data.access_token)
      localStorage.setItem("refresh_token", res.data.refresh_token)
    })
    .catch((error) => {
      console.log(error);
    });
}

//Thực hiện login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  login({
    username,
    password
  })
})

//init event get product and get profile
const getProductBtn = document.getElementById("btn-get-products")
getProductBtn.addEventListener("click", () => {
  getProducts()
})

const getProfileBtn = document.getElementById("btn-get-profile")
getProfileBtn.addEventListener("click", () => {
  getProfile()
})

const getBothBtn = document.getElementById("btn-get-both")
getBothBtn.addEventListener("click", () => {
  getProfile()
  getProducts()
})