const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function getRandomColor() {
    const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1', '#955251', '#b565a7', '#009b77'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function spawnParticles(x, y) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3;
        const color = getRandomColor();
        const velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
        particles.push(new Particle(x, y, radius, color, velocity));
    }
}

function drawBrain() {
    const brainWidth = canvas.width / 2;
    const brainHeight = canvas.height / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let angle = 0; angle < 360; angle += 1) {
        const radian = (Math.PI / 180) * angle;
        const x = centerX + brainWidth * Math.sin(radian) * Math.cos(radian);
        const y = centerY + brainHeight * Math.cos(radian);
        spawnParticles(x, y);
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            particle.update();
        } else {
            particles.splice(index, 1);
        }
    });

    drawBrain();
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    drawBrain();
});
