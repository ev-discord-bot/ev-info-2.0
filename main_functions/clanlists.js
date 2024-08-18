document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://ev.io/clans-all3';
    const clanContainer = document.getElementById('clanContainer');
    const searchInput = document.getElementById('searchClansInput'); // ID for the search input field

    // Function to check if the image URL is valid
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
        // Return the SVG placeholder if no valid URL is found
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtY29sb3I9InJlZCIgc3Ryb2tlLWxpbmVjY2FwPSJhcmVhIi8+Cjwvc3ZnPg=='; // Example SVG
    };

    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const renderItems = async (items) => {
        clanContainer.innerHTML = ''; // Clear existing items

        for (const clan of items) {
            const clanCard = document.createElement('div');
            clanCard.classList.add('bg-base-100', 'rounded-lg', 'shadow-md', 'p-4', 'text-center', 'm-4', 'shadow-primary', 'flex', 'flex-col', 'items-center');

            const insigniaUrl = await tryImageUrl(clan.insignia || '/default-insignia.svg'); // Replace with your default insignia path
            const clanHomepageUrl = `https://ev.io${clan.clan_homepage}`;
            const clanName = clan.clan_name || 'Unknown Clan';

            clanCard.innerHTML = `
                <img src="${insigniaUrl}" alt="${clanName} Insignia" class="w-32 h-32 object-cover mb-4">
                <h3 class="text-lg font-semibold text-neutral mb-2">${clanName}</h3>
                <a href="${clanHomepageUrl}" target="_blank" class="text-blue-400 hover:underline">Visit Clan Page</a>
            `;

            clanContainer.appendChild(clanCard);
        }
    };

    const initialize = async () => {
        const data = await fetchData();
        renderItems(data);

        // Search functionality
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredData = data.filter(clan => clan.clan_name.toLowerCase().includes(query));
            renderItems(filteredData);
        });
    };

    initialize();
});
