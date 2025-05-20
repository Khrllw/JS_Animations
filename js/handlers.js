const elements = {
    showScroll: document.getElementById('showScroll'),
    mouseMove: document.getElementById('mouseMove'),
    mousePointer: document.getElementById('mousePointer'),
    texts: {
        red: document.getElementById('redText'),
        green: document.getElementById('greenText'),
        blue: document.getElementById('blueText'),
        redSub: document.getElementById('redSubText'),
        greenSub: document.getElementById('greenSubText'),
        blueSub: document.getElementById('blueSubText')
    },
    menuItems: [document.getElementById('menuItem_0'), document.getElementById('menuItem_1'), document.getElementById('menuItem_2')],
    foneItem: document.getElementById('foneItem'),
    progressLine: document.getElementById('progressLine')
};

let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime < 16) return; // ~60fps
    lastScrollTime = now;

    const scrollY = Math.min(screenHeight * 2, window.scrollY);
    elements.showScroll.textContent = `From the top: ${Math.round(scrollY)} px`;

    moveText(scrollY);
    highlightItems(scrollY / screenHeight);
});

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    requestAnimationFrame(updateMousePosition);
});

function updateMousePosition() {
    elements.mouseMove.textContent = `Your mouse: ${mouseX}:${mouseY} px`;

    const pointerOffset = cursorCenter * screenHeight;
    elements.mousePointer.style.left = `${mouseX - pointerOffset}px`;
    elements.mousePointer.style.top = `${mouseY - pointerOffset}px`;

    const transformRGB = `translate(-${mouseX * itemsRGBSens / screenWidth}px, -${mouseY * itemsRGBSens / screenHeight}px)`;
    const transformMain = `translate(-${mouseX * itemsMainSense / screenWidth}px, -${mouseY * itemsMainSense / screenHeight}px)`;

    document.querySelectorAll('.rgb-code').forEach(el => el.style.transform = transformRGB);
    document.querySelectorAll('.main-text').forEach(el => el.style.transform = transformMain);
}

function moveText(y_pos) {
    const y1 = y_pos - screenHeight;
    const y2 = y_pos - screenHeight * 2;
    const ratioPos = y_pos * screenRatio;

    elements.texts.red.style.left = `${y_pos}px`;
    elements.texts.green.style.left = `${y1 * screenRatio}px`;
    elements.texts.blue.style.left = `${y2 * screenRatio}px`;
    elements.texts.redSub.style.left = `-${y_pos}px`;
    elements.texts.greenSub.style.left = `-${y1 * screenRatio}px`;
    elements.texts.blueSub.style.left = `-${y2 * screenRatio}px`;
}

function highlightItems(y_pos) {
    const value = y_pos > mainAnimationPoints[1] ? 2 : y_pos > mainAnimationPoints[0] ? 1 : 0;

    if (value !== menuActivePoint) {
        const color = mainColors[value];

        elements.menuItems[menuActivePoint].classList.remove('active');
        elements.menuItems[menuActivePoint].style.color = defaultColor;

        elements.menuItems[value].classList.add('active');
        elements.menuItems[value].style.color = color;

        elements.mousePointer.style.backgroundColor = color;
        elements.foneItem.style.backgroundColor = color;
        elements.progressLine.style.backgroundColor = color;

        menuActivePoint = value;
    }
}