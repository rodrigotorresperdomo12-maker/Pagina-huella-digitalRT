import {JV} from '~/data/ova'

export default defineNuxtPlugin(nuxtApp=>{
const app=nuxtApp.vueApp
app.directive("ripple",{mounted(el){el.addEventListener("pointerdown",e=>{if(el.disabled)return;const r=el.getBoundingClientRect(),d=Math.max(r.width,r.height),s=document.createElement("i");s.className="rp";s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;top:"+(e.clientY-r.top-d/2)+"px";el.appendChild(s);setTimeout(()=>s.remove(),650)})}});
app.directive("par",{mounted(el){el.addEventListener("pointermove",e=>{if(e.pointerType==="touch"||document.documentElement.classList.contains("lite"))return;const r=el.getBoundingClientRect();el.style.setProperty("--px",((e.clientX-r.left)/r.width-.5).toFixed(3));el.style.setProperty("--py",((e.clientY-r.top)/r.height-.5).toFixed(3))});el.addEventListener("pointerleave",()=>{el.style.setProperty("--px",0);el.style.setProperty("--py",0)})}});
app.directive("jvis",{mounted(el){const io=new IntersectionObserver(e=>{JV.on=e[0].isIntersecting},{threshold:.15});io.observe(el);el._io=io},unmounted(el){el._io&&el._io.disconnect();JV.on=false}});
app.directive("focus",{mounted(el){el.focus({preventScroll:true})}});
app.directive("tilt",{mounted(el){el.addEventListener("pointermove",e=>{if(e.pointerType==="touch"||document.documentElement.classList.contains("lite"))return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform="perspective(700px) rotateY("+x*8+"deg) rotateX("+(-y*8)+"deg)"});el.addEventListener("pointerleave",()=>{el.style.transform=""})}});
app.directive("magnet",{mounted(el){if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;el.addEventListener("pointermove",e=>{if(e.pointerType==="touch"||document.documentElement.classList.contains("lite"))return;const r=el.getBoundingClientRect();el.style.setProperty("--mx",((e.clientX-r.left-r.width/2)*.12).toFixed(1)+"px");el.style.setProperty("--my",((e.clientY-r.top-r.height/2)*.18).toFixed(1)+"px")});el.addEventListener("pointerleave",()=>{el.style.removeProperty("--mx");el.style.removeProperty("--my")})}});
})
