// Global Variables for Sliders
let lightSlider;
let densitySlider;
let integrationSlider;

// Canvas Dimensions
const CANVAS_SIZE = 600;

function setup() {
    // Create the canvas and place it within the designated HTML container
    let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent('canvas-container');

    // --- 1. Light Ratio Slider (Ego Visibility) ---
    // Range: 0 (Hidden/Suppressed) to 255 (Max Visibility)
    // Default: 150 (Moderate Visibility)
    lightSlider = createSlider(0, 255, 150, 1); 
    lightSlider.parent('light-slider-container');
    lightSlider.class('visualization-slider'); // Custom class for CSS

    // --- 2. Shadow Density Slider (Repression Level) ---
    // Range: 0 (Integrated/No Blur) to 50 (Max Diffusion/Repression)
    // Default: 35 (Substantial, diffuse shadow)
    densitySlider = createSlider(0, 50, 35, 1);
    densitySlider.parent('density-slider-container');
    densitySlider.class('visualization-slider');

    // --- 3. Integration Torsion Slider (Tension/Assimilation) ---
    // Range: -10 (Confrontation/Torsion left) to 10 (Avoidance/Torsion right)
    // Default: 0 (Balance)
    integrationSlider = createSlider(-10, 10, 0, 0.1); // Step size 0.1 for smooth movement [span_24](start_span)[span_24](end_span)
    integrationSlider.parent('integration-slider-container');
    integrationSlider.class('visualization-slider');
    
    // Set color mode to HSB for easier control over saturation/brightness
    colorMode(HSB, 360, 100, 100, 1);
    noStroke();
}

function draw() {
    // 1. Clear the canvas
    background(10, 0, 5); // Very dark, near-black background

    // 2. Read current slider values
    const lightRatio = lightSlider.value();
    const shadowDensity = densitySlider.value();
    const torsion = integrationSlider.value();

    // 3. Dynamic Calculation: Mapping and Non-Linear Scaling

    // A. Light Self Visibility (directly mapped to Alpha/Brightness)
    const egoBrightness = map(lightRatio, 0, 255, 10, 100); 
    const egoAlpha = map(lightRatio, 0, 255, 0.1, 1.0); 

    // B. Shadow Blur (Repression Level)
    // Psychological phenomena often exhibit threshold effects. We use a power function 
    // to ensure the shadow blur effect scales non-linearly. The blur remains subtle 
    // at low repression levels, but increases exponentially once the density crosses 
    // a certain psychological threshold (e.g., above 30). This models the sudden 
    // realization or confrontation of repressed material.
    const mappedBlur = pow(shadowDensity / 50, 2) * 50; 

    // C. Angular Torsion (Integration Tension)
    // Map the torsion value to a slight offset in the drawing components.
    // Torsion is used to control the displacement of the two core forms (Light and Dark).
    const xOffset = torsion;
    const yOffset = torsion * -0.5; // Slight vertical offset to emphasize strain

    // --- 4. Configure Shadow Context (The Shadow is applied to the LIGHT shape) ---
    
    // Direct access to the native Canvas 2D API for specialized shadow control [span_4](start_span)[span_4](end_span)
    drawingContext.shadowBlur = mappedBlur;
    
    // The shadow color should be dark and saturated to represent dense, repressed energy.
    // Mapping shadow density to saturation ensures that higher density creates a 'heavier' shadow.
    const shadowSaturation = map(shadowDensity, 0, 50, 10, 80); 
    const shadowColor = color(0, shadowSaturation, 10, 0.8); // Dark, desaturated color
    drawingContext.shadowColor = shadowColor.toString();

    // The Shadow is a projection. We can link its offset to mouse position or a small oscillation.
    // Use a fixed, subtle offset linked to the torsion for symbolic projection strain:
    drawingContext.shadowOffsetX = 5 + xOffset;
    drawingContext.shadowOffsetY = 5 + yOffset;
    
    // --- 5. Draw the Archetypal Locus ---

    push();
    translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    
    // --- Draw 1: The Dark Self (The Locus for the Shadow Effect) ---
    // This shape is primarily dark and serves as the source object for the generated shadow.
    // Its opacity is inversely related to the Light Ratio.
    const darkAlpha = 1.0 - egoAlpha;
    fill(0, 0, 20, darkAlpha); 
    
    // Apply torsion to the Dark Self position
    ellipse(xOffset * -10, yOffset * 10, CANVAS_SIZE * 0.4, CANVAS_SIZE * 0.4); 

    // The drawingContext shadow is now cast onto the canvas, defining the PSYCHOLOGICAL SHADOW boundary.
    
    // --- 6. Reset Shadow Context ---
    // This critical step disables the specialized shadow effect after the Dark Self is drawn, 
    // preventing the Light Self or background elements from inheriting the blurring.[span_5](start_span)[span_5](end_span)
    drawingContext.shadowBlur = 0;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowColor = 'rgba(0,0,0,0)';


    // --- Draw 2: The Light Self (Ego Component) ---
    // Highly visible, central form.
    
    // Use a bright, contrasting color (e.g., Gold/Yellow) for the Ego.
    fill(40, 70, egoBrightness, egoAlpha); 
    
    // Apply inverse torsion to the Light Self position
    ellipse(xOffset * 10, yOffset * -10, CANVAS_SIZE * 0.35, CANVAS_SIZE * 0.35); 
    
    pop();

    // 7. Optional: Display current values for verification/analysis
    textSize(14);
    fill(200);
    text(`Light Ratio (Ego Visibility): ${lightRatio}`, -290, -260);
    text(`Shadow Density (Blur): ${mappedBlur.toFixed(2)}`, -290, -240);
    text(`Torsion (Offset): ${torsion.toFixed(1)}`, -290, -220);
}
