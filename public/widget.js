(function () {
  // Create the chat bubble button
  const bubble = document.createElement("div");
  bubble.id = "qsc-chat-bubble";
  bubble.style.position = "fixed";
  bubble.style.bottom = "20px";
  bubble.style.right = "20px";
  bubble.style.width = "60px";
  bubble.style.height = "60px";
  bubble.style.background = "#0077cc";
  bubble.style.borderRadius = "50%";
  bubble.style.display = "flex";
  bubble.style.justifyContent = "center";
  bubble.style.alignItems = "center";
  bubble.style.color = "white";
  bubble.style.fontSize = "30px";
  bubble.style.cursor = "pointer";
  bubble.style.zIndex = "999999";
  bubble.innerHTML = "💬";

  document.body.appendChild(bubble);

  // Create the chat window
  const frame = document.createElement("iframe");
  frame.src = "https://hot-tub-chat-bot.onrender.com";
  frame.style.position = "fixed";
  frame.style.bottom = "100px";
  frame.style.right = "20px";
  frame.style.width = "350px";
  frame.style.height = "500px";
  frame.style.border = "1px solid #ccc";
  frame.style.borderRadius = "10px";
  frame.style.display = "none";
  frame.style.zIndex = "999999";

  document.body.appendChild(frame);

  // Toggle chat window
  bubble.addEventListener("click", () => {
    frame.style.display = frame.style.display === "none" ? "block" : "none";
  });
})();
