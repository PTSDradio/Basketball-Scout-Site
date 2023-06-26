//base json link
const jsonLink = `http://localhost:3000/teams`
//
const teamList = document.getElementById(`basketball-logos`)

//upon loading website do this
document.addEventListener("DOMContentLoaded", () =>{
fetch(jsonLink)
.then(resp => resp.json())
.then(data => {
    data.forEach(team => {teamIcon(team)})
})
})


//need a team logo to pop up in the basketball logos div
 const teamIcon = (team) => { 
    const teamImg = document.createElement(`img`)
    teamImg.src = team.logo
    teamList.append(teamImg)
 }