const enterButton = document.getElementById('team-btn');
const teamData = document.getElementById('team-data');
const rosterData = document.getElementById('roster-data')

enterButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('input-box').value;

    fetch(`https://api-nba-v1.p.rapidapi.com/teams/nickName/${userInput.replace(/\s/g,'').toLowerCase()}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "93954fd82dmsh255f82c392d1a04p196711jsna56c443a8743"
        }
    })
    .then(response => response.json())
    .then(response => {
        if(userInput.replace(/\s/g,'') == ''){

        } else {
            let output = `
            <div class="team">
                <div class="image">
                    <a href="${response.api.teams[0].logo}" target="_blank"><img class="team-img" src="${response.api.teams[0].logo}"></a>
                </div>
                <div class="information">
                    <p><strong>Team: </strong>${response.api.teams[0].fullName}</p>
                    <p><strong>Team Code: </strong>${response.api.teams[0].shortName}</p>
                    <p><strong>Conference: </strong>${response.api.teams[0].leagues.standard.confName}</p>
                    <p><strong>Division: </strong>${response.api.teams[0].leagues.standard.divName}</p>
                </div>
            </div>
            `
            teamData.innerHTML += output
        }

    })
    .catch(err => {
        console.log("Error: Invalid entry.")
    });

    // fetch("https://api-nba-v1.p.rapidapi.com/players/teamId/22", {
    // 	"method": "GET",
    // 	"headers": {
    // 		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    // 		"x-rapidapi-key": "93954fd82dmsh255f82c392d1a04p196711jsna56c443a8743"
    // 	}
    // })
    // .then(response => response.json())
    // .then(response => {
    //     const playerList = response.api.players
    //     console.log(playerList.length)
    //     // for(i = 0; i < player)
    // })
    // .catch(err => {
    // 	console.error(err);
    // });
})


