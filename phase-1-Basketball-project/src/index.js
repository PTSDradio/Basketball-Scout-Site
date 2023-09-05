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
addTeamBtn.addEventListener("click",() => {
    const form =document.getElementById(`new-team-form`)
    form.toggleAttribute("hidden");
})


//need a team logo to pop up in the basketball logos div
 const teamIcon = (team) => { 
    const teamImg = document.createElement(`img`)
    teamImg.id = "log"
    const delBtn = document.createElement(`button`)
    const logoDiv = document.createElement(`div`)

    teamImg.src = team.image
    // delBtn.textContent = "X"

    logoDiv.append(teamImg,delBtn)
    teamList.append(logoDiv)

    
    logoDiv.addEventListener("click", () =>{
        teammateList.textContent = ""
        playersInfo.textContent = ""
        showTeammateList(team) 
        console.log("sup")
    })

    delBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        if(confirm(`are you sure you want to delete this team?`)){
            fetch(`http://localhost:3000/teams/${team.id}`, {
               method: "DELETE"
             })
             logoDiv.remove()
             teammateList.textContent =""
             playersInfo.textContent =""

        }
    })
}
//create card for each player
const showTeammateList = (team) => {
    teammateList.textContent = ""
    team = team
    team.players.forEach((player, index) => {
        const playerHead = document.createElement(`img`)
        const playerName = document.createElement(`h3`)
        const playerDiv = document.createElement(`div`)
        const playerDel = document.createElement('button')
        
        playerDiv.id = "hey"
        playerHead.src = player.image
        playerName.textContent = player.name
        
        playerDiv.append( playerHead, playerName)
        teammateList.append(playerDiv)
    
        playerDiv.addEventListener("click", (e) =>{
            e.stopPropagation()
            teamMateInfo(player)
        })
        playerDel.addEventListener("click", (e) => {
                    e.stopPropagation()
                    console.log(player)
        })


    })

       

     
      const newPlayerBtn = document.createElement('button');
      //ADDed this id 
       teammateList.append(newPlayerBtn) 
       newPlayerBtn.id = "newPlayerBtn"
      
       newPlayerBtn.textContent = "Add Player"

       teammateList.append(newPlayerBtn)

       newPlayerBtn.addEventListener('click',() => {
            const newPlayerform = document.createElement('form')
            newPlayerform.id = "new-player"
            newPlayerform.className = "form-signin"

            const newPlayerName = document.createElement('input')
            newPlayerName.placeholder = "Name"
            newPlayerName.className = "form-signin"
            newPlayerName.className = "form-control"

            const newPlayerImage = document.createElement('input')
            newPlayerImage.placeholder = "Image Url"
            newPlayerImage.className ="form-signin"
            newPlayerImage.className = "form-control"

            const newPlayerNumber = document.createElement('input')
            newPlayerNumber.className = "form-control"
            newPlayerNumber.placeholder = "Player Number"

            const newPlayerPoints = document.createElement('input')
            newPlayerPoints.placeholder = "Points"
            newPlayerPoints.className = "form-signin"
            newPlayerPoints.className = "form-control"

            const newPlayerRebounds = document.createElement('input')
            newPlayerRebounds.placeholder = "Rebounds"
            newPlayerRebounds.className= "form-signin"
            newPlayerRebounds.className = "form-control"

            const newPlayerAssists = document.createElement('input')
            newPlayerAssists.placeholder = "Assists"
            newPlayerAssists.className = "form-signin"
            newPlayerAssists.className = "form-control"

            //    const newPlayerRatings = document.createElement('input')
            //    newPlayerRatings.placeholder = "Ratings"
            //    newPlayerRatings.className="form-signin"
            //    newPlayerRatings.className = "form-control"

            const newPlayerSubmit  = document.createElement('button')
            newPlayerSubmit.className= "form-signin"
            newPlayerSubmit.className = "w-100 btn btn-lg"
            newPlayerSubmit.textContent= "Add"

            const formRefresher = document.createElemen
            
            newPlayerform.append(newPlayerName, newPlayerImage, newPlayerNumber, newPlayerPoints, newPlayerRebounds, newPlayerAssists, newPlayerSubmit)
            newPlayerform.id = "newPlayerform"
            teammateList.append(newPlayerform)
            newPlayerSubmit.addEventListener(('click'), (e) => {
                e.preventDefault()

                 const newTeamPlayer ={
                    name: newPlayerName.value,
                     image: newPlayerImage.value,
                    number:  newPlayerNumber.value,
                     Points : newPlayerPoints.value,
                    assists : newPlayerAssists.value,
                    rebounds: newPlayerRebounds.value,
                    rating : "<img src=\"./hollow.svg\" class=\"ball-style\" width=\"25px\"><img src=\"./hollow.svg\" class=\"ball-style\" width=\"25px\"><img src=\"./hollow.svg\" class=\"ball-style\" width=\"25px\"><img src=\"./hollow.svg\" class=\"ball-style\" width=\"25px\"><img src=\"./hollow.svg\" class=\"ball-style\" width=\"25px\">"
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

    const teamMateInfo = (player)=> {
        const playerImg = document.createElement('img')
        playerImg.id = "howdy"
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

        const playerRating = document.createElement('div')

        playerRating.innerHTML = player.rating

        const detailDiv = document.createElement(`div`)
        // const commentBtn = document.createElement(`button`)
        // const commentInput = document.createElement(`input`)

        const ratingDiv = document.createElement('div')
        // ratingDiv.id = `balls`
        
        playersInfo.textContent = ""
        detailDiv.append(playerImg, playerName, playerNumber, playerPoints, playerAssists, playerRebound, playerRating)
        playersInfo.append(detailDiv)
        ballRater()
        console.log(player)

        playerRating.addEventListener("click", () =>{
            player.rating= playerRating.innerHTML
            let obj = {
                players: team.players
            }
            fetch(`http://localhost:3000/teams/${team.id}`,{
            method : 'PATCH',
            headers : { 
                'Content-Type': "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(obj)
            })
            console.log(player.rating)
            console.log(team.players)
        })
        
}

    
}






form.addEventListener('submit',function(e){
    e.preventDefault()
    const newImg = document.getElementById('image').value
    const newName = document.getElementById('name').value

    const team = {
        image: newImg,
        team:  newName,
        players: []
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

const ballRater = () => {
    let ballsContainer = document.getElementById("balls")

     let ballImages = document.getElementsByClassName(`ball-style`)
     Array.from(ballImages).forEach((ballImg, index)=> {   

            ballImg.addEventListener("mouseover", () => onBallHover(index))
            ballImg.addEventListener("mouseleave", onBallOut)
            ballImg.addEventListener("click", () => onBallClick(index))
    })
        let balls = document.querySelectorAll(".ball-style")
    
        let active = -1
    
        function onBallHover(i) {
            fill(i)
        }
    
        function fill (ratingVal) {
            for(let i = 0; i < 5; i++) {
                if(i <= ratingVal) {
                    balls[i].src = "./filledIn.svg"
                } else {
                    balls[i].src = "./hollow.svg"
                }
            }
        }
    
        function onBallOut(){
            fill(active)
        }
    
        function onBallClick (i) {
            active = i
            // document.getElementById("display-ball-value").innerHTML = i+1
            fill(active)
        }
    }


