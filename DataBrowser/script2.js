
var image = encodeURIComponent(JSON.stringify("char.jpg"));
// var currentIndex = 0;
var currentIndex = 0;
let size = 5;
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
  currentIndex = (currentIndex + 1) % size;
  const curr = JSON.stringify(currentIndex);
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        data = JSON.parse(httpRequest.responseText);
        document.getElementById("name").innerHTML = "Name: " + data.Name;
        document.getElementById("c").innerHTML = "Color: " + data.Color;
        document.getElementById("t").innerHTML = "Type: " + data.Type;
        document.getElementById("competitive").innerHTML = "Competitve: " + data.Competitive;
        let im = document.getElementById("Image");
        im.setAttribute('src', data.image);
        document.getElementById("H").innerHTML = "Height: " + data.Height;
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/test.php?nextPrev=" + curr, true);
  httpRequest.send();
}

function prev() {
  currentIndex = (currentIndex - 1 + arr.length) % size;
  const curr = JSON.stringify(currentIndex);
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        data = JSON.parse(httpRequest.responseText);
        document.getElementById("name").innerHTML = "Name: " + data.Name;
        document.getElementById("c").innerHTML = "Color: " + data.Color;
        document.getElementById("t").innerHTML = "Type: " + data.Type;
        document.getElementById("competitive").innerHTML = "Competitve: " + data.Competitive;
        let im = document.getElementById("Image");
        im.setAttribute('src', data.image);
        document.getElementById("H").innerHTML = "Height: " + data.Height;
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/test.php?nextPrev=" + curr, true);
  httpRequest.send();
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
        data = JSON.parse(httpRequest.responseText);
      }
    }
  };
  httpRequest.open('GET', "http://localhost/mysite/project8/insert.php?insertPokeman=" + inserts, true);
  httpRequest.send();
  size++;
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

document.body.append(newcont);
document.body.append(newcont2);
document.body.append(newcont3);
document.body.append(newcont4);
document.body.append(newcont5);
