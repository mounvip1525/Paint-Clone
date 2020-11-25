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
let currentColor='#A51DAB';

isEraser=false;

const canvas=document.createElement('canvas');
canvas.id='canvas'; //jscolor is also a canvas hence need to explicitely mention the id
const context=canvas.getContext('2d');

bucketColorBtn.addEventListener('change',()=>{
    bucketColor=`#${bucketColorBtn.value}`;
    createCanvas();
});
brushColorBtn.addEventListener('change',()=>{
    isEraser=false;
    currentColor=`#${brushColorBtn.value}`;
});
eraser.addEventListener('click',()=>{
    isEraser=true;
    brushIcon.style.color='white';
    eraser.style.color='black';
    activeToolEl.textContent='Eraser';
    currentColor=bucketColor;
    currentSize=50;
});
function switchToBrush(){
    isEraser=false;
    brushIcon.style.color='black';
    eraser.style.color='white';
    activeToolEl.textContent='Brush';
    currentColor=`#${brushColorBtn.value}`;
    currentSize=10;
    brushSlider.value=10;
}
function createCanvas(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight-50;
    context.fillStyle=bucketColor;
    context.fillRect(0,0,canvas.width,canvas.height);
    body.appendChild(canvas);
}
createCanvas();
