/**
 * StatVis - Day 1
 * Initial setup for the Bernoulli/Gaussian simulator.
 */

class StatVis {
    constructor() {
        console.log("StatVis Initialized. Starting with canvas setup...");
        this.canvas = document.getElementById('vizCanvas');
        this.ctx = this.canvas.getContext('2d');

        // TODO: Handle resizing and initial drawing state next week
    }
}

// Kick off once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    new StatVis();
});
