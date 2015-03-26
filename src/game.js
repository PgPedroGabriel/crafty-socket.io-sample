"use strict";
var Game = {

    map_grid: {},

    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    start: function() {

        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(249, 223, 125)');

    },
    createCharacter: function(x, y, id) {
        Crafty.c(id, {
          init: function() {
            this.requires('Actor, Fourway, Color, Collision')
              .fourway(0.5)
              .color('rgb(20, 75, 40)')
              .bind('Moved', this.moved)
          },
          moved: function(data){
            socket.emit('moving', data);
            return this;
          }
        });
        console.log(id);
        Crafty.e(id).at(x, y);
    },
    createPlayer: function(x,y,id){
        Crafty.c(id, {
          init: function() {
            this.requires('Actor, Color, Solid')
              .color('rgb(255, 0, 0)');
          },
        });
        Crafty.e(id).at(x, y);
        console.log(id, x, y);
    }

}