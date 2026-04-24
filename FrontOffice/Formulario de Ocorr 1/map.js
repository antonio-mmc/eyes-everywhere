let map;
let marker;
let geocoder;
let searchBox;
window.latitude = null;
window.longitude = null;

function initMap() {
  const braga = { lat: 41.5454, lng: -8.4265 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: braga,
    mapTypeId: "roadmap",
    streetViewControl: true,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain"]
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: true,
    fullscreenControl: true
  });

  const moradaInput = document.getElementById('morada');
  const codigoPostalInput = document.getElementById('codigo-postal');
  searchBox = new google.maps.places.SearchBox(moradaInput);

  // Função para obter morada via OpenStreetMap (Nominatim) - Gratuito e sem chave
  async function fetchAddressNominatim(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`, {
        headers: { 'Accept-Language': 'pt-PT' }
      });
      const data = await response.json();
      
      if (data && data.address) {
        // Formatar morada
        const street = data.address.road || data.address.pedestrian || "";
        const houseNumber = data.address.house_number || "";
        const city = data.address.city || data.address.town || data.address.village || "";
        
        moradaInput.value = `${street}${houseNumber ? ' ' + houseNumber : ''}${city ? ', ' + city : ''}`;
        codigoPostalInput.value = data.address.postcode || "";
        
        window.latitude = lat;
        window.longitude = lng;
      }
    } catch (error) {
      console.error('Erro ao obter morada do Nominatim:', error);
    }
  }

  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();
    if (!places.length || !places[0].geometry?.location) return;

    const location = places[0].geometry.location;
    window.latitude = location.lat();
    window.longitude = location.lng();

    map.setCenter(location);
    map.setZoom(16);

    if (!marker) {
      marker = new google.maps.Marker({ map: map, draggable: true });
      marker.addListener('dragend', () => {
        const pos = marker.getPosition();
        fetchAddressNominatim(pos.lat(), pos.lng());
      });
    }
    marker.setPosition(location);

    // Tentar obter o código postal dos resultados do Google Places (se disponível)
    const postalCodeComp = places[0].address_components.find(comp => comp.types.includes('postal_code'));
    if (postalCodeComp) {
      codigoPostalInput.value = postalCodeComp.long_name;
    }
  });

  map.addListener("click", (e) => {
    if (!marker) {
      marker = new google.maps.Marker({ map: map, draggable: true });
      marker.addListener('dragend', () => {
        const pos = marker.getPosition();
        fetchAddressNominatim(pos.lat(), pos.lng());
      });
    }
    marker.setPosition(e.latLng);
    fetchAddressNominatim(e.latLng.lat(), e.latLng.lng());
  });
}
