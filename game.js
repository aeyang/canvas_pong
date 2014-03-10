//The game engine

function Game(canvas) {
  var self = this;

  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  // Keep track of key states
  // Whether each keyboard key is currently being pressed or not
  this.keyPressed = {};

  $(canvas).on('keydown keyup', function(event) {
    //Convert key code to key name

    //JDOC: For key or mouse events, 'event.which' indicates the specific key or button that was pressed. The event.which property normalizes event.keyCode and event.charCode. It is recommended to watch event.which for keyboard key input. For more detail, read about event.charCode on the MDC. event.which also normalizes button presses (mousedown and mouseupevents), reporting 1 for left button, 2 for middle, and 3 for right. Use event.which instead of event.button.
    var keyName = Game.keys[event.which];

    if(keyName){
      self.keyPressed[keyName] = event.type === 'keydown';
      event.preventDefault();
    }
  });
}

// This is a property on the Game Class itself.
// This is how we do static properties in JS
Game.keys = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

Game.prototype.start = function() {
  var self = this,
      fps = 60,
      interval = 1000/fps; //ms per frame

  setInterval(function() {
    self.update();
    self.draw();
  }, interval);
}

Game.prototype.update = function() {
  this.entities.forEach(function(entity) {
    if(entity.update) {
      entity.update();
    }
  });
}

Game.prototype.draw = function() {
  var self = this;

  this.entities.forEach(function(entity) {
    if(entity.draw) {
      entity.draw(self.context);
    }
  });
}