import REST from "components/Utils/REST.jsx";

const crypto = require('crypto');

class Utils {
  constructor() {
    this.rest = new REST();
    this.pubKey = null;
    this.profile = null;
    this.promotions = null;
    this.requests = null;
    this.stats = null;
    this.tags = null;
    this.mapsClient = new window.google.maps.Geocoder();

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
    let data = { data: body }
    return await this.rest.delete(endpoint, data);
  }

  async getPubKey() {
    let pubKey = await this.get('/pubkey');
    this.pubKey = Buffer.from(pubKey);
  }

  getAddress(input) {
    let data = { location: input };
    let mapsClient = this.mapsClient;

    return new Promise(function(resolve, reject) {
      mapsClient.geocode(data, function(results, status) {
        if (status === 'OK') {
          console.log(results);
          resolve(results[0].formatted_address);
        } else if (status === "ZERO_RESULTS") {
          resolve("Invalid Address");
        } else {
          reject(status);
        }
      });
    });
  }

  getLatLng(input) {
    let data = { address: input };
    let mapsClient = this.mapsClient;

    return new Promise(function(resolve, reject) {
      mapsClient.geocode(data, function(results, status) {
        if (status === 'OK') {
          console.log(results);
          let latlng = {};
          latlng.lat = results[0].geometry.location.lat();
          latlng.lng = results[0].geometry.location.lng();
          resolve(latlng);
        } else {
          reject(status);
        }
      });
    });
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

  async getRequests() {
    let result = await this.get('/request');
    console.log(result);

    return result;
  }

  async getData(id, bearer) {
    // This sets all data for the current session
    // 0. Set Bearer
    await this.setHeaders(bearer);

    // 1. Profile Data
    let params = { _id: id };
    let result = await this.get('/stores', params);
    this.profile = result[0];
    global.profile = this.profile;
    global.storeLoc = await this.getAddress({ lat: this.profile.location[0], lng: this.profile.location[1] });

    // 2. Promotions
    delete params._id;
    params.id = id;
    await this.getPromotions(bearer);

    // 3. Analytics
    result = await this.get('/stats', params);
    this.stats = result;
    global.stats = this.stats;
    console.log(result);

    // 4. Tags
    result = await this.get('/tags', params);
    this.tags = result;
    global.tags = this.tags;
    console.log(result);

    // 5. Requests
    if (global.profile.email === "nvdbluetwo@gmail.com") {
      result = await this.getRequests();
      this.requests = result;
      global.requests = this.requests;
    }
  }

  async dealAdd(bearer, deal, onComplete) {
    await this.setHeaders(bearer);
    let result = await this.post('/deals', deal);
    console.log("DEAL ADDED", result);

    this.getPromotions(bearer);
    onComplete();
  }

  async dealDelete(bearer, deal, index, onComplete) {
    await this.setHeaders(bearer);
    let result = await this.delete('/deals', deal);
    console.log("DEAL DELETED", result);

    if (result.stats !== "Failure.") {
      global.promotions.splice(index, 1);
    }
    onComplete();
  }

  async dealUpdate(bearer, deal, index, onComplete) {
    await this.setHeaders(bearer);
    let result = await this.put('/deals', deal);
    console.log("DEAL UPDATED", result);

    if (result.stats !== "Failure.") {
      for (var property in deal) {
        global.promotions[index][property] = deal[property];
      }
    }
    onComplete();
  }

  async getPromotions(bearer) {
    await this.setHeaders(bearer);
    let params = { id: global.profile._id };

    let result = await this.get('/deals/store', params);
    this.promotions = result;
    global.promotions = this.promotions;
    console.log(result);
  }

  async clearData() {
    // This clears all data for the current session
    this.profile = null;
  }
}

export default Utils;
