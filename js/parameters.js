//  Screen //
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let screenRatio = screenWidth / screenHeight;

let cursorSizePersent = 10;
let cursorCenter = cursorSizePersent / 200;
document.documentElement.style.setProperty('--cursorSize', cursorSizePersent);

let foneItemSizePersent = 70;
document.documentElement.style.setProperty('--foneSize', foneItemSizePersent);

//  Animation params //
let menuActivePoint = 0;
let mainAnimationPoints = [0.7, 1.7];
let mainColors = ['#ff0000', '#7FFF00', '#0000CD'];
let defaultColor = '#000000';

let itemsRGBSens = 60;
let itemsMainSense = 20;