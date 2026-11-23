<template>
<div id="app" :class="{t:teacher,proj:proj,quiet:quiet,calm:calm,scr:scr}">
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="jsh" viewBox="0 0 120 112"><defs><clipPath id="jcl"><path d="M18 109Q18 84 60 84Q102 84 102 109Z"/></clipPath></defs><ellipse cx="60" cy="108" rx="34" ry="4" fill="#0003"/><path d="M18 109Q18 84 60 84Q102 84 102 109Z" fill="#fff"/><g clip-path="url(#jcl)" fill="#d62839"><rect x="26" y="80" width="12" height="32"/><rect x="50" y="80" width="12" height="32"/><rect x="74" y="80" width="12" height="32"/></g><path d="M18 109Q18 84 60 84Q102 84 102 109Z" fill="none" stroke="#1d2b5c" stroke-width="3.5" stroke-linejoin="round"/><path d="M46 85Q60 96 74 85" fill="#1d2b5c"/><path class="jfin" d="M58 8L78 36L42 36Z" fill="#5f7fa8" stroke="#1d2b5c" stroke-width="3.5" stroke-linejoin="round"/><ellipse cx="60" cy="58" rx="42" ry="29" fill="#7b9bc4" stroke="#1d2b5c" stroke-width="3.5"/><ellipse cx="60" cy="70" rx="29" ry="15" fill="#e8f2fc"/><path d="M20 46Q60 26 100 46" fill="none" stroke="#d62839" stroke-width="7" stroke-linecap="round"/><path d="M24 40Q60 22 96 40" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 7"/><circle cx="43" cy="54" r="8.5" fill="#fff" stroke="#1d2b5c" stroke-width="3"/><circle cx="77" cy="54" r="8.5" fill="#fff" stroke="#1d2b5c" stroke-width="3"/><circle cx="45" cy="55" r="4.2" fill="#1d2b5c"/><circle cx="79" cy="55" r="4.2" fill="#1d2b5c"/><path d="M33 44l18 4M87 44l-18 4" stroke="#1d2b5c" stroke-width="3.2" stroke-linecap="round"/><path d="M40 69Q60 86 80 69" fill="#fff" stroke="#1d2b5c" stroke-width="3.5" stroke-linejoin="round"/><path d="M48 73l3 5 3-5M57 76l3 5 3-5M66 74l3 5 3-5" fill="none" stroke="#1d2b5c" stroke-width="1.8" stroke-linejoin="round"/><rect x="21" y="62" width="6" height="4" fill="#2fb7b0"/><rect x="93" y="62" width="6" height="4" fill="#2fb7b0"/><text x="60" y="104" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="12" fill="#1d2b5c">J</text><g class="jball"><circle cx="100" cy="98" r="10" fill="#fff" stroke="#1d2b5c" stroke-width="3"/><path d="M100 93l5 3.6-2 5.6h-6l-2-5.6z" fill="#1d2b5c"/></g></symbol></svg><i class="blob b1"></i><i class="blob b2"></i><div class="fx" aria-hidden="true"><i v-for="(f,i) in FX" :key="i" :style="f.s">{{f.e}}</i></div>
<i class="cf" v-for="c in conf" :key="c.id" :style="c.s"></i>
<i class="wipe" v-if="wk" :key="wk"></i>
<button type="button" class="totop" v-if="gate==='in'&&scrollP>.15" @click="toTop" aria-label="Subir al inicio">🚀</button>
<transition name="celx"><div class="cel" v-if="cel" tabindex="-1" v-focus @keydown.esc="celClose" role="dialog" aria-modal="true" aria-label="Celebración del diploma">
 <div class="cel-r" aria-hidden="true"></div><canvas ref="cv" class="cvs" aria-hidden="true"></canvas>
 <div class="cel-card"><div class="cel-medal" aria-hidden="true">🏆</div><h2 class="cel-t" :aria-label="celT"><span v-for="(c,i) in celT" :key="i" aria-hidden="true" :style="{'--i':i}">{{c===' '?'\u00a0':c}}</span></h2>
 <p class="cel-s">Medalla de {{MED}} · Nivel {{lvl+1}} · {{xp}} XP</p>
 <div class="cel-b" aria-hidden="true"><i v-for="(b,i) in BN" :key="i" v-show="on[i]" :style="{'--i':i}">{{b[0]}}</i></div>
 <div class="cel-crew" aria-hidden="true"><b class="cc" v-for="(e,i) in ['🦉','🦊','🦎','🦈']" :key="i" :class="['c'+i,celM[i],{talk:celL&&celL.w===i}]">{{e}}</b></div>
 <transition name="fb" mode="out-in"><p class="cel-say" v-if="celL" :key="celL.k" aria-live="polite"><b>{{['🦉 Búho','🦊 Pixel','🦎 Ciber'][celL.w]}}:</b> {{celL.t}}</p></transition>
 <p class="cel-n" v-if="!snd">🔇 Activa el sonido para oír la música.</p>
 <div class="cel-btns"><button class="main-btn" v-ripple v-magnet @click="celAgain">🎵 Otra vez</button><button class="main-btn" v-ripple v-magnet @click="celClose">Cerrar</button></div></div>
</div></transition>
<transition-group name="tz" tag="div" class="toasts"><div class="toast" v-for="t in toasts" :key="t.id">{{t.m}}</div></transition-group>
<i class="sp" v-for="s in sparks" :key="s.id" :style="s.s">{{s.e}}</i>
<b class="ring" v-for="s in sparks" :key="'r'+s.id" :style="s.s"></b>
<transition name="gate">
<div class="gate v2" v-if="gate!=='in'" role="dialog" aria-modal="true" aria-label="Ciudadanos digitales: portada">
 <div class="g-bg" aria-hidden="true"><i class="gf" v-for="(e,i) in GF" :key="i" :style="{left:e[1]+'%',animationDelay:e[2]+'s',animationDuration:e[3]+'s',fontSize:e[4]+'rem'}">{{e[0]}}</i><b class="rainbow"></b><b class="cloud c1"></b><b class="cloud c2"></b><b class="cloud c3"></b></div>
 <transition name="gpanel" mode="out-in">
 <div class="g-hero" v-if="gate==='intro'" key="intro">
  <section class="g-left">
   <p class="g-kicker"><span class="dot" aria-hidden="true"></span>🎟️ Objeto Virtual de Aprendizaje · Grado 6</p>
   <h1 class="g-title"><span class="gw" v-for="(w,a) in TW" :key="a"><span class="ch" aria-hidden="true" v-for="(c,b) in w" :key="b" :style="{'--i':a*10+b}">{{c}}</span><span class="sr">{{w}}</span></span></h1>
   <p class="g-sub">Decido con cabeza y corazón</p>
   <p class="g-lead">Una misión para cuidar tu huella digital, frenar el cyberbullying y escribir con respeto en redes.</p>
   <ul class="kw"><li v-for="(k,i) in KW" :key="k" :style="{animationDelay:(1.4+i*.09)+'s'}">{{k}}</li></ul>
   <div class="g-stats"><span><b>{{CASES.length}}</b>casos</span><span><b>19</b>retos</span><span><b>{{BN.length}}</b>insignias</span><span><b>2</b>sesiones de 45 min</span></div>
  </section>
  <section class="g-right">
   <div class="g-stage">
    <div class="g-crew"><div class="g-pet" v-for="(c,w) in CH" :key="w" :class="'p'+w"><button class="pb" :class="mood[w]" :aria-label="'Saludar a '+c[1]" @click="gPoke(w)">{{c[0]}}</button><b>{{c[1]}}</b><small>{{CR[w]}}</small></div></div>
    <p class="g-hint" aria-hidden="true">👆 ¡Toca a tus amigos!</p>
    <transition name="slide" mode="out-in"><p class="g-say" :key="gi" aria-live="polite"><span><b>{{CH[GL[gi][0]][0]}} {{CH[GL[gi][0]][1]}}:</b> {{GL[gi][1]}}</span></p></transition>
    <div class="g-more"><small>Dentro te esperan:</small><span v-for="(c,i) in CREW" :key="i" :style="{animationDelay:(i*.25)+'s'}" :title="c[1]">{{c[0]}}</span></div>
   </div>
   <div class="g-perm" role="group" aria-labelledby="gq">
    <div class="perm-ic" aria-hidden="true">🚀</div>
    <p class="g-q" id="gq">¿Permitir la entrada a la misión?</p>
    <p class="g-note">No pide cuentas ni datos personales. Tú decides si entras.</p>
    <div class="g-btns"><button class="main-btn g-yes" v-ripple v-magnet v-focus @click="enter">{{hasProg?'▶️ Continuar mi misión':'🚀 ¡Sí, vamos!'}}</button><button class="g-nob" @click="later">No, por ahora</button></div>
   </div>
  </section>
 </div>
 <div class="g-card g-bye" v-else key="no">
  <div class="g-em" aria-hidden="true">👋</div>
  <h2>¡Está bien!</h2>
  <p>Sin problema. La misión seguirá aquí cuando quieras entrar.</p>
  <div class="g-btns"><button class="main-btn g-yes" v-ripple v-magnet v-focus @click="enter">🚀 Mejor sí, ¡entrar!</button><button class="g-nob" @click="toIntro">Volver a la portada</button></div>
 </div>
 </transition>
</div>
</transition>
<transition name="shell">
<div class="shell" v-if="gate==='in'">
<div class="spbar" aria-hidden="true"><i :style="{transform:'scaleX('+scrollP+')'}"></i></div>
<transition name="award"><div class="award" v-if="award" :key="award.k" aria-live="polite"><div class="ac"><div class="rays"></div><div class="ab">{{award.e}}</div><b>¡Insignia desbloqueada!</b><span>{{award.n}}</span></div></div></transition>
<div class="mascot"><div class="pet" v-for="(c,w) in CH" :key="w" :class="{talk:sp&&sp.w===w}"><transition name="fb"><p class="bub" v-if="sp&&sp.w===w&&sec!=='inicio'" :key="sp.k">{{sp.t}}</p></transition><button class="pb" :class="mood[w]" :aria-label="'Hablar con '+c[1]" @click="poke(w)" @dblclick="dbl(w)">{{c[0]}}</button></div></div>
<transition name="cin"><div class="ciber" v-if="cOn" @keydown.esc="cp=false">
<transition name="cpan"><div class="cpan" v-if="cp" role="dialog" aria-label="Ciber, el camaleón guardián">
 <div class="chd"><span>Ciber, camaleón guardián</span><span class="tlt" aria-hidden="true"><i class="r" :class="{on:verdict[0]==='r'}"></i><i class="y" :class="{on:verdict[0]==='y'}"></i><i class="g" :class="{on:verdict[0]==='g'}"></i></span><button type="button" class="cx" @click="cp=false" aria-label="Cerrar">✕</button></div>
 <p>Mi misión: que reconozcas el riesgo <b>antes</b> de publicar o compartir.</p>
 <div class="ctabs" role="tablist"><button type="button" v-for="(t,i) in CIB" :key="i" role="tab" :aria-selected="ct===i" :class="{on:ct===i}" :aria-label="t[1]" @click="ct=i">{{t[0]}}</button></div>
 <transition name="slide" mode="out-in"><div class="clsn" :key="ct"><h3>{{CIB[ct][1]}}</h3><p>{{CIB[ct][2]}}</p><p class="tip">🦎 {{CIB[ct][3]}}</p></div></transition>
 <h4>Escáner: antes de publicar</h4>
 <label class="chk" v-for="(t,i) in SCN" :key="i"><input type="checkbox" v-model="scn[i]"> {{t}}</label>
 <div class="cv" :class="verdict[0]" :key="verdict[0]" aria-live="polite"><b>{{verdict[1]}}.</b> {{verdict[2]}}</div>
</div></transition>
<transition name="fb"><p class="bub cbub" v-if="cb&&!cp" :key="cb">{{cb}}</p></transition>
<button type="button" class="cib" :class="[mood[2],ctl?'lz'+ctl:'',{ping:cping&&!cp,fly:cfly}]" @click="cToggle" @dblclick="dbl(2)" :aria-expanded="cp" aria-label="Hablar con Ciber, el camaleón guardián"><svg viewBox="0 0 120 112" aria-hidden="true"><defs><linearGradient id="cgB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7bf59a"/><stop offset="1" stop-color="#22b36f"/></linearGradient><linearGradient id="cgH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a63d6"/><stop offset="1" stop-color="#26357f"/></linearGradient></defs><ellipse cx="60" cy="108" rx="34" ry="4" fill="#0003"/><g class="cs"><path class="st" d="M12 28l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#ffc93c"/><path class="st" d="M108 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff"/><path d="M20 109Q20 86 60 86Q100 86 100 109Z" fill="url(#cgH)" stroke="#1d2b5c" stroke-width="3.5" stroke-linejoin="round"/><path d="M46 87Q60 100 74 87" fill="#e9ffb0" stroke="#1d2b5c" stroke-width="3" stroke-linejoin="round"/><path d="M78 95h13v7q0 5-6.5 7q-6.5-2-6.5-7z" fill="#ffc93c" stroke="#1d2b5c" stroke-width="2.5" stroke-linejoin="round"/><text x="84.5" y="105" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="9" fill="#1d2b5c">C</text><g class="hd"><g class="an"><path d="M60 30V14" stroke="#1d2b5c" stroke-width="3.5" stroke-linecap="round"/><circle class="ld" cx="60" cy="11" r="5.5" fill="#ffc93c" stroke="#1d2b5c" stroke-width="3"/></g><g class="bd" stroke="#1d2b5c" stroke-width="3.5" stroke-linejoin="round"><ellipse cx="60" cy="60" rx="42" ry="31" fill="url(#cgB)"/><circle cx="36" cy="38" r="15" fill="#3fd47a"/><circle cx="84" cy="38" r="15" fill="#3fd47a"/><circle cx="36" cy="38" r="10" fill="#fff" stroke-width="2.5"/><circle cx="84" cy="38" r="10" fill="#fff" stroke-width="2.5"/><g class="ey" stroke="none"><circle cx="38" cy="39" r="5.5" fill="#1d2b5c"/><circle cx="86" cy="39" r="5.5" fill="#1d2b5c"/><circle cx="40" cy="36.5" r="1.8" fill="#fff"/><circle cx="88" cy="36.5" r="1.8" fill="#fff"/></g><circle class="lid" cx="36" cy="38" r="10" fill="#2fbf6f" stroke="none"/><circle class="lid" cx="84" cy="38" r="10" fill="#2fbf6f" stroke="none"/></g><path d="M42 68Q60 84 78 68" fill="none" stroke="#1d2b5c" stroke-width="3.5" stroke-linecap="round"/><circle cx="55" cy="58" r="1.8" fill="#1d2b5c"/><circle cx="65" cy="58" r="1.8" fill="#1d2b5c"/><ellipse cx="28" cy="64" rx="6" ry="3.5" fill="#ff9aa2" opacity=".8"/><ellipse cx="92" cy="64" rx="6" ry="3.5" fill="#ff9aa2" opacity=".8"/><g class="tg"><path d="M60 76V94" stroke="#1d2b5c" stroke-width="10" stroke-linecap="round"/><path d="M60 76V94" stroke="#ff6b8b" stroke-width="5" stroke-linecap="round"/></g></g></g></svg><span class="cn">Ciber</span></button>
</div></transition>
<transition name="cin"><div class="jr" v-if="jFix" :class="{bs:cOn}">
<transition name="fb"><p class="bub jbub" v-if="jb" :key="jb" aria-live="polite">{{jb}}</p></transition>
<button type="button" class="jb" :class="[mood[3],{ping:jping}]" @click="jPoke" @dblclick="dbl(3)" aria-label="Hablar con Júnior, el tiburón estratega"><svg viewBox="0 0 120 112" aria-hidden="true"><use href="#jsh"/></svg><span class="cn">Júnior</span></button></div></transition>
<header>
 <div class="wrap">
  <div class="brand">
   <div class="logo" aria-hidden="true">🛡️</div>
   <div><h1>Ciudadanos digitales</h1><p>Decido con cabeza y corazón · Grado 6</p></div>
   <div class="tools"><button class="tbtn" :aria-pressed="snd" @click="snd=!snd" aria-label="Sonido">{{snd?'🔊':'🔇'}}</button><button class="tbtn" @click="poke(0)" aria-label="Dato curioso">💡</button><button class="tbtn" @click="callCiber" aria-label="Llamar a Ciber">🦎</button><button class="tbtn" @click="callJunior" aria-label="Llamar a Júnior">🦈</button><button class="tbtn" :aria-pressed="lite" @click="liteToggle" aria-label="Modo ligero: menos animaciones para que todo vaya más fluido" title="Modo ligero">⚡</button><button class="tbtn" @click="theme" aria-label="Cambiar tema claro u oscuro">🌓</button><button class="tbtn" :aria-pressed="teacher" @click="teacher=!teacher">Modo docente</button></div>
  </div>
  <div class="badges"><span style="background:none;border:0;width:auto;filter:none;opacity:1;animation:none">Mis insignias</span>
   <span v-for="(b,i) in BN" :key="i" :class="{on:on[i]}" :title="b[1]+(on[i]?' (lograda)':' (pendiente)')">{{b[0]}}</span></div>
  <div class="jp" aria-hidden="true"><i :style="{width:(secIdx+1)/SECS.length*100+'%'}"></i></div>
  <div class="xp"><b>Nivel {{lvl+1}} · {{LV[lvl]}}</b><div class="xb"><i :style="{width:xpPct+'%'}"></i></div><span :key="xp" class="xpn">{{xpShow}} XP</span><span class="combo" v-if="combo>=2" :key="combo">🔥 Racha x{{combo}}</span></div>
  <nav role="tablist" aria-label="Secciones del OVA">
   <button v-for="(s,i) in SECS" :key="s[0]" role="tab" :aria-selected="sec===s[0]" :style="{animationDelay:(.5+i*.08)+'s'}" @click="go(s[0])">{{s[1]}}</button>
  </nav>
 </div>
</header>
<main class="wrap">
<div class="tp" v-if="teacher"><div class="tph"><b>🎓 Panel docente</b><div class="tpt"><button type="button" v-for="(t,i) in TPT" :key="i" :class="{on:tpi===i}" @click="tpi=i">{{t}}</button></div></div>
<div v-if="tpi===0" class="tpb"><div class="tclock" :class="{low:tmr.left<=60&&tmr.run}">{{tmFmt}}</div><div class="prog"><i :style="{width:tmr.left/tmr.tot*100+'%'}"></i></div><div class="tpr"><button class="main-btn" @click="tmToggle">{{tmr.run?'⏸ Pausar':'▶ Iniciar'}}</button><button class="tbtn tl" v-for="m in [5,10,15,45]" :key="m" @click="tmSet(m)">{{m}} min</button></div></div>
<div v-else-if="tpi===1" class="tpb"><textarea v-model="names" rows="3" aria-label="Lista para sortear" placeholder="Iniciales o apodos, uno por línea. No se guardan."></textarea><div class="tpick" :class="{spin:spinning}">{{pickN||'🎲'}}</div><div class="tpr"><button class="main-btn" @click="rollName">🎲 Sortear turno</button><button class="tbtn tl" @click="usedN=[]">Reiniciar ronda</button></div></div>
<div v-else-if="tpi===2" class="tpb"><p>¿Qué luz elige la clase? Cuenta los votos a mano alzada.</p><div class="vts"><div v-for="(c,i) in LUCES" :key="i" class="vt"><button class="gbtn" @click="vote(i,1)">{{c[1]}}</button><div class="vbar"><i :class="'v'+c[0]" :style="{height:vt[i]/Math.max(1,vt[0]+vt[1]+vt[2])*100+'%'}"></i></div><b>{{vt[i]}}</b><button class="tbtn tl" @click="vote(i,-1)" aria-label="Restar voto">−</button></div></div><button class="tbtn tl" @click="vt.fill(0)">Reiniciar votos</button></div>
<div v-else-if="tpi===3" class="tpb"><div class="prog"><i :style="{width:gdN/GS.length*100+'%'}"></i></div><label class="chk" v-for="(g,i) in GS" :key="i"><input type="checkbox" v-model="gd[i]"> <b>{{g[0]}}</b> {{g[1]}} <button type="button" class="tbtn tl" @click.prevent="go(g[2])">Ir</button></label></div>
<div v-else class="tpb"><label class="chk"><input type="checkbox" v-model="proj"> 🖥️ Modo proyección (texto grande)</label><label class="chk"><input type="checkbox" v-model="quiet"> 🤫 Ocultar personajes y fondo</label><label class="chk"><input type="checkbox" v-model="calm"> 🧘 Pausar animaciones</label><label class="chk"><input type="checkbox" v-model="snd"> 🔊 Sonido y música</label></div></div>

<transition name="page" mode="out-in">

<section v-if="sec==='inicio'" key="inicio">
 <div class="hero" v-tilt v-par><span class="fl f1" aria-hidden="true">💬</span><span class="fl f2" aria-hidden="true">❤️</span><span class="fl f3" aria-hidden="true">📷</span><span class="fl f4" aria-hidden="true">🔐</span><span class="fl f5" aria-hidden="true">🛡️</span><div class="duo"><transition name="fb"><p class="bub hb" :class="'w'+sp.w" v-if="sp" :key="sp.k" aria-live="polite">{{sp.t}}</p></transition><button class="pb" :class="mood[0]" @click="poke(0)" aria-label="Búho">🦉</button><button class="pb run" :class="mood[1]" @click="poke(1)" aria-label="Pixel">🦊</button></div>
  <h2>Cada clic deja un rastro</h2><p>Tú decides qué huella quieres dejar.</p>
  <svg class="trail" viewBox="0 0 800 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
   <path class="dash" d="M120 175 C230 90 300 170 400 120 S560 60 700 110"/>
   <g v-for="(f,i) in FP" :key="i" :transform="'translate('+f[0]+' '+f[1]+') rotate('+f[2]+')'"><g class="fp" :class="{last:i===4}" :style="{'--d':(.5+i*.4)+'s'}"><ellipse rx="11" ry="17"/><ellipse cy="26" rx="8" ry="9"/></g></g>
  </svg></div>
 <div class="strip"><div class="sc" style="--d:.1s"><b :key="nOn">{{nOn}}/{{BN.length}}</b><small>insignias</small></div><div class="sc" style="--d:.2s"><b>{{xpShow}}</b><small>XP · Nivel {{lvl+1}}</small></div><div class="sc" style="--d:.3s"><b :key="seen.length">{{seen.length}}/{{SECS.length}}</b><small>paradas visitadas</small></div></div>
 <div class="card"><h3>Mapa de la misión</h3><p style="margin:0">Visita cada parada para completar el recorrido.</p><div class="map"><button v-for="(s,i) in SECS" :key="s[0]" class="stop" :class="{done:seen.includes(s[0]),here:sec===s[0]}" :style="{animationDelay:i*.12+'s'}" @click="go(s[0])"><i>{{seen.includes(s[0])?'✓':i+1}}</i>{{s[1]}}</button></div></div>
 <div class="card"><h3>Título del OVA</h3>
  <p>Uso responsable de redes y ciudadanía digital: huella digital, prevención del cyberbullying y netiqueta.</p>
  <h3>Palabras clave</h3>
  <ul class="kw"><li v-for="(k,i) in KW" :key="k" :style="{animationDelay:(.3+i*.1)+'s'}">{{k}}</li></ul></div>
 <p class="rv">Cada día publicamos, chateamos y jugamos en línea. En este recorrido vas a leer ideas clave y enfrentarte a casos reales donde tú decides qué hacer. No hay trampa: cada decisión te muestra qué pasa después.</p>
 <button class="main-btn" v-ripple v-magnet @click="go('objetivos')">Empezar</button>
 <div class="teacher" style="margin-top:18px"><p><b>Duración sugerida:</b> 2 sesiones de 45 minutos. <b>Sesión 1:</b> objetivos, contenido y un caso. <b>Sesión 2:</b> casos restantes, evaluación y cierre. Funciona en celular, tableta o computador, con proyector o en parejas. Los estudiantes no necesitan crear cuenta ni escribir datos personales.</p></div>
</section>

<section v-else-if="sec==='objetivos'" key="objetivos">
 <h2>Objetivos de aprendizaje</h2><p>Al terminar, podrás:</p>
 <ul class="obj"><li v-for="(o,i) in OBJ" :key="i" class="rv" :style="{animationDelay:i*.15+'s'}">{{o}}</li></ul>
 <h2 style="margin-top:26px">Contenido temático</h2>
 <details open @toggle="tg(0,$event)"><summary>👣 Huella digital</summary>
  <p>Es el rastro que dejas cuando usas internet: fotos, comentarios, “me gusta”, videos y hasta los sitios que visitas. Hay una huella <b>activa</b> (lo que publicas tú) y una <b>pasiva</b> (datos que se recogen sin que lo notes).</p>
  <p>Aunque borres una publicación, alguien pudo guardarla o tomarle captura.</p>
  <div class="tip"><b>Antes de publicar, pregúntate:</b> ¿lo diría en persona? ¿me gustaría que lo vieran mi profe, mi familia o alguien desconocido dentro de diez años? ¿afecta a otra persona?</div></details>
 <details @toggle="tg(1,$event)"><summary>💬 Cyberbullying</summary>
  <p>Es la burla, el insulto o la exclusión repetida usando celulares, redes, chats o juegos. En él hay tres papeles: quien agrede, quien lo sufre y quienes observan. <b>Quien observa puede cambiar la historia.</b></p>
  <div class="tip"><b>Si pasa, haz esto:</b> no respondas con agresión · guarda capturas como prueba · bloquea y reporta · cuéntale a un adulto de confianza.</div></details>
 <details @toggle="tg(2,$event)"><summary>🤝 Netiqueta</summary><p>Son las buenas maneras en línea:</p>
  <ul class="obj"><li>Trata a los demás con el mismo respeto que cara a cara.</li><li>Escribir en MAYÚSCULAS suena a gritos.</li><li>Pide permiso antes de subir fotos o videos de otras personas.</li><li>No reenvíes rumores, cadenas ni burlas.</li><li>Tus contraseñas y datos personales no se comparten.</li></ul></details>
 <div class="fact"><transition name="slide" mode="out-in"><p :key="fi"><b>💡 Dato curioso {{fi+1}}/{{FACTS.length}}:</b> {{FACTS[fi]}}</p></transition><button class="main-btn" v-ripple v-magnet @click="nextFact">Otro dato</button></div>
 <details @toggle="tg(3,$event)"><summary>🔐 Privacidad y contraseñas</summary>
  <p>Tus datos son como tu llave: solo tú decides a quién se la prestas.</p>
  <ul class="obj"><li>Usa contraseñas largas, como una frase que solo tú entiendas.</li><li>No uses la misma clave en todas partes y nunca la compartas con amigos.</li><li>Pon tus perfiles en privado y acepta solo a quien conoces.</li><li>Desactiva la ubicación en tus fotos y publicaciones.</li></ul></details>
 <details @toggle="tg(4,$event)"><summary>🚩 Estafas y desconocidos</summary>
  <p>Algunos mensajes buscan engañarte para quitarte datos o dinero. Fíjate en estas banderas rojas:</p>
  <ul class="obj"><li>Premios que no esperabas.</li><li>Prisa: “hazlo ya o lo pierdes”.</li><li>Piden tus datos, tu clave o fotos tuyas.</li><li>Te piden guardar un secreto.</li></ul>
  <div class="tip"><b>Regla de oro:</b> si dudas, no respondas y muéstraselo a un adulto de confianza.</div></details>
 <details @toggle="tg(5,$event)"><summary>📰 Pensamiento crítico</summary>
  <p>No todo lo que circula en internet es cierto. Antes de compartir, hazte tres preguntas:</p>
  <ul class="obj"><li>¿Quién lo publicó?</li><li>¿Otras fuentes confiables cuentan lo mismo?</li><li>¿Quiere que sienta rabia o miedo para que lo reenvíe?</li></ul></details>
 <details @toggle="tg(6,$event)"><summary>🌙 Bienestar digital</summary>
  <p>Las pantallas son útiles, pero también necesitas moverte, dormir y estar con otras personas.</p>
  <div class="tip"><b>Un buen plan:</b> haz pausas, apaga las pantallas un rato antes de dormir y ten momentos del día sin celular.</div></details>
 <div class="teacher"><p>Sugerencia: leer una tarjeta por sesión y pedir un ejemplo propio a los estudiantes antes de abrir la siguiente. Cierre posible: acordar entre todos 3 reglas de netiqueta para el grupo del curso.</p></div>
 <button class="main-btn" v-ripple v-magnet @click="go('actividades')">Ir a los casos</button>
</section>

<section v-else-if="sec==='actividades'" key="actividades">
 <h2>Casos de decisión</h2><p>Lee la situación y elige qué harías. Verás la consecuencia de cada opción.</p>
 <div class="card jfic"><div class="jfi" aria-hidden="true">🦈</div><div><h3 style="margin:0">Conoce a Júnior, el estratega de la cancha digital</h3><p style="margin:.2rem 0"><i>«¡En la cancha y en internet, piensa antes de jugar!»</i></p><ul style="margin:.3rem 0 0;padding-left:1.1rem"><li><b>🤝 Juego limpio:</b> te ayuda a reconocer el ciberbullying y a respetar las opiniones ajenas.</li><li><b>🥅 Defiende tu portería:</b> protege tus datos, claves y fotos.</li><li><b>🎯 Elige el mejor pase:</b> decide si responder, bloquear, denunciar o pedir ayuda.</li></ul></div></div>
 <div class="tabs2"><button v-for="(c,i) in CASES" :key="i" :aria-pressed="ci===i" @click="runCase(i)">{{c.t}}</button></div>
 <transition name="slide" mode="out-in">
 <div :key="ci+'-'+(done?'end':k)">
  <div class="card" v-if="!done">
   <h3>Decisión {{k+1}} de {{CASES[ci].steps.length}}</h3><p class="scn">{{st.s}}</p></div>
  <template v-if="!done">
   <button v-for="(o,j) in st.o" :key="j" class="opt" :class="sel===j?'s'+o[1]:''" :disabled="sel!==null" v-ripple v-magnet @click="pickCase(j)">{{o[0]}}</button>
   <transition name="fb"><div class="fb" v-if="sel!==null" aria-live="polite">{{['⚠️ Piénsalo de nuevo. ','🟡 Podría ser mejor. ','✅ Buena decisión. '][st.o[sel][1]]}}{{st.o[sel][2]}}</div></transition>
   <button class="main-btn" v-if="sel!==null" v-ripple v-magnet @click="nextCase">{{k<CASES[ci].steps.length-1?'Siguiente decisión':'Ver resultado'}}</button>
  </template>
  <div class="card" v-else>
   <h3>Resultado: {{pts}} de 4 puntos</h3>
   <transition-group name="st" tag="div" class="stars"><span v-for="n in Math.max(pts,0)" :key="n" :style="{'--d':n*.2+'s'}">⭐</span></transition-group>
   <p>{{pts>=4?'¡Excelente! Tus decisiones protegen a los demás y a ti.':pts>=2?'Vas bien. Repite el caso y prueba otro camino.':'Este caso es difícil. Vuelve a intentarlo y fíjate en las consecuencias.'}}</p>
   <button class="main-btn" v-ripple v-magnet @click="runCase(ci)">Repetir caso</button><button class="main-btn" v-if="ci<CASES.length-1" v-ripple v-magnet @click="runCase(ci+1)">Siguiente caso</button></div>
 </div></transition>
 <div class="teacher"><p>Después de cada caso, pregunte: “¿Quién fue el espectador? ¿Qué otra opción tenía?”. Los estudiantes pueden comparar sus decisiones en parejas: no hay un solo camino, pero algunas respuestas protegen más que otras. Los casos son ficticios.</p></div>
</section>

<section v-else-if="sec==='retos'" key="retos">
 <h2>Retos rápidos</h2><p>Practica con diecinueve mini juegos. Cada reto superado enciende una insignia y te da XP.</p>
 <h3>1. ¿Publico o lo guardo?</h3><div class="card"><mini-game :items="G1" :labs="['📤 Publicar','🔒 No publicar']" @ok="addXp(5)" @win="badge(1)"></mini-game></div>
 <h3>2. Semáforo de la netiqueta</h3><div class="card"><mini-game :items="G2" :labs="['🟢 Respetuoso','🔴 Irrespetuoso']" @ok="addXp(5)" @win="badge(2)"></mini-game></div>
 <h3>3. Medidor de contraseñas</h3>
 <div class="card"><p>Escribe una contraseña inventada, nunca la real. Nada se guarda.</p>
  <input class="pw" type="text" autocomplete="off" placeholder="Prueba con: gato123" v-model="pw">
  <div class="meter"><i :style="{width:pw?Math.max(pwS,.4)/5*100+'%':'0',background:PC[pwS]}"></i></div>
  <p style="margin:.6rem 0 0">{{pw?PL[pwS]+(pwS<4?'. Hazla más larga y mezcla letras, números y símbolos.':'. ¡Esa es una buena contraseña!'):'Escribe para ver el resultado.'}}</p></div>
 <h3>4. Plan de ayuda en 4 pasos</h3><p>Toca cada carta para ver qué hacer si te pasa cyberbullying.</p>
 <div class="flips"><button v-for="(f,i) in FL" :key="i" :class="{f:flip[i]}" :aria-label="'Paso '+(i+1)+': '+f[1]" @click="flip[i]=!flip[i]">
  <div class="in3"><div class="fa"><b>{{f[0]}}</b>{{i+1}}. {{f[1]}}</div><div class="fb2">{{f[2]}}</div></div></button></div>
 <h3>5. ¿Mito o verdad?</h3><div class="card"><mini-game :items="G3" :labs="['✅ Verdadero','❌ Falso']" @ok="addXp(5)" @win="badge(5)"></mini-game></div>
 <h3>6. Detective de mensajes</h3><div class="card"><mini-game :items="G4" :labs="['🚩 Alerta','👍 Seguro']" @ok="addXp(5)" @win="badge(6)"></mini-game></div>
 <h3>7. Une las parejas</h3><div class="card"><p>Toca un concepto y luego su definición.</p>
  <div class="pairs"><div><button v-for="(p,i) in PR" :key="i" class="opt" :class="{s2:mt.includes(i),sel:sl===i}" :disabled="mt.includes(i)" @click="sl=i">{{p[0]}}</button></div>
  <div><button v-for="j in PO" :key="j" class="opt" :class="{s2:mt.includes(j),s0:bad===j}" :disabled="mt.includes(j)" @click="pairTo(j)">{{PR[j][1]}}</button></div></div>
  <p v-if="mt.length===PR.length" class="rv">🎉 ¡Todas unidas!</p></div>
 <h3>8. Ordena el plan de ayuda</h3><div class="card"><p>Toca los pasos en el orden correcto, del primero al último.</p>
  <button v-for="j in OS" :key="j" class="opt" :class="{s2:od.includes(j),s0:ob===j}" :disabled="od.includes(j)" @click="ordTap(j)">{{od.includes(j)?(od.indexOf(j)+1)+'. ':''}}{{OST[j]}}</button>
  <p v-if="od.length===OST.length" class="rv">🎉 ¡Plan completo!</p><button class="main-btn" v-if="od.length" v-ripple v-magnet @click="od=[]">Reiniciar</button></div>
 <h3>9. Reescribe con respeto</h3><div class="card"><p>Elige la versión que dice lo mismo sin lastimar.</p><mini-game :items="G5" :labs="['Elijo A','Elijo B']" @ok="addXp(5)" @win="badge(9)"></mini-game></div>
 <h3>10. Mi compromiso digital</h3><div class="card"><p>Marca al menos 3 compromisos que quieres cumplir.</p>
  <label class="chk" v-for="(t,i) in PLT" :key="i"><input type="checkbox" v-model="plg[i]" :disabled="signed"> {{t}}</label>
  <button class="main-btn" v-if="!signed&&nPlg>=3" v-ripple v-magnet @click="sign">✍️ Firmar mi compromiso</button>
  <p v-if="signed" class="rv">🤝 ¡Compromiso firmado! Cúmplelo dentro y fuera de internet.</p></div>
 <h3>11. ⚡ Relámpago</h3><div class="card"><p>Tienes 8 segundos por carta. ¿Está bien o mal?</p><mini-game :items="G6" :labs="['👍 Bien','👎 Mal']" timed="1" @ok="addXp(5)" @win="badge(11)"></mini-game></div>
 <h3>12. 🃏 Memoria</h3><div class="card"><p>Encuentra las 6 parejas de emoji y concepto.</p><div class="mem"><button v-for="(c,i) in MC" :key="i" class="mc" :class="{f:mf.includes(i)||md.includes(i),d:md.includes(i)}" :disabled="mf.includes(i)||md.includes(i)" @click="memTap(i)"><div class="in3"><div class="fa">❓</div><div class="fb2" :style="{fontSize:c[1].length<4?'1.7rem':''}">{{c[1]}}</div></div></button></div>
  <p v-if="md.length===MC.length" class="rv">🎉 ¡Memoria perfecta en {{mv}} movimientos!</p><button class="main-btn" v-ripple v-magnet @click="memReset">Mezclar</button></div>
 <h3>13. 🎯 Atrapa las alertas</h3><div class="card"><p>Toca solo los mensajes con 🚩 antes de que desaparezcan. Tienes 20 segundos y necesitas 8 aciertos.</p>
  <div class="ag"><span>⏱️ {{ag.t}}</span><span>🎯 {{ag.s}}</span><span>❌ {{ag.x}}</span></div>
  <div class="agg"><button v-for="(c,i) in ag.c" :key="i" class="cell" :class="{on:c}" @click="agTap(i)"><span v-if="c" :key="c.id" class="cm">{{c.e}} {{c.t}}</span></button></div>
  <button class="main-btn" v-if="!ag.on" v-ripple v-magnet @click="agStart">{{ag.s+ag.x?'Jugar otra vez':'¡Empezar!'}}</button><p v-if="!ag.on&&ag.s>=8" class="rv">🎉 ¡Gran reflejo!</p></div>
 <h3>14. 📰 ¿Noticia o bulo?</h3><div class="card"><mini-game :items="G7" :labs="['📰 Confiable','🎭 Bulo']" @ok="addXp(5)" @win="badge(14)"></mini-game></div>
 <h3>15. 🧠❤️ Cabeza y corazón</h3><div class="card"><p>¿Qué hace falta en cada situación: pensar con la cabeza o sentir con el corazón?</p><mini-game :items="G8" :labs="['🧠 Cabeza','❤️ Corazón']" @ok="addXp(5)" @win="badge(15)"></mini-game></div>
 <h3>16. 🔤 Palabras revueltas</h3><div class="card"><p>Toca las letras en orden para armar la palabra. Pista: {{WORDS[wi]?WORDS[wi][1]:'¡Terminaste!'}} · Resueltas {{ws}}/{{WORDS.length}}</p>
  <div v-if="wi<WORDS.length"><div class="tiles"><button class="tile sl" v-for="(n,x) in WORDS[wi][0].length" :key="'s'+x" @click="wUndo">{{pk[x]!==undefined?tl[pk[x]]:'_'}}</button></div><div class="tiles"><button class="tile" v-for="(c,x) in tl" :key="x+c" :disabled="pk.includes(x)" @click="wTap(x)">{{c}}</button></div><button class="main-btn" v-ripple v-magnet @click="pk=[]">Borrar</button></div>
  <div v-else><p class="rv">🎉 ¡Todas resueltas!</p><button class="main-btn" v-ripple v-magnet @click="wReset">Jugar otra vez</button></div></div>
 <h3>17. 🦊 Pixel dice</h3><div class="card"><p>Mira la secuencia que ilumina Pixel y repítela. Llega a la ronda 6.</p><div class="ag"><span>Ronda {{sm.r}}</span><span>{{sm.msg}}</span></div>
  <div class="sim"><button class="sb" v-for="(e,i) in SIMS" :key="i" :class="{lit:sm.lit===i}" :style="{background:e[1]}" :disabled="!sm.go" :aria-label="'Botón '+(i+1)" @click="smTap(i)">{{e[0]}}</button></div>
  <button class="main-btn" v-if="!sm.run" v-ripple v-magnet @click="smStart">{{sm.r>0?'Jugar otra vez':'¡Empezar!'}}</button></div>
 <h3>18. 🚦 Semáforo de Ciber</h3><div class="card"><p>Lee la publicación y elige la luz. Ciber cambiará de color según la respuesta correcta.</p>
  <div v-if="!sem.done"><p class="gcount">{{sem.i+1}} de {{SEM.length}} · Aciertos {{sem.ok}}</p>
  <transition name="slide" mode="out-in"><div class="gcard" :key="sem.i" :class="sem.r===null?'':sem.r?'yes':'no'">{{SEM[sem.i][0]}}</div></transition>
  <div class="grow"><button class="gbtn" v-for="c in LUCES" :key="c[0]" :disabled="sem.r!==null" @click="semPick(c[0])">{{c[1]}}</button></div>
  <transition name="fb"><div class="fb" v-if="sem.r!==null" aria-live="polite">{{sem.r?'✅ ':'❌ '}}{{SEM[sem.i][2]}}</div></transition>
  <button class="main-btn" v-if="sem.r!==null" v-ripple v-magnet @click="semNext">{{sem.i<SEM.length-1?'Siguiente':'Ver resultado'}}</button></div>
  <div v-else><h3>{{sem.ok}} de {{SEM.length}} aciertos</h3><p>{{sem.ok>=6?'¡Gran ojo de camaleón! 🦎':'Casi. Repite y fíjate en los datos personales.'}}</p><button class="main-btn" v-ripple v-magnet @click="semReset">Jugar de nuevo</button></div></div>
 <h3 id="jgame">19. 🦈 La jugada digital: el partido</h3><div class="card" v-jvis>
 <div class="jcoach"><svg viewBox="0 0 120 112" aria-hidden="true"><use href="#jsh"/></svg><p class="bub jcb" aria-live="polite">{{jb||'Soy Júnior. ¡Piensa antes de jugar!'}}</p></div>
 <div v-if="jg.st===0"><p>Un partido de 8 jugadas en 2 tiempos. Cada situación aparece como en una red social. Elige 🎯 jugada estratégica (+3), ⚽ pase (+1) o 🟥 falta (0). Tres aciertos seguidos dan punto extra y tienes 1 ayuda del técnico. Con 5 jugadas estratégicas ganas la insignia 🦈.</p>
  <label class="jchk"><input type="checkbox" v-model="jg.clock"> ⏱️ Modo con reloj (15 s por jugada)</label>
  <button class="main-btn" v-ripple v-magnet @click="jgStart">🏁 ¡Pitazo inicial!</button></div>
 <div v-else-if="jg.st<3">
  <div class="jscore"><span>{{jg.st===2?'⏸️ Entretiempo':jg.i>3?'2.º tiempo':'1.er tiempo'}}</span><span>🎯 {{jg.g}}</span><span>⚽ {{jg.p}}</span><span>🟥 {{jg.f}}</span><span>🔥 Racha {{jg.sk}}</span><span>⭐ {{jg.pts}}</span></div>
  <div class="jfield" aria-hidden="true"><span class="jbl" :style="{left:'calc('+((jg.i+(jg.r!==null||jg.st===2?1:0))/8*84)+'% + 6px)'}">⚽</span></div>
  <div v-if="jg.st===1"><p class="gcount">Jugada {{jg.i+1}} de 8</p>
   <div class="jtimer" v-if="jg.clock&&jg.r===null"><i :style="{width:jg.t/15*100+'%'}"></i></div>
   <transition name="slide" mode="out-in"><div class="jphone" :key="jg.i"><div class="jph"><span>📱 {{jcur()[1]}}</span><span>{{JCAT[jcur()[0]]}}</span></div><div class="jmsg"><span class="jav" aria-hidden="true">{{jcur()[2]}}</span><div><b>{{jcur()[3]}}</b><p>{{jcur()[4]}}</p><small>hace 2 min · 💬 {{(jg.i*7)%9+3}}</small></div></div></div></transition>
   <div class="jopts"><button type="button" class="gbtn" v-for="(o,k) in jg.opts" :key="jg.i+'-'+k" :disabled="jg.r!==null||jg.hid===k" :class="[jg.r!==null?'t-'+o[1]:'',{jsel:jg.r===k}]" :style="jg.hid===k?{textDecoration:'line-through',opacity:.4}:{}" @click="jgPick(k)">{{jg.r!==null?JGI[o[1]]+' ':''}}{{o[0]}}</button></div>
   <button type="button" class="tbtn" v-if="!jg.hint&&jg.r===null" @click="jgHint">🧑‍🏫 Ayuda del técnico (1)</button>
   <transition name="fb"><div class="fb" v-if="jg.r!==null" aria-live="polite"><b>{{JGI[jg.ty]}} {{JGL[jg.ty]}}.</b> {{jg.why}}<span v-if="jg.ty!=='g'"> Mejor jugada: {{jgBest()}}</span></div></transition>
   <button class="main-btn" v-if="jg.r!==null" v-ripple v-magnet @click="jgNext">{{jg.i===3?'⏸️ Ir al entretiempo':jg.i>=7?'🏁 Pitazo final':'Siguiente jugada →'}}</button></div>
  <div v-else><h3>⏸️ Entretiempo</h3><p>Marcador: 🎯 {{jg.g}} · ⚽ {{jg.p}} · 🟥 {{jg.f}}. Júnior ajusta la táctica: ¡cabeza arriba para el segundo tiempo!</p><button class="main-btn" v-ripple v-magnet @click="jgHalf">▶️ Segundo tiempo</button></div></div>
 <div v-else><div class="jmed" aria-hidden="true">{{jg.g>=7?'🥇':jg.g>=5?'🥈':jg.g>=3?'🥉':'🔁'}}</div><h3>{{jg.g>=7?'Balón de oro digital':jg.g>=5?'Titular del equipo':jg.g>=3?'Promesa de la cancha':'Suplente: ¡a entrenar!'}}</h3><p>🎯 {{jg.g}} · ⚽ {{jg.p}} · 🟥 {{jg.f}} · ⭐ {{jg.pts}} puntos · 🔥 Mejor racha {{jg.bs}}</p><div class="jlog" aria-hidden="true"><b v-for="(t,i) in jg.log" :key="i">{{JGI[t]}}</b></div><p><b>Plan de entrenamiento:</b> {{jgWeak()}}</p><p v-if="jg.g<5">Te faltan jugadas estratégicas para la insignia 🦈: necesitas 5.</p><button class="main-btn" v-ripple v-magnet @click="jgStart">🔁 Revancha</button></div>
 <transition name="jfl"><div class="jflash" :class="'f'+jg.fl" v-if="jg.fl" aria-hidden="true">{{jg.fl==='g'?'¡GOOOL! 🎯':jg.fl==='p'?'⚽ Buen pase':'🟥 ¡Falta!'}}</div></transition></div>
 <div class="teacher"><p>Los retos sirven como calentamiento o cierre. Sugerencia: proyectar el reto 1 y votar a mano alzada antes de pulsar. En el reto 3, recuerde a los estudiantes que no escriban contraseñas reales.</p></div>
</section>

<section v-else-if="sec==='evaluacion'" key="evaluacion">
 <h2 id="quiz">Evaluación</h2><h3>Quiz de {{QUIZ.length}} preguntas</h3>
 <quiz-game :items="QUIZ" @ok="qOk" @bad="qBad" @mid="qMid" @done="qDone" @again="qdone=false"></quiz-game>
 <h3 style="margin-top:26px">Autoevaluación</h3>
 <div class="card"><p>Marca lo que ya puedes hacer:</p>
  <label class="chk" v-for="(t,i) in SELF" :key="i"><input type="checkbox" v-model="chk[i]"> {{t}}</label>
  <transition name="fb"><p v-if="nChk" style="margin:.6rem 0 0">{{nChk===3?'¡Lo lograste! Ya eres un ciudadano digital responsable.':'Vas muy bien. Repasa lo que aún no marcaste.'}}</p></transition></div>
 <div class="teacher"><p>El quiz es formativo: cada respuesta explica el porqué. Puede usarse como cierre en voz alta. La autoevaluación no guarda datos; sirve para que cada estudiante reflexione sobre su propio avance.</p></div>
</section>

<section v-else-if="sec==='recursos'" key="recursos">
 <h2>Recursos adicionales</h2>
 <div class="card"><ul class="obj" style="margin:0">
  <li><a href="https://beinternetawesome.withgoogle.com/es-419" target="_blank" rel="noopener">Sé genial en internet (Google)</a>: juegos y lecciones sobre seguridad y amabilidad en línea.</li>
  <li><a href="https://www.teprotejo.org" target="_blank" rel="noopener">Te Protejo</a>: línea para reportar contenidos y situaciones que ponen en riesgo a niñas, niños y adolescentes.</li>
  <li><a href="https://www.enticconfio.gov.co" target="_blank" rel="noopener">En TIC Confío</a>: recursos del Gobierno de Colombia para un uso seguro de las TIC.</li></ul></div>
 <div class="teacher"><p><b>Rúbrica sugerida</b> (observación durante las actividades):</p><table><tr><th>Criterio</th><th>Superior</th><th>Básico</th><th>Por mejorar</th></tr><tr><td>Comprende los conceptos</td><td>Los explica con sus palabras y da ejemplos</td><td>Los reconoce con ayuda</td><td>Confunde los conceptos</td></tr><tr><td>Toma decisiones</td><td>Elige y justifica pensando en las consecuencias</td><td>Elige bien, pero no justifica</td><td>Decide sin pensar en otras personas</td></tr><tr><td>Respeto en línea</td><td>Reescribe mensajes con respeto y apoya a otros</td><td>Respeta cuando se le recuerda</td><td>Usa burlas o agresión</td></tr></table></div>
 <div class="teacher"><p><b>Antes de usar el OVA:</b> verifique que los enlaces sigan activos y cambie o añada recursos de su región. <b>Si un estudiante revela una situación real de acoso,</b> siga el protocolo de convivencia de su institución y acuda a orientación escolar.</p></div>
</section>

<section v-else-if="sec==='diploma'" key="diploma">
 <h2>Diploma de ciudadano digital</h2>
 <div class="card" v-if="nOn<6"><p>Consigue al menos 6 de {{BN.length}} insignias para desbloquear tu diploma. Llevas {{nOn}}.</p><div class="prog"><i :style="{width:nOn/6*100+'%'}"></i></div><button class="main-btn" v-ripple v-magnet @click="go('retos')">Ir a los retos</button></div>
 <div v-else><p>Escribe un apodo o tu primer nombre. No pongas apellidos ni datos privados.</p><input class="pw" v-model="nm" maxlength="20" placeholder="Tu apodo">
  <div class="styl noprint"><button class="tbtn" v-for="(d,i) in DS" :key="i" :aria-pressed="ds===i" @click="ds=i" style="color:var(--ink);border-color:var(--bd)">{{d[1]}}</button></div>
  <transition name="fb"><div class="cert" :class="DS[ds][0]" v-if="nm" v-tilt><span class="shine"></span><span class="corner c1">🌟</span><span class="corner c2">🌟</span><span class="corner c3">🦉</span><span class="corner c4">🦊</span><div class="seal2" @click="sealPop" title="¡Tócame!">🏅</div><h3>Diploma de honor · Medalla de {{MED}}</h3><p>Se otorga a</p><h2>{{nm}}</h2><p>por decidir con cabeza y corazón, cuidar su huella digital, frenar el cyberbullying y practicar la netiqueta.</p><p><b>Nivel {{lvl+1}} · {{LV[lvl]}}</b> · {{xp}} XP · {{nOn}} de {{BN.length}} insignias</p><div class="dbd"><span v-for="(b,i) in BN" :key="i" v-show="on[i]">{{b[0]}}</span></div><div class="sig"><div>🦉 Búho<br>Guía</div><div>🦊 Pixel<br>Compañero</div><div>🦈 Júnior<br>Estratega</div></div><div class="dcr"><small>Creado por</small><span class="dcr-p" v-for="c in CREATORS" :key="c.id"><img :src="FACES[c.id]" alt="" width="38" height="38"><em>{{c.name.split(' ')[0]}}</em></span></div><p style="font-size:14px;margin-top:12px">{{TODAY}}</p></div></transition>
  <div class="noprint" v-if="nm" style="margin-top:16px"><button class="main-btn" v-ripple v-magnet @click="printD">🖨️ Imprimir o guardar PDF</button><button class="main-btn" v-ripple v-magnet @click="celebrate">🎉 Celebrar con Búho y Pixel</button></div></div>
</section>

<section v-else key="creditos">
 <h2>Créditos</h2><p>Esta OVA existe gracias a muchas manos. ¡Gracias por recorrerla!</p>
 <div class="card cred cr-team"><h3>Los creadores de la misión</h3><p class="cr-hint">Toca a cada creador para que Búho y Pixel te lo presenten.</p>
  <div class="cr-grid"><button type="button" v-for="(c,i) in CREATORS" :key="c.id" class="cr-card" :class="[c.id,{on:crOn===i}]" @click="crTap(i)" :aria-label="'Saludar a '+c.name"><span class="cr-av"><img :src="FACES[c.id]" :alt="'Caricatura de '+c.name" width="122" height="122" loading="lazy" decoding="async"></span><b class="cr-name">{{c.name}}</b><span class="cr-tag">{{c.tag}}</span><small>{{c.role}}</small></button></div></div>
 <div class="card cred" v-for="(g,i) in CREDITS.slice(1)" :key="g[0]"><h3>{{g[0]}}</h3>
  <ul class="cred-l"><li v-for="(r,j) in g[1]" :key="j" class="rv" :style="{animationDelay:(i*.1+j*.06)+'s'}"><b>{{r[0]}}</b><span v-if="r[1]">{{r[1]}}</span></li></ul></div>
 <div class="card cred cred-crew"><h3>El equipo de la misión</h3>
  <div class="cred-pets"><div v-for="(c,i) in CREW" :key="i"><i aria-hidden="true">{{c[0]}}</i><b>{{c[1]}}</b><small>{{c[2]}}</small></div></div></div>
 <div class="card cred"><h3>Recursos externos</h3><ul class="cred-l">
  <li><b><a href="https://beinternetawesome.withgoogle.com/es-419" target="_blank" rel="noopener">Sé genial en internet (Google)</a></b><span>Juegos y lecciones sobre seguridad en línea.</span></li>
  <li><b><a href="https://www.teprotejo.org" target="_blank" rel="noopener">Te Protejo</a></b><span>Línea de reporte para proteger a niñas, niños y adolescentes.</span></li>
  <li><b><a href="https://www.enticconfio.gov.co" target="_blank" rel="noopener">En TIC Confío</a></b><span>Recursos del Gobierno de Colombia para un uso seguro de las TIC.</span></li></ul></div>
 <p class="cred-end">🛡️ <b>Ciudadanos digitales: decido con cabeza y corazón</b><br>Trabajo académico · Universidad de Córdoba · {{CRYEAR}}</p>
 <div class="next-end noprint"><button class="main-btn" v-ripple v-magnet @click="go('inicio')">↩️ Volver al inicio</button></div>
</section>
</transition>
<div class="next" v-if="nextSec"><button class="main-btn" :class="{pulse:nextReady}" v-ripple v-magnet @click="go(nextSec[0])">Continuar: {{nextSec[1]}} →</button></div>
</main>
<footer>OVA de ciudadanía digital · Material educativo para uso docente<br><button type="button" class="ft-crew" @click="go('creditos')" aria-label="Ver los créditos: creado por Rubén, Bleyder, Diego y Rodrigo"><span class="stack"><img v-for="c in CREATORS" :key="c.id" :src="FACES[c.id]" alt="" width="30" height="30"></span>Creado por Rubén, Bleyder, Diego y Rodrigo</button><br><button class="tbtn" style="color:var(--sub);border-color:var(--line);margin-top:8px" @click="resetP">{{rs?'¿Seguro? Toca otra vez':'Reiniciar mi progreso'}}</button> <button class="tbtn" style="color:var(--sub);border-color:var(--line);margin-top:8px" @click="toIntro">🎬 Ver portada</button></footer>
</div></transition>
</div>
</template>

<script>
import {ref,reactive,computed,watch,nextTick,onMounted,onUnmounted} from 'vue'
import {JV,SECS,CREDITS,CREW,CRYEAR,FACES,CREATORS,BN,KW,OBJ,FP,SELF,CASES,QUIZ,G1,G2,FL,PL,PC,LV,MSG,FACTS,PR,PO,OST,OS,G3,G4,PLT,G5,CH,DLG,REA,BAN,G6,MP,AP,G7,G8,WORDS,SIMS,DS,CMB,PXR,DUOF,DUOP,IDLE,TW,CR,GL,GF,QOK,QBAD,QMID,QEND,SKITS,TOG,DLG2} from '~/data/ova'
export default{setup(){
 const read=()=>{const h=location.hash.slice(1);return SECS.some(s=>s[0]===h)?h:"inicio"};
 const gate=ref("intro");
 const sec=ref(read()),teacher=ref(false),conf=ref([]),on=reactive(Array(BN.length).fill(false));
 const secIdx=computed(()=>SECS.findIndex(s=>s[0]===sec.value));
 addEventListener("hashchange",()=>{sec.value=read();scrollTo(0,0)});
 const go=id=>{location.hash=id};
 let cid=0;
 const burst=()=>{const ids=[];for(let i=0;i<40;i++){const id=++cid;ids.push(id);conf.value.push({id,s:{left:Math.random()*100+"vw",background:["#ffc93c","#e8545a","#0e8f8f","#6b7cff"][i%4],"--x":(Math.random()*160-80)+"px",animationDelay:Math.random()*.5+"s"}})}
  setTimeout(()=>{conf.value=conf.value.filter(c=>!ids.includes(c.id))},3000)};
 const combo=ref(0);const xp=ref(0),xpShow=ref(0),toasts=ref([]),nm=ref(""),fi=ref(0);let tid=0;
 try{const d=JSON.parse(localStorage.getItem("ova-cd")||"{}");if(d.xp){xp.value=d.xp;xpShow.value=d.xp}(d.on||[]).forEach((v,i)=>{if(v&&i<on.length)on[i]=true})}catch(e){}
 const snd=ref(true);let ac;
 const beep=(fs,t=.12)=>{if(fs[0]===180){combo.value=0;react("bad")};if(!snd.value)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();fs.forEach((f,i)=>{const o=ac.createOscillator(),g=ac.createGain(),s=ac.currentTime+i*t;o.frequency.value=f;o.type="triangle";g.gain.setValueAtTime(.12,s);g.gain.exponentialRampToValueAtTime(.001,s+t);o.connect(g);g.connect(ac.destination);o.start(s);o.stop(s+t)})}catch(e){}};
 const tone=(f,d=.1,ty="sine",v=.1,dl=0,sl=0)=>{if(!snd.value)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();const o=ac.createOscillator(),g=ac.createGain(),t0=ac.currentTime+dl;o.type=ty;o.frequency.setValueAtTime(f,t0);if(sl)o.frequency.exponentialRampToValueAtTime(sl,t0+d);g.gain.setValueAtTime(v,t0);g.gain.exponentialRampToValueAtTime(.001,t0+d);o.connect(g);g.connect(ac.destination);o.start(t0);o.stop(t0+d)}catch(e){}};
 const SFX={click:()=>tone(520,.07,"square",.05,0,800),hover:()=>tone(1000,.03,"sine",.02),tab:()=>{tone(420,.08,"triangle",.09,0,640);tone(640,.1,"triangle",.07,.07)},pop:()=>tone(280,.12,"sine",.1,0,720),open:()=>{tone(330,.09,"triangle",.08);tone(495,.1,"triangle",.07,.06)},close:()=>tone(520,.12,"triangle",.08,0,260),chirp:()=>{tone(900,.06,"sine",.06,0,1300);tone(1300,.08,"sine",.05,.07,1700)},talk:w=>w?tone(720,.07,"square",.035,0,920):tone(260,.1,"triangle",.07,0,340)};
 const sfxOf=el=>el.closest(".cx")?"close":el.closest("nav button,[role=tab]")?"tab":el.closest(".opt,.tile,.gbtn,.cell")?"pop":el.closest("summary")?"open":el.closest("button,a[href]")?"click":null;
 let lh=null,lt=0;const lite=ref((()=>{try{const v=localStorage.getItem("ova-lite");if(v!==null)return v==="1"}catch(e){}return(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4})());
 const rmx=()=>matchMedia("(prefers-reduced-motion:reduce)").matches;
 const rm=()=>lite.value||rmx();
 const liteToggle=()=>{lite.value=!lite.value;try{localStorage.setItem("ova-lite",lite.value?"1":"0")}catch(e){}};
 watch(lite,v=>document.documentElement.classList.toggle("lite",v),{immediate:true});
 document.addEventListener("visibilitychange",()=>document.documentElement.classList.toggle("hid",document.hidden));
 try{if(!lite.value&&localStorage.getItem("ova-lite")===null){let n=0,t0=0,bad=0;const probe=t=>{if(t0){n++;if(t-t0>34)bad++}t0=t;if(n<150)requestAnimationFrame(probe);else if(bad/n>.35)lite.value=true};setTimeout(()=>requestAnimationFrame(probe),3000)}}catch(e){}
 const mk=(c,x,y)=>{const i=document.createElement("i");i.className=c;i.style.left=x+"px";i.style.top=y+"px";document.body.appendChild(i);setTimeout(()=>i.remove(),750)};
 document.addEventListener("pointerdown",e=>{const el=e.target instanceof Element?e.target:null;if(!el)return;const k=sfxOf(el);if(k&&!el.closest("button:disabled"))SFX[k]();if(el.closest("button,summary")&&!rm())mk("cr",e.clientX,e.clientY)});
 document.addEventListener("pointerover",e=>{if(e.pointerType!=="mouse"||!(e.target instanceof Element))return;const b=e.target.closest("button:not(:disabled),summary,a[href]");if(b&&b!==lh&&!b.contains(e.relatedTarget)){lh=b;b.classList.contains("cib")?SFX.chirp():SFX.hover()}});
 document.addEventListener("pointermove",e=>{const n=Date.now();if(e.pointerType!=="mouse"||n-lt<70||rm())return;lt=n;mk("tr",e.clientX,e.clientY)});
 try{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("rvi");io.unobserve(x.target)}}),{threshold:.08});const scan=()=>document.querySelectorAll(".card:not(.rvq),details:not(.rvq)").forEach(n=>{n.classList.add("rvq");io.observe(n)});let sc=0;new MutationObserver(()=>{if(sc)return;sc=requestAnimationFrame(()=>{sc=0;scan()})}).observe(document.getElementById("app"),{childList:true,subtree:true});scan()}catch(e){}
 const toast=m=>{const id=++tid;toasts.value.push({id,m});setTimeout(()=>{toasts.value=toasts.value.filter(t=>t.id!==id)},1800)};
 const addXp=n=>{combo.value++;const b=combo.value>=3?Math.min(combo.value,5):0;n+=b;xp.value+=n;toast("+"+n+" XP"+(b?" 🔥":""));beep([660,880]);if(combo.value===3||combo.value===5)say(CMB);else react("ok")};
 watch(xp,n=>{const t=setInterval(()=>{xpShow.value<n?xpShow.value++:clearInterval(t)},25)});
 const lvl=computed(()=>Math.min(LV.length-1,Math.floor(xp.value/40))),xpPct=computed(()=>lvl.value===LV.length-1?100:xp.value%40/40*100);
 watch(lvl,()=>{burst();toast("🎉 ¡Nuevo nivel!");react("lvl");[523,659,784,1047,1319].forEach((f,i)=>tone(f,.18,"triangle",.1,i*.1))});
 const nOn=computed(()=>on.filter(Boolean).length);
 watch(nOn,n=>{if(n===6){burst();toast("🏅 ¡Diploma desbloqueado!")}});
 watch([xp,nOn],()=>{try{localStorage.setItem("ova-cd",JSON.stringify({xp:xp.value,on:[...on]}))}catch(e){}});
 const theme=()=>{const d=document.documentElement,dk=matchMedia("(prefers-color-scheme: dark)").matches,c=d.dataset.theme||(dk?"dark":"light");d.dataset.theme=c==="dark"?"light":"dark"};
 const seen=ref([sec.value]);watch(sec,s=>{if(!seen.value.includes(s))seen.value.push(s)});
 const plg=reactive(Array(5).fill(false)),nPlg=computed(()=>plg.filter(Boolean).length),signed=ref(false),sign=()=>{signed.value=true;badge(10)};
 const sp=ref(null),mood=reactive(["",""]);let spk=0,tq=[],tt;const rnd=n=>Math.floor(Math.random()*n);
 const act=(w,m)=>{mood[w]=m;setTimeout(()=>{mood[w]=""},700)};
 const say=ls=>{if(gate.value!=="in")return;clearTimeout(tt);tq=ls.slice();const nx=()=>{const l=tq.shift();if(!l){tt=setTimeout(()=>{sp.value=null},2400);return}if(l[0]===3){if(!jOn.value)return nx();jSay(l[1])}else if(l[0]===2){if(!cOn.value)return nx();cSay(l[1])}else{SFX.talk(l[0]);cb.value=""}if(l[0]!==3)jb.value="";sp.value={w:l[0],t:l[1],k:++spk};act(l[0],l[2]||"hop");if(Math.random()<.5){const o=[0,1,2,3].filter(x=>x!==l[0]&&(x<2||(x===2?cOn.value:jOn.value)));setTimeout(()=>act(o[rnd(o.length)],["hop","wave","hi5"][rnd(3)]),600)}tt=setTimeout(nx,2900)};nx()};
 const react=k=>{const a=jOn.value&&JR[k]&&Math.random()<.4?JR[k]:REA[k];say(a[rnd(a.length)])};
 let lp=[-1,0];const poke=w=>{const t=Date.now();if(lp[0]===1-w&&t-lp[1]<2500){lp=[-1,0];burst();say(DUOP[rnd(DUOP.length)]);act(0,"dance");act(1,"dance");return}lp=[w,t];if(jOn.value&&Math.random()<.4){say(JTRIO[rnd(JTRIO.length)]);return}if(cOn.value&&Math.random()<.5){say(TRIO[rnd(TRIO.length)]);return}say(w===0?[[0,"💡 "+FACTS[rnd(FACTS.length)],"wave"],[1,PXR[rnd(PXR.length)],"hop"]]:[...BAN,...SKITS][rnd(BAN.length+SKITS.length)])};
 watch(sec,s=>secSay(s));
 setInterval(()=>{if(!sp.value)say(jOn.value&&Math.random()<.45?JIDLE[rnd(JIDLE.length)]:cOn.value&&Math.random()<.6?TRIO[rnd(TRIO.length)]:IDLE[rnd(IDLE.length)])},18000);
 const gi=ref(0),award=ref(null),scrollP=ref(0);let ak=0,gt;
 const gPlay=()=>{clearInterval(gt);gi.value=0;act(0,"wave");gt=setInterval(()=>{if(gate.value==="in"){clearInterval(gt);return}gi.value=(gi.value+1)%GL.length;act(GL[gi.value][0],GL[gi.value][2]||"hop")},3400)};
 gPlay();
 const gPoke=w=>{act(w,w?"spin":"wave");beep([w?740:520])};
 const enter=()=>{gate.value="in";clearInterval(gt);scrollTo(0,0);burst();beep([523,659,784,1047]);setTimeout(()=>secSay(sec.value),1200)};
 const later=()=>{gate.value="no";act(0,"wave");act(1,"shk");beep([392,330])};
 const toIntro=()=>{clearTimeout(tt);sp.value=null;gate.value="intro";scrollTo(0,0);gPlay()};
 const hasProg=computed(()=>xp.value>0||nOn.value>0);
 const visits={};let secT=0;
 const secSay=s=>{const v=DLG2[s],n=visits[s]||0;visits[s]=n+1;say((n&&v?v[rnd(v.length)]:(DLG[s]||[])).concat(cOn.value&&CIN[s]?CIN[s][rnd(CIN[s].length)]:[]).concat(jOn.value&&JIN[s]?JIN[s][rnd(JIN[s].length)]:[]))};
 watch(sec,()=>{secT=Date.now()});
 const tg=(i,e)=>{if(Date.now()-secT<1500||!e.target.open)return;if(Math.random()<.8)say(TOG[i])};
 const RM=()=>matchMedia("(prefers-reduced-motion:reduce)").matches;
 const quizTop=()=>nextTick(()=>{const e=document.getElementById("quiz");if(e)e.scrollIntoView({behavior:RM()?"auto":"smooth",block:"start"})});
 const showAward=i=>{const k=++ak;award.value={e:BN[i][0],n:BN[i][1],k};setTimeout(()=>{if(award.value&&award.value.k===k)award.value=null},2300)};
 let sq=0;addEventListener("scroll",()=>{if(sq)return;sq=requestAnimationFrame(()=>{sq=0;const h=document.documentElement,m=h.scrollHeight-innerHeight;const v=m>0?Math.round(Math.min(1,h.scrollTop/m)*200)/200:0;if(v!==scrollP.value)scrollP.value=v})},{passive:true});
 const sparks=ref([]);let sid=0;
 addEventListener("pointerdown",e=>{const id=++sid;sparks.value.push({id,e:["✨","⭐","💫","🎈"][id%4],s:{left:e.clientX+"px",top:e.clientY+"px"}});setTimeout(()=>{sparks.value=sparks.value.filter(x=>x.id!==id)},800)});
 const nextSec=computed(()=>SECS[secIdx.value+1]),nextReady=computed(()=>sec.value==="actividades"?done.value:sec.value==="evaluacion"?qdone.value:true);
 const mkMC=()=>MP.flatMap((p,k)=>[[k,p[0]],[k,p[1]]]).sort(()=>Math.random()-.5);
 const MC=ref(mkMC()),mf=ref([]),md=ref([]),mv=ref(0);
 const memTap=i=>{if(mf.value.length>=2||mf.value.includes(i))return;mf.value.push(i);if(mf.value.length===2){mv.value++;const[a,b]=mf.value;if(MC.value[a][0]===MC.value[b][0]){md.value.push(a,b);mf.value=[];addXp(5);if(md.value.length===MC.value.length)badge(12)}else{beep([180]);setTimeout(()=>{mf.value=[]},900)}}};
 const memReset=()=>{MC.value=mkMC();mf.value=[];md.value=[];mv.value=0};
 const ag=reactive({on:false,t:20,s:0,x:0,c:Array(6).fill(null)});let agT,agS,agid=0;
 const agStart=()=>{clearInterval(agT);clearInterval(agS);Object.assign(ag,{on:true,t:20,s:0,x:0,c:Array(6).fill(null)});
  agS=setInterval(()=>{const i=rnd(6),m=AP[rnd(AP.length)],id=++agid;ag.c[i]={id,e:m[0],t:m[1],a:m[2]};setTimeout(()=>{if(ag.c[i]&&ag.c[i].id===id)ag.c[i]=null},1800)},750);
  agT=setInterval(()=>{if(--ag.t<=0){clearInterval(agT);clearInterval(agS);ag.on=false;ag.c.fill(null);if(ag.s>=8)badge(13)}},1000)};
 const agTap=i=>{const m=ag.c[i];if(!m||!ag.on)return;ag.c[i]=null;if(m.a){ag.s++;beep([880])}else{ag.x++;beep([180])}};
 const rs=ref(false),resetP=()=>{if(!rs.value){rs.value=true;setTimeout(()=>{rs.value=false},3000);return}try{localStorage.removeItem("ova-cd")}catch(e){}location.reload()};
 const badge=i=>{const nw=!on[i];if(nw)addXp(20);on[i]=true;if(nw)showAward(i);burst();beep([523,659,784,1047]);react("badge")};
 const sl=ref(null),mt=ref([]),bad=ref(null);
 const pairTo=j=>{if(sl.value===null)return;if(j===sl.value){mt.value.push(j);addXp(5);if(mt.value.length===PR.length)badge(7)}else{beep([180]);bad.value=j;setTimeout(()=>{bad.value=null},500)}sl.value=null};
 const od=ref([]),ob=ref(null);
 const ordTap=j=>{if(j===od.value.length){od.value.push(j);if(od.value.length===OST.length){addXp(15);badge(8)}}else{beep([180]);ob.value=j;setTimeout(()=>{ob.value=null},500)}};
 // casos
 const ci=ref(0),k=ref(0),pts=ref(0),sel=ref(null),done=ref(false);
 const st=computed(()=>CASES[ci.value].steps[k.value]);
 const runCase=i=>{ci.value=i;k.value=0;pts.value=0;sel.value=null;done.value=false};
 const pickCase=j=>{if(sel.value!==null)return;sel.value=j;pts.value+=st.value.o[j][1];const v=st.value.o[j][1];cLuz(v===2?"g":v===1?"y":"r");if(v)addXp(v*5);else react("bad")};
 const nextCase=()=>{sel.value=null;if(k.value<CASES[ci.value].steps.length-1)k.value++;else{done.value=true;if(pts.value>=4)badge(0)}};
 // quiz
 const qi=ref(0),qs=ref(0),qa=ref(null),qr=ref([]);
 const answer=j=>{if(qa.value!==null)return;qa.value=j;const okq=j===QUIZ[qi.value][2];qr.value.push(okq);if(okq){qs.value++;addXp(10)}else beep([180]);const L=okq?QOK:QBAD;say(L[rnd(L.length)]);nextTick(()=>{const e=document.getElementById("qnext");if(e)e.scrollIntoView({behavior:RM()?"auto":"smooth",block:"nearest"})})};
 const nextQ=()=>{qi.value++;qa.value=null;if(qi.value>=QUIZ.length){if(qs.value>=Math.ceil(QUIZ.length*.7))badge(4);const r=qs.value/QUIZ.length;say(r>=.85?QEND[0]:r>=.6?QEND[1]:QEND[2])}else if(qi.value%5===0)say(QMID[qi.value/5-1]||QMID[0]);quizTop()};
 const quizReset=()=>{qi.value=0;qs.value=0;qa.value=null;qr.value=[];quizTop()};
 const qdone=ref(false);
 const qOk=()=>{cLuz("g");addXp(10);say(QOK[rnd(QOK.length)])};
 const qBad=()=>{cLuz("r");beep([180]);say(QBAD[rnd(QBAD.length)])};
 const qMid=n=>say(QMID[n/5-1]||QMID[0]);
 const qDone=sc=>{qdone.value=true;if(sc>=Math.ceil(QUIZ.length*.7))badge(4);const r=sc/QUIZ.length;say(r>=.85?QEND[0]:r>=.6?QEND[1]:QEND[2])};
 const chk=reactive([false,false,false]),nChk=computed(()=>chk.filter(Boolean).length);
 // retos
 const pw=ref(""),pwS=computed(()=>{const v=pw.value;if(!v)return 0;let s=0;if(v.length>=8)s++;if(v.length>=12)s++;if(/[a-z]/.test(v)&&/[A-Z]/.test(v))s++;if(/\d/.test(v))s++;if(/[^A-Za-z0-9]/.test(v))s++;if(/^(123|abc|qwe|pass|clave)/i.test(v)||/(.)\1\1/.test(v))s=Math.max(0,s-2);return s});
 watch(pwS,s=>{if(s>=4&&!on[3])badge(3)});
 const flip=reactive([false,false,false,false]);
 const nextFact=()=>{fi.value=(fi.value+1)%FACTS.length;say(DUOF[rnd(DUOF.length)])};
 const shuf=s=>{const a=s.split("");for(let t=0;t<9;t++){a.sort(()=>Math.random()-.5);if(a.join("")!==s)break}return a};
 const wi=ref(0),tl=ref(shuf(WORDS[0][0])),pk=ref([]),ws=ref(0);
 const wTap=x=>{const w=WORDS[wi.value][0];if(pk.value.includes(x)||pk.value.length>=w.length)return;pk.value.push(x);if(pk.value.length===w.length){if(pk.value.map(i=>tl.value[i]).join("")===w){ws.value++;addXp(10);const l=wi.value+1;setTimeout(()=>{wi.value=l;pk.value=[];if(l<WORDS.length)tl.value=shuf(WORDS[l][0]);else badge(16)},700)}else{beep([180]);setTimeout(()=>{pk.value=[]},700)}}};
 const wUndo=()=>{pk.value.pop()},wReset=()=>{wi.value=0;ws.value=0;pk.value=[];tl.value=shuf(WORDS[0][0])};
 const sm=reactive({r:0,seq:[],pos:0,lit:-1,go:false,run:false,msg:"Pulsa empezar"});
 const smPlay=i=>{if(i>=sm.seq.length){sm.go=true;sm.msg="¡Tu turno!";return}setTimeout(()=>{sm.lit=sm.seq[i];beep([300+sm.seq[i]*150],.2);setTimeout(()=>{sm.lit=-1;smPlay(i+1)},450)},350)};
 const smNext=()=>{sm.r++;sm.seq.push(rnd(4));sm.pos=0;sm.go=false;sm.msg="Mira…";smPlay(0)};
 const smStart=()=>{sm.seq=[];sm.r=0;sm.run=true;say([[1,"¡Mira bien mis luces!","hop"]]);smNext()};
 const smTap=i=>{if(!sm.go)return;sm.lit=i;setTimeout(()=>{sm.lit=-1},200);if(i===sm.seq[sm.pos]){beep([300+i*150],.15);sm.pos++;if(sm.pos===sm.seq.length){sm.go=false;if(sm.r>=6){sm.run=false;sm.msg="¡Ganaste!";addXp(10);badge(17)}else{sm.msg="¡Bien!";setTimeout(smNext,800)}}}else{sm.go=false;sm.run=false;sm.msg="Fallaste en la ronda "+sm.r;beep([180])}};
 const ds=ref(0),MED=computed(()=>nOn.value>=BN.length?"Oro":nOn.value>=12?"Plata":"Bronce"),TODAY=new Date().toLocaleDateString("es-CO",{day:"numeric",month:"long",year:"numeric"});
 const printD=()=>{say([[0,"¡Qué diploma tan elegante!"],[1,"¡Pégalo en tu cuaderno!","wave"]]);setTimeout(()=>window.print(),400)};
 const cel=ref(false),cv=ref(null),celL=ref(null),celM=reactive(["","","",""]),celT=computed(()=>"¡Felicitaciones, "+nm.value+"!");let raf=0,cst,cli=0,fm=null,parts=[];
 const FWC=["#ffc93c","#ff6b8b","#6bc4e8","#6ff08c","#b58cff","#fff"];
 const stopFiesta=()=>{try{if(fm){fm.gain.setTargetAtTime(0,ac.currentTime,.2);fm=null}}catch(e){}};
 const fiesta=()=>{if(!snd.value)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();stopFiesta();const m=ac.createGain();m.gain.value=.9;m.connect(ac.destination);fm=m;const B=60/132,T=ac.currentTime+.05;
  const n=(f,t,d,ty,v)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(m);o.start(t);o.stop(t+d+.02)};
  const ns=(t,d,v,fq)=>{const b=ac.createBuffer(1,Math.floor(ac.sampleRate*d),ac.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*(1-i/a.length);const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=b;f.type="highpass";f.frequency.value=fq;g.gain.value=v;s.connect(f);f.connect(g);g.connect(m);s.start(t)};
  const k=t=>{const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);o.connect(g);g.connect(m);o.start(t);o.stop(t+.2)};
  const M=[[0,4,7,4,12,7,4,7],[9,12,9,7,4,9,12,16],[5,9,12,9,17,12,9,5],[7,11,14,11,12,11,7,2]],R=[130.81,110,87.31,98],CH=[[0,4,7],[9,12,16],[5,9,12],[7,11,14]];
  for(let bar=0;bar<8;bar++){const c=bar%4,tb=T+bar*4*B;M[c].forEach((x,i)=>n(523.25*2**(x/12),tb+i*B/2,B*.45,bar<4?"triangle":"square",bar<4?.16:.07));CH[c].forEach(x=>n(261.63*2**(x/12),tb,B*3.8,"sine",.05));for(let q=0;q<4;q++){n(R[c],tb+q*B,B*.8,"sine",.3);k(tb+q*B);if(q%2)ns(tb+q*B,.12,.12,1800)}for(let i=0;i<8;i++)ns(tb+i*B/2+B/4,.04,.05,7000)}
  const e=T+32*B;[0,4,7,12,16].forEach((x,i)=>n(523.25*2**(x/12),e+i*.06,1.8,"triangle",.14));ns(e,1.2,.12,5000);k(e);setTimeout(stopFiesta,(32*B+2.2)*1000)}catch(e){}};
 const boom=()=>tone(180,.18,"triangle",.035,0,50);
 const fwStart=()=>{const c=cv.value;if(!c||rmx())return;c.width=innerWidth;c.height=innerHeight;parts=[];let f=0;const x=c.getContext("2d");const loop=()=>{if(!cel.value)return;f++;x.clearRect(0,0,c.width,c.height);const nw=[];
  if(f%34===1)parts.push({k:"r",x:c.width*(.12+Math.random()*.76),y:c.height,vx:Math.random()*2-1,vy:-(c.height/60+Math.random()*3),c:FWC[rnd(6)]});
  if(f%(lite.value?6:3)===0&&parts.length<260)parts.push({k:"c",x:Math.random()*c.width,y:-10,vx:Math.random()*2-1,vy:2+Math.random()*3,a:Math.random()*6,c:FWC[rnd(6)]});
  parts=parts.filter(q=>{q.x+=q.vx;q.y+=q.vy;if(q.k==="r"){q.vy+=.07;if(q.vy>-1){const NP=lite.value?30:46;for(let i=0;i<NP;i++){const a=Math.PI*2*i/NP,v=1.5+Math.random()*3.2;nw.push({k:"s",x:q.x,y:q.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,c:q.c,l:70})}boom();return false}x.fillStyle="#fff";x.fillRect(q.x,q.y,3,9);return true}
   if(q.k==="s"){q.vy+=.045;q.vx*=.985;q.l--;x.globalAlpha=Math.max(0,q.l/70);x.fillStyle=q.c;x.beginPath();x.arc(q.x,q.y,2.4,0,7);x.fill();x.globalAlpha=1;return q.l>0}
   q.a+=.15;x.save();x.translate(q.x,q.y);x.rotate(q.a);x.fillStyle=q.c;x.fillRect(-4,-2,8,4);x.restore();return q.y<c.height+10}).concat(nw);raf=requestAnimationFrame(loop)};loop()};
 const CELL=n=>[[0,"¡"+n+", lo lograste! Pensaste con cabeza y corazón."],[1,"¡Que suene la música! 🎶"],[2,"Hoy soy arcoíris: ¡luz verde total! 🌈"],[0,"Recuerda: pausa, piensa, protege."],[1,"¡Y yo traigo galletas para todos! 🍪"],[2,"Eres guardián de tu huella digital."],[0,"Comparte lo aprendido con tu familia."],[1,"¡Choca esos cinco! ✋"],[2,"¡Hasta la próxima misión!"]];
 const celSeq=()=>{clearInterval(cst);cli=0;const L=CELL(nm.value);const st=()=>{const l=L[cli%L.length];celL.value={w:l[0],t:l[1],k:++cli};celM[l[0]]="dance";setTimeout(()=>{celM[l[0]]=""},750);if(l[0]===0)tone(260,.1,"triangle",.05,0,340);else if(l[0]===1)tone(720,.07,"square",.03,0,920);else SFX.chirp()};st();cst=setInterval(st,2600)};
 const celAgain=()=>{burst();fiesta();celSeq()};
 const celClose=()=>{cel.value=false;stopFiesta();clearInterval(cst);cancelAnimationFrame(raf);celL.value=null};
 const celebrate=()=>{cel.value=true;burst();sp.value=null;nextTick(()=>{fwStart();fiesta();celSeq()})};
 const TPT=["⏱️ Reloj","🎲 Sorteo","🗳️ Votos","📋 Guía","⚙️ Aula"],tpi=ref(0),proj=ref(false),quiet=ref(false),calm=ref(false);
 const tmr=reactive({tot:600,left:600,run:false});let tmi;const tmFmt=computed(()=>String(Math.floor(tmr.left/60)).padStart(2,"0")+":"+String(tmr.left%60).padStart(2,"0"));
 const tmSet=mn=>{clearInterval(tmi);tmr.tot=tmr.left=mn*60;tmr.run=false};
 const tmToggle=()=>{if(tmr.run){tmr.run=false;clearInterval(tmi);return}if(tmr.left<=0)tmr.left=tmr.tot;tmr.run=true;tmi=setInterval(()=>{tmr.left--;if(tmr.left===60)say([[0,"¡Queda un minuto!","wave"]]);if(tmr.left<=0){tmr.run=false;clearInterval(tmi);[880,660,880,660,880].forEach((f,i)=>tone(f,.18,"square",.07,i*.22));toast("⏰ ¡Tiempo!");burst();say([[0,"¡Tiempo! Guarden lo que hacen.","wave"],[1,"¡Bien hecho, equipo! 👏","hi5"]])}},1000)};
 const names=ref(""),pickN=ref(""),spinning=ref(false),usedN=ref([]);
 const rollName=()=>{const L=names.value.split(/[\n,]+/).map(x=>x.trim()).filter(Boolean);if(!L.length||spinning.value)return;let P=L.filter(x=>!usedN.value.includes(x));if(!P.length){usedN.value=[];P=L}const w=P[rnd(P.length)];spinning.value=true;let n=0;const h=setInterval(()=>{pickN.value=L[rnd(L.length)];tone(500+n*25,.05,"square",.04);if(++n>16){clearInterval(h);pickN.value=w;spinning.value=false;usedN.value.push(w);burst();[659,784,1047].forEach((f,i)=>tone(f,.15,"triangle",.09,i*.1))}},90)};
 const vt=reactive([0,0,0]),vote=(i,d)=>{vt[i]=Math.max(0,vt[i]+d)};
 const GS=[["S1 · 0–5′","Portada y mapa de la misión","inicio"],["S1 · 5–15′","Contenido: huella, cyberbullying, netiqueta","objetivos"],["S1 · 15–40′","Casos: votar la luz y debatir","actividades"],["S1 · 40–45′","Cierre: un compromiso en voz alta","objetivos"],["S2 · 0–20′","Retos en parejas (1–18)","retos"],["S2 · 20–35′","Quiz y autoevaluación","evaluacion"],["S2 · 35–40′","Recursos para casa","recursos"],["S2 · 40–45′","Diploma y celebración","diploma"]];
 const gd=reactive(Array(GS.length).fill(false)),gdN=computed(()=>gd.filter(Boolean).length);
 const wk=ref(0);watch(sec,()=>{wk.value++;setTimeout(()=>{wk.value=0},900)});
 const toTop=()=>{scrollTo({top:0,behavior:rm()?"auto":"smooth"});SFX.pop()};
 const sealPop=()=>{SFX.chirp();[523,659,784,1047].forEach((f,i)=>tone(f,.12,"triangle",.07,i*.07));burst();say([[1,"¡Brilla tu sello! ✨","dance"],[0,"Te lo ganaste.","wave"]])};
 watch(nm,(v,o)=>{if(v&&!o){burst();say([[1,"¡Qué diploma tan bonito!","dance"],[0,"Te lo ganaste con esfuerzo."]])}});

 const CIB=[["👣","Huella digital","Todo lo que publicas, buscas o te gusta deja un rastro. Puede durar años y ser copiado aunque lo borres.","Pregúntate: ¿me gustaría que esto se viera dentro de 5 años?"],["🕶️","Privacidad","Tu ubicación, colegio, horarios y fotos con uniforme dicen quién eres. Deja tus perfiles privados y acepta solo a quien conoces.","Mira el fondo de la foto: ¿muestra algo que no quieres compartir?"],["🔑","Seguridad de cuentas","Usa claves largas y distintas, activa la verificación en dos pasos y no compartas códigos, ni con amigos.","Una frase larga como mi-perro-come-pan-azul-7 protege más que Juan2010."],["⚠️","Consecuencias","Un mensaje enviado en mal momento puede herir, traer sanciones o permitir que suplanten tu identidad.","Regla de Ciber: pausa, piensa, protege. Si dudas, no publiques."]];
 const SCN=["Muestra mi casa, mi colegio o dónde estoy ahora","Incluye a otra persona sin su permiso","Tiene claves, códigos o datos de mis cuentas","Me daría pena que lo vea mi familia o un futuro empleador","Lo publico por rabia o por presión de otros"];
 const CIBS={objetivos:"Soy Ciber. Mi misión: que veas el riesgo antes de publicar.",actividades:"Antes de elegir, mira qué dato personal se comparte.",retos:"Truco de camaleón: ponte en modo privado.",evaluacion:"Piensa como detective: ¿qué rastro deja esto?",recursos:"Revisa hoy la privacidad de tus apps.",diploma:"Tu apodo no debe llevar datos privados.",creditos:"¡Buen trabajo! Tu huella hoy fue positiva."};
 const cp=ref(false),ct=ref(0),cb=ref(""),cping=ref(false),cfly=ref(false),cseen={};let cbt;
 const CSEC=["objetivos","actividades","retos"],cvis=ref(false),ctl=ref("");let cvt,ctt;
 const cOn=computed(()=>gate.value==="in"&&(CSEC.includes(sec.value)||cvis.value||cp.value));
 const cCall=ms=>{cvis.value=true;clearTimeout(cvt);cvt=setTimeout(()=>{cvis.value=false},ms)};
 const cTl=(c,ms=7000)=>{ctl.value=c;clearTimeout(ctt);ctt=setTimeout(()=>{ctl.value=""},ms)};
 const LZ={g:["¡Luz verde! Eso cuida tus datos.","Verde: buena decisión de ciudadano digital.","Me puse verde de orgullo. 🟢"],y:["Luz amarilla: piénsalo dos veces.","Amarillo = precaución. Revisa los detalles."],r:["¡Luz roja! Pausa, piensa, protege.","Me puse rojo: frena y pide ayuda.","Rojo: no publiques; habla con un adulto."]};
 const luzSnd=c=>({g:[523,659,784],y:[440,440],r:[180,150]})[c].forEach((x,i)=>tone(x,.14,c==="r"?"sawtooth":"triangle",.07,i*.12));
 const cLuz=(c,ms)=>{cTl(c,ms);if(!CSEC.includes(sec.value))cCall(9000);luzSnd(c);setTimeout(()=>{if(cOn.value){cSay(LZ[c][rnd(LZ[c].length)]);act(2,c==="g"?"hop":c==="r"?"shk":"wave")}},650)};
 const TRIO=[[[2,"Pixel, ¿viste mi antena brillar?","wave"],[1,"¡Parece luz de discoteca! 🪩","dance"],[0,"Es su alerta de riesgos, Pixel.","hop"]],[[1,"Ciber, ¿puedes ponerte invisible?","hop"],[2,"Solo de color, no de responsabilidad.","hop"],[0,"Eso es ser ciudadano digital.","hi5"]],[[0,"Equipo: ¿qué hacemos ante una burla en el chat?","wave"],[2,"Pausa y captura de pantalla.","hop"],[1,"¡Bloqueo y se lo cuento a un adulto!","hi5"]],[[2,"Regla de camaleón: pausa, piensa, protege.","wave"],[1,"¡Y luego comparte galletas! 🍪","hop"],[0,"Pixel, esa regla no existe.","shk"],[2,"Ahora sí existe. 🦎","spin"]],[[1,"Ciber, ¿de qué color eres en peligro?","hop"],[2,"Rojo alerta. ¡Mira cómo cambio!","shk"],[0,"Y verde cuando todo va bien.","wave"]],[[0,"Tres amigos, tres superpoderes: sabiduría, diversión y protección.","wave"],[1,"¡Yo soy la diversión!","dance"],[2,"Y yo, la protección.","hi5"]],[[2,"¿Quién tiene una clave larga y única?","wave"],[1,"Eh… ¿zorro123?","shk"],[0,"¡Pixel!","shk"],[2,"Mejor: mi-zorro-baila-azul-9","hop"]],[[1,"Búho, reto: ¿quién cambia más rápido?","hop"],[0,"Yo no cambio: soy sabio y constante.","wave"],[2,"Yo cambio de color, no de valores.","spin"],[1,"¡Yo cambio de snack! 🍿","dance"]]];
 const CIN={objetivos:[[[2,"¡Aquí aparezco yo! Te explico huella y privacidad.","wave"],[0,"Ciber cambia de color, nunca de valores.","hop"],[1,"¡Yo quiero ese poder! 🦎","spin"]]],actividades:[[[2,"Cada decisión cambia mi color: verde, amarillo o rojo.","hop"],[1,"¿Y si me equivoco te pones rojo de pena?","shk"],[2,"Solo de alerta. ¡Y aprendemos!","wave"]]],retos:[[[2,"Mi escáner te ayuda a pensar antes de publicar.","hi5"],[0,"Úsalo siempre.","wave"],[1,"¡Yo lo uso en mis fotos de zorro!","hop"]]]};
 TRIO.push([[1,"¿Qué hacemos con un mensaje de “ganaste un premio”?","hop"],[2,"Bandera roja: prisa + premio.","shk"],[0,"Lo mostramos a un adulto.","wave"]],[[0,"Ciber, ¿qué es la netiqueta?","wave"],[2,"Respeto también en línea.","hop"],[1,"¡Sin MAYÚSCULAS gritonas!","dance"]],[[2,"Pixel, ¿subirías una foto del colegio con ubicación?","wave"],[1,"¿Y si pongo solo un corazón?","hop"],[2,"Corazón sí, ubicación no. 🔒","hi5"]],[[1,"¡Búho! Ciber se puso morado.","shk"],[0,"Debe ser un reflejo del cielo.","wave"],[2,"Es mi modo misterio. 🕵️","spin"]],[[0,"Antes de reenviar, ¿qué preguntamos?","wave"],[1,"¿Quién lo hizo?","hop"],[2,"¿Y a quién puede herir?","wave"],[0,"Excelente equipo.","hi5"]],[[2,"Dato: borrar no es desaparecer.","wave"],[1,"¡Entonces pienso antes de publicar!","hop"],[0,"Esa es la idea, Pixel.","hi5"]],[[1,"¿Hacemos una ola?","dance"],[0,"Una ola de respeto.","wave"],[2,"¡Ola camaleónica! 🌈","spin"]],[[0,"Si te acosan en línea, ¿qué haces?","wave"],[1,"Bloqueo.","hop"],[2,"Guardo pruebas.","hop"],[0,"Y cuento a un adulto. ¡Equipo completo!","hi5"]]);
 IDLE.push([[1,"Búho, ¿puedo ser tu ayudante hoy?","hop"],[0,"Si prometes revisar dos veces cada clic.","wave"],[1,"¡Prometido! 🤞","hi5"]],[[0,"Pixel, ¿qué es una buena clave?","wave"],[1,"Larga, única y secreta.","hop"],[0,"¡Excelente!","hi5"]],[[1,"¿Sabías que mi cola es muy digital?","hop"],[0,"No sé qué significa eso.","shk"],[1,"Yo tampoco. 😄","dance"]],[[0,"Dato: los espectadores pueden frenar el acoso.","wave"],[1,"¡Seré un espectador valiente!","hop"]]);
 SKITS.push([[1,"Búho, ¿me cuentas un secreto de contraseñas?","hop"],[0,"Si te lo cuento, deja de ser secreto.","wave"],[1,"¡Ja! Buena respuesta.","hi5"]],[[0,"Pixel, ¿cuántas apps tienes con ubicación?","wave"],[1,"Eh… ¿todas?","shk"],[0,"Revisemos permisos hoy mismo.","hop"]]);
 const CHT=[[[0,"Huella digital: lo que publicas se queda.","wave"],[1,"¡Como mis pisadas en el barro! 🐾","hop"]],[[1,"¿Puedo poner mi dirección en el perfil?","hop"],[0,"¡No! Privacidad primero.","shk"]],[[0,"Clave larga, única y secreta.","wave"],[1,"Entonces… ¿cambio zorro123? 😅","shk"]],[[0,"Un mensaje impulsivo puede doler.","wave"],[1,"Pausa, piensa, protege. ¡Ya lo aprendí!","hi5"]]];
 watch(ct,i=>{if(cp.value&&CHT[i])say(CHT[i])});
 const dbl=w=>{act(w,"spin");SFX.chirp();burst();say(TRIO[rnd(TRIO.length)])};
 watch(teacher,v=>say(v?[[0,"Modo docente: herramientas arriba.","wave"],[1,"¡Reloj, sorteo y votos! 🎲","hop"]]:[[1,"Volvemos al modo estudiante. ¡A jugar!","hop"]]));
 watch(snd,v=>say(v?[[1,"¡Sonido activado! 🔊","hop"]]:[[0,"Modo silencio. Concentración total.","wave"]]));
 const callCiber=()=>{cCall(16000);nextTick(()=>say(TRIO[rnd(TRIO.length)]))};
 watch(cOn,v=>{if(v)tone(260,.3,"sine",.08,0,980);else{cb.value="";ctl.value="";tone(900,.2,"sine",.06,0,250)}});
 const SEM=[["Foto con mi uniforme, la fachada del colegio y la ubicación activada","r","Muestra dónde estudias y dónde estás."],["Un meme que hice yo, sin datos personales","g","No expone datos ni a otras personas."],["Comparto el código que me llegó por mensaje","r","Los códigos nunca se comparten."],["Comento “¡buen partido!” en la foto de un compañero, con respeto","g","Es un mensaje amable y seguro."],["Subo una foto grupal sin pedir permiso","y","Pide permiso antes de publicar a otros."],["Cambio mi clave por una frase larga y única","g","Las claves largas protegen más."],["Acepto a alguien que dice ser amigo de un amigo","y","Verifica quién es antes de aceptar."],["Reenvío un audio burlón de la profesora","r","Es cyberbullying y deja huella."]];
 const LUCES=[["g","🟢 Verde"],["y","🟡 Amarilla"],["r","🔴 Roja"]];
 const sem=reactive({i:0,ok:0,r:null,done:false,paid:false});
 const semPick=c=>{if(sem.r!==null)return;const k=SEM[sem.i][1];sem.r=c===k;if(sem.r){sem.ok++;addXp(5)}else{combo.value=0}cLuz(k,5000)};
 const semNext=()=>{sem.r=null;if(sem.i<SEM.length-1)sem.i++;else{sem.done=true;burst();if(sem.ok>=6&&!sem.paid){sem.paid=true;addXp(10)}}};
 const semReset=()=>{sem.i=0;sem.ok=0;sem.r=null;sem.done=false};
 const FX=Array.from({length:14},(_,i)=>({e:["🔒","💬","❤️","📷","🛡️","⭐","🔑","🌐"][i%8],s:{left:(i*7+5)%96+"%",fontSize:1.2+(i%3)*.6+"rem",animationDuration:14+(i*5)%12+"s",animationDelay:-(i*3)%14+"s"}}));
 const scn=reactive(Array(SCN.length).fill(false)),nScn=computed(()=>scn.filter(Boolean).length);
 const verdict=computed(()=>nScn.value===0?["g","🟢 Luz verde","Publica con calma y sigue cuidando tus datos."]:nScn.value===1?["y","🟡 Luz amarilla","Quita o cambia ese dato antes de publicar."]:["r","🔴 Luz roja","Detente y habla con un adulto de confianza."]);
 watch(()=>verdict.value[0],v=>{cTl(v,60000);luzSnd(v)});
 const cSay=t=>{clearTimeout(cbt);jb.value="";sp.value=null;cb.value=t;SFX.chirp();cping.value=true;cbt=setTimeout(()=>{cb.value="";cping.value=false},5200)};
 const cTry=(s,n)=>{if(n>5||sec.value!==s||!cOn.value)return;if(sp.value||cp.value){setTimeout(()=>cTry(s,n+1),3000);return}cSay(CIBS[s])};
 const cToggle=()=>{cp.value=!cp.value;cb.value="";cping.value=false;cfly.value=true;setTimeout(()=>{cfly.value=false},800);beep([620,820],.1);if(cp.value)say([[0,"Ciber abre su escáner. ¡Escúchalo!","wave"],[1,"¡Yo lo uso antes de cada foto!","hop"]])};
 watch(sec,s=>{if(cseen[s]||!CIBS[s])return;cseen[s]=1;setTimeout(()=>cTry(s,0),7000)});
 
const JSEC=["actividades","retos"],jvis=ref(false),jb=ref(""),jping=ref(false);let jvt,jbt;
const jOn=computed(()=>gate.value==="in"&&!cp.value&&(sec.value==="actividades"||(jvis.value&&sec.value!=="retos")||(sec.value==="retos"&&JV.on)));
const jFix=computed(()=>jOn.value&&sec.value!=="retos");
const scr=ref(false);let sct;addEventListener("scroll",()=>{scr.value=true;clearTimeout(sct);sct=setTimeout(()=>{scr.value=false},900)},{passive:true});
const jSay=t=>{clearTimeout(jbt);cb.value="";sp.value=null;jb.value=t;beep([740,740,988]);jping.value=true;jbt=setTimeout(()=>{jb.value="";jping.value=false},5200)};
const jCall=ms=>{jvis.value=true;clearTimeout(jvt);jvt=setTimeout(()=>{jvis.value=false},ms)};
const JFR=["¡En la cancha y en internet, piensa antes de jugar!","¡No dejes la portería abierta! Protege tus datos.","¡Levanta la cabeza, analiza la jugada y elige el mejor pase!","En mi equipo nadie humilla a nadie: eso es juego limpio.","Una clave débil es un arco sin portero. 🥅"];
const JTRIO=[[[3,"Búho, ¿me prestas tu sabiduría para el partido?","wave"],[0,"Con gusto: pensar antes de pasar.","hop"],[3,"¡Esa es mi jugada favorita!","hi5"]],[[1,"Júnior, ¿puedo jugar de delantero?","hop"],[3,"Solo si primero revisas el chat del equipo.","wave"],[1,"¡Voy! …y luego pateo.","dance"]],[[2,"Júnior, mi radar detecta un enlace sospechoso.","shk"],[3,"¡Falta! No hagas clic y avisa al técnico.","shk"],[2,"El técnico es un adulto de confianza.","hop"]],[[3,"Si alguien se burla en el chat, ¿qué jugada hacemos?","wave"],[2,"Pausa y captura.","hop"],[1,"Bloqueo y reporto.","hop"],[0,"Y se lo cuento a un adulto.","hi5"],[3,"¡Gol de equipo! ⚽","dance"]],[[3,"Ciber, ¿tu semáforo sirve también en la cancha?","wave"],[2,"Rojo es falta, amarillo es pase, verde es gol.","hop"],[3,"¡Te nombro árbitro oficial! 🟥","hi5"]],[[1,"Júnior, ¿tu clave es «tiburon123»?","hop"],[3,"¡Jamás! Es una frase larga y única.","shk"],[1,"La mía es «zorro123»… 😅","shk"],[0,"¡Pixel!","shk"]],[[3,"Subir fotos con ubicación deja la portería abierta.","wave"],[0,"Así es: la ubicación dice más de lo que crees.","hop"],[3,"Perfil privado y sin ubicación. ¡Defensa sólida!","hi5"]],[[3,"Equipo, ¡foto grupal!","hop"],[2,"¿Pidieron permiso a todos?","wave"],[3,"Primero permiso. ¡Juego limpio!","hi5"],[1,"¡Sonrían! 📸","dance"]]];
const JGL={g:"Jugada estratégica",p:"Pase",f:"Falta"},JGI={g:"🎯",p:"⚽",f:"🟥"},JCAT={r:"🤝 Respeto",p:"🥅 Privacidad",c:"🎯 Conflictos"};
const JP=[["r","Chat del curso 6.º B","😈","@memes_6B","Miren el meme que hice de Tomás 😂 ¡Reenvíenlo a todos!",[["Lo reenvío: es solo una broma.","f","Reenviar multiplica el daño y puede ser ciberbullying."],["Salgo del chat sin decir nada.","p","No empeoras la jugada, pero Tomás sigue solo."],["No lo reenvío, guardo captura, apoyo a Tomás y aviso a un adulto.","g","Cortas la cadena y proteges a la víctima."]]],
["c","Mensaje directo","😡","@10_rival","Perdiste feo hoy, eres un inútil. Ni vuelvas a jugar.",[["Bloqueo, reporto, guardo captura y cuento a un adulto.","g","Cortas el ataque y conservas pruebas."],["Respondo con insultos más fuertes.","f","Alimentas el conflicto y puedes meterte en problemas."],["Solo bloqueo a la persona.","p","Frenas el contacto, pero nadie más se entera."]]],
["p","Mensaje de número desconocido","🎁","@premios_balon","¡Ganaste un balón firmado! Escribe tu clave aquí para reclamarlo YA.",[["Ignoro el mensaje.","p","Estás a salvo, pero otros pueden caer."],["Hago clic y escribo mi clave rápido.","f","Es una estafa: premio + prisa es bandera roja."],["No hago clic, reporto el enlace y se lo muestro a un adulto.","g","Evitas el engaño y proteges a otros."]]],
["p","Chat del equipo","🧢","@capi_amigo","Parcero, pásame tu clave del juego, te subo de nivel. Te lo prometo.",[["Se la doy: es mi amigo.","f","Las claves no se comparten, ni con amigos."],["Digo que no y cambio mi clave por una frase larga con verificación en dos pasos.","g","Dices no y refuerzas tu defensa."],["Digo que no, pero no cambio nada.","p","Buen pase, pero la portería sigue algo abierta."]]],
["p","Nueva publicación","📸","Tú","Vas a subir la foto del equipo con uniforme del colegio y la ubicación activada.",[["La subo tal cual.","f","Muestra dónde estudian y dónde están."],["Pido permiso a mis compañeros y la subo.","p","El permiso es clave, pero queda la ubicación."],["Pido permiso, quito la ubicación y la subo en perfil privado.","g","Respetas a los demás y proteges los datos."]]],
["r","Comentarios de una foto","💬","@sofi_lopez","La foto de Valentina tiene 30 comentarios: «qué fea», «ni se peina»…",[["Comento algo gracioso para no quedar mal.","f","Sumarte a la burla también es agredir."],["No comento nada.","p","No agredes, pero ella sigue sola."],["Le escribo algo amable, reporto los comentarios hirientes y aviso a un adulto.","g","Apoyas a la víctima y frenas el daño."]]],
["c","Chat de un videojuego","🎮","@Ninja_X","¡Manco! Por tu culpa perdimos. Sal de la partida, perdedor.",[["Dejo de jugar y borro el juego.","p","Te alejas, pero el agresor sigue igual."],["Silencio el chat, reporto al jugador y sigo jugando.","g","Usas las herramientas de la plataforma."],["Le respondo con insultos.","f","Responder con agresión alimenta el conflicto."]]],
["p","Solicitud de amistad","🕵️","@Santi_10","Soy de otro colegio. Pásame tu dirección y te mando un regalo.",[["Bloqueo, reporto y se lo cuento a un adulto.","g","Nunca des tu dirección a desconocidos."],["No respondo.","p","Bien, pero no avisas del riesgo."],["Le doy mi dirección.","f","Pones en riesgo tu seguridad."]]],
["c","Mensaje directo","😤","@Mateo_G","Mañana te espero a la salida. Ya verás.",[["Contesto: «¡ahí estaré!»","f","Aceptas el reto y escalas el conflicto."],["Guardo captura, no respondo con amenazas y se lo cuento a un docente o familiar.","g","Pides ayuda antes de que escale."],["Lo ignoro y espero que se le pase.","p","Evitas responder, pero la amenaza sigue."]]],
["r","Debate sobre fútbol","⚽","@hincha_fiel","Los hinchas de ese equipo son todos unos brutos.",[["Respondo: «los tuyos son peores».","f","Ofender con ofensa no gana el debate."],["Doy mi opinión con respeto, sin ofender a nadie.","g","Se puede discrepar con respeto."],["Dejo de seguir el chat.","p","Te cuidas, pero no aportas respeto."]]],
["p","Foto etiquetada","🏷️","@bromas_6B","Te etiquetaron en una foto vergonzosa y todos comentan.",[["Subo una foto de esa persona para vengarme.","f","Responder con otra agresión empeora todo."],["Quito solo la etiqueta.","p","Ayuda, pero la foto sigue publicada."],["Pido que la borren, quito la etiqueta y activo aprobar etiquetas.","g","Resuelves y evitas que se repita."]]],
["p","Chat de soporte falso","🛠️","@soporte_oficial","Te llegó un código por SMS. Dame el código para recuperar tu cuenta.",[["Se lo envío para recuperar mi cuenta.","f","Los códigos nunca se comparten."],["Le pregunto quién es.","p","No sirve: puede mentir."],["No lo comparto, cierro el chat y cambio mi clave.","g","Nadie legítimo pide tus códigos."]]]];
const JWK={r:"Tu zona débil: respeto. Antes de reenviar o comentar pregúntate: ¿esto hiere a alguien?",p:"Tu zona débil: privacidad. Nunca compartas claves, códigos, ubicación ni datos personales.",c:"Tu zona débil: conflictos. Recuerda: pausa, captura, bloqueo y adulto."};
const jshuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const jg=reactive({st:0,ord:[],i:0,opts:[],r:null,ty:"",why:"",ht:false,pts:0,g:0,p:0,f:0,sk:0,bs:0,hint:false,hid:-1,clock:false,t:15,fl:"",log:[],paid:false});
let jtm;const jgClr=()=>clearInterval(jtm);
const jcur=()=>JP[jg.ord[jg.i]];
const jgLoad=()=>{jg.r=null;jg.hid=-1;jg.opts=jshuf(jcur()[5]);jg.t=15;jgClr();if(jg.clock)jtm=setInterval(()=>{if(sec.value!=="retos"||jg.st!==1){jgClr();return}if(--jg.t<=0)jgPick(-1)},1000)};
const JREA={g:[[[3,"¡GOOOL! Jugada estratégica. 🎯","dance"],[0,"Cabeza y corazón, Júnior.","hop"]],[[3,"¡Pase de gala! Miraste toda la cancha.","hi5"],[1,"¡Eso es jugar en equipo!","hop"]],[[2,"¡Luz verde! El árbitro aprueba. 🟢","wave"],[3,"¡Golazo digital!","dance"]],[[3,"Así se defiende la portería.","hi5"],[0,"Y con respeto, que es lo importante.","wave"],[1,"¡Yo quiero esa jugada en mi cola! 🦊","spin"]]],p:[[[3,"Buen pase, pero faltó rematar la jugada.","wave"],[0,"Hacer algo es mejor que nada, y se puede mejorar.","hop"]],[[2,"Luz amarilla: precaución. 🟡","wave"],[3,"Hay una jugada aún mejor. ¡Mírala!","hop"]],[[1,"¡Casi gol! El balón pegó en el palo.","shk"],[3,"Pase corto: seguro, pero sin ganar terreno.","wave"]]],f:[[[3,"¡Falta! Pero se aprende. Lee por qué.","shk"],[1,"Tarjeta… ¡y a levantar la cabeza!","wave"]],[[2,"¡Luz roja! Pausa, piensa, protege. 🔴","shk"],[3,"Esa jugada dejó la portería abierta.","shk"]],[[3,"¡Uy! Eso fue tarjeta roja digital.","shk"],[0,"Respira y mira cuál era la mejor jugada.","wave"]],[[1,"¡Júnior, no lo regañes! Yo también fallo.","hop"],[3,"Nadie nace sabiendo, Pixel. Se entrena.","hi5"]]]};
const JSTK3=[[[3,"¡Tres jugadas seguidas! ¡Racha de crack! 🔥","dance"],[1,"¡Mira cómo me sudan las patitas!","hop"]],[[2,"Tres verdes seguidos: mi semáforo brilla. 🟢","wave"],[3,"¡Punto extra, campeón!","hi5"]]];
const JSTK5=[[[3,"¡Cinco seguidas! ¡Modo Mundial! 🏆","dance"],[0,"Sabiduría y puntería. Impresionante.","hi5"]],[[1,"¡Eres una máquina! ¿Puedo ser tu hincha?","spin"],[3,"¡Pixel, hincha número uno!","hop"]]];
const JHT=[[[3,"Entretiempo. Vas bien: sigue mirando toda la cancha.","wave"],[0,"Respira y toma agua. 💧","hop"],[1,"¡Yo traigo las galletas! 🍪","hop"]],[[3,"En el segundo tiempo, ¡más cabeza que pie!","hop"],[2,"Yo te apoyo desde el semáforo.","wave"]],[[3,"Regla del vestuario: pausa, piensa, protege.","wave"],[2,"¡Esa es mi frase! Pero te la presto. 🦎","hi5"]]];
const JSTART=[[[3,"¡Pitazo inicial! Ocho jugadas, dos tiempos.","hop"],[1,"¡Yo grito desde la tribuna!","dance"]],[[3,"Mira la jugada, piensa y elige tu pase.","wave"],[0,"Cabeza fría, corazón amable.","hop"]]];
const JEND={o:[[3,"¡Balón de oro digital! ¡Eres leyenda! 🥇","dance"],[0,"Nunca vi mejor juego limpio.","hi5"],[1,"¡Quiero tu autógrafo!","spin"]],s:[[3,"¡Titular del equipo! 🥈 Insignia ganada.","dance"],[2,"Árbitro: partido impecable.","hi5"]],b:[[3,"Promesa de la cancha. 🥉 Con un poco más, insignia.","wave"],[0,"Repasa y pide la revancha.","hop"]],x:[[3,"Hoy toca entrenar, pero de las faltas se aprende.","wave"],[1,"¡Revancha! ¡Yo apuesto por ti!","hop"]]};
const jgStart=()=>{Object.assign(jg,{st:1,ord:jshuf(JP.map((_,i)=>i)).slice(0,8),i:0,ht:false,pts:0,g:0,p:0,f:0,sk:0,bs:0,hint:false,log:[]});jgLoad();beep([880,880,1100]);say(JSTART[rnd(JSTART.length)])};
const jgFlash=t=>{jg.fl=t;setTimeout(()=>{jg.fl=""},1100)};
const jgPick=k=>{if(jg.r!==null)return;jgClr();const o=k<0?["","f","Se acabó el tiempo: en internet también hay que decidir a tiempo, pero con calma."]:jg.opts[k],t=o[1];jg.r=k;jg.ty=t;jg.why=o[2];jg[t]++;jg.log.push(t);
if(t==="g"){jg.sk++;jg.bs=Math.max(jg.bs,jg.sk);jg.pts+=3+(jg.sk>=3?1:0);addXp(6)}else{jg.sk=0;combo.value=0;if(t==="p"){jg.pts+=1;addXp(2)}}
jgFlash(t);cTl(t==="g"?"g":t==="p"?"y":"r",5000);luzSnd(t==="g"?"g":t==="p"?"y":"r");
const L=t==="g"&&jg.sk===3?JSTK3:t==="g"&&jg.sk===5?JSTK5:JREA[t];say(L[rnd(L.length)])};
const jgNext=()=>{if(jg.i===3&&!jg.ht){jg.ht=true;jg.st=2;say(JHT[rnd(JHT.length)]);return}
if(jg.i>=7){jg.st=3;burst();const g=jg.g;if(g>=5&&!jg.paid){jg.paid=true;badge(BN.findIndex(b=>b[1]==="La jugada digital"))}say(g>=7?JEND.o:g>=5?JEND.s:g>=3?JEND.b:JEND.x);return}
jg.i++;jgLoad()};
const jgHalf=()=>{jg.st=1;jg.i++;jgLoad();say([[3,"¡Segundo tiempo! Concentración total.","hop"]])};
const jgHint=()=>{if(jg.hint||jg.r!==null)return;jg.hint=true;jg.hid=jg.opts.findIndex(o=>o[1]==="f");say([[3,"Consulto al técnico: descartamos una falta.","wave"]])};
const jgBest=()=>jg.opts.find(o=>o[1]==="g")[0];
const jgWeak=()=>{const m={r:0,p:0,c:0};jg.ord.forEach((n,i)=>{if(jg.log[i]&&jg.log[i]!=="g")m[JP[n][0]]++});const k=Object.keys(m).sort((a,b)=>m[b]-m[a])[0];return m[k]?JWK[k]:"¡Sin zonas débiles! Defensa y ataque perfectos."};
JTRIO.push([[3,"Pixel, ¿qué haces si te insultan en un videojuego?","wave"],[1,"Silencio el chat y reporto.","hop"],[3,"¡Esa es una gran jugada!","hi5"]],[[0,"Júnior, ¿el respeto también va en la cancha virtual?","wave"],[3,"Claro: se gana con goles, no con insultos.","hop"],[2,"Y con mensajes amables.","hi5"]],[[2,"Júnior, ¿pedimos permiso antes de etiquetar a alguien?","wave"],[3,"Siempre: nadie sale en la foto sin querer.","hop"],[1,"¡Entonces mi cola no sale hoy! 🦊","dance"]],[[1,"Júnior, ¿cuántos goles has metido?","hop"],[3,"Muchos, pero mi mejor jugada es no reenviar burlas.","wave"],[0,"Esa vale doble.","hi5"]],[[3,"Ciber, ¿qué color eres cuando alguien pide una clave?","wave"],[2,"Rojo alerta, y con sirena.","shk"],[3,"¡Falta! Y tarjeta roja.","shk"],[1,"¡Yo me escondo debajo de la mesa! 😅","shk"]],[[3,"Búho, ¿es lo mismo opinar distinto que ofender?","wave"],[0,"No: se puede discrepar con respeto.","hop"],[3,"¡Juego limpio!","hi5"]],[[1,"¡Júnior! Me llegó un enlace de un premio.","shk"],[3,"¡Fuera de lugar! No hagas clic.","shk"],[2,"Lo reportamos y se lo muestras a un adulto.","wave"],[1,"¡Listo, técnico!","hi5"]],[[3,"Equipo, ¿qué hacemos si molestan a alguien en el chat?","wave"],[0,"Ser espectadores valientes.","hop"],[1,"No reenviar y avisar.","hop"],[2,"Y guardar pruebas.","hop"],[3,"¡Defensa completa!","dance"]],[[2,"Júnior, ¿cuántos jugadores tiene un buen equipo digital?","wave"],[3,"Cuatro: sabiduría, diversión, protección y estrategia.","hi5"],[0,"Cuatro amigos, cuatro superpoderes.","hop"]],[[3,"Pixel, ¿tu perfil es público o privado?","wave"],[1,"Privado… creo. ¿Dónde se mira?","shk"],[3,"En ajustes. Lo revisamos ya.","hop"],[0,"Hoy mismo, Pixel.","wave"]],[[1,"Júnior, ¿se puede ganar sin hacer trampa?","hop"],[3,"Siempre: en la cancha y en internet.","hi5"],[0,"Eso es integridad.","wave"]],[[3,"Antes de publicar: mira, piensa, elige el pase.","wave"],[2,"Y yo cambio de color si hay riesgo.","hop"],[1,"¡Y yo comparto galletas! 🍪","dance"],[0,"Pixel…","shk"]]);
const JIDLE=[[[3,"Búho, ¿cuál es tu jugada favorita?","wave"],[0,"Pensar dos veces antes de publicar.","hop"],[3,"¡Defensa sólida!","hi5"]],[[1,"Júnior, ¿me enseñas a patear?","hop"],[3,"Primero a bloquear: es lo más importante.","wave"],[1,"¡Eso también sirve en el chat!","dance"]],[[3,"Ciber, ¿ves algún peligro por aquí?","wave"],[2,"Mi antena dice: todo verde, por ahora. 🟢","hop"]],[[3,"Una clave larga es el mejor portero.","wave"],[1,"Entonces la mía es «zorro-sin-gol-9».","hop"],[3,"¡Esa sí!","hi5"]],[[0,"Júnior, ¿qué hacer con una burla en el chat?","wave"],[3,"Pausa, captura, bloqueo y adulto.","hop"],[0,"Plan de cuatro pasos.","hi5"]],[[3,"En la cancha y en internet, ¡piensa antes de jugar!","hop"],[1,"¡Eso va en mi camiseta! 👕","dance"]],[[2,"Júnior, ¿practicas con el balón o con el celular?","wave"],[3,"Con el balón. Con el celular, solo pienso.","hop"],[2,"Buen entrenamiento mental.","hi5"]],[[3,"Ojo con las fotos con ubicación.","wave"],[0,"Revisa siempre el fondo de la foto.","hop"],[1,"¡Y mi cola! No debe salir. 🦊","hop"]]];
const JIN={actividades:[[[3,"¡Pitazo inicial! Aquí tú eres el capitán.","hop"],[0,"Júnior, ¿listo para dirigir?","wave"],[3,"Siempre: miro la jugada y luego paso.","hi5"]],[[3,"Cada caso es una jugada. ¡Elige bien!","wave"],[1,"¿Y si me equivoco? ¿Me sacan tarjeta?","shk"],[3,"Solo si no aprendes. ¡Aquí se entrena!","hop"]],[[3,"Casos listos. Piensa en las consecuencias.","wave"],[2,"Yo vigilo los datos que se filtran.","hop"],[0,"Equipo completo para esta misión.","hi5"]]],retos:[[[1,"¡Hay un reto nuevo con Júnior! Es un partido de verdad.","hop"],[2,"Yo seré el árbitro de colores.","wave"],[0,"Búsquenlo abajo: es el 19.","hop"]]]};
const JR={ok:[[[3,"¡Buen pase! ⚽","hop"]],[[3,"¡Así se juega limpio!","hi5"],[0,"Cabeza y corazón.","hop"]]],bad:[[[3,"Levanta la cabeza: la próxima sale.","wave"]],[[3,"Falta leve. ¡Aprende y sigue!","shk"],[1,"¡Yo te animo!","hop"]]],badge:[[[3,"¡Insignia para el equipo! 🏅","dance"],[1,"¡Fiesta!","dance"]]],lvl:[[[3,"¡Subiste de nivel! ¡Pitazo de victoria!","hop"],[2,"¡Verde total! 🟢","spin"]]]};
const jPoke=()=>{act(3,"hop");say(Math.random()<.5?JTRIO[rnd(JTRIO.length)]:[[3,JFR[rnd(JFR.length)],"hop"]])};
const callJunior=()=>{if(sec.value==="retos"){const e=document.getElementById("jgame");e&&e.scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>say(JTRIO[rnd(JTRIO.length)]),900);return}jCall(16000);nextTick(()=>say(JTRIO[rnd(JTRIO.length)]))};
const crOn=ref(-1);let crt;
const CRL=[[[1,"¡Rubén cazó cada bug! Sin él habría errores por todos lados 🐞"],[0,"Probó todo una y otra vez. ¡Eso es paciencia!"]],[[0,"Bleyder cuidó el ambiente: colores y sonidos pensados para ti 🎨🎶"],[1,"¡Por él esta aventura se ve y suena tan bien!"]],[[1,"Diego ordenó la interfaz para que todo sea fácil de encontrar 🧩"],[0,"Y le puso mucha creatividad."]],[[0,"Rodrigo tuvo la idea principal: ¡todo empezó con él! 💡"],[1,"¡Gracias, Rodrigo!"]]];
const crTap=i=>{crOn.value=-1;clearTimeout(crt);requestAnimationFrame(()=>{crOn.value=i;crt=setTimeout(()=>{crOn.value=-1},800)});try{SFX.pop()}catch(e){}say(CRL[i])};
return{lite,liteToggle,CREATORS,FACES,crOn,crTap,jOn,jb,jping,jPoke,callJunior,JP,JGL,JGI,JCAT,jcur,jg,jgStart,jgPick,jgNext,jgHalf,jgHint,jgBest,jgWeak,jFix,scr,TPT,tpi,proj,quiet,calm,tmr,tmFmt,tmSet,tmToggle,names,pickN,spinning,usedN,rollName,vt,vote,GS,gd,gdN,cel,cv,celT,celL,celM,celClose,celAgain,wk,toTop,dbl,sealPop,FX,SEM,LUCES,sem,semPick,semNext,semReset,ctl,cOn,callCiber,verdict,CIB,SCN,cp,ct,cb,cping,cfly,scn,nScn,verdict,cToggle,SECS,BN,KW,OBJ,FP,SELF,CASES,QUIZ,G1,G2,FL,PL,PC,sec,secIdx,teacher,conf,on,go,badge,ci,k,pts,sel,done,st,runCase,pickCase,nextCase,qi,qs,qa,answer,nextQ,chk,nChk,pw,pwS,flip,LV,MSG,FACTS,PR,PO,OST,OS,G3,G4,xp,xpShow,toasts,nm,fi,addXp,lvl,xpPct,nOn,sl,mt,bad,pairTo,od,ob,ordTap,snd,theme,seen,G5,PLT,plg,nPlg,signed,sign,rs,resetP,CH,sp,mood,poke,sparks,nextSec,nextReady,G6,MC,mf,md,mv,memTap,memReset,ag,agStart,agTap,combo,qr,nextFact,G7,G8,WORDS,wi,tl,pk,ws,wTap,wUndo,wReset,sm,SIMS,smStart,smTap,DS,ds,MED,TODAY,printD,celebrate,gate,GF,TW,CR,GL,gi,gPoke,enter,later,toIntro,hasProg,award,scrollP,tg,quizReset,qdone,qOk,qBad,qMid,qDone,CREDITS,CREW,CRYEAR}
}}
</script>
