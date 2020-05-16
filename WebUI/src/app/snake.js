function ModuleSnake (){
  let self = this;
  self.MoveEnabled = false;
  self.width = 500;
  self.height = 500;
  self.blockSize = 20;
  self.widthInBlocks = self.width / self.blockSize;
  self.heightInBlocks = self.height / self.blockSize;
  self.equalCoordinates = function (coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
  };
  self.checkCoordinateInArray = function (coord, arr) {
    var isInArray = false;
    arr.map(function (index, item) {
      if (self.equalCoordinates(coord, item)) {
        isInArray = true;
      }
    });
    return isInArray;
  };
  self.game = (function () {
    var canvas, ctx;
    var frameLength;
    var snake;
    var apple;
    var score;
    var timeout;
    function init() {
      var $canvas = document.getElementById('jsSnake');
      if ($canvas == null) {
        var newDiv = document.createElement('canvas');
        newDiv.id = 'jsSnake';
        var container = document.getElementById('canvascont');
        container.appendChild(newDiv);
      }
      $canvas = document.getElementById('jsSnake');
      $canvas.setAttribute("width", self.width);
      $canvas.setAttribute("height", self.height);
      canvas = $canvas;
      ctx = canvas.getContext("2d");
      score = 0;
      frameLength = 200;
    };

    function run() {
      snake = self.snake();
      apple = self.apple();
      bindEvents();
      gameLoop();
    };

    function gameLoop() {
      ctx.clearRect(0, 0, self.width, self.height);
      snake.advance(apple);
      draw();
      if (snake.checkCollision()) {
        snake.retreat(); //move snake back to previous position
        snake.draw(ctx); //draw snake in its previous position
        //gameOver();
      }
      else {
        if (self.MoveEnabled){
          timeout = setTimeout(gameLoop, frameLength);
        }
      }
    };

    function draw() {
      snake.draw(ctx);
      drawBorder();
      //apple.draw(ctx);
      //drawScore();
    };

    function drawScore() {
      ctx.save();
      ctx.font = "bold 102px sans-serif";
      ctx.fillStyle = "#f0f3f4";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centreX = self.width / 2;
      var centreY = self.width / 2;
      ctx.fillText(score.toString(), centreX, centreY);
      ctx.restore();
    };

    function gameOver() {
      ctx.save();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      var centreX = self.width / 2;
      var centreY = self.width / 2;
      ctx.strokeText("Game Over", centreX, centreY - 10);
      ctx.fillText("Game Over", centreX, centreY - 10);
      ctx.font = "bold 15px sans-serif";
      ctx.strokeText("Press space to restart", centreX, centreY + 15);
      ctx.fillText("Press space to restart", centreX, centreY + 15);
      ctx.restore();
    };

    function drawBorder() {
      ctx.save();
      ctx.strokeStyle = "#f0f3f4";
      ctx.lineWidth = self.blockSize;
      ctx.lineCap = "square";
      var offset = ctx.lineWidth / 2;
      var corners = [
        [offset, offset],
        [self.width - offset, offset],
        [self.width - offset, self.height - offset],
        [offset, self.height - offset]
      ];
      ctx.beginPath();
      ctx.moveTo(corners[3][0], corners[3][1]);
      corners.map(function (index, corner) {
        ctx.lineTo(corner[0], corner[1]);
      });
      ctx.stroke();
      ctx.restore();
    }

    function restart() {
      clearTimeout(timeout);
      document.getElementsByTagName('body')[0].removeEventListener("keydown");
      document.getElementsByTagName('canvas')[0].removeEventListener("click");
      self.game.init();
    }

    function ChangeDirection(direction){
      if (direction) {
        snake.setDirection(direction);
      }
    };

    function bindEvents() {
      var keysToDirections = {
        37: "left",
        38: "front",
        39: "right",
        40: "backward"
      };

      /*document.addEventListener('keydown', function (event) {
        var key = event.which;
        var direction = keysToDirections[key];
        if (direction) {
          snake.setDirection(direction);
          event.preventDefault();
        }
        else if (key === 32) {
          //restart();
        }
      });*/

      self.appleEaten = function (snakePositions) {
        apple.setNewPosition(snakePositions);
        score++;
        frameLength *= 0.99; //subtle speed-up
      };
    }
    return {
      init: init,
      run: run,
      gameLoop : gameLoop,
      ChangeDirection : ChangeDirection
    };
  })();

  self.apple = function () {
    var position = [6, 6];
    function draw(ctx) {
      ctx.save();
      ctx.fillStyle = "#f0f3f4"; //apple green
      ctx.beginPath();
      var radius = self.blockSize / 2;
      var x = position[0] * self.blockSize + radius;
      var y = position[1] * self.blockSize + radius;
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.restore();
    }

    function random(low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low);
    }

    //get a random position within the game bounds
    function getRandomPosition() {
      var x = random(1, self.widthInBlocks - 2);
      var y = random(1, self.heightInBlocks - 2);
      return [x, y];
    }

    function setNewPosition(snakeArray) {
      var newPosition = getRandomPosition();
      //if new position is already covered by the snake, try again
      if (self.checkCoordinateInArray(newPosition, snakeArray)) {
        return setNewPosition(snakeArray);
      }
      //otherwise set position to the new position
      else {
        position = newPosition;
      }
    }

    function getPosition() {
      return position;
    }

    return {
      draw: draw,
      setNewPosition: setNewPosition,
      getPosition: getPosition
    };
  };
  self.snake = function () {
    var previousPosArray;
    var posArray = [];
    posArray.push([6, 4]);
    posArray.push([5, 4]);
    posArray.push([4, 4]);
    posArray.push([3, 4]);

    var direction = "right";
    var nextDirection = direction;

    function setDirection(newDirection) {
      var allowedDirections;
      switch (direction) {
        case "left":
        case "right":
        case "front":
        case "backward":
          allowedDirections = ["front", "backward","left", "right"];
          break;
        default:
          throw "Invalid direction";
      }
      if (allowedDirections.indexOf(newDirection) > -1) {
        nextDirection = newDirection;
      }
    }

    function drawSection(ctx, position) {
      var x = self.blockSize * position[0];
      var y = self.blockSize * position[1];
      ctx.fillRect(x, y, self.blockSize, self.blockSize);
    }

    function draw(ctx) {
      ctx.save();
      //ctx.fillStyle = "#33a";
      ctx.fillStyle = "#2e4053";
      for (var i = 0; i < posArray.length; i++) {
        if (i != 0 ){
          ctx.fillStyle = "#d4ac0d";
        }
        drawSection(ctx, posArray[i]);
      }
      ctx.restore();
    }

    function checkCollision() {
      var wallCollision = false;
      var snakeCollision = false;
      var head = posArray[0]; //just the head
      var rest = posArray.slice(1); //the rest of the snake
      var snakeX = head[0];
      var snakeY = head[1];
      var minX = 0;
      var minY = 0;
      var maxX = self.widthInBlocks - 1;
      var maxY = self.heightInBlocks - 1;
      var outsideHorizontalBounds = snakeX < minX || snakeX > maxX;
      var outsideVerticalBounds = snakeY < minY || snakeY > maxY;

      if (outsideHorizontalBounds || outsideVerticalBounds) {
        wallCollision = false;
      }

      if (outsideHorizontalBounds) {
        var newPositionHead = posArray[0];
        if (snakeX < minX){
          newPositionHead[0] = maxX;
          posArray[0] = newPositionHead;
        }
        else if (snakeX > maxX){
          newPositionHead[0] = minX;
          posArray[0] = newPositionHead;
        }
      }
      if (outsideVerticalBounds) {
        var newPositionHead = posArray[0];
        if (snakeY < minY){
          newPositionHead[1] = maxY;
          posArray[0] = newPositionHead;
        }
        else if (snakeY > maxY){
          newPositionHead[1] = minY;
          posArray[0] = newPositionHead;
        }
      }
      //check if the snake head coords overlap the rest of the snake
      snakeCollision = self.checkCoordinateInArray(head, rest);
      return wallCollision || snakeCollision;
    }

    function advance(apple) {
      //make a copy of the head of the snake otherwise
      //the changes below would affect the head of the snake
      var nextPosition = posArray[0].slice();
      direction = nextDirection;
      switch (direction) {
        case "left":
          nextPosition[0] -= 1;
          break;
        case "front":
          nextPosition[1] -= 1;
          break;
        case "right":
          nextPosition[0] += 1;
          break;
        case "backward":
          nextPosition[1] += 1;
          break;
        default:
          throw "Invalid direction";
      }
      if (posArray.length <= 12){
        posArray.push(nextPosition);
      }
      previousPosArray = posArray.slice(); //save previous array
      posArray.unshift(nextPosition);
      if (isEatingApple(posArray[0], apple)) {
          self.appleEaten(posArray);
      }
      else {
        posArray.pop();
      }
    }

    function isEatingApple(head, apple) {
      return self.equalCoordinates(head, apple.getPosition());
    }

    function retreat() {
      posArray = previousPosArray;
    }

    return {
      draw: draw,
      advance: advance,
      retreat: retreat,
      setDirection: setDirection,
      checkCollision: checkCollision
    };
  };
};

document.addEventListener('DOMContentLoaded', ()=> {
  window.JS_SNAKE = new ModuleSnake();
  window.JS_SNAKE.game.init();
  window.JS_SNAKE.game.run();
}, false);
