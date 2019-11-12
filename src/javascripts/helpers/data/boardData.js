import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseurl = apiKeys.firebaseKeys.databaseURL;


const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseurl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const getBoardByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseurl}/boards/${boardId}.json`)
    .then((response) => {
      const board = response.data;
      board.id = boardId;
      resolve(board);
    })
    .catch((error) => reject(error));
});

export default { getBoards, getBoardByBoardId };
