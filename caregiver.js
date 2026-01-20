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
 if(d) Object.values(d).reverse().forEach(m=>{
  const div=document.createElement("div");
  div.innerText=m.text;
  box.appendChild(div);
 });

 const r2=await fetch(`${DB}/answers.json`);
 const d2=await r2.json();
 const box2=document.getElementById("answers");
 box2.innerHTML="";
 if(d2) Object.values(d2).reverse().forEach(a=>{
  const div=document.createElement("div");
  div.innerText=a.value;
  box2.appendChild(div);
 });

 const r3=await fetch(`${DB}/camera/current.json`);
 const d3=await r3.json();
 if(d3) document.getElementById("cam").src=d3.img;
}

setInterval(load,1000);

