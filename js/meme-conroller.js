'use strict'
var gIsLinePressed = false;

function onInit() {
    var canvas = document.querySelector('#my-canvas')
    var ctx = canvas.getContext('2d')
    getCanvas(canvas, ctx)
    resizeCanvas()
    renderGallery()
    init()
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    resizeCanvasService(elContainer)

}

function onSubmitLine() {
    var line = document.querySelector('#text').value
    pushAnotherLine(line)
    renderCanvas()
    document.querySelector('#text').value = '';


}

function onAddTextLetter() {
    var text = document.querySelector('#text').value;
    addLetter(text)
    renderCanvas()
}

function onSaveImg() {
    saveImg()
    alert('image saved')
}



function renderGallery(imgs = getImgs()) {
    var gallery = document.querySelector('.gallery')
    var strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img class="meme" src="simgs/${img.id}.jpg" alt="no photo" id="${img.id}" onclick="onClickMeme(this)">`
    })
    gallery.innerHTML = strHTML

}


function renderSavedMemes(imgs = getSavedMemes()) {
    var gallery = document.querySelector('.saved-memes-gallery')
    var strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img class="meme" src="${img.url}" alt="no photo" id="${img.id}" onclick="onClickMemeSaved(${img.id})">`
    })
    gallery.innerHTML = strHTML

}


function onClickMeme(el) {

    const home = document.querySelector('.home')
    const editor = document.querySelector('.editor')
    const savedMemesPage = document.querySelector('.saved-memes-gallery')
    var id = el.id;
    savedMemesPage.style.display = 'none'
    home.style.display = 'none';
    editor.style.display = 'flex';
    drawImg(id)

}
function onClickMemeSaved(id) {

    var savedMemes = getSavedMemes()
    var saveId = savedMemes.find(meme => {
        return meme.id === id
    })
    // gMeme = saveId.obj
    changeGmeme(saveId.obj)
    const home = document.querySelector('.home')
    const editor = document.querySelector('.editor')
    const savedMemesPage = document.querySelector('.saved-memes-gallery')
    savedMemesPage.style.display = 'none'
    home.style.display = 'none';
    editor.style.display = 'flex';
    renderCanvas()

}

function onArrowAble() {
    var elArrowIcon = document.querySelector('.up-down')
    var growAble = getGrow()
    elArrowIcon.style.border = (growAble) ? '0px solid black' : '2px solid black'
    console.log(elArrowIcon)
    setArrowAble()
}


document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38:
            if (gArrowAble) {
                move('up')

            }
            break;
        case 40:
            if (gArrowAble) {
                move('down')
            }
            break;
        case 37:
            if (gArrowAble) {
                move('left')
            }
            break;
        case 39:
            if (gArrowAble) {
                move('right')
            }
            break;


    }
};




function renderCanvas(x = 50, y = 50) {
    let memes = getGmeme()
    var img = new Image()
    img.src = `./simgs/${memes.selectedImgId}.jpg`
    gCtx.drawImage(img, 0, 0)
    gX = gCanvas.width / 2
    img.onload = () => {
        memes.lines.forEach(line => {
            gCtx.lineWidth = '2'
            gCtx.strokeStyle = `${line.strokeColor}`
            gCtx.fillStyle = `${line.color}`
            gCtx.font = `${line.size}px IMPACT`
            gCtx.textAlign = `${line.align}`
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)
            var width = gCtx.measureText(line.txt).width
            if (memes.selectedLineIdx < 0) return;
            line.lineWidth = width;
            var height = gCtx.measureText(line.txt).actualBoundingBoxAscent
            line.lineHeight = height;
        });
        markLine()
    }
}


function markLine() {
    var gMeme = getGmeme()
    if (gMeme.selectedLineIdx < 0) return
    var canvas = document.querySelector('#my-canvas')
    var ctx = canvas.getContext('2d')
    ctx.beginPath();
    let currLine = gMeme.lines[gMeme.selectedLineIdx];
    ctx.rect(currLine.x - 10 - (currLine.lineWidth / 2), currLine.y - currLine.lineHeight - 10, currLine.lineWidth + 20, currLine.lineHeight + 20);
    ctx.stroke()
    console.log(gMeme.lines[gMeme.selectedLineIdx].lineWidth)

}


function onSwtichLine() {
    changeLine()
    renderCanvas()

}

function onRemoveLine() {
    removeLine()
    renderCanvas()

}

function onChangeAlign(align) {
    switch (align) {
        //canvas have mirror effect
        case 'left':
            changeAlign('right')
            renderCanvas()

            break;
        case 'center':
            changeAlign('center')
            renderCanvas()

            break;
        //canvas have mirror effect
        case 'right':
            changeAlign('left')
            renderCanvas()
            break;
    }
}




function backToGallery() {
    const home = document.querySelector('.home')
    const editor = document.querySelector('.editor')
    const savedMemesPage = document.querySelector('.saved-memes-gallery')
    savedMemesPage.style.display = 'none'
    editor.style.display = 'none'
    home.style.display = 'flex'
}


function onChooseColor() {
    var colorSelect = document.querySelector('#textColor');
    colorSelect.click()
}

function onStrokeLine() {
    var colorSelect = document.querySelector('#textColorStroke');
    colorSelect.click()
}


function onChangeColor(theColor) {
    changeColorTo(theColor)
    renderCanvas()
}

function onChangeColorStroke(color) {
    changeStrokeColorTo(color)
    renderCanvas()
}


function onSearchMeme(searchVal) {
    searchMemes(searchVal)
    renderCanvas()
}




document.querySelector('#my-canvas').addEventListener('mousedown', ev => {
    var Memes = getGmeme()
    if (Memes.selectedLineIdx !== -1) {
        gIsLinePressed = true;
        console.log(gIsLinePressed);
    }
});

document.querySelector('#my-canvas').addEventListener('mousemove', e => {
    var Memes = getGmeme()
    if (!gIsLinePressed) return;
    if (Memes.selectedLineIdx !== -1) {
        Memes.lines[Memes.selectedLineIdx].x = e.offsetX
        Memes.lines[Memes.selectedLineIdx].y = e.offsetY + Memes.lines[Memes.selectedLineIdx].lineHeight / 2;
        renderCanvas();
    }
    else {
        Memes.stickers[Memes.selectedLineIdx].x = e.offsetX - Memes.stickers[Memes.selectedLineIdx].width / 2;
        Memes.stickers[Memes.selectedLineIdx].y = e.offsetY - Memes.stickers[Memes.selectedLineIdx].height / 2;
        renderCanvas();
    }

});
document.querySelector('#my-canvas').addEventListener('mouseup', e => {
    gIsLinePressed = false;
});



function onCanvasClicked(ev) {
    var lines = getGmeme().lines;
    var offsetX = ev.offsetX
    var offsetY = ev.offsetY

    var lineIdx = lines.findIndex(line => {
        return offsetX > line.x - (line.lineWidth / 2)
            && offsetX < line.x + (line.lineWidth / 2)
            && offsetY < line.y
            && offsetY > line.y - line.lineHeight
    })
    let Memes = getGmeme()
    Memes.selectedLineIdx = lineIdx;
    markLine();
    renderCanvas();
}


function goToSavedMemes() {
    const home = document.querySelector('.home')
    const editor = document.querySelector('.editor')
    const savedMemesPage = document.querySelector('.saved-memes-gallery')
    editor.style.display = 'none'
    home.style.display = 'none'
    savedMemesPage.style.display = 'flex'
    renderSavedMemes()
}