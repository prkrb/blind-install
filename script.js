// Show/hide service-specific fields based on service type selection
document.getElementById('serviceType').addEventListener('change', function() {
    const serviceType = this.value;
    
    // Hide all service fields
    document.getElementById('cleaningFields').style.display = 'none';
    document.getElementById('repairFields').style.display = 'none';
    document.getElementById('cutdownFields').style.display = 'none';
    document.getElementById('installationFields').style.display = 'none';
    
    // Show relevant fields based on service type
    if (serviceType === 'cleaning') {
        document.getElementById('cleaningFields').style.display = 'block';
        document.getElementById('blindType').required = true;
        document.getElementById('totalFeet').required = true;
    } else if (serviceType === 'repair') {
        document.getElementById('repairFields').style.display = 'block';
        document.getElementById('numRepairs').required = true;
    } else if (serviceType === 'cutdown') {
        document.getElementById('cutdownFields').style.display = 'block';
        document.getElementById('numCutdowns').required = true;
    } else if (serviceType === 'installation') {
        document.getElementById('installationFields').style.display = 'block';
        document.getElementById('numWindows').required = true;
    }
    
    // Remove required from hidden fields
    document.getElementById('blindType').required = serviceType === 'cleaning';
    document.getElementById('totalFeet').required = serviceType === 'cleaning';
    document.getElementById('numRepairs').required = serviceType === 'repair';
    document.getElementById('numCutdowns').required = serviceType === 'cutdown';
    document.getElementById('numWindows').required = serviceType === 'installation';
});

// Quote Calculator
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateQuote();
});

function calculateQuote() {
    const serviceType = document.getElementById('serviceType').value;
    const quoteDetails = document.getElementById('quoteDetails');
    
    let totalPrice = 0;
    let html = '';
    
    if (serviceType === 'cleaning') {
        // Ultrasonic Cleaning pricing
        const blindType = document.getElementById('blindType').value;
        const totalFeet = parseFloat(document.getElementById('totalFeet').value) || 0;
        
        // Pricing per foot based on blind type
        const pricePerFoot = {
            'vinyl': 7,
            'wood': 10,
            'aluminum': 7,
            'fabric': 8
        };
        
        const pricePerFootValue = pricePerFoot[blindType] || 7;
        totalPrice = totalFeet * pricePerFootValue;
        
        const blindTypeNames = {
            'vinyl': 'Vinyl / Faux Wood',
            'wood': 'Authentic Wood',
            'aluminum': 'Mini / 1" / 2" Aluminum',
            'fabric': 'Fabric Shades (Honeycomb / Silhouette)'
        };
        
        html = `
            <div class="quote-line">
                <span>Service:</span>
                <span>Ultrasonic Cleaning</span>
            </div>
            <div class="quote-line">
                <span>Blind Type:</span>
                <span>${blindTypeNames[blindType] || 'N/A'}</span>
            </div>
            <div class="quote-line">
                <span>Total Feet (diagonal):</span>
                <span>${totalFeet.toFixed(1)} ft</span>
            </div>
            <div class="quote-line">
                <span>Price per Foot:</span>
                <span>$${pricePerFootValue.toFixed(2)}</span>
            </div>
            <div class="quote-line total">
                <span>Estimated Total:</span>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
        `;
        
    } else if (serviceType === 'repair') {
        // Mobile Repairs pricing
        const numRepairs = parseInt(document.getElementById('numRepairs').value) || 0;
        
        if (numRepairs === 0) {
            alert('Please enter the number of repairs needed.');
            return;
        }
        
        const firstRepair = 149;
        const additionalRepairs = numRepairs > 1 ? (numRepairs - 1) * 75 : 0;
        totalPrice = firstRepair + additionalRepairs;
        
        html = `
            <div class="quote-line">
                <span>Service:</span>
                <span>Mobile Repairs</span>
            </div>
            <div class="quote-line">
                <span>Number of Repairs:</span>
                <span>${numRepairs}</span>
            </div>
            <div class="quote-line">
                <span>First Repair:</span>
                <span>$${firstRepair.toFixed(2)}</span>
            </div>
            ${numRepairs > 1 ? `
            <div class="quote-line">
                <span>Additional Repairs (${numRepairs - 1} × $75):</span>
                <span>$${additionalRepairs.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="quote-line">
                <span>Includes:</span>
                <span>Full inspection of every blind</span>
            </div>
            <div class="quote-line total">
                <span>Estimated Total:</span>
                <span>$${totalPrice.toFixed(2)}</span>
            </div>
        `;
        
    } else if (serviceType === 'cutdown') {
        // Mobile Cutdowns pricing
        const numCutdowns = parseInt(document.getElementById('numCutdowns').value) || 0;
        
        if (numCutdowns === 0) {
            alert('Please enter the number of blinds.');
            return;
        }
        
        const pricePerBlind = 149;
        totalPrice = numCutdowns * pricePerBlind;
        
        html = `
            <div class="quote-line">
                <span>Service:</span>
                <span>Mobile Cutdowns</span>
            </div>
            <div class="quote-line">
                <span>Number of Blinds:</span>
                <span>${numCutdowns}</span>
            </div>
            <div class="quote-line">
                <span>Price per Blind (includes installation):</span>
                <span>$${pricePerBlind.toFixed(2)}</span>
            </div>
            <div class="quote-line">
                <span>Note:</span>
                <span>Starting price, may vary based on blind type</span>
            </div>
            <div class="quote-line total">
                <span>Estimated Total:</span>
                <span>$${totalPrice.toFixed(2)}+</span>
            </div>
        `;
        
    } else if (serviceType === 'installation') {
        // Installation - contact for quote
        html = `
            <div class="quote-line">
                <span>Service:</span>
                <span>Blind Installation</span>
            </div>
            <div class="quote-line">
                <span>Status:</span>
                <span>Custom Quote Required</span>
            </div>
            <div class="quote-line">
                <span style="color: #3498db; font-weight: 600;">We'll contact you with a tailored quote based on your specific needs.</span>
            </div>
        `;
        
        // Still show the form submission was successful
        document.getElementById('quoteResult').style.display = 'block';
        document.getElementById('quoteForm').style.display = 'none';
        quoteDetails.innerHTML = html;
        document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
    }
    
    // Display results
    quoteDetails.innerHTML = html;
    document.getElementById('quoteResult').style.display = 'block';
    document.getElementById('quoteForm').style.display = 'none';
    
    // Scroll to result
    document.getElementById('quoteResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetQuote() {
    document.getElementById('quoteForm').reset();
    document.getElementById('quoteResult').style.display = 'none';
    document.getElementById('quoteForm').style.display = 'flex';
    
    // Hide all service fields
    document.getElementById('cleaningFields').style.display = 'none';
    document.getElementById('repairFields').style.display = 'none';
    document.getElementById('cutdownFields').style.display = 'none';
    document.getElementById('installationFields').style.display = 'none';
    
    // Remove required attributes
    document.getElementById('blindType').required = false;
    document.getElementById('totalFeet').required = false;
    document.getElementById('numRepairs').required = false;
    document.getElementById('numCutdowns').required = false;
    document.getElementById('numWindows').required = false;
    
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
