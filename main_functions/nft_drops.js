const nftDropsContainer = document.getElementById('nft-drops');

window.addEventListener('load', async () => {
    nftDropsContainer.innerHTML = 'Fetching NFT Drops...';

    try {
        const response = await fetch('https://ev.io/nft-drops');
        const nftDropData = await response.json();

        const nftDropsGrid = document.createElement('div');

        for (const nftDrop of nftDropData) {
            const nftDropItem = document.createElement('div');
            const tokenimg = `https://ev.io${nftDrop.field_large_thumb}`;

            const nftDropContent = `<div class="grid grid-rows-1 grid-flow-col gap-5 items-center justify-center p-1 flex justify-center items-center scale-[0.9] w-auto"><div class="rounded-lg p-3 flex items-center justify-center w-auto"><div class="flex items-center"><img src="${tokenimg}" alt="Sol Logo" class="size-20 mr-2 h-auto"></div><div class="nft-drop-info text-sm ml-4 w-full"><p>${nftDrop.title}</p><p>${nftDrop.field_tier} Tier</p><p>${nftDrop.field_drop_chance} Chance</p><p>${nftDrop.field_quantity_left} Left</p></div></div></div>`;

            nftDropItem.innerHTML = nftDropContent;
            nftDropsGrid.appendChild(nftDropItem);
        }

        nftDropsContainer.innerHTML = '';
        nftDropsContainer.appendChild(nftDropsGrid);
    } catch (error) {
        console.error('Error:', error);
        nftDropsContainer.innerHTML = 'An error occurred while fetching NFT drops.';
    }
});