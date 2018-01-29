function Draw(space){
	this.space = space;
}
Draw.prototype.line = function(x1, y1, x2, y2, c, t) {
	var d = this.space.getContext("2d");
	d.beginPath(); 
	d.lineWidth = t;
	d.moveTo(x1, y1);
	d.lineTo(x2, y2);
	d.strokeStyle = c;
	d.stroke();
};
Draw.prototype.rect = function(x, y, w, h, c1, c2) {
	var d = this.space.getContext("2d");
	d.beginPath();
	d.fillStyle = c1;
	d.strokeStyle = c2 || "#000000";
	d.fillRect(x, y, w, h);
};
Draw.prototype.arc = function(x1, y1, r, a1, a2, c) {
	var d = this.space.getContext("2d");
	d.beginPath();
	d.strokeStyle = c;
	d.arc(x1, y1, r, a1, a2);
	d.stroke();
};
Draw.prototype.roundRect = function(x, y, w, h, r, c1, c2) {
	var d = this.space.getContext("2d");
	d.beginPath();
	d.moveTo(x+r, y);
	d.lineTo(x+w-r, y);
	d.quadraticCurveTo(x+w, y, x+w, y+r);
	d.lineTo(x+w, y+h-r);
	d.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
	d.lineTo(x+r,y+h);
	d.quadraticCurveTo(x, y+h, x, y+h-r);
	d.lineTo(x, y+r);
	d.quadraticCurveTo(x,y,x+r,y);
	d.lineWidth = 1.5;
	d.fillStyle = c1;
	d.strokeStyle = c1;
	d.stroke();
	d.fill();
};
Draw.prototype.fillText = function(t, x, y, font, f) {
	var d = this.space.getContext("2d");
	d.fillStyle = f;
	d.textAlign = "center";
	d.font = font;
	d.fillText(t, x, y);
};
Draw.prototype.strokeText = function(t, x, y, font, f) {
	var d = this.space.getContext("2d");
	d.strokeStyle = f;
	d.textAlign = "center";
	d.font = font;
	d.strokeText(t, x, y);
};
Draw.prototype.strokeTriangle = function(x1, y1, x2, y2, x3, y3, c, t) {
	c = c || "#FF0000";
	this.line(x1,y1,x2,y2,c,t);
	this.line(x2,y2,x3,y3,c,t);
	this.line(x3,y3,x1,y1,c,t);
};