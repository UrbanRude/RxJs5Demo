import {Observable,Observer} from "rxjs";

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button,'click');

function load(url:string){
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load',() =>{
        let jsonStarwars = JSON.parse(xhr.responseText);
        jsonStarwars.forEach(element => {
            let div = document.createElement('div');
            div.innerText = element.name;
            output.appendChild(div);
        });
    });
    xhr.open('GET',url);
    xhr.send();

}

click.subscribe(
    value => {
        load('starwars.json');
    },
    error => {
        console.log(`Error`);
    },
    () => {
        console.log('Complete');
    }
);