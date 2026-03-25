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
        // Initialize core engine state first
        this.bins = 100;
        this.data = new Array(this.bins).fill(0);
        this.samples = [];
        this.isRunning = true;
        this.simSpeed = 5;
        this.batchSize = 10;

        // Now safe to handle resize (and draw)
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        
        this.setupUI();
        this.runSimulation();
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
            this.resetData();
        });

        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            this.resetData();
        });
    }

    resetData() {
        this.data.fill(0);
        this.samples = [];
        this.ctx.clearRect(0, 0, this.width, this.height);
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
        this.drawHistogram(); // Redraw static data on resize
    }

    runSimulation() {
        if (!this.isRunning) return;

        // Process a number of batches per frame based on speed
        for (let i = 0; i < this.simSpeed; i++) {
            let sum = 0;
            // Central limit theorem core: averaging random variables
            for (let j = 0; j < this.batchSize; j++) {
                sum += Math.random();
            }
            const average = sum / this.batchSize;
            
            // Map average to a bin index
            const binIndex = Math.floor(average * this.bins);
            if (binIndex >= 0 && binIndex < this.bins) {
                this.data[binIndex]++;
                this.samples.push(average);
            }
        }

        this.drawHistogram();
        requestAnimationFrame(() => this.runSimulation());
    }

    drawHistogram() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const binWidth = this.width / this.bins;
        const maxVal = Math.max(...this.data) || 1;
        const padding = 20;

        this.ctx.fillStyle = 'rgba(98, 0, 238, 0.8)'; // Primary color for bars

        this.data.forEach((val, i) => {
            if (val === 0) return;
            const h = (val / maxVal) * (this.height - 2 * padding);
            const x = i * binWidth;
            const y = this.height - padding - h;

            this.ctx.fillRect(x, y, binWidth - 1, h);
        });
    }
}

// Kick off once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    new StatVis();
});
