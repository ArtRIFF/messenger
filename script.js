"use strict";
const btnSend = document.querySelector('.btn__send'),
  chat = document.querySelector('.chat-converstion'),
  contactsList = document.querySelector('.contacts-list'),
  header = document.querySelector('.header'),
  searchInput = document.querySelector('.search-input'),
  keyboart = document.querySelector('.keyboart');
let contactArray = [];

btnSend.addEventListener('click', () => {
  if (keyboart.value != "") {
    let time = new Date();
    chat.lastElementChild.insertAdjacentHTML("afterend", `<div class="contact__message owner__message">
  <div class="contact__message__container">
    <p>${keyboart.value}</p>
    <div class="contact__message__data"><p>${time.toLocaleDateString()},  ${time.toTimeString().substring(0, 5)}</p></div>
  </div>
</div>`);
    for (const contact of contactArray) {
      if (contact.name == header.dataset.name) {
        contact["contact-history"][time.toLocaleDateString() + "," +time.toTimeString().substring(0, 5)] = keyboart.value;
        renderMessageInterface(Alice);
      }
      contactsList.innerHTML = "";
      renderAllContacts();
    }
    keyboart.value = '';
  };
});

let Jonh = {
  "photo": "img/contact__pic3.png",
  "fullName": "John Silver",
  "name": "John",
  "lastMessageData":"",
  "lastMessageShort":"",
  "contact-history": {
    "13.04.2022, 23:13": "fromContact: Please call me! Do you know whats happend now?",
    "14.04.2022, 23:00": "We are losing money!Quick!",
    "15.04.2022, 22:13": "fromContact: LOLL!",
    "17.04.2022, 21:13": "Comon man!!!"
  },

  findLastMessage() {
    for (let data in this["contact-history"]) {
     this.lastMessageData = data;
     this.lastMessageShort = this["contact-history"][data];
      }
  },
  lastShortMessage() {
    this.findLastMessage();
    return this["lastMessageShort"].slice(0, 16) + "...";
  },
  lastDate() {
    this.findLastMessage();
    return this["lastMessageData"].slice(0, 10);
  }
};

let Alice = {
  "photo": "img/contact__pic2.png",
  "fullName": "Alice Freeman",
  "name": "Alice",
  "lastMessageData":"",
  "lastMessageShort":"",
  "contact-history": {
    "10.02.2022, 08.20": "fromContact: Call me!!!!",
    "12.04.2022, 02:00": "Do you know interesting movie?",
    "12.04.2022, 22:13": "fromContact: Quickly come to the meeting room 1B,we have a big server issue",
    "16.04.2022, 06:13": "Hello!!!How are you? Do you want some drink?"
  },
  findLastMessage() {
    for (let data in this["contact-history"]) {
     this.lastMessageData = data;
     this.lastMessageShort = this["contact-history"][data];
      }
  },
  lastShortMessage() {
    this.findLastMessage();
    return this["lastMessageShort"].slice(0, 16) + "...";
  },
  lastDate() {
    this.findLastMessage();
    return this["lastMessageData"].slice(0, 10);
  }
};

let Carl = {
  "photo": "img/contact__pic1.png",
  "fullName": "Carl White",
  "name": "Carl",
  "lastMessageData":"",
  "lastMessageShort":"",
  "contact-history": {
    "10.02.2022, 08.20": "fromContact: Who are you?",
    "10.02.2022, 09:00": "Im your neighbour",
    "11.04.2022, 22:13": "fromContact: I`m having breakfast right now, can`t you wait for 10 minutes?",
    "12.04.2022, 06:13": "Definitely yes.You know what time is it?"
  },
  findLastMessage() {
    for (let data in this["contact-history"]) {
     this.lastMessageData = data;
     this.lastMessageShort = this["contact-history"][data];
      }
  },
  lastShortMessage() {
    this.findLastMessage();
    return this["lastMessageShort"].slice(0, 16) + "...";
  },
  lastDate() {
    this.findLastMessage();
    return this["lastMessageData"].slice(0, 10);
  }
};

contactArray.push(Jonh);
contactArray.push(Alice);
contactArray.push(Carl);

function renderContact(contact) {
  contactsList.insertAdjacentHTML("afterbegin", `<div data-name = "${contact.name}" class="contact-chat">
  <div class="user-picture">
    <img class="user-photo" src="${contact.photo}" alt="user photo">
    <div class="user-status">
      <div class="user-status__check"></div>
    </div>
    </div>
<div class="contact-chat__desc">
  <div class="contact-chat__desc__info">
    <p class="contact-name">${contact.fullName}</p>
    <p class="chat-data">
    ${contact.lastDate()}
    </p>
  </div>
<div class="contact-chat__message">
  <p>${contact.lastShortMessage()}</p>
</div>
</div>
</div>`);
  for (const child of contactsList.children) {
    child.addEventListener('click', (e) => {
      renderMessageInterface(child.dataset.name);
    })
  }
};
function renderAllContacts() {
  for (const contact of contactArray) {
    renderContact(contact);
  }
};

renderAllContacts();


function renderMessageInterface(name) {
  for (const contact of contactArray) {
    if (name == contact.name) {
      header.setAttribute("data-name", contact.name);
      header.firstElementChild.firstElementChild.src = contact["photo"];
      header.lastElementChild.textContent = contact["fullName"];
      chat.innerHTML = "";
      for (const data in contact["contact-history"]) {
        let messageElement = document.createElement('div');
        if (contact["contact-history"][data].slice(0, 12) === "fromContact:") {
          messageElement.innerHTML = `<div class="contact__message">
        <div class="contact__message__data"><p>${data}</p></div>
<div class="user-picture">
<img class="user-photo" src="${contact["photo"]}" alt="user photo">			
</div>
<div class="contact__message__container">
${contact["contact-history"][data].slice(12)}
</div>
</div>`;
        } else {
          messageElement.innerHTML = `<div class="contact__message owner__message">
      <div class="contact__message__data"><p>${[data]}</p></div>
      <div class="contact__message__container">
        <p>${contact["contact-history"][data]}</p>
      </div>
    </div>`;
        }
        chat.append(messageElement);
      }
    }
  }
}

searchInput.addEventListener('input', () => {
  let searchValue = searchInput.value;
  contactsList.innerHTML = "";
  for (const contact of contactArray) {
    if (searchValue == contact.name) {
      renderContact(contact);
    } else if (searchValue == "") {
      renderContact(contact);
    };
  }
});

console.log();