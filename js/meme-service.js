var gCanvas;
var gCtx;
var gFontSize = 40;
var gY = 60
var gX;
const keySavedMemes = 'savedMemes'
var gSavedMemes = getSavedMemes()


function getSavedMemes(){
   var savedMemes =  loadFromStorage(keySavedMemes)
   if(!savedMemes || !savedMemes.length) savedMemes = [];
   return savedMemes;
}



function saveImg() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    saveImgUrl(imgContent)
}

function saveImgUrl(url) {
    var lastImage = gSavedMemes[gSavedMemes.length - 1];
    var newId = (lastImage) ? lastImage.id + 1 : 0;
    gSavedMemes.push({ id: newId, url, obj: getGmeme() })

    saveToStorage(keySavedMemes, gSavedMemes)
}

function changeGmeme(value){
    return gMeme = value

}




var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'i never eat falafel',
            size: 40,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: gY,
            lineWidth: 0,
            lineHeight: 0,
            x: gX

        }
    ]
}
var gImgs = [
    { id: 1, url: `simgs/1.jpg`, keywords: ['happy', 'trump'] },
    { id: 2, url: `simgs/2.jpg`, keywords: ['dogs'] },
    { id: 3, url: `simgs/3.jpg`, keywords: ['dogs', 'baby'] },
    { id: 4, url: `simgs/4.jpg`, keywords: ['cat'] },
    { id: 5, url: `simgs/5.jpg`, keywords: ['baby', 'win'] },
    { id: 6, url: `simgs/6.jpg`, keywords: ['man'] },
    { id: 7, url: `simgs/7.jpg`, keywords: ['baby', 'eyes'] },
    { id: 8, url: `simgs/8.jpg`, keywords: ['wizard'] },
    { id: 9, url: `simgs/9.jpg`, keywords: ['baby', 'win', 'lol'] },
    { id: 10, url: `simgs/10.jpg`, keywords: ['obama', 'president'] },
    { id: 11, url: `simgs/11.jpg`, keywords: ['fight', 'kiss'] },
    { id: 12, url: `simgs/12.jpg`, keywords: ['tzadik', 'echt'] },
    { id: 13, url: `simgs/13.jpg`, keywords: ['dicaprio'] },
    { id: 14, url: `simgs/14.jpg`, keywords: ['mad'] },
    { id: 15, url: `simgs/15.jpg`, keywords: ['great'] },
    { id: 16, url: `simgs/16.jpg`, keywords: ['lol', 'rofl'] },
    { id: 17, url: `simgs/17.jpg`, keywords: ['putin', 'president'] },
    { id: 18, url: `simgs/18.jpg`, keywords: ['toys'] }
];



var gArrowAble = false;



function getGrow() {
    return gArrowAble
}



function init() {
}

function getImgs() {
    return gImgs
}



function getCanvas(canvas, ctx) {
    gCanvas = canvas
    gCtx = ctx
    gX = gCanvas.width / 2
    gMeme.lines[gMeme.selectedLineIdx].x = gX

}



function drawImg(id) {
    var img = new Image()
    img.src = `./simgs/${id}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
    }
    return gMeme.selectedImgId = id
}

function drawSavedImg(url) {
    var img = new Image()
    img.src = `${url}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
    }
}




function pushAnotherLine(line) {
    if (line.length) {
        gMeme.selectedLineIdx = gMeme.lines.length
        // gMeme.selectedLineIdx = 
        gY += 50
        gMeme.lines.push({
            txt: `Enter Text`,
            size: 40,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            y: gY,
            x: gX
        })
    }
}


function searchMemes(searchVal) {
    var imgs = gImgs
    var collectImgs = imgs.filter(img => {
return img.keywords.some(keyword => keyword.includes(searchVal))
    })
    console.log('imgs found:' , collectImgs)
    renderGallery(collectImgs)
}

function addLetter(text) {
    if (gMeme.selectedLineIdx < 0) return;
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}


function resizeCanvasService(elContainer) {
    gCanvas.width = 500;
    gCanvas.height = 500
}

function changeFontSize(boolean) {
    if (gMeme.selectedLineIdx < 0) return;

    (boolean) ? gMeme.lines[gMeme.selectedLineIdx].size++ : gMeme.lines[gMeme.selectedLineIdx].size--;
    renderCanvas()

}

function setArrowAble() {
    (gArrowAble) ? gArrowAble = false : gArrowAble = true
    console.log(gArrowAble)
}


function move(way) {
    if (way === 'up') gMeme.lines[gMeme.selectedLineIdx].y -= 3
    else if (way === 'down') gMeme.lines[gMeme.selectedLineIdx].y += 3
    else if (way === 'left') gMeme.lines[gMeme.selectedLineIdx].x -= 3
    else if (way === 'right') gMeme.lines[gMeme.selectedLineIdx].x += 3
    renderCanvas()
}



function getGmeme() {
    return gMeme
}



function changeLine() {

    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = gMeme.lines.length - 1
    else gMeme.selectedLineIdx--
    console.log(gMeme.selectedLineIdx);
}


function removeLine() {
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--

}

function changeAlign(align) {
    if (gMeme.selectedLineIdx < 0) return;
    if (align === 'center') gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    else if (align === 'left') gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    else if (align === 'right') gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}


function changeColorTo(theColor) {
    if (gMeme.selectedLineIdx < 0) return;

    gMeme.lines[gMeme.selectedLineIdx].color = `${theColor}`

}

function changeStrokeColorTo(theColor) {
    if (gMeme.selectedLineIdx < 0) return;
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = `${theColor}`


}


function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}



function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    console.log('data', data)
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

