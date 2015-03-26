var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);


var map_grid = {
    width: 24,
    height: 16,
    tile : {
        width:  16,
        height: 16
        }
    },
    backGround = 'rgb(249, 223, 125)',
    players = {},
    countPlayers = 0;


io.on('connection', function (socket) {
    /*
        Join em um grupo
    */
    socket.join('game');

    countPlayers += 1;

    players[socket.id] = {socket: socket, position: {x: 2, y: 2}};

    socket.emit('joined', {map_grid: map_grid, backGround: backGround, x: 2, y:2, id: socket.id});

    socket.on('getPlayers', function(){
        for (var player in players){
            if(player != socket.id)
                socket.emit('newPlayer', {position: players[player].position, id: player});
        }

        socket.broadcast.to('game').emit('newPlayer', {position: players[socket.id].position, id: socket.id})

    })

    socket.on('disconnect', function(){
        io.to('game').emit('playerLeft', {id: socket.id});
        delete players[socket.id];
        countPlayers -= 1;
    })

    socket.on('moving', function (data){

        players[socket.id].position = data;
        socket.broadcast.to('game').emit('playerMoving', {position: players[socket.id].position, player: socket.id});

    })
});
