$(document).ready(function() {

    var hero = "";
    var villain;
    var getID="";
    var defeated=[];
    
    
    ripleyStats = {
        name: "Ripley",
        hP: 200,
        attack: 10,
        increase: 10,
        counterAttack:7,
        image: ("assets/images/ripley.jpg"),
    },
    vasquesStats = {
        name: "Vasquez",
        hP: 170,
        attack: 5,
        increase: 5,
        counterAttack:10,
        image: ("assets/images/vasquez.jpg"),
    },
    hicksStats= {
        name: "Hicks",
        hP: 150,
        attack: 15,
        increase: 15,
        counterAttack:10,
        image: ("assets/images/hicks.jpg"),
    },

    alienStats = {
        name: "Xenomorph",
        hP: 350,
        attack: 16,
        increase: 16,
        counterAttack:12,
        image: ("assets/images/alien.jpg"),
    }

///asign hero
   function assignHero(){
       var getMe= $("#yourCharacter div");
    
        getID = getMe.attr("id");
     
       if (getID === "Ripley"){
        hero=ripleyStats;
        console.log(hero);
    }
    else if (getID==="Vasquez"){
        hero=vasquesStats;
        console.log(hero);
    }
    else if (getID==="Hicks"){
        hero=hicksStats;
        console.log(hero);
    }
    else if (getID==="Xenomorph"){
        hero=alienStats;
        console.log(hero);
    }
   }

//assign villain
function assignVillain(){
    var getVillain= $("#currentOpponent div");   
        getVillainID = getVillain.attr("id");   
       if (getVillainID === "Ripley"){
        villain=ripleyStats;  
        console.log(villain);
    }
    else if (getVillainID==="Vasquez"){
        villain=vasquesStats;  
        console.log(villain);     
    }
    else if (getVillainID==="Hicks"){
        villain=hicksStats;  
        console.log(villain);   
    }
    else if (getVillainID==="Xenomorph"){
        villain=alienStats;   
        console.log(villain);    
    }   
}

//create characters.//
function createChar(character){
 var newDiv = $("<div>");
 newDiv.attr("id",character.name);
 newDiv.css({border:"2px solid black", borderRadius:"15px", width:"200px", margin:"5px",float:"left", background:"#ebebeb", fontFamily:"monospace", fontSize:"15px", textAlign:"center"});
 var firstP = $("<p>");
 firstP.text(character.name);
 newDiv.append(firstP);
 var img = $("<img src = " + character.image + ">");
 img.css({height:"125px", width:"125px", borderRadius:"15px"});
 newDiv.append(img);
 var secondP = $("<p>");
 secondP.text("health: " + character.hP + " attack: " + character.attack + " counter-attack: " + character.counterAttack);
 newDiv.append(secondP);
 $("#characters").append(newDiv);
};
   
 
 
 
 createChar(ripleyStats);
 createChar(vasquesStats);
 createChar(hicksStats);
 createChar(alienStats);


 $("#characters div").on("click", function(){
    $("#yourCharacter").append($(this));
   $("#enemies").append($("#characters div").not($(this)));
   $("#enemies div").css({background:"red"});
   assignHero();
   $("#enemies div").off("click");
   
   //why does this have to be nested in the above onclick event to work?//
   $("#enemies div").on("click", function(){
    if($("#currentOpponent").is(":empty")){
    $("#currentOpponent").append($(this));
    assignVillain();
    }
    // want to get rid of this//
    else {
        $("#enemies").append(this);
    }

});
});

function updateStats(){
    var getHero= $("#yourCharacter div");   
        getHeroID = getHero.attr("id");   
       if (getHeroID === "Ripley"){
        $("#Ripley p:nth-child(3)" ).text("health: " + ripleyStats.hP + " attack: " + ripleyStats.attack + " counter-attack: " + ripleyStats.counterAttack);
        
    }
    else if (getHeroID==="Vasquez"){
        $("#Vasquez p:nth-child(3)" ).text("health: " + vasquesStats.hP + " attack: " + vasquesStats.attack + " counter-attack: " + vasquesStats.counterAttack);
          
    }
    else if (getHeroID==="Hicks"){
        $("#Hicks p:nth-child(3)" ).text("health: " + hicksStats.hP + " attack: " + hicksStats.attack + " counter-attack: " + hicksStats.counterAttack);   
    }
    else if (getHeroID==="Xenomorph"){
        $("#Xenomorph p:nth-child(3)" ).text("health: " + alienStats.hP + " attack: " + alienStats.attack + " counter-attack: " + alienStats.counterAttack);    
    }   
    var getBaddy= $("#currentOpponent div");   
    getBaddyID = getBaddy.attr("id");   
   if (getBaddyID === "Ripley"){
    $("#Ripley p:nth-child(3)" ).text("health: " + ripleyStats.hP + " attack: " + ripleyStats.attack + " counter-attack: " + ripleyStats.counterAttack);
    
}
else if (getBaddyID==="Vasquez"){
    $("#Vasquez p:nth-child(3)" ).text("health: " + vasquesStats.hP + " attack: " + vasquesStats.attack + " counter-attack: " + vasquesStats.counterAttack);
      
}
else if (getBaddyID==="Hicks"){
    $("#Hicks p:nth-child(3)" ).text("health: " + hicksStats.hP + " attack: " + hicksStats.attack + " counter-attack: " + hicksStats.counterAttack);   
}
else if (getBaddyID==="Xenomorph"){
    $("#Xenomorph p:nth-child(3)" ).text("health: " + alienStats.hP + " attack: " + alienStats.attack + " counter-attack: " + alienStats.counterAttack);    
}   
}


//on attack button click//
$("#attack").on("click", function(){
    if ($("#currentOpponent").is(":empty")){
         $("#gameInfo2").text("Pick an opponent");
      return setTimeout(function(){ $("#gameInfo2").text("")}, 2000);

    }
    else{
        villain.hP = villain.hP - hero.attack;
        hero.hP = hero.hP - villain.counterAttack;
        $("#gameInfo2").text("You attacked " + villain.name + " for " + hero.attack + ". " + villain.name + " counter-attacked for " + villain.counterAttack);
        hero.attack = hero.attack + hero.increase;
        updateStats();
        if (hero.hP < 1){
            $("#restart").css({display:"block"});
            $("#gameInfo2").text("You lose!");
        }
        else if(villain.hP <1){
            defeated.push(villain);
            isGameWon();   
        }
    }
    });

//restart game on button click
    $("#restart").on("click", function(){
        location.reload();
    });

//new round//
function newRound(){
    assignVillain();    
}

//is Game won//
function isGameWon(){
    if (defeated.length >2){
        $("#gameInfo2").text("You won the whole game!");
        $("#restart").css({display:"block"});
        return
    }
    else{
        $("#gameInfo2").text("You won the round! Select a new opponent.");
        setTimeout(function(){ $("#gameInfo2").text("")}, 2000);
         $("#currentOpponent div").remove();
         console.log(defeated.length);
         villain = "";
         newRound();
    }
}
    




















































































});