prevX = 0;
prevY = 0;
mouseDown = false;
function drawSetup(canvas, canvas2, canvas3) {
    canvas.onmousedown = function (e) {
        var r = canvas.getBoundingClientRect();
        prevX = e.clientX - r.left;
        prevY = e.clientY - r.top;
        mouseDown = true;
    }
    canvas.onmousemove = function (e) {
        if (mouseDown) {
            var r = canvas.getBoundingClientRect();
            x = e.clientX - r.left;
            y = e.clientY - r.top;
            draw(x, y, canvas);
        }
    }
    canvas.onmouseup = function (e) {
        mouseDown = false;
        data28 = makedata(canvas, 28);
        data2canvas(data28, 28, canvas2);
        data28 = tf.tensor(data28, [1, 28, 28]);
        var r = model.predict(data28).arraySync()[0];
        var index = r.indexOf(Math.max(...r));
        $('result').innerHTML = "Your figure is ... " + String(index) + "!";
    }
}

function draw(x, y, canvas) {
    var context = canvas.getContext('2d');
    context.strokeStyle = "white";
    var w = 20;
    context.lineWidth = w;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    prevX = x;
    prevY = y;
}

function makedata(canvas, size) {
    var h = canvas.height;
    var w = canvas.width;
    img = canvas.getContext('2d').getImageData(0, 0, h, w);
    var data = new Float32Array(size * size);
    data.fill(0.0);
    var m = h / size;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var sum = 0;
            for (var k = 0; k < m; k++) {
                for (var l = 0; l < m; l++) {
                    x = i * m + k;
                    y = j * m + l;
                    var s = x + y * m * size;
                    if (img.data[s * 4] > 128) {
                        sum++;
                    }
                }
            }
            data[i + size * j] = 1.0 * sum / m / m;
        }
    }
    return data;
}

function data2canvas(data, size, canvas) {
    var h = canvas.height;
    var w = canvas.width;
    var m = h / size;
    img = canvas.getContext('2d').getImageData(0, 0, h, w);
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var sum = data[i + size * j] * 256;
            for (var k = 0; k < m; k++) {
                for (var l = 0; l < m; l++) {
                    x = i * m + k;
                    y = j * m + l;
                    var s = x + y * m * size;
                    img.data[s * 4] = sum;
                    img.data[s * 4 + 1] = sum;
                    img.data[s * 4 + 2] = sum;
                    img.data[s * 4 + 3] = 255;
                }
            }
        }
    }
    canvas.getContext('2d').putImageData(img, 0, 0);
}

function canvasClear(canvas) {
    var context = canvas.getContext('2d');
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
