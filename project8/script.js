
var image = encodeURIComponent(JSON.stringify("char.jpg"));
// var currentIndex = 0;
var currentIndex = 1;

let size = 5;
let sortedData = [];
class Pokeman{
  constructor(Name, Color, Type, Competitive, image, Height){
    this.Name = Name;
    this.Color = Color;
    this.Type = Type;
    this.Competitive = Competitive;
    this.image = image;
    this.Height = Height;
  }
}

const pokeman1 = new Pokeman("Char","Dragon-Colored","Hot",false,"char.jpg","5");
const pokeman2 = new Pokeman("Pikamon","Dirty Yellow","Electric",false,"Pikamon.jpg","2");
const pokeman3 = new Pokeman("SquirtDull","Murky Blue","H2O",false,"SquirtDull.jpg","4");
const pokeman4 = new Pokeman("OnionTurtle","Greenish Blue","Grass",true,"OnionTurtle.jpg","5");
const pokeman5 = new Pokeman("PunchyRock","Punchy Brown","PunchyHard",true,"PunchyRock.jpg","3000");


const poke = [pokeman1, pokeman2, pokeman3, pokeman4,pokeman5];

const pokeobj = JSON.stringify(poke);

let container = document.createElement('div');
let button = document.createElement('button');
button.innerHTML = "Click Me";
button.addEventListener("click", func);
container.append("button");
document.body.append(button);

let container2 = '';

function func() {
  removeIfExists("container2");
  if (!container2) {
    container2 = document.createElement('div');
    container2.innerHTML = " ";
    container2.append(pokeobj);
    container.append(container2);
    document.body.append(container2);
  }
}

function removeIfExists(y) {
  const x = document.getElementById(y);
  if (y) {
    y.innerHTML = '';
  }
}

// Define the arr array in the global scope
const arr = [];

function requ() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        data = JSON.parse(httpRequest.responseText);
        for (let i = 0; i < data.length; i++) {
          let temp = new Pokeman(data[i].Name, data[i].Color, data[i].Type, data[i].Competitive, data[i].image, data[i].Height);
          arr[i] = temp;
        }
        displayData(0);
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/datas.json?nextPrev=" + currentIndex, true);
  httpRequest.send();
}

function displayData(index) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        data = JSON.parse(httpRequest.responseText);
        sortedData = data;
        // alert(sortedData[0].Name);
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/sort.php" , true);
  httpRequest.send();
  
    document.getElementById('tname').value = arr[index].Name;
//   document.getElementById("name").innerHTML += x;
document.getElementById('tcolor').value = arr[index].Color;
document.getElementById('ttype').value = arr[index].Type;
document.getElementById('tcomp').value = arr[index].Competitive;
  let im = document.getElementById("Image");
  im.setAttribute('src', arr[index].image);
  document.getElementById('theight').value = arr[index].Height;
}

function next() {
  currentIndex = ((currentIndex + 1) % size);
  alert(currentIndex+1);
  const curr = JSON.stringify(currentIndex);
  document.getElementById('tname').value = sortedData[currentIndex].Name;
  document.getElementById('tcolor').value = sortedData[currentIndex].Color;
  document.getElementById('ttype').value = sortedData[currentIndex].Type;
  document.getElementById('tcomp').value = sortedData[currentIndex].Competitive;
    let im = document.getElementById("Image");
    im.setAttribute('src', sortedData[currentIndex].image);
    document.getElementById('theight').value = sortedData[currentIndex].Height;
}

function prev() {
  currentIndex = ((currentIndex - 1 + arr.length) % size);
  // if(currentIndex == 0){currentIndex = size;}
  alert(currentIndex+1);
  const curr = JSON.stringify(currentIndex);
  document.getElementById('tname').value = sortedData[currentIndex].Name;
  document.getElementById('tcolor').value = sortedData[currentIndex].Color;
  document.getElementById('ttype').value = sortedData[currentIndex].Type;
  document.getElementById('tcomp').value = sortedData[currentIndex].Competitive;
    let im = document.getElementById("Image");
    im.setAttribute('src', sortedData[currentIndex].image);
    document.getElementById('theight').value = sortedData[currentIndex].Height;
}

function edit(){
    document.getElementById('tname').readOnly = false;
    document.getElementById('tcolor').readOnly = false;
    document.getElementById('ttype').readOnly = false;
    document.getElementById('tcomp').readOnly = false;
    document.getElementById('theight').readOnly = false;
}

function database(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            if (httpRequest.status === 200){
                alert(httpRequest.responseText);
                const data = JSON.parse(httpRequest.responseText);
            }
        }
    };
    httpRequest.open('GET', "http://localhost/mysite/project8/sql.php", true);
    httpRequest.send();
}


function insert(){
  let insertPokeman = new Pokeman(document.getElementById('tname').value, document.getElementById('tcolor').value, document.getElementById('ttype').value, document.getElementById('tcomp').value, document.getElementById('timageName').value , document.getElementById('theight').value);
  let inserts = JSON.stringify(insertPokeman);
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        // data = JSON.parse(httpRequest.responseText);
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/insert.php?insertPokeman=" + inserts, true);
  httpRequest.send();
  size++;
}

function deleted(){
    currentIndex = ((currentIndex) % size);
    if(currentIndex == 0){currentIndex = size;}
    const curr = JSON.stringify(currentIndex);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            if (httpRequest.status === 200){
                alert(httpRequest.responseText);
                const data = JSON.parse(httpRequest.responseText);
            }
        }
    };
    httpRequest.open('GET', "http://localhost/mysite/project8/delete.php?nextPrev="+ curr, true);
    httpRequest.send();
    size--;
}

function sort(){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        data = JSON.parse(httpRequest.responseText);
        sortedData = data;
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/sortAlphabet.php" , true);
  httpRequest.send();
}

function defaultSort(){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        data = JSON.parse(httpRequest.responseText);
        sortedData = data;
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/sort.php" , true);
  httpRequest.send();
}

function db(){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
        data = JSON.parse(httpRequest.responseText);
        sortedData = data;
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/sql.php" , true);
  httpRequest.send();
}

function first(){
  currentIndex = 0;
  alert(currentIndex);
  const curr = JSON.stringify(currentIndex);
  document.getElementById('tname').value = sortedData[currentIndex].Name;
  document.getElementById('tcolor').value = sortedData[currentIndex].Color;
  document.getElementById('ttype').value = sortedData[currentIndex].Type;
  document.getElementById('tcomp').value = sortedData[currentIndex].Competitive;
  let im = document.getElementById("Image");
  im.setAttribute('src', sortedData[currentIndex].image);
  document.getElementById('theight').value = sortedData[currentIndex].Height;
}
function last(){
  currentIndex = size;
  alert(currentIndex);
  const curr = JSON.stringify(currentIndex);
  document.getElementById('tname').value = sortedData[currentIndex-1].Name;
  document.getElementById('tcolor').value = sortedData[currentIndex-1].Color;
  document.getElementById('ttype').value = sortedData[currentIndex-1].Type;
  document.getElementById('tcomp').value = sortedData[currentIndex-1].Competitive;
  let im = document.getElementById("Image");
  im.setAttribute('src', sortedData[currentIndex-1].image);
  document.getElementById('theight').value = sortedData[currentIndex-1].Height;
}

let newcont = document.createElement('div');
let newbutton = document.createElement('button');
newbutton.innerHTML = "Display";
newbutton.addEventListener('click', requ);
newcont.append(newbutton);

let newcont2 = document.createElement('div');
let nextbutton = document.createElement('button');
nextbutton.innerHTML = "Next";
nextbutton.addEventListener('click', next);
newcont2.append(nextbutton);

let newcont3 = document.createElement('div');
let prevbutton = document.createElement('button');
prevbutton.innerHTML = "Prev";
prevbutton.addEventListener('click', prev);
newcont3.append(prevbutton);

let firstBut = document.createElement('div');
let firstbutton = document.createElement('button');
firstbutton.innerHTML = "First";
firstbutton.addEventListener('click', first);
firstBut.append(firstbutton);

let lastBut = document.createElement('div');
let lastbutton = document.createElement('button');
lastbutton.innerHTML = "Last";
lastbutton.addEventListener('click', last);
lastBut.append(lastbutton);


let newcont4 = document.createElement('div');
let editbutton = document.createElement('button');
editbutton.innerHTML = "Edit";
editbutton.addEventListener('click', edit);
newcont4.append(editbutton);

let newcont5 = document.createElement('div');
let insertbutton = document.createElement('button');
insertbutton.innerHTML = "Insert";
insertbutton.addEventListener('click', insert);
newcont5.append(insertbutton);

let newcont6 = document.createElement('div');
let deletebutton = document.createElement('button');
deletebutton.innerHTML = "Delete";
deletebutton.addEventListener('click', deleted);
newcont6.append(deletebutton);

let newcont7 = document.createElement('div');
let sortbutton = document.createElement('button');
sortbutton.innerHTML = "Sort Alphabetical";
sortbutton.addEventListener('click', sort);
newcont7.append(sortbutton);

let newcont8 = document.createElement('div');
let defaultSortbutton = document.createElement('button');
defaultSortbutton.innerHTML = "Default Sort";
defaultSortbutton.addEventListener('click', defaultSort);
newcont7.append(defaultSortbutton);

let newcont9 = document.createElement('div');
let dbbutton = document.createElement('button');
dbbutton.innerHTML = "DB";
dbbutton.addEventListener('click', db);
newcont9.append(dbbutton);

document.body.append(newcont);
document.body.append(newcont2);
document.body.append(newcont3);
document.body.append(newcont4);
document.body.append(newcont5);
document.body.append(newcont6);
document.body.append(newcont7);
document.body.append(newcont8);
document.body.append(newcont9);
document.body.append(firstBut);
document.body.append(lastBut);

