// CONFIGURATION DES MODELES ET DIMENSIONS DISPONIBLES
const productData = {
    "lave-main": [
        { value: "sharp-lm40", text: "Sharp LM 40 (400x225 mm)" },
        { value: "sharp-lm50", text: "Sharp LM 50 (500x300 mm)" }
    ],
    "vasque": [
        { value: "sharp-50", text: "Sharp 50 (505x380 mm)" },
        { value: "sharp-60", text: "Sharp 60 (603x450 mm)" },
        { value: "sharp-800", text: "Sharp 800 (805x485 mm)" },
        { value: "sharp-80tb", text: "Sharp 80 TB (798x483 mm avec Tablette)" },
        { value: "sharp-100", text: "Sharp 100 (1000x485 mm)" },
        { value: "ocean-45", text: "Océan 45 cm" },
        { value: "ocean-60", text: "Océan 60 cm" },
        { value: "ocean-80", text: "Océan 80 cm" },
        { value: "ocean-100", text: "Océan 100 cm" },
        { value: "ocean-120-double", text: "Océan 120 cm - Double Vasque Exclusivité" }
    ]
};

// DOM ELEMENTS
const typeSelect = document.getElementById('formType');
const modelSelect = document.getElementById('formModel');
const orderForm = document.getElementById('orderForm');
const promoCards = document.querySelectorAll('.promo-card');
const orderButtons = document.querySelectorAll('.btn-order');

// GESTION DYNAMIQUE DU SELECT DU FORMULAIRE
typeSelect.addEventListener('change', function() {
    const selectedType = this.value;
    
    // Vider les options précédentes
    modelSelect.innerHTML = '<option value="">-- Sélectionner le modèle --</option>';
    
    if (selectedType && productData[selectedType]) {
        productData[selectedType].forEach(model => {
            const option = document.createElement('option');
            option.value = model.value;
            option.textContent = model.text;
            modelSelect.appendChild(option);
        });
    } else {
        modelSelect.innerHTML = '<option value="">-- Sélectionner le type d\'abord --</option>';
    }
});

// REDIRECTION ET PRE-REMPLISSAGE DEPUIS LES CARTES PROMO
promoCards.forEach(card => {
    card.addEventListener('click', function() {
        const targetGroup = this.getAttribute('data-target');
        const element = document.getElementById(targetGroup + '-group');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// BOUTONS DE COMMANDE DU CATALOGUE
orderButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const modelName = this.getAttribute('data-model');
        const productType = this.getAttribute('data-type');
        
        // Défiler vers le formulaire
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        
        // Sélectionner le type
        typeSelect.value = productType;
        // Déclencher manuellement l'événement change pour populer les modèles
        typeSelect.dispatchEvent(new Event('change'));
        
        // Trouver et sélectionner l'option correspondante dans la liste des modèles
        for (let i = 0; i < modelSelect.options.length; i++) {
            if (modelSelect.options[i].text.includes(modelName)) {
                modelSelect.selectedIndex = i;
                break;
            }
        }
    });
});

// SOUMISSION DU FORMULAIRE (SIMULATION)
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const type = typeSelect.value;
    const model = modelSelect.options[modelSelect.selectedIndex]?.text;
    const clientName = document.getElementById('formClientName').value;
    const clientPhone = document.getElementById('formClientPhone').value;
    
    if (!type || !modelSelect.value) {
        alert('Veuillez sélectionner un type et un modèle de produit.');
        return;
    }

    alert(`Merci M./Mme ${clientName}.\nVotre demande d'achat pour le modèle d'usine [${model}] en finition Blanc Brillant a bien été enregistrée.\nNotre équipe de SNC IFRI MARBRE prendra contact avec vous au ${clientPhone} sous peu.`);
    orderForm.reset();
    modelSelect.innerHTML = '<option value="">-- Sélectionner le type d\'abord --</option>';
});

// INTEGRATION DE LA VÉRITABLE CARTE INTERACTIVE GOOGLE MAPS
function initMap() {
    // Coordonnées géographiques de Fenaïa Ilmaten, Béjaïa
    const atelierLocation = { lat: 36.6502, lng: 4.8875 }; 
    
    if (typeof google !== 'undefined' && google.maps) {
        // Initialisation de la carte Google Maps
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 14,
            center: atelierLocation,
            mapTypeControl: true,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: false
        });
        
        // Création d'un marqueur personnalisé sur l'atelier
        const marker = new google.maps.Marker({
            position: atelierLocation,
            map: map,
            title: "SNC IFRI MARBRE",
            animation: google.maps.Animation.DROP
        });

        // Bulle d'information au clic sur le marqueur
        const infoWindow = new google.maps.InfoWindow({
            content: '<div style="color:#1a202c; padding:5px;"><strong style="color:#0d47a1;">SNC IFRI MARBRE</strong><br>Fabrication de vasques et lave-mains<br>RN 26+, Fenaïa Ilmaten</div>'
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    } else {
        // Remplacement de secours (Iframe interactive standard Google Maps)
        document.getElementById('map').innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.4345224376485!2d4.885311!3d36.650222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM5JzAwLjgiTiA0wrA1MycxMy4xIkU!5e0!3m2!1sfr!2sdz!4v1718300000000!5m2!1sfr!2sdz" width="100%" height="100%" style="border:0; border-radius:8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }
}

// Déclenchement automatique
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('map').innerHTML === "") {
            initMap();
        }
    }, 500);
});

// À SUPPRIMER TOUT EN BAS DE SCRIPT.JS :
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('map').innerHTML === "") {
            initMap();
        }
    }, 1000);
});