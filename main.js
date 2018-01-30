var LifeGrid = {
	speed: 60,
	life: "#00FF00",
	dead: "#FFFFFF",
	size: 15,
	cells: [],
	controls: [false,'glider'],
	running: true,
	get: function(x,y){
		var v = this.cells[x+y*this.cx];
		return v;
	},
	change: function(x,y,v){
		this.cells[x+y*this.cx] = v;
	},
	returnNeighbours: function(x,y){
		// including itself
		var ns = [];
		for(var px=x-1;px<=x+1;px++){
			if(px<0) continue;
			for(var py=y-1;py<=y+1;py++){
				if(py<0) continue;
				var n = (px-x+1)%this.cx+(py-y+1)*3;
				var value = this.get(px,py) ? 1 : 0;
				ns[n] = value;
			}
		}
		return ns;
	},
	returnNumberOfNeighboursAlive: function(x,y){
		// including itself
		var t = this.returnNeighbours(x,y);
		var r = 0;
		for(var i=0;i<t.length;i++){
			if(t[i]) r++;
		}
		return r;
	},
	mousemove: function(event){
		var e = event || window.event;
		var x = Math.floor(e.clientX/this.size);
		var y = Math.floor(e.clientY/this.size);
		if(this.controls[0]) this.change(x,y,1);
	},
	changeClick: function(name){
		this.controls[1] = name;
	},
	mouseclick: function(event){
		var e = event || window.event;
		var px = Math.floor(e.clientX/this.size);
		var py = Math.floor(e.clientY/this.size);
		if(this.controls[1] == 'glider'){
			for(var x=-1;x<=1;x++){
				for(var y=-1;y<=1;y++){
					var n = x+1+y*3+3;
					if(n == 2 || n == 3 || n == 5 || n == 7 || n == 8){this.change(px+x,py+y,1);
					}else{this.change(px+x,py+y,0);}
				}
			}
		}else if(this.controls[1] == 'lwss'){
			for(var x=-2;x<=2;x++){
				for(var y=-1;y<=2;y++){
					var n = x+2+(y+1)*5;
					if((n>0 && n<6) || n == 9 || n == 14 || n == 15 || n == 18){this.change(px+x,py+y,1);
					}else{this.change(px+x,py+y,0);}
				}
			}
		}else if(this.controls[1] == 'block'){
			for(var x=0;x<=1;x++){
				for(var y=0;y<=1;y++){
					this.change(px+x,py+y,1);
				}
			}
		}
	},
	init: function(s){
		if(!s) s=0;
		this.c1 = document.getElementsByTagName("canvas")[s];
		this.D = new Draw(this.c1);
		this.c1.width = window.innerWidth;
		this.c1.height = window.innerHeight;
		this.ww = this.c1.width, this.hh = this.c1.height;
		this.cx = Math.ceil(this.ww/this.size);
		this.cy = Math.ceil(this.hh/this.size);
		for(var i=0;i<this.cx*this.cy;i++){
			this.cells[i] = Math.random()<1/2 ? 1 : 0;
		}
	},
	draw: function(){
		for(var x=0;x<this.cx;x++){
			for(var y=0;y<this.cy;y++){
				var c = this.get(x,y) ? this.life : this.dead;
				var c2 = "#777777";
				this.D.rect(x*this.size,y*this.size,this.size,this.size,c,c2);
			}
		}
	},
	step: function(){
		var run_handler = this.step.bind(this);
		var speed = this.speed;
		setTimeout(run_handler, speed);
		if(!this.running) return;
		/* main code */

		/*
			Basic rules:
			Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
			Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
			Any live cell with two or three live neighbours lives, unchanged, to the next generation.
			Any dead cell with exactly three live neighbours will come to life.
		*/

		var bcells = []; // buffer cells
		for(var i=0;i<this.cells.length;i++){
			bcells[i] = this.cells[i];
		}
		for(var xx=0;xx<this.cx;xx++){
			for(var yy=0;yy<this.cy;yy++){
				if(this.get(xx,yy)){
					var n = this.returnNumberOfNeighboursAlive(xx,yy);
					n--;
					if(n<2 || n>3){
						bcells[xx+yy*this.cx] = 0;
					}
					if(n == 2 || n == 3){
						bcells[xx+yy*this.cx] = 1;
					}
				}else{
					var n = this.returnNumberOfNeighboursAlive(xx,yy);
					if(n == 3){
						bcells[xx+yy*this.cx] = 1;
					}
				}
			}
		}
		for(var i=0;i<bcells.length;i++){
			this.cells[i] = bcells[i];
		}
		/********************************/
	},
	run: function(){
		this.D.rect(0,0,100,100,"#FFFFFF");
		this.draw();
		var run_handler = this.run.bind(this);
		var speed = this.speed;
		setTimeout(run_handler, 10);
	},
	changeSize: function(s){
		if(s>0){
			this.size = s;
			this.cx = Math.ceil(this.ww/this.size);
			this.cy = Math.ceil(this.hh/this.size);
			for(var i=0;i<this.cx*this.cy;i++){this.cells[i]=0;}
		}else{
			alert("Enter a positve number for size");
		}
	},
	changeSpeed: function(s){
		if(s>0){
			this.speed = s;
		}else{
			alert("Enter a positve number for speed");
		}
	},
	reset: function(){
		for(var i=0;i<this.cx*this.cy;i++){this.cells[i]=0;}
	}
};