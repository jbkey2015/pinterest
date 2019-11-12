import firebase from 'firebase';
import $ from 'jquery';
import boardsData from '../../helpers/data/boardData';
import utilities from '../../helpers/utilities';
import singleBoard from '../SingleBoard/singleBoard';
import pinData from '../../helpers/data/pinData';

const goToBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('view-')[1];
  singleBoard.buildBoard(boardId);
};

const deletePinByBoardId = (boardID) => {
  pinData.getPins(boardID)
    .then((pins) => {
      pins.forEach((pin) => {
        pinData.deletePin(pin.id);
      });
    });
};

const deleteBoardAndPins = (e) => {
  const { uid } = firebase.auth().currentUser;
  e.preventDefault();
  deletePinByBoardId(e.target.id);
  boardsData.deleteBoard(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      showAllBoards(uid);
    })
    .catch((error) => console.error(error));
};


const showAllBoards = (uid) => {
  boardsData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += '<div id="myBoards" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += `
        <div class="card col-4">
          <p>${board.name}</p>
          <img src="${board.imageUrl}"/>
          <button type="button" class="btn btn-danger view-board" id="view-${board.id}">VIEW BOARD</button>
          <button class="btn btn-danger delete-board" data-boardID="${board.id}" id="${board.id}">Remove Board</button>
        </div>
        `;
        utilities.printToDom('boards', domString);
        $('#boards').on('click', '.view-board', goToBoard);
        $('#boards').on('click', '.delete-board', deleteBoardAndPins);
      });
    })
    .catch((error) => console.error(error));
};

export default { showAllBoards };
