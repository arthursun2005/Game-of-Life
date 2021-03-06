var Life = {
	speed: 100,
	life: "#00FF00",
	dead: "#00000080",
	size: 8,
	cells: [],
	controls: [false,'glider a'],
	running: true,
	wrap: true,
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
			for(var py=y-1;py<=y+1;py++){
				var xx = (px+this.cx)%this.cx;
				var yy = (py+this.cy)%this.cy;
				var n = (px-x+1)+(py-y+1)*3;
				var value = this.get(xx,yy) ? 1 : 0;
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
		var px = Math.floor(e.offsetX/this.size);
		var py = Math.floor(e.offsetY/this.size);
		if(this.controls[0]){
			for(var x=-1;x<=1;x++){for(var y=-1;y<=1;y++){this.change(px+x,py+y,1);}}
		}
	},
	changeClick: function(name){
		this.controls[1] = name;
	},
	add: function(dx,dy,s,px,py){
		for(var x=-1;x<=dx-2;x++){
			for(var y=-1;y<=dy-2;y++){
				var n = x+1+(y+1)*dx;
				var hit = 0;
				for(var i=0;i<s.length;i++){{if(n == s[i]) hit++;}}
				if(hit>0){this.change(px+x,py+y,1);
				}else{this.change(px+x,py+y,0);}
			}
		}
	},
	mouseclick: function(event){
		var e = event || window.event;
		var px = Math.floor(e.offsetX/this.size);
		var py = Math.floor(e.offsetY/this.size);
		if(this.controls[1] == 'glider a'){
			var s = [1,5,6,7,8];
			this.add(3,3,s,px,py);
		}else if(this.controls[1] == 'glider b'){
			var s = [0,3,5,6,7];
			this.add(3,3,s,px,py);
		}else if(this.controls[1] == 'lwss r'){
			var s = [1,2,3,4,5,9,14,15,18];
			this.add(5,4,s,px,py);
		}else if(this.controls[1] == 'lwss l'){
			var s = [1,4,5,10,14,15,16,17,18];
			this.add(5,4,s,px,py);
		}else if(this.controls[1] == 'lwss u'){
			var s = [0,1,2,4,7,8,12,17,19];
			this.add(4,5,s,px,py);
		}else if(this.controls[1] == 'lwss d'){
			var s = [0,2,7,11,12,15,17,18,19];
			this.add(4,5,s,px,py);
		}else if(this.controls[1] == 'block'){
			for(var x=0;x<=1;x++){for(var y=0;y<=1;y++){this.change(px+x,py+y,1);}}
		}else if(this.controls[1] == 'exploder'){
			var s = [1,3,4,5,6,8,10];
			this.add(3,4,s,px,py);
		}else if(this.controls[1] == 'blinker'){
			for(var x=-1;x<=-1;x++){for(var y=-1;y<=1;y++){this.change(px+x,py+y,1);}}
		}else if(this.controls[1] == 'eater 1'){
			var s = [0,1,4,6,10,14,15];
			this.add(4,4,s,px,py);
		}else if(this.controls[1] == 'eater 2'){
			var s = [3,5,6,8,9,10,12,13,14,22,23,24,26,27,31,33,38,40,46];
			this.add(7,7,s,px,py);
		}else if(this.controls[1] == 'ss1'){
			var s = [0,1,2,3,4,5,6,7, 9,10,11,12,13, 17,18,19, 26,27,28,29,30,31,32, 34,35,36,37,38];
			this.add(39,1,s,px,py);
		}else if(this.controls[1] == 'glider gun'){
			var s = [
				23,24,34,35,
				22+38,24+38,34+38,35+38,
				0+2*38,1+2*38,9+2*38,10+2*38,22+2*38,23+2*38,
				0+3*38,1+3*38,8+3*38,10+3*38,
				8+4*38,9+4*38,16+4*38,17+4*38,
				16+5*38,18+5*38,
				16+6*38,
				35+7*38,36+7*38,
				35+8*38,37+8*38,
				35+9*38,

				24+12*38,25+12*38,26+12*38,
				24+13*38,
				25+14*38,
			];
			this.add(38,15,s,px,py);
		}else if(this.controls[1] == 'blank'){
			for(var x=-4;x<=4;x++){for(var y=-4;y<=4;y++){this.change(px+x,py+y,0);}}
		}else if(this.controls[1] == '10 cell row'){
			for(var x=-5;x<=4;x++){for(var y=0;y<=0;y++){this.change(px+x,py+y,1);}}
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
			this.cells[i] = Math.random()<1/4 ? 1 : 0;
		}
	},
	draw: function(){
		for(var x=0;x<this.cx;x++){
			for(var y=0;y<this.cy;y++){
				var c = this.get(x,y) ? this.life : this.dead;
				this.D.fillRect(x*this.size,y*this.size,this.size,this.size,c);
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
		this.draw();
		var run_handler = this.run.bind(this);
		var speed = this.speed;
		setTimeout(run_handler, 15);
	},
	changeSize: function(s){
		if(s>0){
			this.size = s;
			this.cells = [];
			this.cx = Math.ceil(this.ww/this.size);
			this.cy = Math.ceil(this.hh/this.size);
			for(var i=0;i<this.cx*this.cy;i++){
				this.cells[i] = 0;
			}
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
	changeTransparency: function(s){
		var s2 = "";
		var s1 = "#000000";
		if(s<16) s2+="0";
		s2+=decimalTo(s,16);
		console.log(s2);
		this.dead = s1.concat(s2);
	},
	reset: function(){
		for(var i=0;i<this.cx*this.cy;i++){this.cells[i]=0;}
	}
};