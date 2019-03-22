const axios = require('axios');
const SERVER = 'https://api.dealme.today';
// const SERVER = 'http://localhost:3000';

class REST {
  constructor() {
    axios.defaults.baseURL = SERVER;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    this.response = null;
  }

  setHeaders(bearer) {
    axios.defaults.headers.common['Bearer'] = bearer;
  }

  deleteHeaders() {
    delete axios.defaults.headers.common['Bearer'];
  }

  async get(endpoint, params) {
    if (params === null) {
      this.response = await axios.get(endpoint);
    } else {
      let data = { params: params };
      this.response = await axios.get(endpoint, data);
    }
    return this.response.data;
  }

  async post(endpoint, body) {
    this.response = await axios.post(endpoint, body);

    return this.response.data;
  }

  async put(endpoint, body) {
    this.response = await axios.put(endpoint, body);

    return this.response.data;
  }

  async delete(endpoint, body) {
    this.response = await axios.delete(endpoint, body);

    return this.response.data;
  }
}

export default REST;
