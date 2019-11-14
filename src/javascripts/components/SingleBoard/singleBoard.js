import $ from 'jquery';
import util from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pin from '../Pins/pins';
import boardData from '../../helpers/data/boardData';


const allBoards = $('#boards');
const pinsBoard = $('#pinBoards');

const deleteFromBoard = (e) => {
  e.preventDefault();
  const boardId = $('.board-header')[0].id;
  const pinId = e.target.id;
  pinData.deletePin(pinId)
    .then(() => {
      console.error(boardId);
      // eslint-disable-next-line no-use-before-define
      buildBoard(boardId);
    })
    .catch((error) => console.error(error));
};

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const assignToBoard = $('.add-a-pin')[0].id;
  const newPin = {
    name: $('#pin-name').val(),
    description: $('#pin-description').val(),
  };
  pinData.addNewPin(newPin)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      pin.makeAPin(assignToBoard);
    })
    .catch((error) => console.error(error));
};


const buildBoard = (boardId) => {
  allBoards.addClass('hide');
  pinsBoard.removeClass('hide');
  boardData.getBoardByBoardId(boardId)
    .then((board) => {
      let domString = `<h1 class="add-a-pin text-center board-header" id="${board.id}">${board.name}</h1>`;
      domString += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add Pin
      </button>`;
      domString += '<center><a href="/"class="btn btn-primary">Go Back</a></center>';
      domString += '<div id="board-section" class="d-flex flex-wrap justify-content-center">';
      pinData.getPins(boardId)
        .then((pins) => {
          pins.forEach((p) => {
            domString += pin.makeAPin(p);
          });
          domString += '</div>';
          util.printToDom('pinBoards', domString);
          $('#pinBoards').on('click', '.delete-pin', deleteFromBoard);
          $(document.body).on('click', '#add-new-pin', addNewPin);
        });
    })
    .catch((error) => console.error(error));
};

export default { buildBoard };
