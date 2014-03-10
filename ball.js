function Ball() {
  // have to manually call Parent constructor
  Entity.call(this);

  this.width = 20;
  this.height = 20;

  this.reset();
}

// Set ball to inherit from Entity. Ball's prototype is a new object with Entity's prototype
Ball.prototype = Object.create(Entity.prototype);
// A prototype's constructor points to its Class. Entity.prototype.constructor === Entity
// Since we set Ball's prototype a new object with Entity's prototype, we have to set Ball's prototype.constructor
// back to Ball since it currently points to Entity.
// ? even with this change, ball instanceof Entity is still true. How does instanceof know this ?
Ball.prototype.constructor = Ball;

Ball.prototype.reset = function() {
  this.x = game.width / 2 - this.width;
  this.y = game.height / 2 - this.height;

  var min = -5, max = 5;
  this.yVelocity = Math.floor(Math.random() * (max - min + 1) + min);
  this.xVelocity = Math.random() > 0.5 ? 5 : -5;
}
// Override update function in Entity
Ball.prototype.update = function() {
  Entity.prototype.update.apply(this,arguments); //super

  // Check for out of bounds
  if(this.y > game.height - this.height || this.y < 0) {
    this.yVelocity *= -1;
  }
  if(this.x > game.width) {
    this.reset();
    game.player.score++;
  }
  if(this.x < 0) {
    this.reset();
    game.bot.score++;
  }

  // Check for paddle collision
  if(this.intersect(game.bot)) {
    var hitter = game.bot;
  }
  else if(this.intersect(game.player)) {
    var hitter = game.player
  }

  if(hitter) {
    this.xVelocity *= -1.1;
    this.yVelocity *= -1.1;
    this.yVelocity += hitter.yVelocity / 3;
  }
}
