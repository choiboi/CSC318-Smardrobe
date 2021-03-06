

function processImage(image) {
    edgedImage = detectEdges(image);
}

function detectEdges(image) {
    var canvas = document.createElement("canvas");
    var canvasContext = canvas.getContext("2d");
    
    var imgWidth = image.width;
    var imgHeight = image.height;
    
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    //var img = new Image();
    //img.src = "img/clothes/Coat.png";
    //canvas.width = img.width;
    //canvas.height = img.height;
    
    //img.onload = function(){
         // Or at whatever offset you like
    //     canvasContext.drawImage(img,0,0);
    //};
    
    //canvasContext.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    
    image.parentNode.appendChild(canvas); 
    canvasContext.drawImage(image,0,0);
    
    var imageData = canvasContext.getImageData(0,0, imgWidth, imgHeight);
    
    var gradientList = twoDArray(imageData.width, imageData.height);
    
    for (var i = 1; i < imageData.height - 1; i++) {
        for (var j = 1; j < imageData.width - 1; j++) {
            var index = (i*4) * imageData.width + (j*4);

            var dvalues = derivativeCalculator(imageData, index);
            if (imageData.data[index] == 255) {
                imageData.data[index] -= 1;
            }
            gradientList[i][j] = dvalues;
        }
    }

    var max = [0, 0];
    i = Math.ceil(imageData.height / 2);
    //alert(i);
    for (j = 1; j < imageData.width - 1; j++) {
        if (max[0] < gradientList[i][j][0] * Math.abs(i - j / 2) / i) {
            
            max[0] = gradientList[i][j][0] * Math.abs(i - j / 2) / i;
            max[1] = j;
        }
    }
    
    i = Math.ceil(imageData.height / 2);
    j = max[1];
    var old_tuple = [0, 0];
    var tuple= [0, 0];
    //i is height, j is width
    index = i * imageData.width + (j*4);
    while (imageData.data[index] < 255) {
        
        imageData.data[index] = 255;
        imageData.data[index + 1] = 0;
        imageData.data[index + 2] = 0;
        //canvasContext.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
        old_tuple = tuple;
        tuple = findWeightedMax(gradientList, i, j, old_tuple);
        gradientList[i][j];
        j = j + tuple[0];
        i = i + tuple[1];
        index = i * imageData.width + (j*4);
        imageData.data[index];
        imageData.data[index];
    }
    
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    canvasContext.putImageData(imageData, 0, 0);
    image.parentNode.appendChild(canvas);
}

function findWeightedMax(gradientList, i, j, old_tuple) {
    var surroundList = [[1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1], [0,1], [1,1]];
    var max = 0;
    var ind = 0;
    var new_i, new_j;
    old_tuple[0] = old_tuple[0] * -1;
    old_tuple[1] = old_tuple[1] * -1;
    for (var index = 0; index < surroundList.length; index++) {
        new_i = i + surroundList[index][1];
        new_j = j + surroundList[index][0];
        var comparedVal = gradientList[new_i][new_j][0];
        
        if (gradientList[i][j][2][0] == surroundList[index][0] && gradientList[i][j][2][1] == surroundList[index][1]) {
            comparedVal = comparedVal * 2;
        }
        if (gradientList[i + old_tuple[1]][j + old_tuple[0]][2][0] == surroundList[index][0] && gradientList[i + old_tuple[1]][j + old_tuple[0]][2][1] ==  surroundList[index][1]) {
            comparedVal = comparedVal * 2;
        }
        if (old_tuple[0] == surroundList[index][0] && old_tuple[1] == surroundList[index][1]) {
            comparedVal = comparedVal * 0;
            
        }
        if (max < comparedVal) {
            max = comparedVal;
            ind = surroundList[index];
        }
    }
    
    return ind;
}

function derivativeCalculator(imageData, index) {
    var sobel_x = [[-1,0,1],
                    [-2,0,2],
                    [-1,0,1]];
 
    var sobel_y = [[-1,-2,-1],
                    [0,0,0],
                    [1,2,1]];
                
    var width = imageData.width;
    
    var pixel_x = sobelOperator(sobel_x, imageData, index);
    var pixel_y = sobelOperator(sobel_y, imageData, index);
    var alpha = imageData.data[index + 4];
    var intensity = Math.sqrt(pixel_x * pixel_x + pixel_y * pixel_y);

    var angle = Math.atan2(pixel_y, pixel_x);
    
    if (angle < 0) {
        angle = 2 * Math.PI + angle;
        
    }
    
    var normal_angle = (angle + Math.PI / 2) % (Math.PI * 2);
    
    var increment = (normal_angle / (Math.PI / 8));
    
    var coordAngle = [];
    
    if (increment < 1 && increment >= 15) {
        coordAngle = [1,0];
    }
    if (increment < 3 && increment >= 1) {
        coordAngle = [1,-1];
    }
    if (increment < 5 && increment >= 3) {
        coordAngle = [0,-1];
    }
    if (increment < 7 && increment >= 5) {
        coordAngle = [-1,-1];
    }
    if (increment < 9 && increment >= 7) {
        coordAngle = [-1,0];
    }
    if (increment < 11 && increment >= 9) {
        coordAngle = [-1,1];
    }
    if (increment < 13 && increment >= 11) {
        coordAngle = [0,1];
    }
    if (increment < 15 && increment >= 13) {
        coordAngle = [1,1];
    }
    
    
    
    return [intensity, alpha, coordAngle, pixel_x, pixel_y]; 
}

function sobelOperator(sobel_x, imageData, index) {
    return (sobel_x[0][0] * average(imageData, indexer(index, imageData.width, -1, -1))) + (sobel_x[0][1] * average(imageData, indexer(index, imageData.width, 0, -1))) + (sobel_x[0][2] * average(imageData, indexer(index, imageData.width, 1, -1))) + 
        (sobel_x[1][0] * average(imageData, indexer(index, imageData.width, -1, 0)))   + (sobel_x[1][1] * average(imageData, indexer(index, imageData.width, 0, 0)))   + (sobel_x[1][2] * average(imageData, indexer(index, imageData.width, 1, 0))) + 
        (sobel_x[2][0] * average(imageData, indexer(index, imageData.width, -1, 1))) + (sobel_x[2][1] * average(imageData, indexer(index, imageData.width, 0, 1))) + (sobel_x[2][2] * average(imageData, indexer(index, imageData.width, 1, 1)));
}

function indexer(index, width, x_offset, y_offset) {
    return index + (y_offset * 4 * width) + (x_offset * 4);
    
}

function average(imageData, index) {
    var red=imageData.data[index];
    var green=imageData.data[index + 1];
    var blue=imageData.data[index +2 ];
    
    return(red + green + blue) / 3;
}

function twoDArray(width, height) {
    var list = new Array(height);
    
    for (var i = 0; i < width; i++) {
        list[i] = new Array(width);
    }
    
    return list;
}

function grayscale(image, bPlaceImage)
{



  // You'll get some string error if you fail to specify the dimensions

  //  alert(imgWidth);
  

  // This function cannot be called if the image is not rom the same domain.
  // You'll get security error if you do.
  

  // This loop gets every pixels on the image and
    

    if (bPlaceImage)
	{
	  var myDiv=document.createElement("div");
	     myDiv.appendChild(myCanvas);
	  image.parentNode.appendChild(myCanvas);
	}
	return myCanvas.toDataURL();
  }