const axios = require('axios');
const crypto = require('crypto');
const SERVER = 'https://api.dealme.today';
// const SERVER = 'http://localhost:3000';

class Utils {
  constructor() {
    axios.defaults.baseURL = SERVER;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    this.response = null;
    this.pubKey = null;
  }

  setHeaders(bearer) {
    axios.defaults.headers.common['Bearer'] = bearer;
  }

  deleteHeaders() {
    delete axios.defaults.headers.common['Bearer'];
  }

  async setPubKey() {
    let pubKey = await this.get('/pubkey');
    this.pubKey = Buffer.from(pubKey);
  }

  async encrypt(item) {
    if (this.pubKey === null) {
      await this.setPubKey();
    }

    let buffer = Buffer.from(item);
    let options =
    {
      key: this.pubKey,
      padding: crypto.constants.RSA_PKCS1_PADDING
    }

    let encrypted = crypto.publicEncrypt(options, buffer);
    return encrypted.toString("base64");
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

export default Utils;

// let test = async () => {
//   let utils = new Utils();
//
//   let params =
//   {
//     access: 'developer',
//     email: 'dev@dev.com',
//     id: 'asdfasd89fuq0we'
//   }
//
//   let result = await utils.get('/bearer', params);
//   console.log(result);
//
//   utils.setHeaders(result.Bearer);
//
//   // result = await utils.get('/users');
//   // console.log(result);
//
//   let encrypted = await utils.encrypt('password');
//   console.log(encrypted);
// }
//
// test();
