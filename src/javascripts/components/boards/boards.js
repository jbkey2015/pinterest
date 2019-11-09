import boardsData from '../../helpers/data/boardData';
import utilities from '../../helpers/utilities';

const showAllBoards = (uid) => {
  boardsData.getBoards(uid)
    .then((boards) => {
      let domString = '';
      domString += '<div id="myBoards" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += `
        <div class="card col-4">
          <p>${board.name}</p>
        </div>
        `;
        utilities.printToDom('boards', domString);
      });
    })
    .catch((error) => console.error(error));
};

export default { showAllBoards };
