$(document).ready(function() {

    var hero = "";
    var villain;
    var getID="";
    var defeated=[];
    
    
    ripleyStats = {
        name: "Ripley",
        hP: 180,
        attack: 20,
        increase: 20,
        counterAttack:40,
        image: ("assets/images/ripley.jpg"),
    },
    vasquesStats = {
        name: "Vasquez",
        hP: 1220,
        attack: 18,
        increase: 18,
        counterAttack:25,
        image: ("assets/images/vasquez.jpg"),
    },
    hicksStats= {
        name: "Hicks",
        hP: 250,
        attack: 18,
        increase: 18,
        counterAttack:15,
        image: ("assets/images/hicks.jpg"),
    },

    alienStats = {
        name: "Xenomorph",
        hP: 240,
        attack: 20,
        increase: 20,
        counterAttack:20,
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
   

});

   //thanks to Zach for helping me figure out how to un-nest this from the above function!//
   $("#enemies").on("click", "div", function(){
       console.log('hey im working')
    if($("#currentOpponent").is(":empty")){
    $("#currentOpponent").append($(this));
    assignVillain();
    }
    
    // want to get rid of this//
    else {
        $("#enemies").append(this);
    }

});
//update stats on attack click//
function outerUpdateStats(){
function updateStats(character, characterObject){
var getID= character.attr("id");

    $("#" + getID+" p:nth-child(3)").text("health: " + characterObject.hP + " attack: " + characterObject.attack + " counter-attack: " + characterObject.counterAttack);
       }
    
       updateStats($("#Ripley"), ripleyStats);
       updateStats($("#Vasquez"), vasquesStats);
       updateStats($("#Hicks"), hicksStats);
       updateStats($("#Xenomorph"), alienStats);
    
    };




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
        outerUpdateStats();
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