import $ from 'jquery';
import boardsData from '../../helpers/data/boardData';
import utilities from '../../helpers/utilities';
import singleBoard from '../SingleBoard/singleBoard';

const goToBoard = (e) => {
  e.stopImmediatePropagation();
  const boardId = e.target.id.split('view-')[1];
  singleBoard.buildBoard(boardId);
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
        </div>
        `;
        utilities.printToDom('boards', domString);
        $('#boards').on('click', '.view-board', goToBoard);
      });
    })
    .catch((error) => console.error(error));
};

export default { showAllBoards };
