var LifeGrid = {
	life: "#00FF00",
	dead: "#FFFFFF",
	size: 5,
	cells: [],
	init: function(s){
		s = s || 0;
		this.c1 = document.getElementsByTagName("canvas")[s];
		this.D = new Draw(this.c1);
		this.c1.width = window.innerWidth;
		this.c1.height = window.innerHeight;
		this.ww = this.c1.width, this.hh = this.c1.height;
		this.cx = Math.ceil(this.ww/this.size);
		this.cy = Math.ceil(this.hh/this.size);
	},
	draw: function(){
		for(var i=0;i<this.cells.length;i++){
		}
	},
	run: function(){

		setTimeout(this.run,5);
	},
	changeSize: function(s){
		if(!s) return;
		if(typeof s == "number" && s>0){
			this.size = s;
		}else{
			alert("Enter a POSITVE NUMBER > 0");
		}
	}
};