var canvas =document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;

var ballRadius = 10;
var ballColor = 'red';
var paddleColor = 'blue';
var brickColor = 'pink';
var score = 0;
//definition du paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = ((canvas.width - paddleWidth)/2);

//Boolean de detection entré clavier
var rightPressed = false;
var leftPressed = false;

//Declaration des elements généraux des blocs
var brickRowCount = 5;
var brickColumnCount = 6;
var brickWidth = 65;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 10;
var brickOffsetLeft = 30;
var nombre_brick = 0;
var hauteurBrick = 0;
//Detection pressup and pressDown 
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//Creation virtuel de chaque bloc, tableau 'colonne' --> tableau 'ligne' --> position X et Y de chaque brick
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (var r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {x:0, y:0, status:1};
	}
}

//Fonction de detection des entrées clavier de déplacement
function keyDownHandler(e){
	if (e.keyCode == 39) {rightPressed = true;}
	else if (e.keyCode == 37){leftPressed = true;}
}
function keyUpHandler(e){
	if (e.keyCode == 39) {rightPressed = false; }
	else if (e.keyCode == 37){leftPressed = false; }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function collisionDetection(){
	for(c=0;c<brickColumnCount;c++){
		for(r=0;r<brickRowCount;r++){
			var b = bricks[c][r];
			if(b.status == 1){
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y +brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score == brickRowCount*brickColumnCount) {
						alert('You win the game ! please try again !');
						document.location.reload();
					}
				}

			}
		}
	}
}
function drawBricks(){
	for(c=0; c<brickColumnCount; c++){
		
		for (r=0; r<brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+ brickOffsetLeft;
				var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop + hauteurBrick;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = brickColor;
				ctx.fill();
				ctx.closePath();
				nombre_brick++;

			}
		}
	}
}
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = paddleColor;
	ctx.fill();
	ctx.closePath();
}
function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}
function drawScore(){
	ctx.font ="16px Arial";
	ctx.fillStyle =ballColor ;
	ctx.fillText('Score: '+score, 8, 20);
}
function draw(){

	ctx.clearRect(0,0,canvas.width, canvas.height);

	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();
	hauteurBrick += 0.3;
	//brickRowCount++;
	


	//detection de collision de paroi top & bottom
	if(y + dy < ballRadius){
		dy = -dy;
		ballColor =getRandomColor();
		paddleColor =getRandomColor();
		brickColor =getRandomColor();
	}
	else if (y + dy > canvas.height - ballRadius) {

		if(x > paddleX-5 && x < paddleX + paddleWidth-65){dy = -5;}	
		else if(x > paddleX+10 && x < paddleX + paddleWidth-55){dy = -4;}
		else if(x > paddleX+20 && x < paddleX + paddleWidth-45){dy = -3;}
		else if(x > paddleX+30 && x < paddleX + paddleWidth-30){dy = -2;}
		else if(x > paddleX+45 && x < paddleX + paddleWidth-20){dy = -3;}
		else if(x > paddleX+55 && x < paddleX + paddleWidth-10){dy = -4;}
		else if(x > paddleX+65 && x < paddleX + paddleWidth+5){dy = -5;}

		else{alert('GAME OVER !!!');document.location.reload();}
	}		
			
		

	//detection collision left and right
	if(x + dx > canvas.width || x + dx < 0) {
    	dx = -dx;
    	ballColor =getRandomColor();
    	paddleColor =getRandomColor();
    	brickColor =getRandomColor();

	}
	if (rightPressed && paddleX < canvas.width-paddleWidth) {paddleX+= 7;}
	else if (leftPressed && paddleX > 0) {paddleX-= 7;}



	x += dx;
	y += dy;	
}



setInterval(draw, 10);