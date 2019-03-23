const axios = require('axios');
const SERVER = 'https://api.dealme.today';
// const SERVER = 'http://localhost:3000';

class REST {
  constructor() {
    this.api = axios.create({
      baseURL: SERVER,
    });

    this.api.defaults.headers.common['Content-Type'] = 'application/json';
    this.response = null;
  }

  async setHeaders(bearer) {
    this.api.defaults.headers.common['Bearer'] = bearer;
  }

  async deleteHeaders() {
    delete this.api.defaults.headers.common['Bearer'];
  }

  async get(endpoint, params) {
    if (params === null) {
      this.response = await this.api.get(endpoint);
    } else {
      let data = { params: params };
      this.response = await this.api.get(endpoint, data);
    }
    return this.response.data;
  }

  async post(endpoint, body) {
    this.response = await this.api.post(endpoint, body);

    return this.response.data;
  }

  async put(endpoint, body) {
    this.response = await this.api.put(endpoint, body);

    return this.response.data;
  }

  async delete(endpoint, body) {
    this.response = await this.api.delete(endpoint, body);

    return this.response.data;
  }
}

export default REST;
