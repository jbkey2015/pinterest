const makeAPin = (pins) => {
  let domString = '';
  domString += `
    <div class="card" style="width: 18rem;">
    <img src="${pins.imageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${pins.name}</h5>
    <p class="card-text">${pins.description}</p>
    </div>
    <div class="card-body">
    <a href="${pins.siteUrl}" class="card-link">Visit this site.</a>
    <button class="btn btn-link delete-pin" id="${pins.id}">Delete Pin</button>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" data-boardID="${pins.boardID} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Change Board
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-boardID="${pins.boardID} id="dropdownMenuButton-${pins.id}">
    ${pins.boardSelections}</div>
    </div>
    </div>
    `;
  return domString;
};

export default { makeAPin };
