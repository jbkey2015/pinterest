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


const buildBoard = (boardId) => {
  allBoards.addClass('hide');
  pinsBoard.removeClass('hide');
  boardData.getBoardByBoardId(boardId)
    .then((board) => {
      let domString = `<h1 class="text-center board-header" id="${board.id}">${board.name}</h1>`;
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
        });
    })
    .catch((error) => console.error(error));
};

export default { buildBoard };
