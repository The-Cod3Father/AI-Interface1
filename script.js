const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

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
        if (this.alpha > 0) {
            this.alpha -= 0.02;
        } else {
            this.alpha = 1;
            this.reset();
        }
    }

    reset() {
        const brainX = canvas.width / 2;
        const brainY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 4;

        const angle = Math.random() * Math.PI * 2;
        this.x = brainX + radius * Math.cos(angle);
        this.y = brainY + radius * Math.sin(angle);

        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
    }
}

function getRandomColor() {
    const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1', '#955251', '#b565a7', '#009b77'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function spawnParticles() {
    for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2;
        const color = getRandomColor();
        const velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };

        const brainX = canvas.width / 2;
        const brainY = canvas.height / 2;
        const brainRadius = Math.min(canvas.width, canvas.height) / 4;

        const angle = Math.random() * Math.PI * 2;
        const x = brainX + brainRadius * Math.cos(angle);
        const y = brainY + brainRadius * Math.sin(angle);

        particles.push(new Particle(x, y, radius, color, velocity));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
}

spawnParticles();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    spawnParticles();
});