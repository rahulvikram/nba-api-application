const enterButton = document.getElementById('team-btn');
const rosterData = document.getElementById('roster-data')
const clearButton = document.getElementById('clear-btn')

enterButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('input-box').value;

    fetch(`https://api-nba-v1.p.rapidapi.com/teams/shortName/${userInput.replace(/\s/g,'').toLowerCase()}`, {
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
            const teamId = response.api.teams[0].teamId
            fetch(`https://api-nba-v1.p.rapidapi.com/players/teamId/${teamId}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "93954fd82dmsh255f82c392d1a04p196711jsna56c443a8743"
                }
            })
            .then(response => response.json())
            .then(response => {
                let playerRoster = []
                for(i = 0; i < response.api.players.length; i++){
                    if(response.api.players[i].startNba != "0" && "standard" in response.api.players[i].leagues && response.api.players[i].leagues.standard.active != "" && response.api.players[i].collegeName != "No College" && 2022 - response.api.players[i].startNba == parseInt(response.api.players[i].yearsPro) + 1){
                        playerRoster.push(response.api.players[i])
                    }
                }
                let sortedPlayerRoster = playerRoster.sort(function(a,b) {
                    return a.lastName.localeCompare(b.lastName)
                })

                let output = ''
                let positionDb = {
                    "G":"Guard",
                    "F":"Forward"
                }
                for(x = 0; x < sortedPlayerRoster.length; x++){
                    let playerLink = `https://www.basketball-reference.com/players/${sortedPlayerRoster[x].lastName.substring(0,1).toLowerCase()}/${sortedPlayerRoster[x].lastName.substring(0,5).toLowerCase()}${sortedPlayerRoster[x].firstName.substring(0,2).toLowerCase()}01.html`
                    console.log(sortedPlayerRoster)
                    if(sortedPlayerRoster[x].firstName.length > 7 && sortedPlayerRoster[x].lastName.length > 7){
                        output += `
                        <div class="player-card" id="${x+1}">
                            <p id="player-name"><strong><a href="${playerLink}" target="_blank" class="sublink2">${sortedPlayerRoster[x].firstName.substring(0,5).replace(/\s/g,'')}. ${sortedPlayerRoster[x].lastName.substring(0,6).replace(/\s/g,'')}.</a></strong></p>
                            <p><strong>Position: </strong>${sortedPlayerRoster[x].leagues.standard.pos}</p>
                            <p><strong>Country: </strong>${sortedPlayerRoster[x].country}</p>
                            <p><strong>Drafted: </strong>${sortedPlayerRoster[x].startNba}</p>
                            <p><strong>Experience: </strong>${parseInt(sortedPlayerRoster[x].yearsPro) + 1} years</p>
                        </div>
                        `
                    } else if(sortedPlayerRoster[x].firstName.length > 7){
                        output += `
                        <div class="player-card" id="${x+1}">
                            <p id="player-name"><strong><a href="${playerLink}" target="_blank" class="sublink2">${sortedPlayerRoster[x].firstName.substring(0,5).replace(/\s/g,'')}. ${sortedPlayerRoster[x].lastName}</a></strong></p>
                            <p><strong>Position: </strong>${sortedPlayerRoster[x].leagues.standard.pos}</p>
                            <p><strong>Country: </strong>${sortedPlayerRoster[x].country}</p>
                            <p><strong>Drafted: </strong>${sortedPlayerRoster[x].startNba}</p>
                            <p><strong>Experience: </strong>${parseInt(sortedPlayerRoster[x].yearsPro) + 1} years</p>
                        </div>
                        `
                    } else if(sortedPlayerRoster[x].lastName.length > 9){
                        output += `
                        <div class="player-card" id="${x+1}">
                            <p id="player-name"><strong><a href="${playerLink}" target="_blank" class="sublink2">${sortedPlayerRoster[x].firstName} ${sortedPlayerRoster[x].lastName.substring(0,6).replace(/\s/g,'')}.</a></strong></p>
                            <p><strong>Position: </strong>${sortedPlayerRoster[x].leagues.standard.pos}</p>
                            <p><strong>Country: </strong>${sortedPlayerRoster[x].country}</p>
                            <p><strong>Drafted: </strong>${sortedPlayerRoster[x].startNba}</p>
                            <p><strong>Experience: </strong>${parseInt(sortedPlayerRoster[x].yearsPro) + 1} years</p>
                        </div>
                        `
                    } else {
                        output += `
                        <div class="player-card" id="${x+1}">
                            <p id="player-name"><strong><a href="${playerLink}" target="_blank" class="sublink2">${sortedPlayerRoster[x].firstName} ${sortedPlayerRoster[x].lastName}</a></strong></p>
                            <p><strong>Position: </strong>${sortedPlayerRoster[x].leagues.standard.pos}</p>
                            <p><strong>Country: </strong>${sortedPlayerRoster[x].country}</p>
                            <p><strong>Drafted: </strong>${sortedPlayerRoster[x].startNba}</p>
                            <p><strong>Experience: </strong>${parseInt(sortedPlayerRoster[x].yearsPro) + 1} years</p>
                        </div>
                        `
                    }
                }
                rosterData.innerHTML = output
            })
            .catch(err => {
                console.error(err);
            });
        }

    })
    .catch(err => {
        console.log("Error: Invalid entry.")
    });

})

clearButton.addEventListener('click', () => {
    rosterData.innerHTML = ''
})