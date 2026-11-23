<template>
<div><template v-if="i<items.length"><p class="gcount">{{i+1}} de {{items.length}}</p><div class="tbar" v-if="timed"><i :style="{width:tm+'%'}"></i></div>
 <transition name="slide" mode="out-in"><div class="gcard" :key="i" :class="r===null?'':r?'yes':'no'">{{items[i][0]}}</div></transition>
 <div class="grow"><button class="gbtn" v-for="(l,k) in labs" :key="k" :disabled="r!==null" @click="pick(k)">{{l}}</button></div>
 <transition name="fb"><div class="fb" v-if="r!==null" aria-live="polite">{{r?'✅ ':'❌ '}}{{items[i][2]}}</div></transition>
 <button class="main-btn" v-if="r!==null" @click="next">Siguiente</button></template>
 <template v-else><h3>{{ok}} de {{items.length}} aciertos</h3><p>{{ok>=items.length-1?'¡Insignia ganada! 🎉':'Casi. Inténtalo otra vez para ganar la insignia.'}}</p><button class="main-btn" @click="again">Jugar de nuevo</button></template></div>
</template>

<script>
import {ref,watch,onUnmounted} from 'vue'
export default {props:["items","labs","timed"],emits:["win","ok"],
 setup(p,{emit}){const i=ref(0),ok=ref(0),r=ref(null);
  const pick=k=>{if(r.value!==null)return;r.value=k===p.items[i.value][1];if(r.value){ok.value++;emit("ok")}};
  const next=()=>{i.value++;r.value=null;if(i.value>=p.items.length&&ok.value>=p.items.length-1)emit("win")};
  const again=()=>{i.value=0;ok.value=0;r.value=null};
  const tm=ref(100);if(p.timed){const h=setInterval(()=>{if(r.value===null&&i.value<p.items.length){tm.value-=1.25;if(tm.value<=0)r.value=false}},100);onUnmounted(()=>clearInterval(h));watch(i,()=>{tm.value=100})}
  return{i,ok,r,pick,next,again,tm}}}
</script>
