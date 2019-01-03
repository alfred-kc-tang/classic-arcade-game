//Create the following variables for setting up the timer as well 
//as the levels of the game (i.e. the speed of the vehicles to be a)
let timer;
let seconds = 0;
let key = 0
let round = 1;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    if (round == 1) {
        this.x += this.speed * dt;
    } else if (round == 2) {
        this.x += (this.speed + 60) * dt;
    } else if (round == 3) {
        this.x += (this.speed + 60*2) * dt;
    } else if (round == 4) {
        this.x += (this.speed + 60*3) * dt;
    } else if (round == 5) {
        this.x += (this.speed + 60*4) * dt;
    }
    // The bugs will become faster in the next round
    if (this.x > 600) {
        this.x = 0;
    }
    // When the bugs finished crossing on the scene, i.e.
    // when they are situated in y-axis that's beyond 600,
    // they will reappear crossing on the scene again.
};
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    startX = 200;
    startY = 380;
    this.x = startX;
    this.y = startY;
}
// Player constractor function

Player.prototype.reset = function() {
    this.x = startX;
    this.y = startY;
}
// A reset method is also set up in the Player prototype for convenience

Player.prototype.update = function(dt) {
    if (this.y == -20 && round < 5) {
        this.reset();
        round += 1;
        roundDisplay = document.querySelector('.round');
        roundDisplay.textContent = round;
        //alert('You win!');
    } else if (this.y == -20 && round == 5) {
            if (confirm("You win the game!\nDo you want to play again?")) {
                location.replace(location.pathname);
            } else {
                clearInterval(timer);
                window.unload();
            }
    }
}   
// The player will win each level if the player arrives at the river, i.e. y-axis = -20.
// In level 5, the player will the game eventually; a window will then pop up to invite
// the player to play the game again.

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Draw the player on the screen

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x != 0) {
        this.x -= 100; 
        //By decreasing 100 pixels in x-axis, the player will move to the left by a box
        //If the player is in the left margin, i.e. player.x = 0, he cannot move further to the left
    } else if (key == 'up' && this.y != -20) {
        this.y -= 80;
        //By decreasing 80 pixels in y-axis, the player will move up by a box
        //If the player is in the top margin, i.e. player.y = -20, he cannot move up further
    } else if (key == 'right' && this.x != 400) {
        this.x += 100;
        //By increasing 100 pixels in x-axis, the player will move to the right by a box
        //If the player is in the right margin, i.e. player.x = 400, he cannot move further to the right
    } else if (key == 'down' && this.y != 380) {
        this.y += 80;
        //By increasing 80 pixels in y-axis, the player will move down by a box
        //If the player is in the bottom margin, i.e. player.y = 380, he cannot move down further
    }
}
//The player cannot move off the screen as he cannot move further when he's in the margins

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(-100, 60, 180), new Enemy(-400, 60, 180), new Enemy(-100, 140, 120), new Enemy(-300, 140, 120), new Enemy(-100, 220, 60), new Enemy(-250, 220, 60)];
// Bugs of the first row are the slowest, and those in the second are faster than its counterparts in the first row, whereas those in the third are the fastest
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    key += 1;
    if (key == 1) {
        timer = setInterval(function() {
        seconds ++;
        document.getElementById("seconds").innerText = seconds % 60;
        document.getElementById("minutes").innerText = parseInt(seconds / 60);
        }, 1000);
    };
    // The timer will start once the first key is pressed
    player.handleInput(allowedKeys[e.keyCode]);
});
