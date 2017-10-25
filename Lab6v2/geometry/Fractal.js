


function Fractal(){
	

	this.name = "fractal";

	
	this.vertices = [];
    this.colors = [];
    this.normals = [];

    var size = 16;
	f = new FractalDEM(size);
	this.numVertices = f.gridSize*f.gridSize*6;
    //this.setUp();

    
	var fractalWidth = 10;
	scaleW = fractalWidth/(f.gridSize*2);


	for (var i = 0; i < f.gridSize; i++){
		for (var j = 0; j < f.gridSize; j++){
			
			this.vertices.push(vec4(scaleW*i, f.getH(i, j), scaleW*j, 1.0));
			this.normals.push(this.calcNormal(i, j));
			this.colors.push(this.genColor(f.getH(i, j)));
			//this.colors.push( vec4(0.0, 0.0, 0.0, 1.0));

			
			this.vertices.push(vec4(scaleW*(i+1), f.getH(i+1, j), scaleW*j, 1.0));
			this.normals.push(this.calcNormal(i+1, j));
			this.colors.push(this.genColor(f.getH(i+1, j)));
			//this.colors.push( vec4(0.0, 0.0, 1.0, 1.0));

			
			this.vertices.push(vec4(scaleW*(i+1), f.getH(i+1, j+1), scaleW*(j+1), 1.0));
			this.normals.push(this.calcNormal(i+1, j+1));
			this.colors.push(this.genColor(f.getH(i+1, j+1)));
			//this.colors.push( vec4(0.0, 0.0, 1.0, 1.0));

			
			this.vertices.push(vec4(scaleW*i, f.getH(i, j), scaleW*j, 1.0));
			this.normals.push(this.calcNormal(i, j));
			this.colors.push(this.genColor(f.getH(i, j)));
			//this.colors.push( vec4(0.0, 0.0, 1.0, 1.0));

			
			this.vertices.push(vec4(scaleW*(i+1), f.getH(i+1, j+1), scaleW*(j+1), 1.0));
			//this.vertices.push(vec4(0, 0, 0, 1.0));
			this.normals.push(this.calcNormal(i+1, j+1));
			this.colors.push(this.genColor(f.getH(i+1, j+1)));
			//this.colors.push( vec4(0.0, 0.0, 1.0, 1.0));

			
			this.vertices.push(vec4(scaleW*i, f.getH(i, j+1), scaleW*(j+1), 1.0));
			this.normals.push(this.calcNormal(i, j+1));
			this.colors.push(this.genColor(f.getH(i, j+1)));
			//this.colors.push( vec4(0.0, 0.0, 1.0, 1.0));
		}
	}
}

Fractal.prototype.calcNormal = function(a, b){
	var one = vec4(scaleW*2, f.getH(a+1, b)-f.getH(a-1, b), 0, 0);
	var two = vec4(0, f.getH(a, b+1)-f.getH(a, b-1), scaleW*2, 0);
	return vec4(cross(two, one), 0);

}

Fractal.prototype.genColor = function(height){
	//console.log(height);
	var c1 = vec4(0.0, 0.0, 1.0, 1.0); //blue
	var c2 = vec4(0.0, 1.0, 0.0, 1.0); //green
	var c3 = vec4(0.8, 0.3, 0.3, 1.0);//brown
	var c4 = vec4(1.0, 1.0, 1.0, 1.0);//white
	if (height == 0.0){
		return c1;
	}else if (height < 0.1){
		return c4;
	}else if (height <0.5){
		return c2;
	}else if(height < 0.8){
		return c3;
	}else{
		return c4;
	}
}




