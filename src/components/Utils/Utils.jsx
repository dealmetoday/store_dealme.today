import REST from "components/Utils/REST.jsx";

const crypto = require('crypto');

class Utils {
  constructor() {
    this.rest = new REST();
    this.pubKey = null;
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
}

export default Utils;
