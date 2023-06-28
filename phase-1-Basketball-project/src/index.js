//base json link
const jsonLink = `http://localhost:3000/teams`
//upon loading website do this
document.addEventListener("DOMContentLoaded", () =>{
fetch(jsonLink)
.then(resp => resp.json())
.then(data => {
    data.forEach(team => {teamIcon(team)})
})
})


const teamList = document.getElementById(`Basketball-Team-list`)
const teammateList = document.getElementById(`team-mates`)
const playersInfo = document.getElementById(`players-info`)

// const newTeamFormLoc = document.getElementById(`new-Team`)
// const addTeamBtn = document.getElementById(`addTeam`)
 const form = document.getElementById('form')
 



//need a team logo to pop up in the basketball logos div
 const teamIcon = (team) => { 
    const teamImg = document.createElement(`img`)
    const delBtn = document.createElement(`button`)
    const logoDiv = document.createElement(`div`)

    teamImg.src = team.image
    delBtn.textContent = "X"

    logoDiv.append(teamImg,delBtn)
    teamList.append(logoDiv)

    
    logoDiv.addEventListener("click", () =>{
        teammateList.textContent = ""
        playersInfo.textContent = ""
        showTeammateList(team) 
    })

    delBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        if(confirm(`are you sure you want to delete this team?`)){
        fetch(`http://localhost:3000/teams/${team.id}`, {
        method: "DELETE"
    })
    logoDiv.remove()

}
    })
}
//create card for each player
const showTeammateList = (team) => {
    teammateList.textContent = ""
    team.players.forEach((player) => {
        const playerHead = document.createElement(`img`)
        const playerName = document.createElement(`h3`)
        const playerDiv = document.createElement(`div`)

        playerHead.src = player.image
        playerName.textContent = player.name
        playerDiv.append(playerHead, playerName)
        teammateList.append(playerDiv)
    
        playerDiv.addEventListener("click", (e) =>{
            e.stopPropagation()
            teamMateInfo(player)})
    })
const newPlayerBtn = document.createElement('button');
teammateList.append(newPlayerBtn)
newPlayerBtn.addEventListener('click',() => {
    const newPlayerform = document.createElement('form')
    newPlayerform.id = "new-player"
    const newPlayerName = document.createElement('input')
    newPlayerName.placeholder = "Name"
    const newPlayerImage = document.createElement('input')
    newPlayerImage.placeholder = "Image Url"
    const newPlayerNumber = document.createElement('input')
    newPlayerNumber.placeholder = "Number"
    const newPlayerPoints = document.createElement('input')
    newPlayerPoints.placeholder = "Points"
    const newPlayerRebounds = document.createElement('input')
    newPlayerRebounds.placeholder = "Rebounds"
    const newPlayerAssists = document.createElement('input')
    newPlayerAssists.placeholder = "Assists"
    const newPlayerRatings = document.createElement('input')
    newPlayerRatings.placeholder = "Ratings"
   const newPlayerSubmit  = document.createElement('button')
    
newPlayerform.append(newPlayerName, newPlayerImage, newPlayerNumber, newPlayerPoints, newPlayerRebounds, newPlayerAssists, newPlayerRatings, newPlayerSubmit)
teammateList.append(newPlayerform)
   newPlayerSubmit.addEventListener(('click'), (e) => {
    e.preventDefault()
    const newTeamPlayer ={
        name: newPlayerName.value,
        image: newPlayerImage.value,
        number:  newPlayerNumber.value,
        Points : newPlayerPoints.value,
        assists : newPlayerAssists.value,
        rebounds:newPlayerRebounds.value,
        rating : newPlayerRatings.value
        }

        let playersList = team.players
        playersList.push(newTeamPlayer)
        console.log(playersList)
        let listObj = {
            players: playersList
        }
        // var parse_obj = JSON.parse(Str_txt);
        // parse_obj['theTeam'].push({"teamId":"4","status":"pending"});
        // // Str_txt = JSON.stringify(parse_obj)

    fetch (`http://localhost:3000/teams/${team.id}`,{
        method : 'PATCH',
        headers : { 
            'Content-Type': "application/json",
            "Accept": "application/json",
        },
          body: JSON.stringify(listObj)

    })
    .then(resp => resp.json())
       .then(data => showTeammateList(team))
   })

    })
}


const teamMateInfo = (player)=> {
    const playerImg = document.createElement('img')
    playerImg.src = player.image

    const playerName = document.createElement('h3')
    playerName.textContent = `Name: ${player.name}`

    const playerNumber = document.createElement('h3')
    playerNumber.textContent = `Number: ${player.number}`
 
    const playerPoints = document.createElement('h3')
    playerPoints.textContent = `Points: ${player.Points}`

    const playerAssists = document.createElement('h3')
    playerAssists.textContent =`Assists:${player.assists}`

    const playerRebound = document.createElement('h3')
    playerRebound.textContent = `Rebound: ${player.rebounds}`

    const playerRating = document.createElement('h3')
    playerRating.textContent = `Rating: ${player.rating}`

    const detailDiv = document.createElement(`div`)
    const commentBtn = document.createElement(`button`)
    const commentInput = document.createElement(`input`)
    
    playersInfo.textContent = ""
    detailDiv.append(playerImg, playerName, playerNumber, playerPoints, playerAssists, playerRebound, playerRating, commentInput, commentBtn)
    playersInfo.append(detailDiv)

    
}




form.addEventListener('submit',function(e){
    e.preventDefault()
    const newImg = document.getElementById('image').value
    const newName = document.getElementById('name').value

    const team = {
        image: newImg,
        team:  newName,

        }


    fetch (`http://localhost:3000/teams`,{
        method : 'POST',
        body : JSON.stringify(team),
        headers : {
            'Content-type': 'application/json'
        }
    })
   .then (response => response.json())
   .then (teamIcondata => teamIcon(teamIcondata))
 .catch (error => console.log(error))

})



