const pageSize = 6;

async function fetchUserUid() {
    const username = document.getElementById('usernameInputnft').value.trim();

    if (username === '') {
        showToast('Please enter a username.', 'danger');
        return;
    }

    try {
        document.getElementById('loadingMessage').classList.remove('hidden');
        const response = await fetch(`https://ev.io/stats-by-un/${encodeURIComponent(username)}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch user data. Status: ${response.status}, ${response.statusText}`);
        }
        const data = await response.json();
        document.getElementById('loadingMessage').classList.add('hidden');

        if (data.length === 0) {
            showToast('User not found.', 'danger');
        } else {
            return data[0].uid[0].value;
        }
    } catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}

async function getUserNFTs(uidUrl) {
    try {
        const response = await fetch(`https://ev.io/flags/${uidUrl}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to fetch user NFTs. Status: ${response.status}, ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching user NFTs:', error.message);
        return null;
    }
}

async function getSkinInfo(entityId) {
    try {
        const response = await fetch(`https://ev.io/node/${entityId}?_format=json`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to fetch skin info. Status: ${response.status}, ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Error fetching skin info:', error.message);
        return null;
    }
}

async function displayUserNFTs(currentPage = 1) {
    const nftContainer = document.getElementById('nftContainer');
    nftContainer.innerHTML = '';

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    try {
        const uidUrl = await fetchUserUid();
        if (!uidUrl) {
            return;
        }

        const loadingSpinner = document.createElement('div');
        loadingSpinner.classList.add('spinner', 'mx-auto');
        pagination.appendChild(loadingSpinner);

        const userNFTs = await getUserNFTs(uidUrl);

        if (userNFTs) {
            loadingSpinner.remove();

            const totalPages = Math.ceil(userNFTs.length / pageSize);

            const pageButtons = [];
            const displayedPages = [];

            for (let page = 1; page <= totalPages; page++) {
                if (page <= 2 || page >= totalPages - 1 || Math.abs(page - currentPage) <= 1) {
                    const pageButton = document.createElement('button');
                    pageButton.textContent = page;
                    pageButton.classList.add('mx-1', 'btn', 'backdrop-sepia-0', 'shadow-md', 'shadow-[#7289da]', 'rounded-lg', 'normal-case', 'scale-[0.75]');
                    pageButton.onclick = () => displayUserNFTs(page);
                    pageButtons.push(pageButton);
                    displayedPages.push(page);
                } else if (!displayedPages.includes('...')) {
                    const ellipsisButton = document.createElement('button');
                    ellipsisButton.textContent = '...';
                    ellipsisButton.classList.add('mx-1', 'btn', 'backdrop-sepia-0', 'shadow-md', 'shadow-[#7289da]', 'rounded-lg', 'normal-case', 'scale-[0.75]');
                    ellipsisButton.onclick = () => replaceEllipsisWithInputField(ellipsisButton, currentPage, totalPages);
                    pageButtons.push(ellipsisButton);
                    displayedPages.push('...');
                }
            }

            if (!displayedPages.includes(totalPages - 1)) {
                const pageButton = document.createElement('button');
                pageButton.textContent = totalPages - 1;
                pageButton.classList.add('mx-1', 'btn', 'backdrop-sepia-0', 'shadow-md', 'shadow-[#7289da]', 'rounded-lg', 'normal-case');
                pageButton.onclick = () => displayUserNFTs(totalPages - 1);
                pageButtons.push(pageButton);
            }

            if (!displayedPages.includes(totalPages)) {
                const pageButton = document.createElement('button');
                pageButton.textContent = totalPages;
                pageButton.classList.add('mx-1', 'btn', 'backdrop-sepia-0', 'shadow-md', 'shadow-[#7289da]', 'rounded-lg', 'normal-case');
                pageButton.onclick = () => displayUserNFTs(totalPages);
                pageButtons.push(pageButton);
            }

            pagination.append(...pageButtons);

            displayPageNFTs(userNFTs.slice((currentPage - 1) * pageSize, currentPage * pageSize), currentPage, totalPages);
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Failed to fetch user NFTs. Please try again later.';
            errorMessage.classList.add('text-red-500');
            pagination.appendChild(errorMessage);
        }
    } catch (error) {
        console.error('Error displaying user NFTs:', error.message);
    }
}

function replaceEllipsisWithInputField(ellipsisButton, currentPage, totalPages) {
    const inputField = document.createElement('input');
    inputField.min = 1;
    inputField.max = totalPages;
    inputField.value = currentPage;
    inputField.classList.add('mx-1', 'backdrop-sepia-0', 'shadow-md', 'shadow-[#7289da]', 'rounded-lg', 'normal-case', "text-center", "justify-center", "items-center", 'scale-[0.75]');
    inputField.style.width = '3rem';
    inputField.style.height = '35px';
    inputField.style.textAlign = 'center';
    inputField.style.backgroundColor = 'hsl(var(--n)/var(--tw-border-opacity))';
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const newPage = parseInt(event.target.value);
            if (newPage >= 1 && newPage <= totalPages) {
                displayUserNFTs(newPage);
            }
        }
    });
    ellipsisButton.replaceWith(inputField);
}


async function displayPageNFTs(paginatedNFTs, currentPage, totalPages) {
    const nftContainer = document.getElementById('nftContainer');
    nftContainer.innerHTML = '';

    const pageIndicator = document.getElementById('pageIndicator');

    if (currentPage !== undefined && totalPages !== undefined) {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    } else {
        pageIndicator.textContent = '';
    }

    if (paginatedNFTs.length === 0) {
        showToast('User has no NFTs.', 'danger');
    } else {
        for (const nftData of paginatedNFTs) {
            const nftCard = document.createElement('div');
            nftCard.classList.add('nft-card');

            const nftImage = document.createElement('img');
            nftImage.classList.add('nft-image');

            try {
                const imageUrl = `https://ev.io${nftData.field_wallet_image}`;

                nftCard.appendChild(nftImage);

                const skinInfoBox = document.createElement('div');
                skinInfoBox.classList.add('skin-info-box');

                const skinInfo = document.createElement('div');
                skinInfo.classList.add('skin-info');
                skinInfo.innerHTML = `<div class="flex flex-col items-center justify-center backdrop-sepia-0 shadow-lg shadow-[#7289da] rounded-lg h-[200px]"><img src="${imageUrl}" alt="NFT Image" class="h-[100px] w-auto rounded-lg items-center"><div class="scale-[0.75]"><div class="text-center"><strong>Name:</strong>${nftData.field_skin || 'Unknown'}</div><div class="text-center"><strong>NFT Token:</strong><a target="_blank" href="https://solscan.io/token/${nftData.field_flag_nft_address}">${truncateToken(nftData.field_flag_nft_address) || 'Unknown'}</a></div></div></div>`;

                skinInfoBox.appendChild(skinInfo);
                nftCard.appendChild(skinInfoBox);

                nftContainer.appendChild(nftCard);
            } catch (parseError) {
                console.error('Error parsing NFT data:', parseError.message);

                try {
                    const skinData = await getSkinInfo(nftData.entity_id);
                    let imageUrl = null;

                    if (skinData.field_profile_thumb) {
                        imageUrl = skinData.field_profile_thumb[0].url;
                    } else if (skinData.field_weapon_skin_thumb) {
                        imageUrl = skinData.field_weapon_skin_thumb[0].url;
                    }

                    const skinInfoBox = document.createElement('div');
                    skinInfoBox.classList.add('skin-info-box');

                    const skinInfo = document.createElement('div');
                    skinInfo.classList.add('skin-info');
                    skinInfo.innerHTML = `

                   <div class="flex flex-col items-center justify-center backdrop-sepia-0 shadow-lg shadow-[#7289da] rounded-lg h-[200px] ">
                     <div class="scale-[0.75]">
                       <img src="${imageUrl}" class="max-h-40 max-w-40 rounded-lg mb-4">
                       <div class="text-center"><strong>Node ID:</strong> ${nftData.entity_id || 'Unknown'}</div>
                       <div class="text-center"><strong>Title:</strong> ${skinData?.title[0]?.value || 'Unknown'}</div>
                     </div>
                   </div>

                   `;

                    skinInfoBox.appendChild(skinInfo);
                    nftCard.appendChild(skinInfoBox);

                    nftContainer.appendChild(nftCard);
                } catch (error) {
                    console.error('Error parsing NFT data:', error.message);
                }
            }
        }
    }
}

document.getElementById('usernameInputnft').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        displayUserNFTs();
    }
});


function truncateToken(token) {
    return `${token.substring(0, 5)}...${token.substring(token.length - 5)}`;
}

function selectToken(element) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
}