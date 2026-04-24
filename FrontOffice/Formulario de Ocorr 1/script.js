// Preencher automaticamente o tipo vindo da página anterior
const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");

if (tipo) {
  const select = document.getElementById("tipo-ocorrencia");
  for (const option of select.options) {
    if (option.value.toLowerCase() === tipo.toLowerCase()) {
      option.selected = true;
      break;
    }
  }
}

let user = sessionStorage.getItem('userfront') || localStorage.getItem('userfront');
if (user) {
  user = JSON.parse(user);
}

console.log(user);

const form = document.querySelector('.formulario');
const uploadInput = document.getElementById('upload');

// Função para converter ficheiro em Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Função para obter latitude e longitude com base na morada
async function getCoordinatesFromAddress(address) {
  const geocoder = new google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          latitude: location.lat(),
          longitude: location.lng()
        });
      } else {
        reject("Não foi possível obter as coordenadas para a morada fornecida.");
      }
    });
  });
}

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

// Função para exibir o popup
function showPopup(message, isSuccess = true) {
  popupMessage.textContent = message;
  popupMessage.style.color = isSuccess ? '#155724' : '#721c24'; // Verde para sucesso, vermelho para erro
  popup.style.display = 'flex'; // Exibe o popup
}

// Fechar o popup ao clicar no botão
popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Ao submeter o formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Verificar se todos os campos obrigatórios estão preenchidos
  if (
    !document.getElementById('tipo-ocorrencia').value ||
    !document.getElementById('email').value ||
    !document.getElementById('morada').value ||
    !document.getElementById('codigo-postal').value ||
    !document.getElementById('descricao').value
  ) {
    showPopup("Por favor, preencha todos os campos obrigatórios.", false);
    return;
  }

  // Obter a morada do formulário
  const morada = document.getElementById('morada').value;
  const codigoPostal = document.getElementById('codigo-postal').value;
  const geocoder = new google.maps.Geocoder();

  // Função interna para processar o registo
  async function processarRegisto(lat, lng) {
    const imagensBase64 = await Promise.all(
      Array.from(uploadInput.files).map(file => fileToBase64(file))
    );

    if (!user || !user.id) {
      showPopup("Utilizador não autenticado. Por favor, faça login novamente.", false);
      return;
    }

    try {
      const ocorrenciasGuardadas = JSON.parse(localStorage.getItem('ocorrencias')) || [];
      
      // Encontrar o próximo ID sequencial (mínimo 2001 para evitar conflito com mock data)
      const maxId = ocorrenciasGuardadas.reduce((max, o) => Math.max(max, parseInt(o.id) || 0), 2000);
      const novoId = maxId + 1;

      const ocorrencia = {
        id: novoId, 
        tipo: document.getElementById('tipo-ocorrencia').value,
        email: document.getElementById('email').value,
        morada: morada,
        codigoPostal: codigoPostal,
        descricao: document.getElementById('descricao').value,
        imagens: imagensBase64,
        estado: "Em Progresso", // Alterado para aparecer logo nas listas ativas
        data: new Date().toLocaleString('pt-PT'),
        userid: user.id,
        latitude: lat,
        longitude: lng
      };

      ocorrenciasGuardadas.push(ocorrencia);
      localStorage.setItem('ocorrencias', JSON.stringify(ocorrenciasGuardadas));

      showPopup("Ocorrência registada com sucesso!");

      setTimeout(() => {
        window.location.href = "../Auditorias/index.html";
      }, 2000);

      form.reset();
    } catch (error) {
      console.error(error);
      showPopup("Erro ao registar a ocorrência. Por favor, tente novamente.", false);
    }
  }

  // Se já temos coordenadas do mapa (window.latitude/longitude), usamos essas diretamente
  if (window.latitude && window.longitude) {
    processarRegisto(window.latitude, window.longitude);
  } else {
    // Caso contrário, tentamos geocodificar a morada escrita
    geocoder.geocode({ address: morada + ", Braga" }, async function(results, status) {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        processarRegisto(location.lat(), location.lng());
      } else {
        showPopup('Morada não encontrada. Por favor, selecione o local no mapa.', false);
      }
    });
  }
});