// Ler o ID da query string
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Ir buscar do localStorage
const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];
const ocorrencia = ocorrencias.find(o => o.id === id);

// Obter utilizador logado para decidir o título
let user = sessionStorage.getItem('userfront');
if (user) user = JSON.parse(user);

if (ocorrencia) {
  // Atualizar título dinamicamente
  const tituloH1 = document.querySelector('header h1');
  if (user && ocorrencia.userid === user.id) {
    tituloH1.textContent = "Minhas Ocorrências";
  } else {
    tituloH1.textContent = "Ocorrências Públicas";
  }

  // Preencher os campos
  document.getElementById("tipo-ocorrencia").textContent = ocorrencia.tipo;
  document.getElementById("morada").textContent = ocorrencia.morada + ", ";
  document.getElementById("codigo-postal").textContent = ocorrencia.codigoPostal;
  document.getElementById("email").textContent = ocorrencia.email;
  document.getElementById("descricao").textContent = ocorrencia.descricao;
  const estadoElement = document.getElementById("estado");
  estadoElement.textContent = ocorrencia.estado;
  estadoElement.className = 'status';
  estadoElement.setAttribute('data-estado', ocorrencia.estado);

  // Preencher imagens
  const galeria = document.getElementById("galeria-imagens");
  ocorrencia.imagens.forEach((imgBase64, index) => {
    const div = document.createElement("div");
    div.className = "imagem-item";
    div.innerHTML = `
      <img src="${imgBase64}" alt="Imagem ${index + 1}">
      <p>Imagem ${index + 1}</p>
    `;
    galeria.appendChild(div);
  });

  // Inicializar o mapa
  window.initMap = function () {
    // Converte strings em números
    const lat = parseFloat(ocorrencia.latitude);
    const lng = parseFloat(ocorrencia.longitude);
    if (isNaN(lat) || isNaN(lng)) {
      console.error("Latitude ou longitude inválidas");
      return;
    }

    const pos = { lat, lng };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: pos,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
    });

    new google.maps.Marker({
      position: pos,
      map: map,
    });
  };
} else {
  // Se não encontrar a ocorrência
  alert("Ocorrência não encontrada.");
  window.location.href = "index.html"; // ou outro caminho
}

// Handle approve/reject buttons
    const btnGreen = document.querySelector('.button-green');
    if (btnGreen) {
      btnGreen.addEventListener('click', () => {
          localStorage.setItem('occurrenceForAudit', id);
          window.location.href = '../../Auditoria/criarauditoria.html';
      });
    }

// Update the status tag function
function updateStatusTag(status) {
    const estadoElement = document.getElementById("estado");
    if (estadoElement) {
        estadoElement.textContent = status;
        estadoElement.className = 'status';
        estadoElement.setAttribute('data-estado', status);
    }
}

// Atualizar o botão vermelho
const btnRed = document.querySelector('.button-red');
if (btnRed) {
  btnRed.addEventListener('click', () => {
      const occurrences = JSON.parse(localStorage.getItem('ocorrencias')) || [];
      const index = occurrences.findIndex(o => o.id === id);
      
      if (index !== -1) {
          occurrences[index].estado = 'Não Aceite';
          localStorage.setItem('ocorrencias', JSON.stringify(occurrences));
          
          updateStatusTag('Não Aceite');
          
          setTimeout(() => {
              history.back();
          }, 500);
      }
  });
}