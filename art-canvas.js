class ArtCanvas extends HTMLElement {
    constructor(args) {
        super(args);
        this.canvas = null;
    }

    init(width, height) {
        this.innerHTML = '';

        // Create and add a canvas element to the page
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.appendChild(this.canvas);

        // Get the drawing context for the canvas and color it white
        this.context = this.canvas.getContext('2d');    
        this.context.fillStyle = '#FFFFFF';
        this.context.fillRect(0, 0, width, height);
    }

    drawBox(box, colors) {

        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient

        let margin = 20;
        // Coordinate origin is top left
        let coords = { 
            x0: box == 1 ? margin : this.canvas.width/2 + margin, 
            y0: margin, 
            x1: this.canvas.width/2 - (margin * 2), 
            y1: this.canvas.height - (margin * 2)
        }
        let gradient = this.context.createLinearGradient(coords.x0, coords.y0, coords.x0 + coords.x1, coords.y0);

        // Add as many evenly spaced color stops as there are colors
        let stopInterval = 1 / colors.length;console.log(stopInterval)
        let stop = 0;
        colors.forEach((color) => {
            gradient.addColorStop(stop, color);
            stop += stopInterval;
        });       

        // Set the fill style and draw a rectangle
        this.context.fillStyle = gradient;
        this.context.fillRect(coords.x0, coords.y0, coords.x1, coords.y1);
    }

    renderBox(box, palette) {
        let colors = [];

        // The palette colors here are boring
        // They should be enhanced with better colors and perhaps more of them
        switch(palette) {
            case 'Green': 
                colors = ['green', 'cyan', 'green'];
                break;
            case 'Red': 
                colors = ['red', 'pink', 'red'];
                break;
            case 'Blue': 
                colors = ['blue', 'cyan', 'blue'];
                break;
            case 'Purple': 
                colors = ['purple', 'pink', 'purple'];
                break;
            case 'Pink': 
                colors = ['pink', 'fuchsia', 'pink'];
                break;
            case 'Yellow': 
                colors = ['yellow', 'orange', 'yellow'];
                break;
        }
        this.drawBox(box, colors)
    }

    download() {
        var link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/png', 1);
        link.download = 'sample.png';
        link.click();
    }

    render(options) {
        this.init(options.width, options.height);
        this.renderBox(1, options.box1);
        this.renderBox(2, options.box2);
    }

}

// Register a new HTML element that extends from the built-in Canvas element
let customElementRegistry = window.customElements;
customElementRegistry.define('art-canvas', ArtCanvas);
