//Khởi tạo đối tượng Http
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000",
      timeout: 10000,
    });

    this.handleRefreshToken = null;

    this.instance.interceptors.request.use(
      (config) => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
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
        console.log(error);
        const { response } = error;

        if (
          response.status === 401 &&
          response.data.name === "EXPIRED_ACCESS_TOKEN"
        ) {
          this.handleRefreshToken = this.handleRefreshToken
            ? this.handleRefreshToken
            : refreshToken();

          return this.handleRefreshToken
            .then((access_token) => {
              response.config.headers.Authorization = `Bearer ${access_token}`;
              return this.instance(response.config);
            })
            .catch((error) => {
              console.log("error when refresh token", error);
            })
            .finally(() => {
              //refresh handleRefreshToken
              this.handleRefreshToken = null;
            });
        }

        if (response.status === 401 && response.data.name === "EXPIRED_REFRESH_TOKEN") {
          console.log("Thực hiện logout")
        }

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

const http = new Http();

function getProfile() {
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
  http
    .post("/login", body)
    .then((res) => {
      console.log(res);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
    })
    .catch((error) => {
      console.log(error);
    });
}

const refreshToken = async () => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const res = await http.post("/refresh-token", {
      refresh_token,
    });

    const { access_token } = res.data;

    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    //clear access_token and refresh_token when refresh_token is expired
    localStorage.clear();
    throw new Error(error);
  }
};

//Thực hiện login
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  login({
    username,
    password,
  });
});

//init event get product and get profile
const getProductBtn = document.getElementById("btn-get-products");
getProductBtn.addEventListener("click", () => {
  getProducts();
});

const getProfileBtn = document.getElementById("btn-get-profile");
getProfileBtn.addEventListener("click", () => {
  getProfile();
});

const getBothBtn = document.getElementById("btn-get-both");
getBothBtn.addEventListener("click", () => {
  getProfile();
  getProducts();
});

const refreshTokenBtn = document.getElementById("btn-refresh-token");
refreshTokenBtn.addEventListener("click", () => {
  refreshToken();
});
