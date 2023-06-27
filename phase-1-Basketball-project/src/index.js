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

const addTeamBtn = document.getElementById(`addTeam`)
 



//need a team logo to pop up in the basketball logos div
 const teamIcon = (team) => { 
    const teamImg = document.createElement(`img`)
    const delBtn = document.createElement(`button`)
    const logoDiv = document.createElement(`div`)

    teamImg.src = team.image
    delBtn.textContent = "X"

    logoDiv.append(teamImg,delBtn)
    teamList.append(logoDiv)

    
    logoDiv.addEventListener("click", () =>{showTeammateList(team) })
    delBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        if(confirm(`are you sure you want to delete this team?`)){
        fetch(`http://localhost:3000/teams/${team.id}`, {
        method: "DELETE"
    })
    logoDiv.remove()
    teammateList.textContent = ""
    playersInfo.textContent = ""
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

 addTeamBtn.addEventListener("click", () =>{
    newTeamForm()})

 const newTeamForm = () => {
    const newForm = document.createElement(`form`)
    const teamName = document.createElement(`input`)
    const teamImg = document.createElement(`input`)
    newForm.append(teamName, teamImg)
    teamList.append(newForm)
    console.log("i was clicked")
    
 }