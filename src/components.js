// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

  // Locate this entity at the given position on the gri
d  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A Tree is just an Actor with a certain color
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 125, 40)');
  },
});

// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 185, 40)');
  },
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision')
      .fourway(0.5)
      .color('rgb(20, 75, 40)')
      .stopOnSolids()
      .onHit('Village', this.visitVillage)
      .bind('Moved', this.moved);
  },
  moved: function(data){
    console.log(data);
    return this;
  },
  stopOnSolids: function(){
    this.onHit('Solid', this.stopMovement);
    return this;
  },

  visitVillage: function(data){
      village = data[0].obj;
      village.collect();
  },

  stopMovement: function(){
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },
});


Crafty.c('Village', {
    init: function(){
      this.requires('Actor, Color')
        .color('rgb(170, 125, 40)');
    },
    collect: function() {
      this.destroy();
    }
})