document.addEventListener('DOMContentLoaded', fetchCryptocurrencyInfo);

function fetchCryptocurrencyInfo() {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd%2Cinr%2Cphp")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const usd = data.solana.usd;
            const inr = data.solana.inr;
            const php = data.solana.php;

            updateCurrencyData('usd', usd);
            updateCurrencyData('inr', inr);
            updateCurrencyData('php', php);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateCurrencyData(currencyId, value) {
    const loader = document.getElementById(`${currencyId}Loader`);
    const dataElement = document.getElementById(`${currencyId}Data`);

    loader.remove();
    dataElement.textContent = `${value}`;
    dataElement.classList.remove('hidden');
}