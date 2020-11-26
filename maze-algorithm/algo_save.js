let map = new Array(30);

for(let i = 0; i < map.length; i++) {
  map[i] = new Array(30);
}

function fillMap(map) {

	for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map.length; j++) {
      map[i][j] = 0;
    }
  }
  return map;
}

function printMap(map) {
	let aff = String("");
	for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[0].length; j++) {
      if(map[i][j] === 0) {
        aff += "██";
      }
      else {
        aff += "  ";
      }
    }
    aff += "\n";
  }
  return aff
}

function mazeGeneration(map) {
  let size = map.length - 1;
  let x = Math.floor(Math.random() * size - 1) + 1;     // returns a random integer from 1 to 28
	let y = Math.floor(Math.random() * size - 1) + 1;
	map[x][y] = 1;

  class Wall {
    constructor(coord, parent) {
      this.coord = coord;
      this.parent = parent;
    }
  }

	let walls = []; //liste des murs

	if(x !== 1) {
  	walls.push(new Wall([ x - 1, y ], [ x, y ] ));
  }
  if(x !== (size - 1)){
    walls.push(new Wall([ x + 1, y ], [ x, y ] ));
  }
  if(y !== 1) {
    walls.push(new Wall([ x, y - 1 ], [ x, y ] ));
  }
  if(y !== (size - 1)){
    walls.push(new Wall([ x, y - 1 ], [ x, y ] ));
  }

  let selW, wx, wy;

  while(walls.length > 0){
    let selW = Math.floor(Math.random() * walls.length);
    wx = walls[selW].coord[0]; //coordonnées d'un mur aleatoire
    wy = walls[selW].coord[1];

    px = walls[selW].parent[0]; //coordonnées du passage parents
    py = walls[selW].parent[1];

    let cond = true;

    if(py === wy) { // ici on teste si
      if(px > wx && wx !== 1){
        if(wy !== size-1) {
          if(map[wx-1][wy+1] === 1)
            cond = false;
        }
        if(wy !== 1) {
          if(map[wx-1][wy-1] === 1)
            cond = false;
        }
      }
      else if(wx !== size-1){
        if(wy !== size-1) {
          if(map[wx+1][wy+1] === 1)
            cond = false;
        }
        if(wy !== 1) {
          if(map[wx+1][wy-1] === 1)
            cond = false;
        }
      }
    }
    else {
      if(py > wy && wy !== 1){
        if(wx !== size-1) {
          if(map[wx+1][wy-1] === 1)
            cond = false;
        }
        if(wx !== 1) {
          if(map[wx-1][wy-1] === 1)
            cond = false;
        }
      }
      else if(wy !== size-1) {
        if(wx !== size-1) {
          if(map[wx+1][wy+1] === 1)
            cond = false;
        }
        if(wx !== 1) {
          if(map[wx-1][wy+1] === 1)
            cond = false;
        }
      }
    }


    if(wx !== 1) {
      if(map[wx-1][wy] === 1 && (wx-1 !== px || wy !== py))
        cond = false;
    }
    if(wx !== (size - 1)){
      if(map[wx+1][wy] === 1 && (wx+1 !== px || wy !== py))
        cond = false;
    }
    if(wy !== 1) {
      if(map[wx][wy-1] === 1 && (wx !== px || wy-1 !== py))
        cond = false;
    }
    if(wy !== (size - 1)){
      if(map[wx][wy+1] === 1 && (wx !== px || wy+1 !== py))
        cond = false;
    }


    if(cond) {
    	map[wx][wy] = 1; // on ajoute le nouveau passage

      if(wx !== 1) {
        if(map[wx-1][wy] !== 1) {
          walls.push(new Wall([ wx - 1, wy ], [ wx, wy ]));
        }
      }
      if(wx !== (size - 1)){
        if(map[wx+1][wy] !== 1){
          walls.push(new Wall([ wx + 1, wy ], [ wx, wy ]));
        }
      }
      if(wy !== 1) {
        if(map[wx][wy-1] !== 1) {
          walls.push(new Wall([ wx, wy - 1 ], [ wx, wy ]));
        }
      }
      if(wy !== (size - 1)){
        if(map[wx][wy+1] !== 1) {
          walls.push(new Wall([ wx, wy + 1 ], [ wx, wy ]));
        }
      }
    }
    walls.splice(selW,1);
  }
  console.log(walls)
  return map;
}




map = fillMap(map);
map = mazeGeneration(map);
console.log(map);
console.log(printMap(map));
