





// this is to get the favorite count
var favCount;

//this is to get the colors of the them 
// this is the profile link color
var profileLinkColor;
//these are the profile link color fill variables
var redcol;
var greencol;
var bluecol;

var canvas;

function centerCanvas(){
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x,y);


}


function setup(){

	// var canvas = createCanvas(window.width,window.height, WEBGL);
	// canvas.parent("result");
	

	

	canvas = createCanvas(1000,1000);
	centerCanvas();
	background(200);
	// canvas.parent("myCanvas");
	
  	
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
			favCount = tweets[0].user.favourites_count;
			console.log("favorites: " + favCount);

			profileLinkColor = tweets[0].user.profile_link_color;

			
			

			var sub1 = profileLinkColor.substring(0,2);
			var sub2 = profileLinkColor.substring(2,4);
			var sub3 = profileLinkColor.substring(4,6);
			

			redcol = unhex(sub1);
			greencol = unhex(sub2);
			bluecol = unhex(sub3);
			
			
			
			
			// unhex(profileLinkColor);
			// console.log("link color unhex " + profileLinkColor);





			
			
			
	}





}




}

function windowResized(){
	centerCanvas();


}
// end of setup

function draw(){  
	fill(redcol,greencol,bluecol);
	ellipse(width/2,height/2,200,200);

	


}




