

function processImage(image) {
    edgedImage = detectEdges(image);
}

function detectEdges(image) {
    var canvas =document.createElement("canvas");
    var canvasContext = canvas.getContext("2d");
    
    var imgWidth = image.width;
    var imgHeight = image.height;
    
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    
    canvasContext.drawImage(image,0,0);
    
    var imageData = canvasContext.getImageData(0,0, imgWidth, imgHeight);
    
    var gradientList = twoDArray(imageData.width - 2, imageData.height - 2);
    
    for (var i = 1; i < imageData.height - 1; i++) {
        for (var j = 1; j < imageData.width - 1; j++) {
            var index = (i*4) * imageData.width + (j*4);

            var dvalues = derivativeCalculator(imageData, index);

            gradientList[i - 1][j - 1] = dvalues;

        }
    }

    
    
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
    var intensity = Math.sqrt(pixel_x * pixel_y);
    var angle = Math.atan(pixel_y / pixel_x);
    
    
    return [intensity, alpha, angle]; 
}

function sobelOperator(sobel_x, imageData, index) {
    return (sobel_x[0][0] * average(imageData, indexer(index, imageData.width, -1, -1))) + (sobel_x[0][1] * average(imageData, indexer(index, imageData.width, 0, -1))) + (sobel_x[0][2] * average(imageData, indexer(index, imageData.width, 1, -1))) + 
        (sobel_x[1][0] * average(imageData, indexer(index, imageData.width, -1, 0)))   + (sobel_x[1][1] * average(imageData, indexer(index, imageData.width, 0, 0)))   + (sobel_x[1][2] * average(imageData, indexer(index, imageData.width, 1, 0))) + 
        (sobel_x[2][0] * average(imageData, indexer(index, imageData.width, -1, 1))) + (sobel_x[2][1] * average(imageData, indexer(index, imageData.width, 0, 1))) + (sobel_x[2][2] * average(imageData, indexer(index, imageData.width, 1, 1)));
}

function indexer(index, width, x_offset, y_offset) {
    var newIndex = index + (y_offset * 4 * width) + (x_offset * 4);
    
}

function average(imageData, index) {
    var red=imageData.data[index];
    var green=imageData.data[index + 1];
    var blue=imageData.data[index +2 ];
    
    return(red + green + blue) / 3;
}

function twoDArray(width, height) {
    var list = new Array(width);
    
    for (var i = 0; i < width; i++) {
        list[i] = new Array(height);
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