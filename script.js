let responses = {};

fetch("responses.json")
  .then(response => response.json())
  .then(data => {
    responses = data;
  })
  .catch(error => {
    console.error("Could not load responses.json:", error);
  });


function sendMessage() {

  const input = document.getElementById("messageInput");
  const message = input.value.trim().toLowerCase();

  if (message === "") return;

  addUserMessage(message);

  input.value = "";

  setTimeout(() => {
    autoReply(message);
  }, 800);
}


function addUserMessage(message) {

  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.className = "user-message";
  div.textContent = message;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}


function autoReply(message) {

  const chatBox = document.getElementById("chatBox");

  let response = responses[message];

  // Default response
  if (!response) {
    response = {
      text: "I don't understand that yet 🤖",
      gif: "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"
    };
  }

  const div = document.createElement("div");
  div.className = "bot-message";

  div.innerHTML = `
    ${response.text}
    <img class="bot-gif" src="${response.gif}" alt="GIF">
  `;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}


document.getElementById("messageInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});