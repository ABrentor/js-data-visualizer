/**
 * StatVis - Milestone 2
 * Core engine: Canvas scaling and high-frequency test loops.
 */

class StatVis {
    constructor() {
        console.log("StatVis Milestone 2: Scaling canvas and testing drawing loops...");
        this.canvas = document.getElementById('vizCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Let's make sure the canvas matches the window size properly
        this.init();
    }

    init() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        // Start a basic "noise" loop to test the canvas
        // (Will wire up the actual distributions later)
        this.simSpeed = 5;
        this.batchSize = 10;
        this.setupUI();
        this.drawTest();
    }

    setupUI() {
        const speedSlider = document.getElementById('speedSlider');
        const speedVal = document.getElementById('speedVal');

        speedSlider.addEventListener('input', (e) => {
            this.simSpeed = parseInt(e.target.value);
            speedVal.textContent = this.simSpeed;
        });

        const batchSlider = document.getElementById('batchSlider');
        const batchVal = document.getElementById('batchVal');
        batchSlider.addEventListener('input', (e) => {
            this.batchSize = parseInt(e.target.value);
            batchVal.textContent = this.batchSize;
        });

        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
        });
    }

    handleResize() {
        // Human note: Need to account for high-DPI displays (Retina)
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.parentElement.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);

        this.width = rect.width;
        this.height = rect.height;
    }

    drawTest() {
        // Just drawing some random dots today to see it working
        // We'll replace this with the distribution logic later.
        this.ctx.fillStyle = 'rgba(98, 0, 238, 0.5)'; // Using our --primary color

        const loop = () => {
            // Draw more dots if sim speed is higher to test UI interaction
            for (let i = 0; i < this.simSpeed; i++) {
                const x = Math.random() * this.width;
                const y = Math.random() * this.height;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            requestAnimationFrame(loop);
        };
        loop();
    }
}

// Kick off once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    new StatVis();
});
