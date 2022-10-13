import axios from 'axios';

const API_URL = 'http://localhost:5000/deck';

class DeckService {
  async getDeck(userId) {
    const response = await axios.get(`${API_URL}/${userId}`);
    if (response.data) {
      JSON.stringify(response.data);
    }
    
    return response.data;
  }

  // async register(username, password) {
  //   const response = await axios
  //   .post(`${API_URL}/register`, { username, password });
  //   if (response.data.accessToken) {
  //     localStorage.setItem('user', JSON.stringify(response.data));
  //   }
  //   console.log('response.data', response.data);
  //   return response.data;
  // }
}

export default new DeckService();
