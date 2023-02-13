//init an class object HTTP

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
        config.headers.Authorization = `Bearer ${access_token}`;
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
        const { response } = error;

        if (
          response.status === 401 &&
          response.data.name === "EXPIRED_ACCESS_TOKEN"
        ) {
          this.handleRefreshToken = this.handleRefreshToken
            ? this.handleRefreshToken
            : refreshTokenRequest();

          return this.handleRefreshToken
            .then((access_token) => {
              response.config.headers.Authorization = `Bearer ${access_token}`;
              return this.instance(response.config);
            })
            .catch((error) => {
              console.log("error ", error);
            })
            .finally(() => {
              this.handleRefreshToken = null;
            });
        }

        if (
          response.status === 401 &&
          response.data.name === "EXPIRED_ACCESS_TOKEN"
        ) {
          console.log("handle logout");
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

function loginRequest(data) {
  http
    .post("/login", data)
    .then((res) => {
      const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    })
    .catch((error) => {
      console.log("Failed to login! ", error);
    });
}

function getProfileRequest() {
  http
    .get("/profile")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log("Failed to get profile! ", error);
    });
}

function getProductRequest() {
  http
    .get("/products")
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log("Failed to get products! ", error);
    });
}

const refreshTokenRequest = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    const res = await http.post("/refresh-token", { refresh_token });
    console.log("Refresh token success");
    const { access_token } = res.data;
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.log("Failed to refresh token");
    //clear access_token and refresh_token when refresh_token is expired
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw new Error(error);
  }
};

//init loginForm
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    loginRequest({
      username,
      password,
    });
  });
}

//init get Product and get Profile
const getProfileBtn = document.getElementById("btn-get-profile");
if (getProfileBtn) {
  getProfileBtn.addEventListener("click", (event) => {
    getProfileRequest();
  });
}

const getProductBtn = document.getElementById("btn-get-product");
if (getProductBtn) {
  getProductBtn.addEventListener("click", (event) => {
    getProductRequest();
  });
}

const getBothBtn = document.getElementById("btn-get-both");
if (getBothBtn) {
  getBothBtn.addEventListener("click", (event) => {
    getProductRequest();
    getProfileRequest();
  });
}

const refreshTokenBtn = document.getElementById("btn-refresh-token");
if (refreshTokenBtn) {
  refreshTokenBtn.addEventListener("click", (event) => {
    refreshTokenRequest();
  });
}
