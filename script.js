const pertanyaan = document.getElementById("pertanyaan");
const jawaban = document.getElementById("jawaban");
const chatContainer = document.getElementById("chatContainer");
const typingIndicator = document.getElementById("typingIndicator");

let init = 0;
let usersData = {};

const botSay = (data) => {
  return [
    "Halo, Perkenalkan Nama Saya LerryBot. Siapa Nama Kamu?", 
    `Halo ${data?.nama}, senang bertemu denganmu! Boleh tahu usia kamu?`,
    `Oh, jadi kamu ${data?.usia} tahun! Hobi kamu apa ya?`,
    `Wah, aku juga suka ${data?.hobi}! Btw, kamu punya pacar nggak?`,
    `${data?.pacar}, ya? Hehe... Oke deh, terima kasih sudah berbagi cerita!`
  ];
};

function displayBotMessage(message) {
  const botMessage = document.createElement("div");
  botMessage.classList.add("message", "bot-message");
  botMessage.innerHTML = message;
  chatContainer.appendChild(botMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function displayUserMessage(message) {
  const userMessage = document.createElement("div");
  userMessage.classList.add("message", "user-message");
  userMessage.innerHTML = message;
  chatContainer.appendChild(userMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function botStart() {
  const userResponse = jawaban.value.trim();
  if (userResponse) {
    displayUserMessage(userResponse);
    jawaban.value = "";
    typingIndicator.style.display = "block";
    setTimeout(() => {
      typingIndicator.style.display = "none";
      init++;
      processBotResponse(userResponse);
    }, 1000);
  }
}

function processBotResponse(response) {
  if (init === 1) {
    usersData.nama = response;
    botDelay({ nama: response });
  } else if (init === 2) {
    usersData.usia = response;
    botDelay({ usia: response });
  } else if (init === 3) {
    usersData.hobi = response;
    botDelay({ hobi: response });
  } else if (init === 4) {
    usersData.pacar = response;
    botDelay({ pacar: response });
  } else if (init === 5) {
    finishing();
  } else {
    botEnd();
  }
}

function botDelay(data) {
  setTimeout(() => {
    const botResponse = botSay({ ...usersData, ...data })[init];
    displayBotMessage(botResponse);
  }, 3500);
}

function finishing() {
  displayBotMessage(`Terima kasih ${usersData.nama} sudah berbincang dengan LerryBot 😊! Nanti kita bisa main ${usersData.hobi} bareng ya!`);
  jawaban.placeholder = "Sampai jumpa lagi!";
  jawaban.disabled = true;
}

function botEnd() {
  window.location.reload();
}
