document.addEventListener("DOMContentLoaded", () => {
   const fetchUserButton = document.getElementById('fetchUserButtonTabs');
   const usernameInput = document.getElementById('usernameInputTabs');
   const loadingMessage = document.getElementById('loadingMessageTabs');
   const tabButtons = document.querySelectorAll('.custom-tab-button');
   const tabs = document.querySelectorAll('.custom-tab');

   const fetchEquippedSkins = () => {
       const username = usernameInput.value.trim();
       if (username === '') {
           showToast('Please enter an ev.io username.', 'danger');
           return;
       }

       loadingMessage.style.display = 'block';

       tabs.forEach(tab => {
           tab.style.display = 'none';
       });

       fetch(`https://ev.io/stats-by-un/${encodeURIComponent(username)}`)
           .then(response => {
               if (!response.ok) {
                   throw new Error('Network response was not ok');
               }
               return response.json();
           })
           .then(data => {
               loadingMessage.style.display = 'none';

               if (data.length === 0) {
                   tabs.forEach(tab => {
                       showToast('User not found', 'danger');
                   });
               } else {
                   const user = data[0];

                   const characterSkinId = user.field_eq_skin[0]?.target_id;
                   if (characterSkinId) {
                       fetch(`https://ev.io/node/${characterSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_large_thumb[0].url;
                               displaySkin('CharacterTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching character skin:', error));
                   } else {
                       displayNoSkin('CharacterTab');
                   }

                   const arSkinId = user.field_auto_rifle_skin[0]?.target_id;
                   if (arSkinId) {
                       fetch(`https://ev.io/node/${arSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_weapon_skin_thumb[0].url;
                               displaySkin('AssaultRifleTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching AR skin:', error));
                   } else {
                       displayNoSkin('AssaultRifleTab');
                   }

                   const hcSkinId = user.field_hand_cannon_skin[0]?.target_id;
                   if (hcSkinId) {
                       fetch(`https://ev.io/node/${hcSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_weapon_skin_thumb[0].url;
                               displaySkin('HandCannonTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching HC skin:', error));
                   } else {
                       displayNoSkin('HandCannonTab');
                   }

                   const lrSkinId = user.field_laser_rifle_skin[0]?.target_id;
                   if (lrSkinId) {
                       fetch(`https://ev.io/node/${lrSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_weapon_skin_thumb[0].url;
                               displaySkin('LaserRifleTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching LR skin:', error));
                   } else {
                       displayNoSkin('LaserRifleTab');
                   }

                   const brSkinId = user.field_burst_rifle_skin[0]?.target_id;
                   if (brSkinId) {
                       fetch(`https://ev.io/node/${brSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_weapon_skin_thumb[0].url;
                               displaySkin('BurstRifleTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching BR skin:', error));
                   } else {
                       displayNoSkin('BurstRifleTab');
                   }

                   const sweeperSkinId = user.field_sweeper_skin[0]?.target_id;
                   if (sweeperSkinId) {
                       fetch(`https://ev.io/node/${sweeperSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_weapon_skin_thumb[0].url;
                               displaySkin('SweeperTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching BR skin:', error));
                   } else {
                       displayNoSkin('SweeperTab');
                   }

                   const swordSkinId = user.field_sword_skin[0]?.target_id;
                   if (swordSkinId) {
                       fetch(`https://ev.io/node/${swordSkinId}?_format=json`)
                           .then(response => response.json())
                           .then(skinData => {
                               const skinName = skinData.title[0].value;
                               const skinIcon = skinData.field_weapon_skin_thumb[0].url;
                               displaySkin('SwordTab', skinName, skinIcon);
                           })
                           .catch(error => console.error('Error fetching BR skin:', error));
                   } else {
                       displayNoSkin('SwordTab');
                   }


               }
           })
           .catch(error => {
               loadingMessage.style.display = 'none';
               tabs.forEach(tab => {
                   tab.innerHTML = '<p>Error fetching user information.</p>';
               });
               console.error('Error:', error);
           });
   };

   const displaySkin = (tabId, skinName, skinIcon) => {
       const tab = document.getElementById(tabId);
       tab.innerHTML = `<div class="justify-center items-center"><p class="text-center font-small">${skinName}</p><img src="${skinIcon}" alt="${skinName} Skin" class="max-w-[90px] mt-2 p-1 drop-shadow-xl justify-center items-center"></div>`;


       tab.style.display = 'block';
   };

   const displayNoSkin = (tabId) => {
       const tab = document.getElementById(tabId);
       tab.innerHTML = '<p class="font-medium flex justify-center items-center">No skin equipped</p>';
       tab.style.display = 'block';
   };

   const handleEnterKey = (event) => {
       if (event.key === 'Enter') {
           fetchEquippedSkins();
       }
   };

   fetchUserButton.addEventListener('click', fetchEquippedSkins);
   usernameInput.addEventListener('keydown', handleEnterKey);

   tabButtons.forEach(button => {
       button.addEventListener('click', () => {
           tabs.forEach(tab => {
               tab.style.display = 'none';
           });

           const tabId = button.getAttribute('data-tab');
           const tab = document.getElementById(tabId);
           tab.style.display = 'block';
       });
   });
});

const notificationButton = document.getElementById('notificationButton');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closeButton');

function showPopup() {
   popup.classList.remove('hidden')
}

function hidePopup() {
   popup.classList.add('hidden');
}

function togglePopup() {
   popup.classList.toggle('hidden');
}
notificationButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', hidePopup);
document.addEventListener('click', function(event) {
   if (!notificationButton.contains(event.target) && !popup.contains(event.target)) {
       hidePopup();
   }
});