// Create chat bubble
const bubble = document.createElement("div");
bubble.id = "chat-bubble";
bubble.style.position = "fixed";
bubble.style.bottom = "20px";
bubble.style.right = "20px";
bubble.style.width = "60px";
bubble.style.height = "60px";
bubble.style.borderRadius = "50%";
bubble.style.background = "#007aff";
bubble.style.display = "flex";
bubble.style.alignItems = "center";
bubble.style.justifyContent = "center";
bubble.style.color = "white";
bubble.style.fontSize = "30px";
bubble.style.cursor = "pointer";
bubble.style.zIndex = "9999";
bubble.textContent = "💬";
document.body.appendChild(bubble);

// Create chat window (hidden at first)
const chatWindow = document.createElement("div");
chatWindow.id = "chat-window";
chatWindow.style.position = "fixed";
chatWindow.style.bottom = "100px";
chatWindow.style.right = "20px";
chatWindow.style.width = "300px";
chatWindow.style.height = "400px";
chatWindow.style.background = "white";
chatWindow.style.border = "1px solid #ccc";
chatWindow.style.borderRadius = "10px";
chatWindow.style.display = "none";
chatWindow.style.flexDirection = "column";
chatWindow.style.zIndex = "9999";
chatWindow.style.overflow = "hidden";
document.body.appendChild(chatWindow);

// Chat window inner HTML
chatWindow.innerHTML = `
  <div id="messages" style="flex:1; overflow-y:auto; padding:10px;"></div>
  <div style="display:flex; border-top:1px solid #ccc;">
    <input id="input" type="text" placeholder="Type..." style="flex:1; padding:8px; border:none;" />
    <button id="send" style="padding:8px 12px; border:none; background:#007aff; color:white;">Send</button>
  </div>
`;

// Toggle chat window
bubble.onclick = () => {
  chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
};

// Chat logic
const messagesDiv = chatWindow.querySelector("#messages");
const input = chatWindow.querySelector("#input");
const sendBtn = chatWindow.querySelector("#send");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.textContent = sender + ": " + text;
  div.style.margin = "8px 0";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "You");
  input.value = "";

  const res = await fetch("https://hot-tub-chat-bot.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: text }]
    })
  });

  const data = await res.json();
  addMessage(data.reply, "Bot");
};

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

