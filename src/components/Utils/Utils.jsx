import REST from "components/Utils/REST.jsx";

const crypto = require('crypto');

class Utils {
  constructor() {
    this.rest = new REST();
    this.pubKey = null;
    this.profile = null;

    this.getPubKey();
  }

  async get(endpoint, params) {
    return await this.rest.get(endpoint, params);
  }

  async post(endpoint, body) {
    return await this.rest.post(endpoint, body);
  }

  async put(endpoint, body) {
    return await this.rest.put(endpoint, body);
  }

  async delete(endpoint, body) {
    return await this.rest.delete(endpoint, body);
  }

  async getPubKey() {
    let pubKey = await this.get('/pubkey');
    this.pubKey = Buffer.from(pubKey);
  }

  async encrypt(item) {
    if (this.pubKey === null) {
      await this.getPubKey();
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

  async setHeaders(bearer) {
     this.rest.setHeaders(bearer);
  }

  async getData(id, bearer) {
    // This sets all data for the current session
    // 0. Set Bearer
    await this.setHeaders(bearer);

    // 1. Profile Data
    let params = { _id: id };
    let result = await this.get('/stores', params);
    this.profile = result[0];
    console.log(this.profile);
  }

  async clearData() {
    // This clears all data for the current session
    this.profile = null;
  }
}

export default Utils;
