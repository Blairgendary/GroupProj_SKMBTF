




	// this is to get the favorite count
var favCount;
var xhr = new XMLHttpRequest();
//this is to get the colors of the them 
// this is the profile link color
var profileLinkColor;
//these are the profile link color fill variables
var redcol;
var greencol;
var bluecol;

var r, g, b;


var canvas;

//this will be initializing all of the sprites n shit
var bird;
var birdImage;



//this is the bottom rectangle sprite for stuff to sit on

var bottomRect;
var mouseCollideCircle;

var colorarray = [];




function setup(){
	var divWidth = document.getElementById('myCanvas').offsetWidth;
	var divHeight = document.getElementById('myCanvas').offsetHeight;
	canvas = createCanvas(divWidth,divHeight);
	canvas.parent("myCanvas");
	colorMode(RGB,255);
	// centerCanvas();
	background(200);





	

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

			
			
			//the substRing method breaks it down into parts so we can access each of the values
			var sub1 = profileLinkColor.substring(0,2);
			var sub2 = profileLinkColor.substring(2,4);
			var sub3 = profileLinkColor.substring(4,6);
			
			//the unhex function changes the values into it's rgb representation
			redcol = unhex(sub1);
			greencol = unhex(sub2);
			bluecol = unhex(sub3);

			r = int(redcol);
			g = int(greencol);
			b = int(bluecol);


			console.log(redcol);
			console.log(greencol);
			console.log(bluecol);
			




			// WE NEED TO CREATE SPRITES, COLLISIONS AND TINT IN HERE
			birdImage = loadImage("assets/birdavatar.png");
			tint(r,g,b);

			bird = createSprite(100,100);
			


			bird.addImage(birdImage);

			bird.setCollider("rectangle",0,0,100,100);
			



			
			
			
	}





}




  	
	console.log("yes");

	

		//loading in the images from the sprite

	// var birdRectCover = createSprite(100,100,100,100);
	// birdRectCover.shapeColor = color(redcol,greencol,bluecol);



	
	
	console.log("RRRRRRR" + r);

	
	
	

	//here we are loading the sprites
	





	mouseCollideCircle = createSprite(30,30,30,30);
	mouseCollideCircle.setCollider("rectangle",0,0,30,30);
	mouseCollideCircle.debug = true;
	// NEED TO CHANGE ONCE GROUND HAS SPRITE
	bottomRect = createSprite(500,900,1000,300);
	bottomRect.setCollider("rectangle",0,0,1000,300);
	bottomRect.debug = true;



	

}

function windowResized(){
	


}
// end of setup

function draw(){  
	// ONLY RUN COLLISIONS WHEN THE XHR == 200 
	// MEANING SPRITES AND HITBOXES ARE CREATED
	if (xhr.status == 200) {
		mouseCollideCircle.collide(bottomRect);
		mouseCollideCircle.collide(bird);

	}
	background(200);

	//fill the ellipse with the color of the profile theme
	fill(redcol,greencol,bluecol);


	ellipse(width/2,height/2,200,200);

	
	drawSprites();
	mouseCollideCircle.position.x = mouseX;
	mouseCollideCircle.position.y = mouseY;
	if(mouseCollideCircle.position.x < 0){
		mouseCollideCircle.position.x = 0;
	}
	if(mouseCollideCircle.position.x > width){
		mouseCollideCircle.position.x = width;


	}
	// console.log("RRRRRRR" + r);
	// console.log("XHR: " + xhr.status);
	
	
}






