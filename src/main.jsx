import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';
gsap.registerPlugin(ScrollTrigger);
const asset = path => `${import.meta.env.BASE_URL}${path}`;
const frameUrl = n => asset(`perfume/frame_${String(n).padStart(4,'0')}.webp`);
const stories = [
  {tag:'01 / O encontro',title:<>Algumas essências<br/>fazem você <em>flutuar.</em></>,text:'Permita-se sair do comum. Uma nova perspectiva sobre o sentir.',link:'Descubra Atheeri',target:'#experiencia'},
  {tag:'02 / O despertar',title:<>Um gesto.<br/>Infinitas <em>sensações.</em></>,text:'Entre o primeiro olhar e a primeira borrifada, um ritual só seu.',link:'Continue a jornada',target:'#essencia'},
  {tag:'03 / A essência',title:<>Sua natureza.<br/>Sua <em>assinatura.</em></>,text:'Atheeri, de Lattafa. Uma presença que transforma o instante em memória.',link:'Conheça nossa curadoria',target:'#curadoria'}
];
function App(){
 const root=useRef(), canvas=useRef(), [active,setActive]=useState(0), [still,setStill]=useState(false), [error,setError]=useState(false);
 useEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add({reduce:'(prefers-reduced-motion: reduce)',normal:'(prefers-reduced-motion: no-preference)'},ctx=>{
   if(ctx.conditions.reduce || still) return;
   let dead=false, wanted=1, busy=0;
   const cache=new Map(), pending=new Set();
   const draw=()=>{if(dead)return; const im=cache.get(wanted); if(!im)return; const c=canvas.current; const g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);c.previousElementSibling.style.visibility="hidden";};
   const pump=()=>{
    if(dead)return;
    const desired=[wanted,...Array.from({length:12},(_,i)=>wanted+(i%2===0?1:-1)*(Math.floor(i/2)+1))].filter(n=>n>=1&&n<=120);
    for(const n of desired){if(busy>=3)break;if(cache.has(n)||pending.has(n))continue;
     busy++;pending.add(n);const im=new Image();im.src=frameUrl(n);
     im.onload=()=>{busy--;pending.delete(n);if(dead)return;cache.set(n,im);if(cache.size>17){const furthest=[...cache.keys()].sort((a,b)=>Math.abs(b-wanted)-Math.abs(a-wanted))[0];cache.delete(furthest);}draw();pump();};
     im.onerror=()=>{busy--;pending.delete(n);if(!dead)setError(true);};
    }
   };
   const state={progress:0};
   const render=()=>{
    const p=state.progress;wanted=1+Math.round(Math.min(1,Math.max(0,(p-.10)/.45))*119);draw();pump();
    const scene=p<.22?0:p<.47?1:2;setActive(scene);
    gsap.set('.cloud-foreground',{opacity:.82*(1-Math.min(1,Math.max(0,(p-.10)/.12)))});
    gsap.set('.boutique',{opacity:Math.min(1,Math.max(0,(p-.12)/.10))});
    gsap.set('.nature',{opacity:Math.min(1,Math.max(0,(p-.38)/.12))});
    gsap.set('.hand',{opacity:Math.max(0,1-Math.abs(p-.30)*8),x:(.30-p)*180});
    gsap.set('.product',{yPercent:p*6,rotation:p<.65?Math.sin(p*5)*-3:0});
   };
   const tween=gsap.to(state,{progress:1,ease:'none',scrollTrigger:{trigger:root.current.querySelector('.journey'),start:'top top',end:'bottom bottom',scrub:.25,onUpdate:render}});
   render();
   return()=>{dead=true;tween.scrollTrigger?.kill();tween.kill();cache.clear();pending.clear();canvas.current.previousElementSibling.style.visibility="visible";gsap.set('.boutique,.nature,.hand,.product,.cloud-foreground',{clearProps:'all'});};
  },root);
  return()=>mm.revert();
 },[still]);
 return <div ref={root} className={still?'app still':'app'}>
  <a className="skip" href="#curadoria">Pular experiência</a>
  <header><a href="#inicio" className="brand">TATIANA CAMARGO<span>PERFUMARIA</span></a><nav aria-label="Principal"><a href="#experiencia">A experiência</a><a href="./catalogo.html">Catálogo <span>↗</span></a></nav><button className="motion" onClick={()=>setStill(!still)} aria-pressed={still}>{still?'Ativar movimento':'Reduzir movimento'}</button></header>
  <main>
   <section className="journey" aria-label="Atheeri: uma jornada em três cenas">
    <div className="stage" aria-hidden="true">
     <div className="sky" style={{backgroundImage:`url(${asset('scene/nuvens_home.png')})`}}/>
     <div className="boutique"><div className="shelves">{Array.from({length:18},(_,i)=><i key={i} style={{'--i':i}}/>)}</div></div>
     <div className="nature" style={{backgroundImage:`url(${asset('scene/pedra-natureza.png')})`}}/>
     <div className="scene-wash"/>
     <img className="hand" src={asset('scene/mao-realista.png.png')} alt="" />
     <div className="product"><img className="poster" src={frameUrl(1)} alt=""/><canvas ref={canvas} width="720" height="1280"/></div>
     <img className="cloud-foreground" src={asset('scene/nuvens_home.png')} alt="" /><div className="edition">LATTAFA <span>•</span> ATHEERI</div>
    </div>
    {stories.map((s,i)=><section key={i} id={['inicio','experiencia','essencia'][i]} className={`chapter chapter-${i}`} aria-label={s.tag}><div className="copy"><p className="eyebrow">{s.tag}</p><h1>{s.title}</h1><p className="description">{s.text}</p><a className="text-link" href={s.target}>{s.link}<span>↗</span></a></div>{<img className="static-product" src={frameUrl(i===0?1:i===1?60:120)} alt={`Perfume Atheeri ${i===0?'com tampa fechada':'com tampa aberta'}`}/>}</section>)}
    <div className="scene-nav" aria-label="Cenas">{stories.map((_,i)=><a key={i} href={`#${['inicio','experiencia','essencia'][i]}`} aria-label={`Ir à cena ${i+1}`} aria-current={active===i?'step':undefined}>0{i+1}</a>)}<span>ROLE PARA SENTIR ↓</span></div>
   </section>
   <section className="curation" id="curadoria"><p className="eyebrow">A CURADORIA TATIANA CAMARGO</p><h2>O perfume passa.<br/><em>A sua presença fica.</em></h2><p>Acreditamos em fragrâncias que contam histórias. Esta é a primeira página da nossa.</p><a className="text-link" href="#inicio">Reviver a experiência <span>↑</span></a><a className="text-link" href="./catalogo.html">Explorar o catálogo <span>↗</span></a><div className="prototype">PRÉVIA DA HOME E CATÁLOGO</div>{error&&<p role="status">Alguns quadros não carregaram. A imagem de apresentação permanece disponível.</p>}</section>
  <a className="catalog-float" href="./catalogo.html" aria-label="Abrir catálogo de perfumes" title="Explorar catálogo">
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5.5C9 3.5 5.5 3.5 2 4.5v15c3.5-1 7-1 10 1 3-2 6.5-2 10-1v-15c-3.5-1-7-1-10 1Z"/><path d="M12 5.5v15M5.5 8c1.1-.1 2.3.1 3.5.6M5.5 11.5c1.1-.1 2.3.1 3.5.6M15 8.6c1.2-.5 2.4-.7 3.5-.6M15 12.1c1.2-.5 2.4-.7 3.5-.6"/></svg>
   <span>Catálogo</span>
  </a>
  <a className="whatsapp-float" href="https://wa.me/5511963172752?text=Ol%C3%A1%21%20Vim%20pelo%20site%20e%20gostaria%20de%20conhecer%20a%20curadoria%20de%20perfumes." target="_blank" rel="noopener noreferrer" aria-label="Conversar com a perfumaria pelo WhatsApp (abre em nova aba)" title="Fale conosco pelo WhatsApp">
   <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.47 0 .11 5.35.1 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.95 11.95 0 0 0 5.76 1.47h.01c6.58 0 11.94-5.35 11.95-11.93a11.86 11.86 0 0 0-3.48-8.41ZM12.05 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98.99-3.64-.24-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.47-4.45 9.92-9.95 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.75-1.66-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.3 1.27.48 1.7.62.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg>
  </a>
  </main><footer><span>TATIANA CAMARGO</span><span>Perfumaria · Uma experiência de sentir.</span><a href="#inicio">Voltar ao início ↑</a></footer>
 </div>;
}
createRoot(document.getElementById('root')).render(<App/>);









