var index = "http://BHP.com";
var content = "Pages/Content";

var boxW = 640,
		boxH = 480;

//var mPos;


function controls(){
	var mvSpeed = 5;
var x = boxW/2;
	document.addEventListener('keydown', function(event) {
		if(event.keyCode == 37) { //left key
			//x = d3.select("#player").attr("x");
			console.log(x - mvSpeed);
			d3.select("#player").attr("x", function(){return (x - mvSpeed)});
    }
    else if(event.keyCode == 39) { //right key
    	//x = d3.select("#player").attr("x");
    	console.log(x);
    	d3.select("#player").attr("x", (x + mvSpeed));
    }
});

}




//click code location.href = "" ;
$(document).ready(function () {
    controls();
    console.log("game on");
});






/*    d3.select("#player").call(d3.drag()
        .on("drag", function(){
            mPos = d3.mouse(this);
            console.log("X" + mPos[0]);
						console.log("Y" + mPos[1]);
						d3.select("#player").attr("x", mPos[0]);
						d3.select("#player").attr("y", mPos[1]);
						
						if(mPos[0] < 0.0){
      				d3.select("#player").attr("x", 0.0);
							console.log("X");
						}
						if(mPos[0] > (boxW-15)){
							d3.select("#player").attr("x", (boxW-15));
							console.log("X");
						} 
			
						if(mPos[1] < 0.0){
							d3.select("#player").attr("y", 0.0);
							console.log("Y");
						}
						if(mPos[1] > (boxH - d3.select("#stat_Box").attr("height") ) ){
      				d3.select("#player").attr("y", (boxH-d3.select("#stat_Box").attr("height")- 15));
							console.log("Y");
						}
    })
        .on("end", function () {
            mPos = d3.mouse(this);
        })
    );*/
