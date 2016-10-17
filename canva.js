var maxRadius = 30;
var minRadius = 10;

var c = document.getElementById("myCanvas");
var context = c.getContext("2d");
var circlescreated = [];
var removedcircles = [];
var flag = 0;

function drawCircle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = minRadius + (Math.random() * (maxRadius - minRadius));
    this.draw = function(radius) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = "grey";
        context.fill();
        context.stroke();
    }
}

function getCoordinates(event) {
    var x = event.clientX;
    var y = event.clientY;

    if (!!circlescreated) {
        flag = 0;
        for (each in circlescreated) {
            if (Math.sqrt((x - circlescreated[each].x) * (x - circlescreated[each].x) + (y - circlescreated[each].y) * (y - circlescreated[each].y)) <= circlescreated[each].radius) {
                removedcircles.push(circlescreated);
                circlescreated.splice(each, 1);
                context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                for (key in circlescreated) {
                    circlescreated[key].draw();
                }
                flag = 1;
                break;
            }
        }
    }
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coords;
    if (!flag) {
        var found = 0;
        for (i in removedcircles) {
            if (removedcircles[i].x === x && removedcircles[i].y === y) {
                removedcircles[i].draw();
                found = 1;
                break;
            }
        }
        if (!found) {
            var appearcircle = new drawCircle(x, y);
            circlescreated.push(appearcircle);
            appearcircle.draw();
        }

    }
}
// var nStartX = 0;
// var nStartY = 0;
// var bIsDrawing = false;
// var putPoint = function(e){
//   nStartX = e.clientX;nStartY = e.clientY;
//   bIsDrawing = true;
//   radius = 0;
// }
// var drawPoint = function(e){
//   if(!bIsDrawing)
//     return;
//   var nDeltaX = nStartX - e.clientX;
//   var nDeltaY = nStartY - e.clientY;
//   radius = Math.sqrt(nDeltaX * nDeltaX + nDeltaY * nDeltaY)
//   context.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   context.beginPath();
//   context.arc(nStartX, nStartY, radius, 0, Math.PI*2);
//   context.fill();
// }
// var stopPoint = function(e){
//   bIsDrawing = false;
// }
// myCanvas.addEventListener('mousedown',putPoint);
// myCanvas.addEventListener('mousemove',drawPoint);
// myCanvas.addEventListener('mouseup',stopPoint);