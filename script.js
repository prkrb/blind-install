// Quote Calculator
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateQuote();
});

function calculateQuote() {
    // Get form values
    const numWindows = parseInt(document.getElementById('numWindows').value);
    const blindType = document.getElementById('blindType').value;
    const windowSize = document.getElementById('windowSize').value;
    const propertyType = document.getElementById('propertyType').value;

    // Base pricing
    let basePricePerWindow = 75; // Base installation cost per window

    // Blind type adjustments
    const typeMultipliers = {
        'horizontal': 1.0,
        'vertical': 1.1,
        'roller': 0.9,
        'cellular': 1.2,
        'roman': 1.3,
        'wood': 1.4,
        'aluminum': 0.95
    };

    // Window size adjustments
    const sizeMultipliers = {
        'small': 0.8,
        'medium': 1.0,
        'large': 1.3,
        'xlarge': 1.6
    };

    // Property type adjustments
    const propertyMultipliers = {
        'residential': 1.0,
        'commercial': 1.2
    };

    // Calculate adjustments
    const typeMultiplier = typeMultipliers[blindType] || 1.0;
    const sizeMultiplier = sizeMultipliers[windowSize] || 1.0;
    const propertyMultiplier = propertyMultipliers[propertyType] || 1.0;

    // Calculate price per window
    const pricePerWindow = basePricePerWindow * typeMultiplier * sizeMultiplier * propertyMultiplier;
    
    // Calculate totals
    const baseTotal = basePricePerWindow * numWindows;
    const typeAdjustment = (pricePerWindow - basePricePerWindow) * numWindows;
    const sizeAdjustment = 0; // Already factored into pricePerWindow
    const totalPrice = pricePerWindow * numWindows;

    // Display results
    document.getElementById('basePrice').textContent = `$${basePricePerWindow.toFixed(2)}`;
    document.getElementById('quoteWindows').textContent = numWindows;
    document.getElementById('typeAdjustment').textContent = typeAdjustment >= 0 
        ? `+$${typeAdjustment.toFixed(2)}` 
        : `-$${Math.abs(typeAdjustment).toFixed(2)}`;
    
    // Calculate size adjustment separately for display
    const sizeAdjustmentValue = (basePricePerWindow * sizeMultiplier - basePricePerWindow) * numWindows;
    document.getElementById('sizeAdjustment').textContent = sizeAdjustmentValue >= 0 
        ? `+$${sizeAdjustmentValue.toFixed(2)}` 
        : `-$${Math.abs(sizeAdjustmentValue).toFixed(2)}`;
    
    document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;

    // Show result section
    document.getElementById('quoteResult').style.display = 'block';
    document.getElementById('quoteForm').style.display = 'none';

    // Scroll to result
    document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetQuote() {
    document.getElementById('quoteForm').reset();
    document.getElementById('quoteResult').style.display = 'none';
    document.getElementById('quoteForm').style.display = 'flex';
    document.getElementById('quoteForm').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
