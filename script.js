window.addEventListener("load", function() {
  // Constants
  var GAME_WIDTH = 640;
  var GAME_HEIGHT = 360;

  // Keep the game going
  var gameLive = true;

  // Current level
  var level = 1;
  var life = 5;

  // Emojis
  var emojiPlayer = "🚀";
  var emojiEnemy = "🪨";
  var emojiGoal = "🌎";

  // Enemies
  var enemies = [
    {
      x: 100, // x coordinate
      y: 100, // y coordinate
      speedY: 2, // speed in Y
      w: 40, // width
      h: 40 // height
    },
    {
      x: 200,
      y: 0,
      speedY: 2,
      w: 40,
      h: 40
    },
    {
      x: 330,
      y: 100,
      speedY: 3,
      w: 40,
      h: 40
    },
    {
      x: 450,
      y: 100,
      speedY: -3,
      w: 40,
      h: 40
    }
  ];

  // The player object
  var player = {
    x: 10,
    y: 160,
    speedX: 2,
    isMoving: false, // keep track whether the player is moving or not
    w: 40,
    h: 40
  };

  // The goal object
  var goal = {
    x: 580,
    y: 160,
    w: 50,
    h: 36
  };

  // Grab the canvas and context
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");

  // Event listeners to move player
  var movePlayer = function() {
    player.isMoving = true;
  };

  var stopPlayer = function() {
    player.isMoving = false;
  };

  canvas.addEventListener("mousedown", movePlayer);
  canvas.addEventListener("mouseup", stopPlayer);
  canvas.addEventListener("touchstart", movePlayer);
  canvas.addEventListener("touchend", stopPlayer);

  // Update the logic
  var update = function() {
    // Check if you've won the game
    if (checkCollision(player, goal)) {
      alert("You have made it back to Earth!");
      level += 1;
      life += 1;
      player.speedX += 1;
      player.x = 10;
      player.y = 160;
      player.isMoving = false;

      for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].speedY > 1) {
          enemies[i].speedY += 1;
        } else {
          enemies[i].speedY -= 1;
        }
      }
    }

    // Update player
    if (player.isMoving) {
      player.x += player.speedX;
    }

    // Update enemies
    enemies.forEach(function(enemy) {
      // Check for collision with player
      if (checkCollision(player, enemy)) {
        // Stop the game
        if (life === 0) {
          alert("You were defeated in battle!");
          gameLive = false;
        }

        if (life > 0) {
          life -= 1;
        }

        player.x = 10;
        player.y = 160;
        player.isMoving = false;
      }

      // Move enemy
      enemy.y += enemy.speedY;

      // Check borders
      if (enemy.y <= 10) {
        enemy.y = 10;
        enemy.speedY *= -1;
      } else if (enemy.y >= GAME_HEIGHT - 50) {
        enemy.y = GAME_HEIGHT - 50;
        enemy.speedY *= -1;
      }
    });
  };

  // Show the game on the screen
  var draw = function() {
    // Clear the canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw level, life, and speed
    ctx.font = "15px Verdana";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("Level: " + level, 10, 15);
    ctx.fillText("Life: " + life, 10, 35);
    ctx.fillText("Speed: " + player.speedX, 10, 55);

    // Draw player
    ctx.font = "30px Arial";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText(emojiPlayer, player.x, player.y + player.h);

    // Draw enemies
    ctx.fillStyle = "rgb(255, 0, 0)";
    enemies.forEach(function(enemy) {
      ctx.font = "30px Arial";
      ctx.fillText(emojiEnemy, enemy.x, enemy.y + enemy.h);
    });

    // Draw goal
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.font = "30px Arial";
    ctx.fillText(emojiGoal, goal.x, goal.y + goal.h);
  };

  // Gets executed multiple times per second
  var step = function() {
    update();
    draw();

    if (gameLive) {
      window.requestAnimationFrame(step);
    }
  };

  // Check the collision between two rectangles
  var checkCollision = function(rect1, rect2) {
    var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
    var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
    return closeOnWidth && closeOnHeight;
  };

  // Initial kick
  step();
});
