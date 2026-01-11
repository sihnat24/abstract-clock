let lastPrintedMinute = -1;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  let nowMillis = millis();
  let sec = second() + (nowMillis % 1000) / 1000.0;
  let min = minute() + sec / 60.0;
  let hr  = (hour() % 12) + min / 60.0;

  let secRot  = -sec * 6;
  let minRot  = -min * 6;
  let hourRot = -hr * 30;

  let cx = width / 2;
  let cy = height / 2;

  drawTicks(cx, cy, 340, 60, secRot, 12, 2, color(255, 0, 0));
  drawLabels(cx, cy, 340, 60, secRot, color(255, 0, 0), 10, 12);

  drawTicks(cx, cy, 270, 60, minRot, 15, 3, color(0, 255, 255));
  drawLabels(cx, cy, 270, 60, minRot, color(0, 255, 255), 11, 15);

  drawTicks(cx, cy, 190, 12, hourRot, 25, 5, color(255));
  drawHourLabels(cx, cy, 190, hourRot);

  drawReferenceLine(cx, cy);

  if (minute() !== lastPrintedMinute) {
    console.log(nf(minute(), 2));
    lastPrintedMinute = minute();
  }
}

function drawTicks(cx, cy, radius, count, offset, length, strokeW, col) {
  stroke(col);
  strokeWeight(strokeW);

  for (let i = 0; i < count; i++) {
    let angle = (360 / count) * i + offset;
    let r1 = radius - length;
    let r2 = radius;

    let x1 = cx + r1 * sin(angle);
    let y1 = cy - r1 * cos(angle);
    let x2 = cx + r2 * sin(angle);
    let y2 = cy - r2 * cos(angle);

    line(x1, y1, x2, y2);
  }
}

function drawLabels(cx, cy, radius, count, offset, col, fontSize, tickLen) {
  fill(col);
  noStroke();
  textSize(fontSize);

  let pad = fontSize * 1.2;
  let labelRadius = radius - tickLen - pad;

  for (let i = 0; i < count; i++) {
    let angle = (360 / count) * i + offset;
    let x = cx + labelRadius * sin(angle);
    let y = cy - labelRadius * cos(angle);
    text(i, x, y);
  }
}

function drawHourLabels(cx, cy, radius, offset) {
  fill(255);
  textSize(14);
  noStroke();

  let pad = 25 + 14 * 1.2;
  let labelRadius = radius - pad;

  for (let i = 1; i <= 12; i++) {
    let angle = i * 30 + offset;
    let x = cx + labelRadius * sin(angle);
    let y = cy - labelRadius * cos(angle);
    text(i, x, y);
  }
}

function drawReferenceLine(cx, cy) {
  stroke(0, 255, 0);
  strokeWeight(3);
  line(cx, cy, cx, cy - 380);
}
