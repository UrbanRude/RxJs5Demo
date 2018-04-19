import {Observable,Observer} from "rxjs";
import { elementAt } from "rxjs/operators";

let output = document.getElementById('output');
let button = document.getElementById('button');
let buttonPasaron = document.getElementById('buttonPass');
let buttonMax = document.getElementById('buttonMax');

let inputLetter = <HTMLInputElement> document.getElementById('firstLetter')

let clickPass = Observable.fromEvent(buttonPasaron,'click');
let clickLetter = Observable.fromEvent(button,'click');
let clickMax = Observable.fromEvent(buttonMax,'click');

function load(url:string){
    return Observable.create((observer) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load',() =>{
            if(xhr.status === 200){
                let jsonAlumnos = JSON.parse(xhr.responseText);
                observer.next(jsonAlumnos);
                observer.complete();
            }else{
                observer.error(xhr.statusText);
            }
        });
        xhr.open('GET',url);
        xhr.send();
    });
}

function renderPassAlumnos(jsonAlumnos){
    jsonAlumnos.forEach(element => {
        let div = document.createElement('div');
        if(element.calificacion > 60){
            console.log(element.calificacion);
            div.innerText = `*Nombre >> ${element.nombre} --- ${element.calificacion}`;
            output.appendChild(div);
        }   
    });
}

clickPass.flatMap(
    x => load('alumnos.json')).subscribe(value => {
            renderPassAlumnos(value);
        },error => {
            console.log('Error');
        });

clickLetter.subscribe(x => load('alumnos.json').subscribe(value => Observable.from(value)
.filter((alumnos:any) => { 
    return alumnos.nombre.startsWith(inputLetter.value)})
.subscribe(x => console.log(x))));

clickMax.flatMap(
    x => load('alumnos.json')).subscribe(value => {
            renderMaxAlumnos(value)
            .max().subscribe(x => {console.log(x)});
        },error => {
            console.log('Error');
        });
/*
clickMax.flatMap(
        x => load('alumnos.json')).toArray().subscribe(x => {console.log(x)});*/

function renderMaxAlumnos(jsonAlumnos){
    let a = [];
    jsonAlumnos.forEach(element => {
        a.push(element.calificacion);
    });
    return Observable.from(a);
}