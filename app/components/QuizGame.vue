<template>
<div>
<div class="dots" aria-hidden="true"><i v-for="(q,x) in items" :key="x" :class="{ok:res[x]===true,no:res[x]===false,cur:x===i}"></i></div>
<div class="prog"><i :style="{width:i/items.length*100+'%'}"></i></div>
<div v-if="i<items.length" :key="i" class="qwrap">
<div class="card"><h3>Pregunta {{i+1}} de {{items.length}}</h3><p style="margin:0;font-weight:700;font-size:1.15rem">{{items[i][0]}}</p></div>
<button type="button" v-for="(t,j) in items[i][1]" :key="j" class="opt" :class="sel===null?'':j===items[i][2]?'s2':j===sel?'s0':''" :disabled="sel!==null" @click="pick(j)">{{t}}</button>
<div id="qfb" class="fb" v-if="sel!==null" aria-live="polite">{{sel===items[i][2]?'✅ Correcto. ':'❌ No exactamente. '}}{{items[i][3]}}</div>
<div class="qbar" v-if="sel!==null"><button id="qnext" type="button" class="main-btn pulse" @click="next">{{i<items.length-1?'Siguiente pregunta →':'Ver resultado'}}</button></div>
</div>
<div class="card" v-else><h3>Obtuviste {{score}} de {{items.length}}</h3><div class="stars"><span v-for="n in Math.round(score/items.length*5)" :key="n" :style="{animation:'pop .5s '+n*.15+'s both'}">⭐</span></div><p class="tip">💡 {{tip()}}</p><p>{{msg()}}</p><button type="button" class="main-btn" @click="again">Repetir quiz</button></div>
</div>
</template>

<script>
import {ref,reactive,computed,nextTick,onMounted} from 'vue'
import {FACTS} from '~/data/ova'
export default {props:["items"],emits:["ok","bad","mid","done","again"],
 setup(p,{emit}){const i=ref(0),sel=ref(null),res=reactive([]);
  const score=computed(()=>res.filter(x=>x===true).length);
  const see=(id,b)=>nextTick(()=>{try{const e=document.getElementById(id);if(e)e.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth",block:b})}catch(_){}});
  const pick=j=>{if(sel.value!==null||i.value>=p.items.length)return;const ok=j===p.items[i.value][2];sel.value=j;res[i.value]=ok;see("qfb","nearest");emit(ok?"ok":"bad")};
  const next=()=>{if(sel.value===null)return;sel.value=null;i.value++;see("quiz","start");if(i.value>=p.items.length)emit("done",score.value);else if(i.value%5===0)emit("mid",i.value)};
  const again=()=>{i.value=0;sel.value=null;res.splice(0,res.length);see("quiz","start");emit("again")};
  onMounted(()=>emit("again"));
  const tip=()=>FACTS[(score.value*3+i.value)%FACTS.length];
  const msg=()=>{const r=score.value/p.items.length;return r>=.85?"Dominas el tema. Comparte lo aprendido con tu familia.":r>=.6?"Buen trabajo. Repasa el contenido de lo que fallaste.":"Repasa la sección de contenido y vuelve a intentarlo."};
  return{i,sel,res,score,pick,next,again,tip,msg}}}
</script>
