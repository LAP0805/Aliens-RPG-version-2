//create objects to be manipulated: ripley, hicks, vasquez, alien. 
//Give them health points, attack points, image.

//display each characters info in a seperate div//

//when their class is clicked, move clicked character to yourCharacter and others to Enemies.

//when an enemy is clicked move to defender area.

//when attack button is clicked, defender will lose health points equal to yourCharacters attack points. 
//yourCharacter will lose healthpoints equal to defenders attack points.

//when the attack button is pressed again, the same happens but yourCharacters attack points double.


//if yourCharacters health points reach zero, present restart game button and restart game.
//if the defenders healthpoints reach zero, defender dissappears.

$(document).ready(function(){


var players = {
 ripley : {
    name: "Ripley",
    healthPoints: 100,
    attackPoints: 8,
    image: ("assets/images/ripley.jpg"),
    
},
 vasquez : {
    name: "Vasquez",
    healthPoints: 150,
    attackPoints: 12,
    image: ("assets/images/vasquez.jpg"),
},
 hicks : {
    name: "Hicks",
    healthPoints: 180,
    attackPoints: 18,
    image: ("assets/images/hicks.jpg"),
},
 alien : {
    name: "Xenomorph",
    healthPoints: 200,
    attackPoints: 20,
    image: ("assets/images/alien.jpg"),
}
}

var hero;
var enemies = [];
console.log(players);

function createCharacter (name, location){
    console.log(name)  
var newDiv = $("<div>");
var chrName = $("<p>" + name.name + "</p>");
var img = $("<img class='characterImages' src=" + name.image + ">" )
newDiv.append(img);
newDiv.append(chrName)
newDiv.css({height: "150px", width:"150px", border: "2px solid red", float: "left"});
$(location).append(newDiv);

};

//Function to start game uses createCharater function for all [keys] in var players
function initiateGame() {
for(var key in players){
createCharacter(players[key], "#characters");
}
}

//Function to select a hero/attacker - uses createCharater() function but only for the selected player
//End of this function will push all other characters to an empty enemies array - var enemies[]
function selectHero() {

};

//Function to select enemy to face for the enemies array
//This also uses createCharater() function - but only for the selcted enemy from the enemies array
function selectEnemy() {

}

initiateGame();








//on ready closing tag
});