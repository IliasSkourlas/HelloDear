let webCam;
let detector;
let detections = [];
let l = 1.9;

function preload(){
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results){
    if(error){
        console.error(error);
        fill(250, 50, 0);
        textSize(20);
        text("oops...refresh please ! ", 640*l + 10, 20)
    }else{
        detections = results;
        detector.detect(webCam, gotDetections);
    }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    webCam = createCapture(VIDEO);
    webCam.size(640*l,550*l);
    webCam.hide();
    fill(250, 50, 250);
    textSize(50);
    text(" :)  Hello dear  ", 20, 40)

    setTimeout(() => {
        detector.detect(webCam, gotDetections);
    }, 4000);
}

function draw(){
    image(webCam,0, 0, 640*l, 480*l);
    for (let i = 0; i < detections.length; i++) {
        let object = detections[i];
        stroke(0, 255, 255);
        strokeWeight(2);
        noFill();
        rect(object.x*l, object.y*l, object.width*l, object.height*l+object.height*l/100);
        fill(0, 250, 0);
        noStroke();
        textSize(20);
        text(object.label, object.x*l + 5, object.y*l + 20);
    }
};
