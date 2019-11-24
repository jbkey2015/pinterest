import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseurl = apiKeys.firebaseKeys.databaseURL;


const getPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseurl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);
    })
    .catch((error) => reject(error));
});

const updatePin = (pinId, edPin) => axios.put(`${baseurl}/pins/${pinId}.json`, edPin);

const getPinById = (pinId, changeBoard) => new Promise((resolve, reject) => {
  axios.get(`${baseurl}/pins/${pinId}.json`)
    .then((result) => {
      const pinObject = result.data;
      pinObject.boardId = changeBoard;
      updatePin(pinId, pinObject);
      resolve();
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseurl}/pins/${pinId}.json`);

const addNewPin = (newPin) => axios.post(`${baseurl}/pins.json`, newPin);


export default {
  getPins,
  deletePin,
  addNewPin,
  getPinById,
  updatePin,
};
