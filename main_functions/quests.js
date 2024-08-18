document.addEventListener('DOMContentLoaded', function() {
    const dayMap = {
        'Mo': 0, // Monday
        'Tu': 1, // Tuesday
        'We': 2, // Wednesday
        'Th': 3, // Thursday
        'Fr': 4, // Friday
        'Sa': 5, // Saturday
        'Su': 6  // Sunday
    };

    // Get current day index (0 for Monday, 6 for Sunday)
    const currentDayIndex = new Date().getDay();
    
    // Adjust for index mapping (0 for Monday, 6 for Sunday)
    const todayIndex = (currentDayIndex + 6) % 7;

    // Select all steps
    const steps = document.querySelectorAll('.step');

    // Iterate over each step
    steps.forEach(step => {
        // Get the day from data-content
        const dayContent = step.getAttribute('data-content');

        // Apply class based on whether the day is today or before
        if (dayMap[dayContent] <= todayIndex) {
            step.classList.add('step-primary');
        }
    });
});

async function fetchQuestData() {
    try {
        const response = await fetch('https://ev.io/vars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quest data:', error);
        return null;
    }
}

async function QuestButton() {
    const data = await fetchQuestData();
    const questInfoDiv = document.getElementById('quest-info');
    
    if (data && data[0]) {
        const quests = JSON.parse(data[0].field_questsb);
        const dayMap = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        };

        // Get current day index (0 for Sunday, 6 for Saturday)
        const currentDayIndex = new Date().getDay();

        let questHtml = '';

        for (const [key, quest] of Object.entries(quests)) {
            let description = '';

            // Handle quest descriptions based on game mode and conditions
            switch (quest.gameMode) {
                case 'deathmatch_earn':
                    if (quest.completionCondition === 'kills') {
                        description = `Earn ${quest.value} points by getting ${quest.headshotOnly ? 'headshots only' : 'kills'} in Deathmatch (Earn).`;
                    } else if (quest.completionCondition === 'win_game') {
                        description = `Win ${quest.value} games in Deathmatch (Earn).`;
                    }
                    break;
                case 'team_deathmatch':
                    description = `Get ${quest.value} ${quest.completionCondition === 'kills' ? 'kills' : 'points'} in Team Deathmatch.`;
                    break;
                case 'last_man_standing':
                    description = `Win ${quest.value} games in Battle Royal.`;
                    break;
                case 'sniper_shotgun':
                    description = `Achieve ${quest.value} kills In Sniper Shotgun.`;
                    break;
                default:
                    // Use a more generic fallback description
                    description = `Complete this quest: ${quest.value} ${quest.completionCondition || 'actions'} in ${formatGameMode(quest.gameMode)}.`;
            }

            // Ensure day index is within the range
            const dayOfWeek = parseInt(key) % 7; // Corrected day index calculation
            const dayName = dayMap[dayOfWeek];

            if (dayName) {
                // Add header for each day of the week
                questHtml += `<h4>${dayName}:</h4>`;

                // Add quest description with bold text if it's the current day
                if (dayOfWeek === currentDayIndex) {
                    questHtml += `<p class="text-primary"><strong>${description} (Today)</strong></p><br>`;
                } else {
                    questHtml += `<p>${description}</p><br>`;
                }
            }
        }
        
        questInfoDiv.innerHTML = questHtml;
        document.getElementById('my_modal_1').showModal();
    } else {
        questInfoDiv.innerHTML = 'No quest data available.';
    }
}

// Helper function to format game mode names
function formatGameMode(gameMode) {
    const gameModeMap = {
        'deathmatch_earn': 'Deathmatch (Earn)',
        'team_deathmatch': 'Team Deathmatch',
        'last_man_standing': 'Last Man Standing',
        'sniper_shotgun': 'Sniper Shotgun'
    };
    return gameModeMap[gameMode] || 'Unknown Game Mode';
}
