var onMenu = true;
var paused = false;

var bgColors = ["#998899", "#282629"];
var menuColors = ["#347089"];

var shockSVG = "M10,8 C8.9,8 8,8.9 8,10 C8,11.1 8.9,12 10,12 C11.1,12 12,11.1 12,10 C12,8.9 11.1,8 10,8 L10,8 Z M16,10 C16,6.7 13.3,4 10,4 C6.7,4 4,6.7 4,10 C4,12.2 5.2,14.1 7,15.2 L8,13.5 C6.8,12.8 6,11.5 6,10.1 C6,7.9 7.8,6.1 10,6.1 C12.2,6.1 14,7.9 14,10.1 C14,11.6 13.2,12.9 12,13.5 L13,15.2 C14.8,14.1 16,12.2 16,10 L16,10 Z M10,0 C4.5,0 0,4.5 0,10 C0,13.7 2,16.9 5,18.6 L6,16.9 C3.6,15.5 2,12.9 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,13 16.4,15.5 14,16.9 L15,18.6 C18,16.9 20,13.6 20,10 C20,4.5 15.5,0 10,0 L10,0 Z";

var points = 0;


var maxTime = 60;
var time = 60; // In minutes
var timerFill = 0; //time/255;

var timer = setInterval(function(){
	if(time > 0 && onMenu == false && paused == false){
		time -= 1;
		d3.select("#timer").text(time);
		timerFill += 4;
		d3.select("#timer").attr("fill", "rgb(" + timerFill + "," + (timerFill/4) + ",0)");
	}
	if(time <= 0){
		shop();
	}
}, 1000);

function Spawn(minX, maxX, minY, maxY, size, col, sec){
// minX=min X pos; maxX=Max X Pos; minY=same; MaxY=same;
//size= radius; col=color in Hex; time=secs;
	var self = this;
	
	this.ID = Math.floor((Math.random() * 20) + 1); ;
	
	this.secs = sec*1000;
	
	this.create = function(){
		d3.select("#cirs")
			.append("circle")
			.attr("id", col +"_"+ self.ID)
			.attr("class", "target")
			.attr("cx",  Math.floor((Math.random() * maxX) + minX))
			.attr("cy", Math.floor((Math.random() * maxY) + minY))
			.attr("r", size)
			.attr("stroke", "#000")
			.style("stroke-width", "1.5")
			.style("fill", col)
			.on("click", function(){
				if(paused == false){
					switch(col){
						case "red":
							points += 10; d3.select(this).remove();
							return;
							
						case "blue":
							points += 20; d3.select(this).remove();
							return;
								
						case "purple":
							points += 30; d3.select(this).remove();
							return;
							
						case "green":
							points += 40; d3.select(this).remove();
							return;
					}
				}
			});
	}
	
	this.destroy = function(){
		setInterval(function(){
			if(paused == false){
				d3.select("#" + col +"_"+ self.ID).transition(250).attr("opacity", 0.0);
				d3.select("#" + col +"_"+ self.ID).remove();
			}
		}, self.secs);
	}

	self.create(minX, maxX, minY, maxY, size, col, sec);
	self.destroy();
}

function shop(){
	//d3.select("#shock").transition().attr("r", "30");//.attr("r", "5");
	//d3.select("#shock").transition(1000).attr("r", "5").attr("r", "30");
}



//****************************************************************************
window.onload = function(){
	console.log("rdy");
	//mainMenu();
	//pauseGame();
	//spawnObjects(true, true, true, true);
	shop();
	
};






//____________________________________________________________________________//
/*function gameSetup(w,h){
	d3.select("svg")
		.attr("viewBox", "0 0 "+ w + " "+ h + "");
}*/

function mainMenu(){
	if(onMenu == true){
		d3.select("#Menu")
			.append("g")
			.attr("id","MenuStuff")
			d3.select("#MenuStuff")
				.append("rect")
				.attr("id", "menuBg")
				.attr("x", "20%")
				.attr("y", "20%")
				.attr("width", "60%")
				.attr("height", "60%")
				.attr("stroke", "#000")
				.style("stroke-width", "1")
				.style("fill", "#00CC00");
			
			d3.select("#MenuStuff")
				.append("text")
				.attr("id", "title")
				.attr("class", "gameText")
				.attr("x", "40%")
				.attr("y", "30%")
				.text("Point & Destroy");
				
			d3.select("#MenuStuff")
				.append("g")
				.attr("id", "play")
				.on("click", function(){
					console.log("play tag");
					onMenu = false;
					time = maxTime;
					statBox();
					d3.select("#MenuStuff").remove();				
				})
				.append("text")
					.attr("class", "gameText")
					.attr("x", "30%")
					.attr("y", "45%")
					.text("Play Game")
				d3.select("#play")
					.append("circle")
					.attr("cx","28%")
					.attr("cy","43.9%")
					.attr("r","9")
					.attr("stroke","#000")
					.style("stroke-width","1")
					.style("fill","#00aaff");
				
			d3.select("#MenuStuff")
				.append("g")
				.attr("id", "help")
				.on("click", function(){console.log("help tag");})
				.append("text")
					.attr("class", "gameText")
					.attr("x", "30%")
					.attr("y", "50%")
					.text("Instructions")
				d3.select("#help")
					.append("circle")
					.attr("cx","28%")
					.attr("cy","48.9%")
					.attr("r","9")
					.attr("stroke","#000")
					.style("stroke-width","1")
					.style("fill","#ffaa00");
				
			d3.select("#MenuStuff")
				.append("text")
				.attr("id", "github")
				.attr("class", "gameText")
				.attr("x", "65%")
				.attr("y", "75%")
				.text("GitHub")
				.on("click", function(){window.open("http://www.github.com");});				
				
			d3.select("#targets") //create a group for targets when the game starts
				.append("g") ////////////////////////////////////////////////////////
				.attr("id","cirs"); /////////////////////////////////////////////////
	}
	else{
		d3.select("#MenuStuff").remove();
	}
}

function pauseGame(){
	document.addEventListener('keydown', function(event) {
		if(event.keyCode == 80 && paused == false && onMenu == false) { // 'p' or 'P'
			paused = true;
			
			d3.select("#pauseMenu")
				.append("g")
				.attr("id","pauseStuff")
				d3.select("#pauseStuff")
					.append("rect")
					.attr("id", "pBG")
					.attr("x", "25%")
					.attr("y", "20%")
					.attr("width", "50%")
					.attr("height", "50%")
					.attr("stroke", "#000")
					.style("stroke-width", "1")
					.style("fill", "#406880");

			d3.select("#pauseStuff")
				.append("text")
				.attr("id", "pTxt")
				.attr("x", "45%")
				.attr("y", "35%")
				.text("Paused");

			d3.select("#pauseStuff")
				.append("text")
				.attr("id", "pScore")
				.attr("x", "41%")
				.attr("y", "42%")
				.text("Score: ");
				
			d3.select("#pauseStuff")
				.append("text")
				.attr("id", "pPoint")
				.attr("x", "52%")
				.attr("y", "42%")
				.text(points);

			d3.select("#pauseStuff")
				.append("text")
				.attr("id", "quit")
				.attr("x", "47%")
				.attr("y", "55%")
				.text("Quit")
				.on("click", function(){
					paused = false;
					onMenu = true;
					time = maxTime;
					statBox();
					mainMenu();
					d3.select("#pauseMenu").transition(100).attr("opacity", 0.0);
					d3.select("#cirs").remove();
					d3.select("#pauseStuff").remove();
					
				});

			d3.select("#pauseMenu").transition().attr("opacity", 1.0);
			console.log("Game paused? : " + paused);
    }
    else if(event.keyCode == 80 && paused == true && onMenu == false) { // 'p' or 'P'
			paused = false;
			
			d3.select("#pauseMenu").transition(100).attr("opacity", 0.0);
			d3.select("#pauseStuff").remove();
			console.log("Game paused? : " + paused);
    }
  });
}

function statBox(){
	if(onMenu == false){
		d3.select("#stats")
			.append("rect")
			.attr("id", "stat_Box")
			.attr("x", "0")
			.attr("y", "83%")
			.attr("width", "100%")
			.attr("height", "18%")
			.attr("stroke", "#000")
			.style("stroke-width", "1")
			.style("fill", "#047050");
		
		d3.select("#stats")
			.append("text")
			.attr("id", "timeText")
			.attr("class", "gameText")
			.attr("x", "10%")
			.attr("y", "95%")
			.text("Time:");
		
		d3.select("#stats")
			.append("text")
			.attr("id", "timer")
			.attr("class", "gameText")
			.attr("x", "18%")
			.attr("y", "95%")
			.style("fill", "rgb(0,0,0)")
			.text("60");
			
		d3.select("#stats").transition().attr("opacity", 1.0);
	}
	
	else{
		d3.select("#stat_Box").remove();
		d3.select("#timeText").remove();
		d3.select("#timer").remove();
	}
}

function spawnObjects(E1, E2, E3, E4){//bool input for enemy types to spawn
	setInterval(function(){
		if(E1 == true && onMenu == false && paused == false && time > 0){
			spawn = new Spawn(50, 550, 50, 320, 25, "red", 7); //red:10pts
		}}, 3000);
		
	setInterval(function(){
		if(E2 == true && onMenu == false && paused == false && time > 0){
			spawn = new Spawn(40, 560, 40, 330, 20, "blue", 5); //red:20pts
		}}, 4500);
		
	setInterval(function(){	
		if(E3 == true && onMenu == false && paused == false && time > 0){
			spawn = new Spawn(30, 570, 30, 360, 15, "purple", 4); //red:30pts
		}}, 7000);
		
	setInterval(function(){	
		if(E4 == true && onMenu == false && paused == false && time > 0){
			spawn = new Spawn(20, 580, 20, 370, 10, "green", 3); //red:40pts
		}}, 12000);
}
