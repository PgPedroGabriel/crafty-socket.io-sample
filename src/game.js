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
              .checkHits('Solid')
              .color('rgb(20, 75, 40)')
              .bind('Moved', this.moved)
              .bind('HitOn', function(hitData){

                if(this.x <= hitData[0].obj.x )
                    this.x -= 1;
                else
                    this.x += 1;

                if(this.y <= hitData[0].obj.y )
                    this.y -= 1;
                else
                    this.y += 1;

              })
          },
          moved: function(data){
            socket.emit('moving', data);
            return this;
          }
        });
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