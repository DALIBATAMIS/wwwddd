function generateRandomBlob() {
    const blob = $('<div></div>').addClass('blob');

    const size = Math.floor(Math.random() * 2) + 5;
    blob.css({
        width: `${size}ch`,
        height: `${size}ch`,
    });

    // Randomize position on the screen (within the viewport)
    const xPos = Math.floor(Math.random() * (window.innerWidth - size));
    const yPos = Math.floor(Math.random() * (window.innerHeight - size));
    blob.css({
        position: 'absolute',
        left: `${xPos}px`,
        top: `${yPos}px`,
    });

    // Randomize background color within the pink spectrum (HSL values for pinks are typically around 300-360 hue)
    const hue = Math.floor(Math.random() * 60) + 300; // Hue between 300 and 360
    const saturation = Math.floor(Math.random() * 40) + 60; // 60% to 100% saturation
    const lightness = Math.floor(Math.random() * 40) + 50; // 50% to 90% lightness
    blob.css('background-color', `hsl(${hue}, ${saturation}%, ${lightness}%)`);

    blob.css('opacity', '0.3');

    // Apply a random box shadow for some depth
    const shadowX = Math.floor(Math.random() * 20) - 10; // Random offset for x (-10 to 10)
    const shadowY = Math.floor(Math.random() * 20) - 10; // Random offset for y (-10 to 10)
    const shadowBlur = Math.floor(Math.random() * 30) + 10; // Random blur (10 to 40px)
    const shadowColor = `rgba(0, 0, 0, ${Math.random().toFixed(2)})`;
    blob.css('box-shadow', `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`);

    // Create a unique animation for each blob
    const animationName = `blobby-${Math.random().toString(36).substring(7)}`;

    const keyframes = `
    @keyframes ${animationName} {
      0% {
        border-radius: 50%;
      }
      20% {
        border-radius: ${randomBorderRadius()};
        transform: rotate(${Math.random() * 360}deg);
      }
      40% {
        border-radius: ${randomBorderRadius()};
        transform: rotate(${Math.random() * 360}deg);
      }
      80% {
        border-radius: ${randomBorderRadius()};
        transform: rotate(${Math.random() * 360}deg);
      }
      100% {
        border-radius: ${randomBorderRadius()};
        transform: rotate(${Math.random() * 360}deg);
      }
    }
  `;

    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    blob.css('animation', `${animationName} 7s ease infinite alternate`);

    $('body').append(blob);
}

function generateMultipleBlobs(count = 10) {
    for (let i = 0; i < count; i++) {
        generateRandomBlob();
    }
}

function randomBorderRadius() {
    return `${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}% / ${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}%`;
}

function resizeText() {
    const textElement = $('.thetext')[0];
    const textCharCount = textElement.innerText;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const chSize = getChSizeInPixels();

    console.log(`${chSize}`)
    
    const fontSize = Math.min(width, height) * 0.1 / chSize;
    textElement.style.fontSize = fontSize + 'px';
}

window.addEventListener('load', resizeText);
window.addEventListener('resize', resizeText);

function getChSizeInPixels() {
    // Create a temporary element
    const element = document.createElement('div');
    element.style.width = '1ch'; // Set width to 1ch
    element.style.height = '1ch'; // Set width to 1ch
    element.style.position = 'absolute'; // Avoid affecting page layout
    element.style.visibility = 'hidden'; // Make it invisible
    document.body.appendChild(element);
    
    // Get the computed width of the element
    const chSizeWidth = element.getBoundingClientRect().width;
    const chSizeHeight = element.getBoundingClientRect().height;
    
    // Remove the temporary element
    document.body.removeChild(element);
    
    return Math.max(Math.min(chSizeWidth, chSizeHeight), 1);
}

function addBlobs() {
    console.log(
        `height: ${document.body.clientWidth}, ch: ${getChSizeInPixels()}, ratio: ${document.body.clientWidth / getChSizeInPixels()}`
    )

    $('.blob').remove();

    generateMultipleBlobs(
        document.body.clientWidth / getChSizeInPixels() / 3
    );
}

window.addEventListener('load', addBlobs)
window.addEventListener('resize', addBlobs);