


var pg;
var tex;
var planeTextArray = [];
var planeVidArray = [];
var planeImgArray = [];

var ypos = 25;


function setup(){

	// var canvas = createCanvas(window.width,window.height, WEBGL);
	// canvas.parent("result");
	$("#arrayprint").on("click",function(){
		console.log(planeTextArray);


	});


	pg = createGraphics(300,300);
	tex = createGraphics(300,300);

  	createCanvas(windowWidth, windowHeight, WEBGL);
 	 var fov = 60 / 180 * PI;
  	var cameraZ = height / 2.0 / tan(fov / 2.0);
  	perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);


	console.log("yes");

	var xhr = new XMLHttpRequest();


	

	xhr.open("GET", "get_tweets.php",true);

	xhr.send(null);


	xhr.onload = function(){

		if(xhr.status == 200){
			// console.log(xhr.responseText);
			var tweets = JSON.parse(xhr.responseText);
			console.log(tweets);
			console.log("working");

			
			
			
	}





}



}
// end of setup

function draw(){


}


