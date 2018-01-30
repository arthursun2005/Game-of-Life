var LifeGrid = {
	speed: 500,
	life: "#00FF00",
	dead: "#FFFFFF",
	size: 5,
	cells: [],
	get: function(x,y){
		try{
			var v = this.cells[x+y*this.cx];
		}catch(e){
			throw e;
			return;
		}
		return v;
	},
	change: function(x,y,v){
	},
	returnNeighbours: function(){
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
		for(var i=0;i<this.cx*this.cy;i++){this.cells[i]=1;}
	},
	draw: function(){
		for(var x=0;x<this.cx;x++){
			for(var y=0;y<this.cy;y++){
				var c = this.get(x,y) ? this.life : this.dead;
				var c2 = "#666666";
				this.D.rect(x*this.size,y*this.size,this.size,this.size,c,c2);
			}
		}
	},
	run: function(){
		this.D.rect(0,0,100,100,"#FFFFFF");
		this.draw();
		var run_handler = this.run.bind(this);
		var speed = this.speed;
		setTimeout(run_handler, speed);
	},
	changeSize: function(v){
		var s = v;
		if(s>0){
			this.size = s;
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
	}
};