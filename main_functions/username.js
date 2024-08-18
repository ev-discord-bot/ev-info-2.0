const fetchUserButton = document.getElementById('fetchUserButton');
const usernameInput = document.getElementById('usernameInput');
const loadingMessage = document.getElementById('loadingMessage');
const userInfoDiv = document.getElementById('userInfo');

const fetchUserInfo = () => {
    const username = usernameInput.value.trim();

    if (username === '') {
        showToast('Please enter a username.', 'danger');
        return;
    }

    loadingMessage.style.display = 'block';
    userInfoDiv.style.display = 'none';

    fetch(`https://ev.io/stats-by-un/${encodeURIComponent(username)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch user information. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loadingMessage.style.display = 'none';

            if (data.length === 0) {
                showToast('User not found.', 'danger');
            } else {
                const user = data[0];
                const uidUrl = `https://ev.io/user/${user.uid[0].value}`;
                const eCoinBalance = user.field_ev_coins[0].value;
                const usdValue = eCoinBalance / 2000;
                const usdValueFormatted = usdValue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                });

                const skinID = user.field_eq_skin[0]?.target_id;
                if (skinID) {
                    fetch(`https://ev.io/node/${skinID}?_format=json`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch skin information. Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(skinData => {
                            const skinimg = skinData.field_wallet_image[0]?.url;
                            renderUserInfo(user, uidUrl, usdValueFormatted, skinimg);
                        })
                        .catch(error => {
                            console.error('Error fetching skin info:', error);
                            renderUserInfo(user, uidUrl, usdValueFormatted);
                        });
                } else {
                    renderUserInfo(user, uidUrl, usdValueFormatted);
                }
            }
        })
        .catch(error => {
            loadingMessage.style.display = 'none';
            userInfoDiv.innerHTML = `<p>Error fetching user information. ${error.message}</p>`;
            console.error('Error:', error);
        });
};

const renderUserInfo = (user, uidUrl, usdValueFormatted, skinimg = '') => {
    userInfoDiv.innerHTML = `<div class="items-center justify-center"><div class="text-3xl font-bold items-center justify-center" style="padding:0;display:flex;align-items:center">${user.name[0].value.charAt(0).toUpperCase() + user.name[0].value.slice(1).toLowerCase()} Stat's<img src="${skinimg}" height="auto" width="35px" class="rounded-3xl" style="margin-left:10px"></div><div class="grid grid-rows-1 grid-flow-col gap-4 items-center justify-center p-4"><div class="backdrop-sepia-0 shadow-lg shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>User URL:</strong><a style="text-decoration:none" href="${uidUrl}" target="_blank">https://ev.io/user/${user.uid[0].value}</a></div><div class="backdrop-sepia-0 shadow-lg shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>Bio:</strong>${user.field_social_bio[0]?.value || 'No Bio Set'} ${user.field_social_bio[0]?.value.toLowerCase().includes('the lag tho') || user.field_social_bio[0]?.value.toLowerCase().includes('lag') ? '(fr tho)' : ''}</div></div><div class="grid grid-rows-2 grid-flow-col gap-4 items-center justify-center text-center"><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-between select-all"><strong>Kills:</strong><br>${user.field_kills[0].value.toLocaleString()}</div><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>Deaths:</strong><br>${user.field_deaths[0].value.toLocaleString()}</div><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>KD:</strong><br>${user.field_k_d[0].value}</div><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>Ranking:</strong><br>${user.field_rank[0].value}</div><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>Score:</strong><br>${user.field_score[0].value.toLocaleString()}</div><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>Coins:</strong><br>${user.field_ev_coins[0].value.toLocaleString()}</div></div><div class="grid grid-rows-1 grid-flow-col gap-4 items-center justify-center p-4"><div class="backdrop-sepia-0 shadow-md shadow-primary rounded-lg p-2 items-center justify-center select-all"><strong>Coins Value:</strong><br>${usdValueFormatted} (USD)</div></div></div>`;

    userInfoDiv.style.display = 'block';
};

fetchUserButton.addEventListener('click', fetchUserInfo);

usernameInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        fetchUserInfo();
    }
});