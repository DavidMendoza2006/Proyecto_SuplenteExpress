document.addEventListener('DOMContentLoaded', () => {
  const navEntries = performance.getEntriesByType("navigation");
  if (navEntries.length > 0 && navEntries[0].type === "reload") {
    sessionStorage.removeItem('da1_chat_history');
  }

 
  const chatWidget = document.getElementById('da1-chat-widget');
  const chatIcon = document.getElementById('da1-chat-icon');
  const chatClose = document.getElementById('da1-chat-close');
  const chatInput = document.getElementById('da1-chat-input');
  const chatSend = document.getElementById('da1-chat-send');
  const chatMessages = document.getElementById('da1-chat-messages');

  let chatHistory = [];
  
  const savedChat = sessionStorage.getItem('da1_chat_history');
  
  if (savedChat) {
    chatHistory = JSON.parse(savedChat);
    chatMessages.innerHTML = ''; 
    chatHistory.forEach(msg => addMessageToUI(msg.text, msg.role));
  } else {
    const saludoInicial = "Bienvenido a DA1MOTORS. Soy su asistente personal. ¿En qué hiperdeportivo está interesado hoy?";
    chatMessages.innerHTML = `<div class="da1-msg da1-msg-ai">${saludoInicial}</div>`;
    chatHistory.push({ role: 'ai', text: saludoInicial });
    sessionStorage.setItem('da1_chat_history', JSON.stringify(chatHistory));
  }

  chatIcon.addEventListener('click', () => {
    chatWidget.classList.remove('da1-chat-collapsed');
    chatWidget.classList.add('da1-chat-expanded');
    chatInput.focus(); 
    chatMessages.scrollTop = chatMessages.scrollHeight; 
  });

  chatClose.addEventListener('click', () => {
    chatWidget.classList.add('da1-chat-collapsed');
    chatWidget.classList.remove('da1-chat-expanded');
  });

  function addMessageToUI(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `da1-msg da1-msg-${sender}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; 
  }


  const handleSend = async () => {
    const mensajeVal = chatInput.value.trim();
    if (!mensajeVal) return;

    addMessageToUI(mensajeVal, 'user');
    chatHistory.push({ role: 'user', text: mensajeVal });
    sessionStorage.setItem('da1_chat_history', JSON.stringify(chatHistory));
    chatInput.value = '';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'da1-msg da1-msg-ai da1-msg-loading';
    loadingDiv.textContent = '...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await fetch('api_chatbot.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ historial: chatHistory }) 
      });

      const data = await response.json();
      chatMessages.removeChild(loadingDiv);

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const respuestaAI = data.candidates[0].content.parts[0].text;
        
        addMessageToUI(respuestaAI, 'ai');
        chatHistory.push({ role: 'ai', text: respuestaAI });
        sessionStorage.setItem('da1_chat_history', JSON.stringify(chatHistory));
        
      } else {
        console.error("Detalles del error:", data);
        const errorMsg = data.error ? data.error.message : "Error desconocido";
        addMessageToUI("Error de la central DA1: " + errorMsg, 'ai');
      }

    } catch (error) {
      if (chatMessages.contains(loadingDiv)) chatMessages.removeChild(loadingDiv);
      addMessageToUI("Error de conexión con la red.", 'ai');
      console.error(error);
    }
  };

  chatSend.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});