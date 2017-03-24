"use strict";
NodeList.prototype.brute =
Array.prototype.brute =
HTMLFormElement.prototype.brute =
HTMLCollection.prototype.brute = function(func){
  var result = [], temp;
  for (var i = 0; i < this.length; i++) {
    temp = func(this[i]);
    if (temp) result.push(temp)
  }
  return result;
}
window.onload = function(){
  //Inite
  (function(){
    document.querySelectorAll('.level .value').brute(function(item){
      item.style.transitionDelay = (Math.floor(Math.random() * (13 - 3)) + 3)/10+'s';
    });
    document.querySelectorAll('.portfolio figure img').brute(function(item){
      item.style.transitionDelay = (Math.floor(Math.random() * (10 - 2)) + 2)/10+'s';
    });
  })();
  //Scroll
  var contactLinkButton = document.getElementById('contact-link');
  var scrollController = {
    rootElement: document.getElementById('dimmensions'),
    container: document.getElementById('page-container'),
    controls: document.getElementById('controls'),
    menu: document.getElementById('menu'),
    states: document.querySelectorAll('nav a').brute(function(x){
      x.onclick = function(e){scrollController.moveTo(e); return false};
      return x.hash.slice(1);
    }),
    preloaderFlag: false,
    currentState: (location.hash)? location.hash.slice(1): 'home',
    moveTo: function(e){
      var sectionIndex, link, sumClientHeight = 0, x = scrollController, computedStyle;
      if (e) {
        link = (e.target.hash)? x.states.indexOf(e.target.hash.slice(1)): x.states.indexOf(x.currentState)+parseInt(e.target.dataset.direction);
        if (x.states[link] == x.currentState) return false;
        window.location.hash = x.currentState = x.states[link];
      }
      sectionIndex = (x.states.indexOf(x.currentState)>=0)? x.states.indexOf(x.currentState): 0;
      x.container.style.marginLeft = sectionIndex*-99.55+'vw';
      x.controls.children.prev.className = (sectionIndex == 0)? 'disabled' : '';
      x.controls.children.next.className = (sectionIndex == x.states.length - 1)? 'disabled' : '';
      x.rootElement.className = '';
      var scrollClass = '',
          scrollFixContainer = x.container.children[x.states.indexOf(x.currentState)].lastElementChild.lastElementChild;
      if (scrollFixContainer && scrollFixContainer.clientHeight > document.body.clientHeight){
         scrollClass = ' scroll-bottom';
         scrollFixContainer.parentElement.scrollTop = 0;
         scrollFixContainer.parentElement.onscroll = function(e){
            var maxScroll = this.scrollHeight-this.clientHeight,
                top = (this.scrollTop == 0)? '': ' scroll-top',
                bottom = (this.scrollTop == maxScroll)? '': ' scroll-bottom',
                container = scrollController.controls;
            container.className = container.classList[0]+top+bottom;
         };
      }
      x.controls.className = x.currentState+scrollClass;
      x.menu.children.brute(function(elem){
        elem.firstChild.className = (elem.firstChild.hash.slice(1) == x.currentState)? 'active': '';
      });
      setTimeout(function(){
        x.container.children.brute(function(elem){
          elem.classList.remove('active')
        });
      }, 300);
      setTimeout(function() {
        x.rootElement.className = x.currentState;
        x.container.children.brute(function(elem){
          if (elem.classList.contains(x.currentState) && x.preloaderFlag)
            elem.classList.add('active')
        });
      }, 700);
    },
  };
  contactLinkButton.hash = '#contacts';
  contactLinkButton.onclick =
  scrollController.controls.children.next.onclick =
  scrollController.controls.children.prev.onclick = scrollController.moveTo;
  scrollController.moveTo();

  //Preloader
  var preloader = document.getElementById('preloader'),
      logo = preloader.firstElementChild,
      startContainer = document.querySelector('#page-container .'+scrollController.currentState);
  setTimeout(function(){
    logo.classList.add('play');
  },500);
  setTimeout(function(){
    preloader.classList.remove('active');
    scrollController.preloaderFlag = true;
    startContainer.classList.add('active');
  }, 3500);

  //Parallax
  var layers = document.querySelectorAll('#dimmensions > div').brute(function(x){
      if (x.dataset.coefficient && x.dataset.contain)
        x.style.transform = 'scale('+(+x.dataset.coefficient/10+1)+')';
      return x;
    });

  window.onmousemove = function(e){
    layers.brute(function(x){
      x.style.marginLeft =  (e.x-window.innerWidth/2)*x.dataset.coefficient/10+'px';
      x.style.marginTop =  (e.y-window.innerHeight/2)*x.dataset.coefficient/10+'px';
    });
  };

  document.getElementById('mail').brute(function(elem){
    elem.onkeyup = function(e){
      if (elem.value !== '') elem.classList.add('active');
      else elem.classList.remove('active');
    }
  })
};
