const numParticlesPerFrame = 1,
  particles = [],
  particlesPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 255);
}

function draw() {
  background(0);

  particles.push(new particleObject(mouseX, mouseY));

  for (let i = 0; i < particlesPoints.length; i++) {
    particles.push(new particleObject(particlesPoints[i].x, particlesPoints[i].y));
  }

  for (let i = 0; i < particles.length; i++) {
    const gravity = createVector(0, 0.2);
    particles[i].addForce(gravity);
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
      i--;
    }
  }
}

class particleObject {
  constructor(x, y) {
    this.radius = random(5, 10);
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2));
    this.acc = createVector(0, 0);
    this.initialLifeTime = 50;
    this.lifeTime = this.initialLifeTime;
    this.hue = random(255);
  }

  show() {
    noStroke();
    fill(this.hue, 255, 255, map(this.lifeTime, 0, this.initialLifeTime, 0, 255));
    circle(this.pos.x, this.pos.y, 2 * this.radius);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.lifeTime--;
  }

  addForce(force) {
    this.acc.add(force);
  }

  finished() {
    return (this.lifeTime <= 0);
  }
}

function mouseClicked() {
  particlesPoints.push(createVector(mouseX, mouseY));
}