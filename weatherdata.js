function setup() {
    createCanvas(200,200);
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=LosAngeles&appid=6b84a56c561b6aba70eb92a47c27452d', gotData);
}

function gotData(data) {
    println(data);
}

function draw() {
    background(0);
}