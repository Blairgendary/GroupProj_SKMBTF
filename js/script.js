



/////////////////////THESE VARIABLES WILL LET

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


//this is the bottom rectangle sprite for stuff to sit on

var bottomRect;
var mouseCollideCircle;
function centerCanvas(){
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x,y);


}


function setup(){

	canvas = createCanvas(1000,1000);
	centerCanvas();
	background(200);
	mouseCollideCircle = createSprite(30,30,30,30);
	mouseCollideCircle.setCollider("rectangle",0,0,30,30);
	mouseCollideCircle.debug = true;
	
	bottomRect = createSprite(500,900,1000,300);
	bottomRect.setCollider("rectangle",0,0,1000,300);
	bottomRect.debug = true;
	
  	
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
			// this accesses the profile them background color
			//it's in hex though SHIT
			profileLinkColor = tweets[0].user.profile_link_color;

			
			
			//the substing method breaks it down into parts so we can access each of the values
			var sub1 = profileLinkColor.substring(0,2);
			var sub2 = profileLinkColor.substring(2,4);
			var sub3 = profileLinkColor.substring(4,6);
			
			//the unhex function changes the values into it's rgb representation
			redcol = unhex(sub1);
			greencol = unhex(sub2);
			bluecol = unhex(sub3);
			
			
			
			
			





			
			
			
	}





}




}

function windowResized(){
	centerCanvas();


}
// end of setup

function draw(){  
	background(200);
	//fill the ellipse with the color of the profile theme
	fill(redcol,greencol,bluecol);
	ellipse(width/2,height/2,200,200);
	mouseCollideCircle.collide(bottomRect);
	drawSprites();
	mouseCollideCircle.position.x = mouseX;
	mouseCollideCircle.position.y = mouseY;
	if(mouseCollideCircle.position.x < 0){
		mouseCollideCircle.position.x = 0;
	}
	if(mouseCollideCircle.position.x > width){
		mouseCollideCircle.position.x = width;


	}

	


}




