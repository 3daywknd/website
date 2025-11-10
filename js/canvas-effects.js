/**
 * Canvas Hero Effects
 * Premium animated background for hero section
 */

class CanvasEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.waves = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;

        this.colors = {
            primary: 'rgba(2, 79, 79, 0.4)',
            secondary: 'rgba(0, 191, 255, 0.3)',
            accent: 'rgba(255, 107, 53, 0.2)',
            light: 'rgba(255, 255, 255, 0.5)'
        };

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.createWaves();
        this.addEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        // Handle mobile touch
        this.canvas.addEventListener('touchmove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.touches[0].clientX - rect.left;
            this.mouseY = e.touches[0].clientY - rect.top;
        });
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 60;

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    createWaves() {
        this.waves = [
            {
                y: this.canvas.height * 0.3,
                length: 0.01,
                amplitude: 50,
                frequency: 0.004,
                color: this.colors.primary
            },
            {
                y: this.canvas.height * 0.5,
                length: 0.015,
                amplitude: 70,
                frequency: 0.006,
                color: this.colors.secondary
            },
            {
                y: this.canvas.height * 0.7,
                length: 0.02,
                amplitude: 40,
                frequency: 0.008,
                color: this.colors.accent
            }
        ];
    }

    getRandomColor() {
        const colors = [
            this.colors.primary,
            this.colors.secondary,
            this.colors.accent,
            this.colors.light
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                particle.x -= dx * force * 0.03;
                particle.y -= dy * force * 0.03;
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (120 - distance) / 120 * 0.2;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        this.ctx.globalAlpha = 1;
    }

    drawWaves(timestamp) {
        this.waves.forEach(wave => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, wave.y);

            for (let x = 0; x < this.canvas.width; x++) {
                const y = wave.y + Math.sin(x * wave.length + timestamp * wave.frequency) * wave.amplitude;
                this.ctx.lineTo(x, y);
            }

            this.ctx.strokeStyle = wave.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }

    drawGradientOrbs(timestamp) {
        const orbs = [
            {
                x: this.canvas.width * 0.2,
                y: this.canvas.height * 0.3,
                radius: 200,
                color1: 'rgba(0, 191, 255, 0.15)',
                color2: 'rgba(0, 191, 255, 0)',
                speed: 0.0004
            },
            {
                x: this.canvas.width * 0.8,
                y: this.canvas.height * 0.7,
                radius: 250,
                color1: 'rgba(2, 79, 79, 0.2)',
                color2: 'rgba(2, 79, 79, 0)',
                speed: 0.0006
            },
            {
                x: this.canvas.width * 0.5,
                y: this.canvas.height * 0.5,
                radius: 180,
                color1: 'rgba(255, 107, 53, 0.1)',
                color2: 'rgba(255, 107, 53, 0)',
                speed: 0.0008
            }
        ];

        orbs.forEach(orb => {
            const offsetX = Math.sin(timestamp * orb.speed) * 50;
            const offsetY = Math.cos(timestamp * orb.speed) * 50;

            const gradient = this.ctx.createRadialGradient(
                orb.x + offsetX,
                orb.y + offsetY,
                0,
                orb.x + offsetX,
                orb.y + offsetY,
                orb.radius
            );

            gradient.addColorStop(0, orb.color1);
            gradient.addColorStop(1, orb.color2);

            this.ctx.beginPath();
            this.ctx.arc(orb.x + offsetX, orb.y + offsetY, orb.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }

    drawGeometricShapes(timestamp) {
        const shapes = [
            {
                x: this.canvas.width * 0.15,
                y: this.canvas.height * 0.2,
                size: 60,
                rotation: timestamp * 0.0002,
                color: 'rgba(0, 191, 255, 0.1)'
            },
            {
                x: this.canvas.width * 0.85,
                y: this.canvas.height * 0.8,
                size: 80,
                rotation: -timestamp * 0.0003,
                color: 'rgba(2, 79, 79, 0.15)'
            }
        ];

        shapes.forEach(shape => {
            this.ctx.save();
            this.ctx.translate(shape.x, shape.y);
            this.ctx.rotate(shape.rotation);

            // Draw square
            this.ctx.strokeStyle = shape.color;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);

            // Draw inner circle
            this.ctx.beginPath();
            this.ctx.arc(0, 0, shape.size / 3, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.restore();
        });
    }

    animate(timestamp = 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw layers
        this.drawGradientOrbs(timestamp);
        this.drawWaves(timestamp);
        this.drawGeometricShapes(timestamp);
        this.drawParticles();

        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', () => this.resize());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const heroCanvas = new CanvasEffect('hero-canvas');
});
