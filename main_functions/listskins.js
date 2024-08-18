document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://ev.io/all-skins'; // Replace with your actual data source URL
    const itemSkinsContainer = document.getElementById('itemSkinsContainer');
    const searchSkinsInput = document.getElementById('searchSkinsInput');

    const tryImageUrl = async (path) => {
        const baseUrls = ['https://ev.io', 'https://staging.ev.io'];
        for (const baseUrl of baseUrls) {
            const fullUrl = `${baseUrl}${path}`;
            try {
                const response = await fetch(fullUrl, { method: 'HEAD' });
                if (response.ok) {
                    return fullUrl;
                }
            } catch {
                // Continue to the next URL
            }
        }
        return ''; // Fallback image if no valid URL is found
    };

    fetch(apiUrl)
        .then(response => response.json())
        .then(async data => {
            // Sort items: Color Shader, Weapon Skins (Guns first, then Swords), Player Skin
            const weaponOrder = {
                'Auto Rifle': 1,
                'Laser Rifle': 2,
                'Burst Rifle': 3,
                'Hand Cannon': 4
            };

            data.sort((a, b) => {
                const typeOrder = { 'Color Shader': 1, 'Weapon Skin': 2, 'Player Skin': 3 };
                const typeA = typeOrder[a.type] || 999;
                const typeB = typeOrder[b.type] || 999;

                if (typeA !== typeB) {
                    return typeA - typeB;
                }

                if (a.type === 'Weapon Skin' && b.type === 'Weapon Skin') {
                    const parentA = weaponOrder[a.field_parent_weapon] || 999;
                    const parentB = weaponOrder[b.field_parent_weapon] || 999;
                    return parentA - parentB;
                }

                return 0;
            });

            const renderItems = async (items) => {
                itemSkinsContainer.innerHTML = ''; // Clear existing items

                for (const item of items) {
                    const itemCard = document.createElement('div');
                    itemCard.classList.add('bg-base-100', 'rounded-lg', 'shadow-md', 'p-4', 'text-center', 'w-full', 'max-w-xs', 'm-2', 'shadow-primary', 'flex', 'flex-col', 'items-center', 'justify-center', 'mx-auto');

                    const title = item.title;
                    let imageUrl = '';
                    let additionalInfo = '';

                    if (item.type === 'Weapon') {
                        if (item.field_weapon_skin_thumb) {
                            imageUrl = await tryImageUrl(item.field_weapon_skin_thumb);
                        } else {
                            try {
                                const weaponData = JSON.parse(item.field_weapon_data);
                                if (weaponData && weaponData.icon) {
                                    imageUrl = await tryImageUrl(weaponData.icon);
                                }
                            } catch (e) {
                                console.error('Error parsing weapon data:', e);
                            }
                        }
                        imageUrl = imageUrl || '';

                        additionalInfo = `
                            <p class="text-sm text-neutral">Name: ${item.title || 'N/A'}</p>
                            <p class="text-sm text-neutral">Url: <a href="https://ev.io${item.field_model}" target="_blank" class="text-primary">link</a></p>
                            <p class="text-sm text-neutral">Backup Url: <a href="staging.https://ev.io${item.field_model}" target="_blank" class="text-primary">link</a></p>
                            <p class="text-sm text-neutral">Node Url: <a href="https://ev.io/node/${item.nid}" target="_blank" class="text-primary">link</a></p>
                        `;
                    } else if (item.type === 'Player Skin') {
                        imageUrl = item.field_profile_thumb ? await tryImageUrl(item.field_profile_thumb) : '';
                        additionalInfo = `
                            <p class="text-sm text-neutral">Tier: ${item.field_tier}</p>
                            <p class="text-sm text-neutral">Url: <a href="https://ev.io${item.field_skin}" target="_blank" class="text-primary">link</a></p>
                            <p class="text-sm text-neutral">Backup Url: <a href="staging.https://ev.io${item.field_skin}" target="_blank" class="text-primary">link</a></p>
                            <p class="text-sm text-neutral">Node Url: <a href="https://ev.io/node/${item.nid}" target="_blank" class=tE:\python projects\evio list\clanlist.html"text-primary">link</a></p>
                        `;
                    } else if (item.type === 'Color Shader') {
                        imageUrl = item.field_wallet_image ? await tryImageUrl(item.field_wallet_image) : '';
                        additionalInfo = `
                            <p class="text-sm text-neutral">Emissive Color: ${JSON.parse(item.field_color_data)?.emmissiveColor || 'N/A'}</p>
                            <p class="text-sm text-neutral">Node Url: <a href="https://ev.io/node/${item.nid}" target="_blank" class="text-primary">${item.nid}</a></p>
                        `;
                    } else if (item.type === 'Weapon Skin') {
                        imageUrl = item.field_weapon_skin_thumb ? await tryImageUrl(item.field_weapon_skin_thumb) : '';
                        additionalInfo = `
                            <p class="text-sm text-neutral">Type: ${item.type}</p>
                            <p class="text-sm text-neutral">Parent Weapon: ${item.field_parent_weapon || 'N/A'}</p>
                            <p class="text-sm text-neutral">Url: <a href="https://ev.io${item.field_model}" target="_blank" class="text-primary">link</a></p>
                            <p class="text-sm text-neutral">Backup Url: <a href="staging.https://ev.io${item.field_model}" target="_blank" class="text-primary">link</a></p>
                            <p class="text-sm text-neutral">Node Url: <a href="https://ev.io/node/${item.nid}" target="_blank" class="text-primary">${item.nid}</a></p>
                        `;
                    }

                    // SVG fallback content
                    const fallbackSvg = `
                        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                        <svg fill="currentColor" width="192px" height="192px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><title>no-image</title><path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"/><path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>
                    `;

                    itemCard.innerHTML = `
                        ${imageUrl ? `<img src="${imageUrl}" alt="${title} Image" class="w-48 h-auto object-cover rounded-lg mb-2">` : fallbackSvg}
                        <h3 class="text-lg font-semibold text-neutral mb-2">${title}</h3>
                        ${additionalInfo}
                    `;

                    itemSkinsContainer.appendChild(itemCard);
                }
            };

            // Initial render
            renderItems(data);

            // Search functionality
            searchSkinsInput.addEventListener('input', () => {
                const query = searchSkinsInput.value.toLowerCase();

                // If the search input is empty, use the full dataset; otherwise, filter the data
                const filteredData = query ? data.filter(item => item.title.toLowerCase().includes(query)) : data;

                // Render the filtered (or full) data
                renderItems(filteredData);
            });

        })
        .catch(error => console.error('Error fetching data:', error));
});
