import $ from 'jquery';
import util from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import pin from '../Pins/pins';

const allBoards = $('#boards');
const pinsBoard = $('#pinBoards');


const buildBoard = (boardId) => {
  allBoards.addClass('hide');
  pinsBoard.removeClass('hide');
  let domString = `<h1 class="text-center">${boardId.name}</h1>`;
  domString += '<div id="board-section" class="d-flex flex-wrap justify-content-center">';
  pinData.getPins(boardId)
    .then((pins) => {
      pins.forEach((p) => {
        domString += pin.makeAPin(p);
      });
      util.printToDom('boards', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildBoard };
