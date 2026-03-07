/**
 * StatVis - Day 1
 * Initial setup for the Bernoulli/Gaussian simulator.
 */

class StatVis {
    constructor() {
        console.log("StatVis Day 2: Scaling canvas and testing drawing loops...");
        this.canvas = document.getElementById('vizCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Let's make sure the canvas matches the window size properly
        this.init();
    }

    init() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        
        // Start a basic "noise" loop to test the canvas
        this.drawTest();
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
            for(let i = 0; i < 5; i++) {
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
