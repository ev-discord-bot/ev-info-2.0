const EarnRateContainer = document.getElementById('Earn-Rate');

window.addEventListener('load', async () => {
    EarnRateContainer.innerHTML = 'Fetching Earn Rate...';

    try {
        const response = await fetch('https://ev.io/vars');
        const EarnRatepData = await response.json();
        const field_e_earn_rate_per_100_score = EarnRatepData[0]['field_e_earn_rate_per_100_score'];
        const field_earnings_cap = EarnRatepData[0]['field_earnings_cap'];
        const earnRateDataHtml = `<div class="flex flex-col items-center justify-center place-content-center"><h2 class="text-2xl font-bold flex items-center">
        
        <svg class="icon -rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91 91" fill="currentColor">
                                          <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)">
                                             <path d="M430 887 c-3 -3 -18 -7 -35 -10 -46 -7 -118 -44 -165 -85 -75 -63
                                                -120 -146 -144 -263 -4 -20 -12 -27 -31 -26 -33 0 -55 -20 -55 -49 0 -51 11
                                                -53 462 -54 484 -1 453 -7 443 96 -22 226 -172 380 -384 391 -47 3 -88 3 -91
                                                0z m192 -130 c73 -31 149 -127 169 -214 l7 -33 -302 2 -301 3 3 25 c7 43 55
                                                130 89 161 93 82 225 104 335 56z"/>
                                             <path d="M117 332 c-21 -4 -17 -24 21 -95 35 -65 110 -132 190 -170 58 -27 80
                                                -32 159 -34 102 -3 170 13 242 55 50 29 107 85 127 125 14 25 13 29 -10 52
                                                -14 14 -32 25 -41 25 -8 0 -42 -27 -73 -59 -47 -48 -69 -63 -115 -76 -158 -46
                                                -308 6 -384 133 -25 42 -32 47 -63 47 -19 0 -43 -1 -53 -3z"/>
                                          </g>
                                       </svg>
        
        Earn Rate</h2><p class="text-center">E Earn Rate Per 100 Score: <strong>${field_e_earn_rate_per_100_score}</strong></p><p class="text-center">Earnings Cap: <strong>${field_earnings_cap}</strong></p></div>`;
        EarnRateContainer.innerHTML = earnRateDataHtml;
    } catch (error) {
        console.error('Error:', error);
        EarnRateContainer.innerHTML = 'An error occurred while fetching Earn Rate.';
    }
});

