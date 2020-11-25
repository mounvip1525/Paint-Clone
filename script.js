const activeToolEl=document.getElementById('active-tool');
const brushIcon=document.getElementById('brush');
const brushColorBtn=document.getElementById('brush-color');
const brushSize=document.getElementById('brush-size');
const brushSlider=document.getElementById('brush-slider');

const bucketColorBtn=document.getElementById('bucket-color');
const eraser=document.getElementById('eraser');
const clearCanvasBtn=document.getElementById('clear-canvas');
const saveStorageBtn=document.getElementById('save-storage');
const loadStorageBtn=document.getElementById('load-storage');
const clearStorageBtn=document.getElementById('clear-storage');
const downloadBtn=document.getElementById('download');

const { body } = document;

let currentSize=30;
let bucketColor='#FFFFFF';
let currentColor='#3454e3';
let isEraser=false;
let isMouseDown=false;
let drawnArray=[];

const canvas=document.createElement('canvas');
canvas.id='canvas'; //jscolor is also a canvas hence need to explicitely mention the id
const context=canvas.getContext('2d');


//to select and retrieve the selected color value
bucketColorBtn.addEventListener('change',()=>{
    bucketColor=`#${bucketColorBtn.value}`;
    createCanvas();
});

//to select and retrieve the selected color value
brushColorBtn.addEventListener('change',()=>{
    isEraser=false;
    currentColor=`#${brushColorBtn.value}`;
});

//Display the brush size after retrieving the brush slider value 
function displayBrushSize(){
    brushSize.textContent = brushSlider.value < 10 ? `0${brushSlider.value}` : brushSlider.value;
}

//for retrieving the slider value ( between 1 to 50)
brushSlider.addEventListener('change',()=>{
    currentSize=brushSlider.value;
    displayBrushSize();
});

//Adding event listener to the eraser and changing the text content and other styles
eraser.addEventListener('click',()=>{
    isEraser=true;
    brushIcon.style.color='white';
    eraser.style.color='black';
    activeToolEl.textContent='Eraser';
    currentColor=bucketColor;
    currentSize=50;
});

//Switching to brush from eraser
function switchToBrush(){
    isEraser=false;
    brushIcon.style.color='black';
    eraser.style.color='white';
    activeToolEl.textContent='Brush';
    currentColor=`#${brushColorBtn.value}`;
    currentSize=10;
    brushSlider.value=10;
    displayBrushSize();
}

//creating the canvas
function createCanvas(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight-50;
    context.fillStyle=bucketColor;
    context.fillRect(0,0,canvas.width,canvas.height);
    body.appendChild(canvas);
    switchToBrush(); //Default-brush is to be selected
}

//Get the mouse positions
function getMousePosition(event){
    const boundaries=canvas.getBoundingClientRect();
    return{
        x : event.clientX - boundaries.left,
        y : event.clientY - boundaries.top,
    };
}

// get the cordinates after Mouse Down
canvas.addEventListener('mousedown',(event)=>{
    isMouseDown=true;
    const currentPosition=getMousePosition(event);
     // console.log('mouse is clicked(mousedown)', currentPosition);
    context.moveTo(currentPosition.x,currentPosition.y);
    context.beginPath();
    context.lineWidth=currentSize;
    context.lineCap='round';
    context.strokeStyle=currentColor;
});


//Drawn what is stored in drawnArray
function restoreCanvas(){
    for(let i=1;i<drawnArray.length;i++){
        context.beginPath();
        context.moveTo(drawnArray[i-1].x,drawnArray[i-1].y);
        context.lineWidth=drawnArray[i].size;
        context.lineCap='round';
        if(drawnArray[i].eraser){
            context.strokeStyle=bucketColor;
        } else {
            context.strokeStyle=drawnArray[i].color;
        }
        context.lineTo(drawnArray[i].x,drawnArray[i].y);
        context.stroke();
    }
}


//Store the drawn cordinates in the drawnArray
function storeDrawn(x,y,size,color,erase){
    const curve={
        x,y,size,color,erase,
    };
    console.log(curve);
    drawnArray.push(curve);
}
//get all the cordinates on mourse movements
canvas.addEventListener('mousemove',(event)=>{
    if(isMouseDown){
        const currentPosition=getMousePosition(event);
        // console.log('mouse is moving',currentPosition);
        context.lineTo(currentPosition.x,currentPosition.y);
        context.stroke();
        storeDrawn(currentPosition.x,currentPosition.y,currentSize,currentColor,isEraser,);
    } else {
        storeDrawn(undefined);
    }
});

//get the cordinates once mouse up
canvas.addEventListener('mouseup',(event)=>{
    isMouseDown=false;
    // console.log('mouse is unclicked');
});


createCanvas();
brushIcon.addEventListener('click',switchToBrush);
