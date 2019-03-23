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

  async getData(input) {
    // This sets all data for the current session
    // 0. Set Bearer
    await this.setHeaders(input.Bearer);

    // 1. Profile Data
    let params = { _id: input.id };
    let result = await this.get('/stores', params);
    this.profile = result[0];
    console.log(this.profile);
  }

  async clearData() {
    // This clears all data for the current session
    this.profile = null;
  }

  async test() {
    let params =
    {
      access: 'store',
      email: 'store@store.com',
      id: 'asdfasd89fuq0we'
    }

    let result = await this.get('/bearer', params);
    console.log(result);

    let data =
    {
      id: "5c9682de8b4831dba037c876",
      Bearer: result.Bearer,
    }

    await this.getData(data);

    let updateObj = {
      id: "5c9682de8b4831dba037c876",
    	name: "YouTube",
    	description: "AHHHHHHHHHHHHHHH",
    	parentCompany: "Alphabet",
    }

    result = await this.put('/stores', updateObj);
    console.log(result);
  }
}

export default Utils;
