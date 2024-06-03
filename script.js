const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let lines = [];
let clusters = [];

function createStars() {
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            alpha: Math.random(),
            color: getRandomColor()
        });
    }
}

function getRandomColor() {
    const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1', '#955251', '#b565a7', '#009b77'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${hexToRgb(star.color)}, ${star.alpha})`;
        ctx.fill();
    }
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

function createLines() {
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            let distance = Math.sqrt(Math.pow(stars[i].x - stars[j].x, 2) + Math.pow(stars[i].y - stars[j].y, 2));
            if (distance < 150) {
                lines.push({
                    x1: stars[i].x,
                    y1: stars[i].y,
                    x2: stars[j].x,
                    y2: stars[j].y,
                    alpha: 1 - distance / 150
                });
            }
        }
    }
}

function drawLines() {
    for (let line of lines) {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.alpha})`;
        ctx.stroke();
    }
}

function createClusters() {
    for (let i = 0; i < 10; i++) {
        clusters.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 30 + Math.random() * 20,
            color: getRandomColor(),
            alpha: 0.5
        });
    }
}

function drawClusters() {
    for (let cluster of clusters) {
        ctx.beginPath();
        ctx.arc(cluster.x, cluster.y, cluster.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${hexToRgb(cluster.color)}, ${cluster.alpha})`;
        ctx.fill();
    }
}

function animate() {
    drawStars();
    drawLines();
    drawClusters();
    requestAnimationFrame(animate);
}

createStars();
createLines();
createClusters();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    lines = [];
    clusters = [];
    createStars();
    createLines();
    createClusters();
});