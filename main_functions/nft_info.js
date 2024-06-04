document.getElementById('nftIdInput').addEventListener('keypress', (event) => {
   if (event.key === 'Enter') {
       searchNFT();
   }
});

const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
   searchNFT();
});

function searchNFT() {
   const outputDiv = document.getElementById('output');
   const nftIdInput = document.getElementById('nftIdInput');

   const nftId = nftIdInput.value.trim();
   if (!nftId) {
       showToast('Please enter an NFT ID.', 'danger');
       return;
   }

   outputDiv.innerHTML = '';

   const api_url = `https://ev.io/get-nft-flags/${nftId}`;

   fetch(api_url)
       .then(response => {
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           return response.json();
       })
       .then(data => {
           const reset_time = data[0]["field_reset_time"];
           const field_meta = JSON.parse(data[0]["field_meta"][0]);

           const skin_name = field_meta["value"]["name"];
           const thumbnail = field_meta["value"]["image"];

           let game_node_id = null;
           const attributes = field_meta["value"]["attributes"];
           for (const attribute of attributes) {
               if (attribute["trait_type"] === "game-node-id") {
                   game_node_id = attribute["value"];
                   break;
               }
           }

           let weapon_type = null;
           for (const attribute of attributes) {
               if (attribute["trait_type"] === "tier") {
                   weapon_type = attribute["value"];
                   break;
               }
           }

           let collection = null;
           for (const attribute of attributes) {
               if (attribute["family"] === "EV.IO") {
                   collection = attribute["value"];
                   break;
               }
           }

           const infoContainer = document.createElement('div');

           const thumbnailImage = document.createElement('img');

           infoContainer.appendChild(thumbnailImage);
           const uidUrl = `https://ev.io/node/${game_node_id}`;
           infoContainer.innerHTML += `<div class="flex flex-col justify-center items-center backdrop-sepia-0 shadow-lg shadow-[#7289da] rounded-lg p-4 scale-[0.8]"><img src="${thumbnail}" class="max-h-40 max-w-40 rounded-lg mb-4"><p class="text-center"><strong>Skin Name:</strong> ${skin_name}</p><p class="text-center"><strong>Game Node URL:</strong><a href="${uidUrl}" target="_blank"> ${uidUrl}</a></p><p class="text-center"><strong>Weapon Type:</strong> ${weapon_type}</p><p class="text-center"><strong>Reset Time:</strong> ${reset_time}</p><p class="text-center"><strong>Collection:</strong> ${collection}</p></div>`;

           outputDiv.appendChild(infoContainer);
       })
       .catch(error => {
           console.error('Error:', error);
           showToast('Invalid ID', 'danger');
       });
}

const urlParams = new URLSearchParams(window.location.search);
const nft_lookup = urlParams.get('nft_lookup');

if (nft_lookup) {
   document.getElementById('nftIdInput').value = nft_lookup;
   searchNFT();
   document.getElementById('nftid-lookup').scrollIntoView({
       behavior: 'smooth'
   });
}