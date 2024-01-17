import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    'Content-Type' : 'application/json; charset=utf-8'
  }
});


// 요청을 날릴때 리퀘스트객체를 받아와서 토큰을 가져와서 있을때 리턴이되는 메서드
// request 객체
function addJwtToRequest(config) {
  const jwt = sessionStorage.getItem('jwt');

  if(jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return config;
}

// 요청할때 작동되는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => addJwtToRequest(config),
  (error) => Promise.reject(error)
);

export default axiosInstance;
