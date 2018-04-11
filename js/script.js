



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

// these are the coin variables with their groups

var thousCoinGroup, hunCoinGroup, tenCoinGroup, oneCoinGroup;
var thousCoins, hunCoins, tenCoins, oneCoins;
var xchange = 100;
//this is the profile image maybe we could use it as a sprite or something
var profileImgSprite;

// this is to pass an AJAX request
var query = "Pixel_Dailies";



//this is the bottom rectangle sprite for stuff to sit on

var bottomRect;
var mouseCollideCircle;

var bigBoyDelete;

var colorarray = [];


// this section of variables is for gravity and shiz
var gravity = 1;

// this is the dirty counter
var counter = 0;
var delCount = false; 

var moveDeleteMan = false;

var divHeight;
var divWidth;

var giveemone;

var backgroundImg;






function setup(){
	divWidth = document.getElementById('myCanvas').offsetWidth;
	divHeight = document.getElementById('myCanvas').offsetHeight;

	backgroundImg = loadImage("assets/Twitter_Background.png");
	canvas = createCanvas(divWidth,divHeight);
	canvas.parent("myCanvas");
	colorMode(RGB,255);
	// centerCanvas();
	background(backgroundImg);
	thousCoinGroup = new Group();
	hunCoinGroup = new Group();
	tenCoinGroup = new Group();
	oneCoinGroup = new Group();


		$("#but").on("click", function(){
		// this is to pass an AJAX request


		query = document.getElementById("userInput").value;



		
		
		if (delCount == true) { 
		// clearArray();
		moveDeleteMan = true;

		}
		
		// if (delCount == true) { 
		// 	delCount = false;
		// } else { 
		// 	delCount = true; 
		// }

		delCount = true;
		if (moveDeleteMan == false) {  
		AJXRequest();
		console.log("HELL YEAH");

		}


	}); 

	
	// AJXRequest();






	

	
			


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
			
			bigBoyDelete = createSprite(800,-10,2000,10);
			bigBoyDelete.setCollider("rectangle", 0,0,2000,10);
			bigBoyDelete.debug = true;

			bottomRect = createSprite(600,485,2000,128);

			bottomRect.addImage(loadImage("assets/Twitter_Terrain.png"));
			bottomRect.depth = 9;
			bottomRect.setCollider("rectangle",400,111,2000,128);
			bottomRect.debug = true;

			profileImgSprite = createSprite(100,100,50,50);
			profileImgSprite.addImage(loadImage(profileImgUrl));
			profileImgSprite.setCollider("rectangle",0,0,30,30);
		
			birdImage = loadImage("assets/birdavatar.png");
			push();
			tint(r,g,b);
			bird = createSprite(100,100);
			bird.addAnimation("normal", "assets/birdavatar.png");
			bird.setCollider("rectangle",0,0,64,64);
			bird.depth = 10;
			bird.debug = true;
			pop();
			
			
			



			// it's coin creation time  ITS BEAUTIFUL

			var favIndex = favCount;
			for (var i = 0; i <= favIndex; i ++){
				
				if(favCount >= 1000){
					thousCoins = createSprite(width-90,xchange,30,30);
					thousCoins.addImage(loadImage("assets/Twitter_Gold_Coin.png"));
					thousCoins.setCollider("circle",0,0,20);
					thousCoins.velocity.y += gravity;
					// thousCoins.debug = true;
					thousCoinGroup.add(thousCoins);
					xchange -=20;
					favCount -= 1000;
					console.log("1000fired");

				}
				else if(favCount >= 100 && favCount < 1000){
					hunCoins = createSprite(width-90,xchange,30,30);
					hunCoins.addImage(loadImage("assets/Twitter_Silver_Coin.png"));
					hunCoins.setCollider("circle",0,0,12);
					hunCoins.velocity.y += gravity;
					// hunCoins.debug = true;
					hunCoinGroup.add(hunCoins);
					xchange -=20;
					favCount -= 100;
					console.log("100fired");

				}
				else if(favCount >= 10 && favCount < 100){
					tenCoins = createSprite(width-90,xchange,30,30);
					tenCoins.addImage(loadImage("assets/Twitter_Bronze_Coin.png"));
					tenCoins.setCollider("circle",0,0,8);
					tenCoins.velocity.y += gravity;
					// tenCoins.debug = true;
					tenCoinGroup.add(tenCoins);
					xchange -=20;
					favCount -= 10;
					console.log("10fired");


				}
				else if(favCount >= 1  && favCount < 10){
					oneCoins = createSprite(width-90,xchange,30,30);
					oneCoins.addImage(loadImage("assets/Twitter_Washer_Coin.png"));
					oneCoins.setCollider("circle",0,0,5);
					oneCoins.velocity.y += gravity;
					// oneCoins.debug = true;
					oneCoinGroup.add(oneCoins);
					xchange -=20;
					favCount -= 1;
					console.log("1fired");

				}
				


				
				// console.log("leftover " + favCount);

				// coins = createSprite(xchange,30,30,30);
				// coins.addImage(loadImage("assets/coin_placeholder.png"));
				// coins.setCollider("circle",0,0,20);
				// coins.debug = true;
				// coinGroup.add(coins);
				// xchange += 2;
			}
			var followIndex = followCount;
			for (var i = 0; i <= followIndex; i ++){
				
				if(followCount >= 1000){
					thousCoins = createSprite(width-110,30,30,30);
					thousCoins.addImage(loadImage("assets/Twitter_Red_Coin.png"));
					thousCoins.setCollider("circle",0,0,20);
					thousCoins.velocity.y += gravity;
					// thousCoins.debug = true;
					thousCoinGroup.add(thousCoins);
					xchange -=20;
					followCount -= 1000;
					console.log("1000fired");

				}
				else if(followCount >= 100 && followCount < 1000){
					hunCoins = createSprite(width-110,30,30,30);
					hunCoins.addImage(loadImage("assets/Twitter_Blue_Coin.png"));
					hunCoins.setCollider("circle",0,0,12);
					hunCoins.velocity.y += gravity;
					// hunCoins.debug = true;
					hunCoinGroup.add(hunCoins);
					xchange -=20;
					followCount -= 100;
					console.log("100fired");

				}
				else if(followCount >= 10 && followCount < 100){
					tenCoins = createSprite(width-110,30,30,30);
					tenCoins.addImage(loadImage("assets/Twitter_Green_Coin.png"));
					tenCoins.setCollider("circle",0,0,8);
					tenCoins.velocity.y += gravity;
					// tenCoins.debug = true;
					tenCoinGroup.add(tenCoins);
					xchange -=20;
					followCount -= 10;
					console.log("10fired");


				}
				else if(followCount >= 1  && followCount < 10){
					oneCoins = createSprite(width-110,30,30,30);
					oneCoins.addImage(loadImage("assets/Twitter_Purple_Coin.png"));
					oneCoins.setCollider("circle",0,0,5);
					oneCoins.velocity.y += gravity;
					// oneCoins.debug = true;
					oneCoinGroup.add(oneCoins);
					xchange -=20;
					followCount -= 1;
					console.log("1fired");

				}
				


				
				// console.log("leftover " + favCount);

				// coins = createSprite(xchange,30,30,30);
				// coins.addImage(loadImage("assets/coin_placeholder.png"));
				// coins.setCollider("circle",0,0,20);
				// coins.debug = true;
				// coinGroup.add(coins);
				// xchange += 2;
			}
			
			
	}



}

	// mouseCollideCircle = createSprite(30,30,30,30);
	// mouseCollideCircle.setCollider("rectangle",0,0,30,30);
	// mouseCollideCircle.debug = true;

	
	// NEED TO CHANGE ONCE GROUND HAS SPRITE
	

}

function windowResized(){
	


}
// end of setup

function draw(){  


	// ONLY RUN COLLISIONS WHEN THE XHR == 200 
	// MEANING SPRITES AND HITBOXES ARE CREATED
	if (xhr.status == 200) {
		deleteBoysMove();
		
		
		bigBoyDelete.overlap(allSprites,deleteBoys);

		bird.velocity.x = 0;
	//these controls are just to test the bird collision thing that we got going on	
	if(keyIsDown(LEFT_ARROW)){
		bird.velocity.x = -5;
		bird.mirrorX(-1);
		// coinGroup[0].velocity.x = -5;
	}
	if(keyIsDown(RIGHT_ARROW)){
		bird.velocity.x = 5;
		bird.mirrorX(1);
		// coinGroup[0].velocity.x = 5;
	}
	birdOverlapGround();
	// coinGroup[0].velocity.y += gravity;
	
	
	if(bottomRect.collide(thousCoinGroup)== true){
		for(var i = 0; i < thousCoinGroup.length; i++){
		thousCoinGroup[i].velocity.y = 0;

	}
	// this is to keep the ground posistion where it is
	//comment out if we don't want it to
	bottomRect.position.y -= gravity;

	}
		if(bottomRect.collide(hunCoinGroup)== true){
		for(var i = 0; i < hunCoinGroup.length; i++){
		hunCoinGroup[i].velocity.y = 0;

	}
	// this is to keep the ground posistion where it is
	//comment out if we don't want it to
	bottomRect.position.y -= gravity;

	}
		if(bottomRect.collide(tenCoinGroup)== true){
		for(var i = 0; i < tenCoinGroup.length; i++){
		tenCoinGroup[i].velocity.y = 0;

	}
	// this is to keep the ground posistion where it is
	//comment out if we don't want it to
	bottomRect.position.y -= gravity;

	}
		if(bottomRect.collide(oneCoinGroup)== true){
		for(var i = 0; i < oneCoinGroup.length; i++){
		oneCoinGroup[i].velocity.y = 0;

	}
	// this is to keep the ground posistion where it is
	//comment out if we don't want it to
	bottomRect.position.y -= gravity;

	}

	
	

	

	
}




	background(backgroundImg);

	//fill the ellipse with the color of the profile theme
	


	

	
	drawSprites();
	// mouseCollideCircle.position.x = mouseX;
	// mouseCollideCircle.position.y = mouseY;
	// if(mouseCollideCircle.position.x < 0){
	// 	mouseCollideCircle.position.x = 0;
	// }
	// if(mouseCollideCircle.position.x > width){
	// 	mouseCollideCircle.position.x = width;


	// }
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





function mousePressed(){
	// console.log("mouseX " + mouseX);
	// console.log("mouseY " + mouseY);
	// console.log(thousCoinGroup[5]);
	// console.log(allSprites.length);
	console.log(moveDeleteMan);
	console.log(delCount);
	

}

// delete boys removes the sprites from the array.
function deleteBoys(collector, collected){
	console.log("collision");

	collected.remove();


}

function deleteBoysMove(){
	
	if(moveDeleteMan == true){
	bigBoyDelete.velocity.y += gravity * 2;
	}
	if (bigBoyDelete.position.y > divHeight -20){
		delCount = false;
		
		moveDeleteMan = false;
		
		bigBoyDelete.velocity.y = 0;
		bigBoyDelete.position.y = 0;
		delCount = true;



	}
	

}

function AJXRequest(){
	// console.log(query);
	xhr.open("GET", "get_tweets.php?q=" + query, true);

	xhr.send(null);
	setup();
	 


}
// function clearArray(){


// for (var i = allSprites.length; i < allSprites.length; i++) { 
// 	allSprites[allSprites.length].pop();
// }
	
	
// 	// for(var i = thousCoinGroup; i >= thousCoinGroup.length; i--){
// 	// 	console.log(thousCoinGroup[i]);
// 	// 	thousCoinGroup[i].remove();
// 	// }
// 	// for(var i = hunCoinGroup.length; i >= hunCoinGroup.length; i--){
// 	// 	hunCoinGroup[i].remove();
// 	// }
// 	// for(var i = tenCoinGroup.length; i >= tenCoinGroup.length; i--){
// 	// 	tenCoinGroup[i].remove();
// 	// }
// 	// for(var i = oneCoinGroup.length; i >= oneCoinGroup.length; i--){
// 	// 	oneCoinGroup[i].remove();
// 	// }
// 	// // for(var i = 0; i < thousCoinGroup.length; i++){
// 	// // 	thousCoinGroup[i].remove();
// 	// // }



// }






