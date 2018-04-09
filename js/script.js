



// this is to get the favorite count
var favCount, profileImgUrl, followCount, verified;
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
// this is the coin variable
var coinGroup;
var coins;
var xchange = 0;
//this is the profile image maybe we could use it as a sprite or something
var profileImgSprite




//this is the bottom rectangle sprite for stuff to sit on

var bottomRect;
var mouseCollideCircle;

var colorarray = [];


// this section of variables is for gravity and shiz
var gravity = 1;





function setup(){
	var divWidth = document.getElementById('myCanvas').offsetWidth;
	var divHeight = document.getElementById('myCanvas').offsetHeight;
	canvas = createCanvas(divWidth,divHeight);
	canvas.parent("myCanvas");
	colorMode(RGB,255);
	// centerCanvas();
	background(200);
	coinGroup = new Group();





	

	xhr.open("GET", "get_tweets.php",true);

	xhr.send(null);


	xhr.onload = function(){

		if(xhr.status == 200){
			// console.log(xhr.responseText);
			var tweets = JSON.parse(xhr.responseText);
			console.log(tweets);
			console.log("working");
			favCount = tweets[0].user.favourites_count;
			followCount = tweets[0].user.followers_count;
			// profileImgUrl = tweets[17].extended_entities.media[0].media_url;
			profileImgUrl = tweets[0].user.profile_image_url;
			console.log("favorites: " + favCount);
			console.log("followers: " + followCount);
			console.log(profileImgUrl);

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
			// we have a problem with the tint function again 
			
			

			bottomRect = createSprite(200,350,500,100);

			bottomRect.addImage(loadImage("assets/collisiontestsprite.png"));

			profileImgSprite = createSprite(100,100,50,50);
			profileImgSprite.addImage(loadImage(profileImgUrl));
			push();
			birdImage = loadImage("assets/birdavatar.png");
			tint(r,g,b);
			bird = createSprite(100,100);
			bird.addAnimation("normal", "assets/birdavatar.png");
			bird.setCollider("rectangle",0,0,64,64);
			bird.depth = 10;
			bird.debug = true;
			pop();
			



			// it's coin creation time

			for (var i = 0; i < favCount; i ++){
				
				coins = createSprite(xchange,30,30,30);
				coins.addImage(loadImage("assets/coin_placeholder.png"));
				coins.setCollider("circle",0,0,20);
				coins.debug = true;
				coinGroup.add(coins);
				xchange += 2;
			}
			
			
	}


}

	mouseCollideCircle = createSprite(30,30,30,30);
	mouseCollideCircle.setCollider("rectangle",0,0,30,30);
	mouseCollideCircle.debug = true;
	// NEED TO CHANGE ONCE GROUND HAS SPRITE
	

}

function windowResized(){
	


}
// end of setup

function draw(){  
	// ONLY RUN COLLISIONS WHEN THE XHR == 200 
	// MEANING SPRITES AND HITBOXES ARE CREATED
	if (xhr.status == 200) {
		coinGroup.collide(coinGroup);
		coinGroup.bounce(mouseCollideCircle);
		mouseCollideCircle.collide(bird);
		bird.velocity.x = 0;
	//these controls are just to test the bird collision thing that we got going on	
	if(keyIsDown(LEFT_ARROW)){
		bird.velocity.x = -5;
		// coinGroup[0].velocity.x = -5;
	}
	if(keyIsDown(RIGHT_ARROW)){
		bird.velocity.x = 5;
		// coinGroup[0].velocity.x = 5;
	}
	birdOverlapGround();
	// coinGroup[0].velocity.y += gravity;

	coinsOverlapGround();

	


	}




	background(200);

	//fill the ellipse with the color of the profile theme
	


	

	
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
function birdOverlapGround(){
	// is the bird isn't overlapping with the bottom rectangle it will fall
	if(bottomRect.overlapPixel(bird.position.x, bird.position.y+30)==false)
		bird.velocity.y += gravity;
	// while the bird is overlapping the pixels of the rectangle push it up until it isn't
	while(bottomRect.overlapPixel(bird.position.x,bird.position.y+30)){
		bird.position.y--;
		bird.velocity.y = 0;
	}



}

function coinsOverlapGround(){
	for(var i = 0; i < coinGroup.length; i++){
		// coinGroup[i].velocity.y += gravity;
		if(bottomRect.overlapPixel(coinGroup[i].position.x, coinGroup[i].position.y+30)==false)
		coinGroup[i].velocity.y += gravity;
		// while the coin is overlapping the pixels of the rectangle push it up until it isn't
		while(bottomRect.overlapPixel(coinGroup[i].position.x,coinGroup[i].position.y+30)){
			coinGroup[i].position.y--;
			coinGroup[i].velocity.y = 0;

		// this will keep the coins withing the canvas
		if(coinGroup[i].position.x < 0){
			coinGroup[i].position.x = 0;
	}
		if(coinGroup[i].position.x > width){
			coinGroup[i].position.x = width;


	}



	}





}
}

function mousePressed(){
	console.log("mouseX " + mouseX);
	console.log("mouseY " + mouseY);
	console.log(coinGroup);

}






