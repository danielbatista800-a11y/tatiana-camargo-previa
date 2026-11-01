import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import './catalogo.css';
const whatsapp='https://wa.me/5511963172752?text='+encodeURIComponent('Olá! Vim pelo catálogo e tenho interesse no perfume Atheeri, da Lattafa. Pode confirmar o valor e a disponibilidade?');
function Catalogo(){return <div className="catalog-page">
 <a className="skip" href="#perfume">Pular para o perfume</a>
 <header><a className="brand" href="./index.html">TATIANA CAMARGO<span>PERFUMARIA</span></a><nav aria-label="Principal"><a href="./index.html">Home</a><a href="./catalogo.html" aria-current="page">Catálogo</a></nav></header>
 <main className="catalog-main"><div className="catalog-heading"><p className="eyebrow">A CURADORIA TATIANA CAMARGO</p><h1>Encontre sua <em>assinatura.</em></h1><p>Um encontro entre você e a sua próxima fragrância.</p></div>
 <article className="catalog-product" id="perfume" aria-labelledby="perfume-title">
  <figure><img src={`${import.meta.env.BASE_URL}catalogo/atheeri-girassois.png`} alt="Perfume Atheeri sobre uma pedra escura, entre girassóis, com uma abelha pousada na flor e iluminação dourada."/><figcaption>ATHEERI · LATTAFA</figcaption></figure>
  <div className="product-details"><p className="eyebrow">01 / NOSSA SELEÇÃO</p><h2 id="perfume-title">Atheeri</h2><p className="product-brand">LATTAFA PERFUMES</p>
   <dl className="product-specs"><div><dt>Marca</dt><dd>Lattafa</dd></div><div><dt>Fragrância</dt><dd>Atheeri</dd></div><div><dt>Atendimento</dt><dd>Personalizado</dd></div></dl>
   <p className="product-intro">Uma nova maneira de marcar presença.</p><p className="product-description">Conheça Atheeri na curadoria Tatiana Camargo. Converse com a gente para descobrir mais sobre a fragrância e escolher o perfume que combina com você.</p>
   <div className="technical-note"><span>DETALHES DA FRAGRÂNCIA</span><p>Notas olfativas e especificações completas serão adicionadas após a conferência dos dados do produto.</p></div>
   <div className="product-actions"><div className="product-price"><span>R$ 450,00</span><small>Preço ilustrativo para esta prévia</small></div><a className="buy-button" href={whatsapp} target="_blank" rel="noopener noreferrer">Comprar pelo WhatsApp <span aria-hidden="true">↗</span></a><a className="video-button" href="https://www.youtube.com/@tatydepaulacamargo5400" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="5" fill="currentColor"/><path d="m10 8 6 4-6 4Z" fill="#f3efe5"/></svg>Conheça o canal</a></div><p className="purchase-note">Confirme valor e disponibilidade no atendimento. O botão abre uma conversa; a compra é combinada pelo WhatsApp.</p>
  </div>
 </article><div className="catalog-closing"><span>UMA CURADORIA FEITA DE ENCONTROS.</span><a className="text-link" href="./index.html">Voltar à experiência <span>↗</span></a></div></main>
 <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar pelo WhatsApp (abre em nova aba)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8 7c-2 3 3 8 6 8l2-2-3-1-1 1-2-2 1-1-1-3Z"/></svg></a>
 <footer><span>TATIANA CAMARGO</span><span>Perfumaria · Uma experiência de sentir.</span><a href="./index.html">Home ↗</a></footer>
 </div>}
createRoot(document.getElementById('root')).render(<Catalogo/>);
