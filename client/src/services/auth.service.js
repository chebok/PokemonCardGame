import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(`${API_URL}/login`, { username, password });
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(username, password) {
    const response = await axios
    .post(`${API_URL}/register`, { username, password });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }
}

export default new AuthService();
