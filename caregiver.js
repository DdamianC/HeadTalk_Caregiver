const DB="https://bci-komunikacja-default-rtdb.europe-west1.firebasedatabase.app";

function sendQ(){
const t=document.getElementById("q").value;
if(!t)return;

fetch(`${DB}/questions/current.json`,{
method:"PUT",
body:JSON.stringify({text:t,time:Date.now()})
});
document.getElementById("q").value="";
}

async function load(){
const r=await fetch(`${DB}/messages.json`);
const d=await r.json();
const box=document.getElementById("msgs");
box.innerHTML="";
if(!d)return;

Object.values(d).reverse().forEach(m=>{
const div=document.createElement("div");
div.innerText="🗨️ "+m.text;
box.appendChild(div);
});
}

setInterval(load,2000);
