// Script loader : gestion de l'animation et du chargement de la page
setTimeout(function () { 
  var e, t, n;
  t = setTimeout(function () {
    var loadcntr = document.getElementById("loadcntr");
    var pageloader = document.getElementById("pageloader");
    var mainScreenLoad = document.getElementById("main-screen-load");
    var mainScreenLoadInner = document.getElementById("main-screen-load-inner");
    
    if (loadcntr) loadcntr.textContent = "100";
    if (pageloader) pageloader.classList.add("active");
    if (mainScreenLoad) mainScreenLoad.classList.add("is_view");
    if (mainScreenLoadInner) mainScreenLoadInner.classList.add("viewed");
    
    if (typeof init === 'function') init();
    if (typeof load_funcs === 'function') load_funcs();
    if (typeof check_viewport === 'function') check_viewport();
    if (typeof additional_funcs === 'function') additional_funcs();
    if (typeof check_viewport === 'function') check_viewport();
    if (typeof setObserver === 'function') setObserver();
    
    setTimeout(function () { window.scrollTo(0, 1) }, 1);
    setTimeout(function () { window.scrollTo(0, 0) }, 1);
    clearInterval(n);
  }, 8000);
  
  n = setInterval(function () {
    var a = document.getElementsByClassName("pace-progress");
    Array.prototype.filter.call(a, function (t) {
      (e = t.getAttribute("data-progress-text").replace("%", ""));
      if (e < 10) e = "00" + e;
      else if (e < 100 && e > 10) e = "0" + e;
    });
    
    var loadcntr = document.getElementById("loadcntr");
    if (loadcntr) loadcntr.textContent = e;
    
    if ("100" == e) {
      var pageloader = document.getElementById("pageloader");
      if (pageloader) pageloader.classList.add("active");
      
      setTimeout(function () {
        if (typeof init === 'function') init();
        if (typeof load_funcs === 'function') load_funcs();
        if (typeof check_viewport === 'function') check_viewport();
        if (typeof additional_funcs === 'function') additional_funcs();
        if (typeof check_viewport === 'function') check_viewport();
        if (typeof setObserver === 'function') setObserver();
        
        var mainScreenLoad = document.getElementById("main-screen-load");
        var mainScreenLoadInner = document.getElementById("main-screen-load-inner");
        
        if (mainScreenLoad) mainScreenLoad.classList.add("is_view");
        if (mainScreenLoadInner) mainScreenLoadInner.classList.add("viewed");
        
        setTimeout(function () { window.scrollTo(0, 1) }, 1);
        setTimeout(function () { window.scrollTo(0, 0) }, 1);
        clearTimeout(t);
      }, 1000);
      clearInterval(n);
    }
  }, 100);
}, 0);
