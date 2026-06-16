/* ============================================================
   YLA — shared behaviour: language toggle + menu overlay
   ============================================================ */
(function(){
  var KEY="yla-lang";
  var root=document.documentElement;

  /* ---- language ---- */
  function applyLang(l){
    root.setAttribute("data-lang", l==="en"?"en":"es");
    try{localStorage.setItem(KEY,l);}catch(e){}
    document.querySelectorAll("[data-lang-btn]").forEach(function(b){
      b.classList.toggle("on", b.getAttribute("data-lang-btn")===l);
    });
    window.dispatchEvent(new CustomEvent("yla:lang",{detail:l}));
  }
  var saved="es";
  try{saved=localStorage.getItem(KEY)||"es";}catch(e){}
  applyLang(saved);

  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-lang-btn]");
    if(b){applyLang(b.getAttribute("data-lang-btn"));}
  });

  /* ---- menu overlay ---- */
  function getMenu(){return document.querySelector(".menu");}
  function openMenu(){var m=getMenu();if(m){m.classList.add("open");document.body.style.overflow="hidden";}}
  function closeMenu(){var m=getMenu();if(m){m.classList.remove("open");document.body.style.overflow="";}}

  document.addEventListener("click",function(e){
    if(e.target.closest("[data-menu-open]")){openMenu();}
    else if(e.target.closest("[data-menu-close]")){closeMenu();}
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape")closeMenu();
  });

  window.YLA={applyLang:applyLang,openMenu:openMenu,closeMenu:closeMenu};
})();
