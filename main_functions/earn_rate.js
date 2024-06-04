const EarnRateContainer = document.getElementById('Earn-Rate');

window.addEventListener('load', async () => {
    EarnRateContainer.innerHTML = 'Fetching Earn Rate...';

    try {
        const response = await fetch('https://ev.io/vars');
        const EarnRatepData = await response.json();
        const field_e_earn_rate_per_100_score = EarnRatepData[0]['field_e_earn_rate_per_100_score'];
        const field_earnings_cap = EarnRatepData[0]['field_earnings_cap'];
        const earnRateDataHtml = `<div class="flex flex-col items-center justify-center place-content-center"><h2 class="text-2xl font-bold flex items-center"><img src="img/e_coin.png" alt="Sol Logo" class="w-7 h-auto mr-2"> Current Earn Rate</h2><p class="text-center">E Earn Rate Per 100 Score:<strong>${field_e_earn_rate_per_100_score}</strong></p><p class="text-center">Earnings Cap:<strong>${field_earnings_cap}</strong></p></div>`;
        EarnRateContainer.innerHTML = earnRateDataHtml;
    } catch (error) {
        console.error('Error:', error);
        EarnRateContainer.innerHTML = 'An error occurred while fetching Earn Rate.';
    }
});