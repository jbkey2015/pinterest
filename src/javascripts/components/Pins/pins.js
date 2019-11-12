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
    </div>
    </div>
    `;
  return domString;
};

export default { makeAPin };
