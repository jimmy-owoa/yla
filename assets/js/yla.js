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

  /* ---- nav theme: white logo over dark sections ---- */
  /* mark dark regions with [data-nav-dark]; the topbar turns white while one sits under the logo */
  (function(){
    var bar=document.querySelector(".topbar");
    var brand=bar&&bar.querySelector(".brand");
    if(!bar||!brand)return;
    var ticking=false;
    function update(){
      ticking=false;
      var r=brand.getBoundingClientRect();
      var y=r.top+r.height/2;
      /* re-query each time: algunas zonas (p.ej. Rosario) se marcan tras render */
      var darks=document.querySelectorAll("[data-nav-dark]");
      var onDark=false;
      for(var i=0;i<darks.length;i++){
        var b=darks[i].getBoundingClientRect();
        if(b.top<=y&&b.bottom>=y){onDark=true;break;}
      }
      bar.classList.toggle("on-dark",onDark);
    }
    function onScroll(){
      if(ticking)return;
      ticking=true;
      window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",update);
    window.addEventListener("load",update);
  })();

  window.YLA={applyLang:applyLang,openMenu:openMenu,closeMenu:closeMenu};
})();
