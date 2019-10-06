/**
 * FSJS Techdegree Project 5
 * @author scout.starchaser@gmail.com
 */

/* global constants */
const baseUrl = 'https://randomuser.me/api/';
const numUsers = 12;

/* Returns a list of users fetched from the api */
const fetchUsers = async numUsers => {
    const url = `${baseUrl}?results=${numUsers}`

    let users = await fetch(url)
        .then(response => response.json())
        .then(json => json.results);

    return users;
}

/* Creates a card for each user in the list, and appends it to the gallery */
const buildGallery = userList => {
    let gallery = document.querySelector('#gallery');

    for( user of userList ) {
        let markup = `
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap"> \
                ${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city},\
                 ${user.location.state}</p>
            </div>
        `;

        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = markup;
        card.user = user;

        gallery.appendChild(card);
    }
}

const buildModal = user => {

    if( !user) {
        return;
    }

    let markup = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.phone}</p>
                <p class="modal-text">${user.location.street.number},\
                 ${user.location.street.name} \
                 ${user.location.city}, ${user.location.state} \
                 ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${user.dob.date.substring(0,10)}</p>
            </div>
        </div>
        `;

        let modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = markup;

        let closeButton = modalContainer.querySelector('#modal-close-btn');

        closeButton.addEventListener('click', event => {
            document.body.removeChild(modalContainer);
        });

        document.body.appendChild(modalContainer);
}

const init = () => {
    fetchUsers(numUsers)
    .then(userList => buildGallery(userList));

    
    document.querySelector('#gallery')
            .addEventListener('click', event => {
            let user = event.target.parentNode.parentNode.user 
                || event.target.parentNode.user
                || event.target.user;
            
            buildModal(user);
        });
}

init();