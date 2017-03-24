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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk5vZGVMaXN0LnByb3RvdHlwZS5icnV0ZSA9XHJcbkFycmF5LnByb3RvdHlwZS5icnV0ZSA9XHJcbkhUTUxGb3JtRWxlbWVudC5wcm90b3R5cGUuYnJ1dGUgPVxyXG5IVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuYnJ1dGUgPSBmdW5jdGlvbihmdW5jKXtcclxuICB2YXIgcmVzdWx0ID0gW10sIHRlbXA7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0ZW1wID0gZnVuYyh0aGlzW2ldKTtcclxuICAgIGlmICh0ZW1wKSByZXN1bHQucHVzaCh0ZW1wKVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xyXG4gIC8vSW5pdGVcclxuICAoZnVuY3Rpb24oKXtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZXZlbCAudmFsdWUnKS5icnV0ZShmdW5jdGlvbihpdGVtKXtcclxuICAgICAgaXRlbS5zdHlsZS50cmFuc2l0aW9uRGVsYXkgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEzIC0gMykpICsgMykvMTArJ3MnO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9ydGZvbGlvIGZpZ3VyZSBpbWcnKS5icnV0ZShmdW5jdGlvbihpdGVtKXtcclxuICAgICAgaXRlbS5zdHlsZS50cmFuc2l0aW9uRGVsYXkgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gMikpICsgMikvMTArJ3MnO1xyXG4gICAgfSk7XHJcbiAgfSkoKTtcclxuICAvL1Njcm9sbFxyXG4gIHZhciBjb250YWN0TGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0LWxpbmsnKTtcclxuICB2YXIgc2Nyb2xsQ29udHJvbGxlciA9IHtcclxuICAgIHJvb3RFbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGltbWVuc2lvbnMnKSxcclxuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2UtY29udGFpbmVyJyksXHJcbiAgICBjb250cm9sczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xzJyksXHJcbiAgICBtZW51OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpLFxyXG4gICAgc3RhdGVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduYXYgYScpLmJydXRlKGZ1bmN0aW9uKHgpe1xyXG4gICAgICB4Lm9uY2xpY2sgPSBmdW5jdGlvbihlKXtzY3JvbGxDb250cm9sbGVyLm1vdmVUbyhlKTsgcmV0dXJuIGZhbHNlfTtcclxuICAgICAgcmV0dXJuIHguaGFzaC5zbGljZSgxKTtcclxuICAgIH0pLFxyXG4gICAgcHJlbG9hZGVyRmxhZzogZmFsc2UsXHJcbiAgICBjdXJyZW50U3RhdGU6IChsb2NhdGlvbi5oYXNoKT8gbG9jYXRpb24uaGFzaC5zbGljZSgxKTogJ2hvbWUnLFxyXG4gICAgbW92ZVRvOiBmdW5jdGlvbihlKXtcclxuICAgICAgdmFyIHNlY3Rpb25JbmRleCwgbGluaywgc3VtQ2xpZW50SGVpZ2h0ID0gMCwgeCA9IHNjcm9sbENvbnRyb2xsZXIsIGNvbXB1dGVkU3R5bGU7XHJcbiAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgbGluayA9IChlLnRhcmdldC5oYXNoKT8geC5zdGF0ZXMuaW5kZXhPZihlLnRhcmdldC5oYXNoLnNsaWNlKDEpKTogeC5zdGF0ZXMuaW5kZXhPZih4LmN1cnJlbnRTdGF0ZSkrcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5kaXJlY3Rpb24pO1xyXG4gICAgICAgIGlmICh4LnN0YXRlc1tsaW5rXSA9PSB4LmN1cnJlbnRTdGF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0geC5jdXJyZW50U3RhdGUgPSB4LnN0YXRlc1tsaW5rXTtcclxuICAgICAgfVxyXG4gICAgICBzZWN0aW9uSW5kZXggPSAoeC5zdGF0ZXMuaW5kZXhPZih4LmN1cnJlbnRTdGF0ZSk+PTApPyB4LnN0YXRlcy5pbmRleE9mKHguY3VycmVudFN0YXRlKTogMDtcclxuICAgICAgeC5jb250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9IHNlY3Rpb25JbmRleCotOTkuNTUrJ3Z3JztcclxuICAgICAgeC5jb250cm9scy5jaGlsZHJlbi5wcmV2LmNsYXNzTmFtZSA9IChzZWN0aW9uSW5kZXggPT0gMCk/ICdkaXNhYmxlZCcgOiAnJztcclxuICAgICAgeC5jb250cm9scy5jaGlsZHJlbi5uZXh0LmNsYXNzTmFtZSA9IChzZWN0aW9uSW5kZXggPT0geC5zdGF0ZXMubGVuZ3RoIC0gMSk/ICdkaXNhYmxlZCcgOiAnJztcclxuICAgICAgeC5yb290RWxlbWVudC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgdmFyIHNjcm9sbENsYXNzID0gJycsXHJcbiAgICAgICAgICBzY3JvbGxGaXhDb250YWluZXIgPSB4LmNvbnRhaW5lci5jaGlsZHJlblt4LnN0YXRlcy5pbmRleE9mKHguY3VycmVudFN0YXRlKV0ubGFzdEVsZW1lbnRDaGlsZC5sYXN0RWxlbWVudENoaWxkO1xyXG4gICAgICBpZiAoc2Nyb2xsRml4Q29udGFpbmVyICYmIHNjcm9sbEZpeENvbnRhaW5lci5jbGllbnRIZWlnaHQgPiBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCl7XHJcbiAgICAgICAgIHNjcm9sbENsYXNzID0gJyBzY3JvbGwtYm90dG9tJztcclxuICAgICAgICAgc2Nyb2xsRml4Q29udGFpbmVyLnBhcmVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgc2Nyb2xsRml4Q29udGFpbmVyLnBhcmVudEVsZW1lbnQub25zY3JvbGwgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgdmFyIG1heFNjcm9sbCA9IHRoaXMuc2Nyb2xsSGVpZ2h0LXRoaXMuY2xpZW50SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgdG9wID0gKHRoaXMuc2Nyb2xsVG9wID09IDApPyAnJzogJyBzY3JvbGwtdG9wJyxcclxuICAgICAgICAgICAgICAgIGJvdHRvbSA9ICh0aGlzLnNjcm9sbFRvcCA9PSBtYXhTY3JvbGwpPyAnJzogJyBzY3JvbGwtYm90dG9tJyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IHNjcm9sbENvbnRyb2xsZXIuY29udHJvbHM7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NMaXN0WzBdK3RvcCtib3R0b207XHJcbiAgICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgeC5jb250cm9scy5jbGFzc05hbWUgPSB4LmN1cnJlbnRTdGF0ZStzY3JvbGxDbGFzcztcclxuICAgICAgeC5tZW51LmNoaWxkcmVuLmJydXRlKGZ1bmN0aW9uKGVsZW0pe1xyXG4gICAgICAgIGVsZW0uZmlyc3RDaGlsZC5jbGFzc05hbWUgPSAoZWxlbS5maXJzdENoaWxkLmhhc2guc2xpY2UoMSkgPT0geC5jdXJyZW50U3RhdGUpPyAnYWN0aXZlJzogJyc7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgeC5jb250YWluZXIuY2hpbGRyZW4uYnJ1dGUoZnVuY3Rpb24oZWxlbSl7XHJcbiAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgeC5yb290RWxlbWVudC5jbGFzc05hbWUgPSB4LmN1cnJlbnRTdGF0ZTtcclxuICAgICAgICB4LmNvbnRhaW5lci5jaGlsZHJlbi5icnV0ZShmdW5jdGlvbihlbGVtKXtcclxuICAgICAgICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyh4LmN1cnJlbnRTdGF0ZSkgJiYgeC5wcmVsb2FkZXJGbGFnKVxyXG4gICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDcwMCk7XHJcbiAgICB9LFxyXG4gIH07XHJcbiAgY29udGFjdExpbmtCdXR0b24uaGFzaCA9ICcjY29udGFjdHMnO1xyXG4gIGNvbnRhY3RMaW5rQnV0dG9uLm9uY2xpY2sgPVxyXG4gIHNjcm9sbENvbnRyb2xsZXIuY29udHJvbHMuY2hpbGRyZW4ubmV4dC5vbmNsaWNrID1cclxuICBzY3JvbGxDb250cm9sbGVyLmNvbnRyb2xzLmNoaWxkcmVuLnByZXYub25jbGljayA9IHNjcm9sbENvbnRyb2xsZXIubW92ZVRvO1xyXG4gIHNjcm9sbENvbnRyb2xsZXIubW92ZVRvKCk7XHJcblxyXG4gIC8vUHJlbG9hZGVyXHJcbiAgdmFyIHByZWxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVsb2FkZXInKSxcclxuICAgICAgbG9nbyA9IHByZWxvYWRlci5maXJzdEVsZW1lbnRDaGlsZCxcclxuICAgICAgc3RhcnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXIgLicrc2Nyb2xsQ29udHJvbGxlci5jdXJyZW50U3RhdGUpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIGxvZ28uY2xhc3NMaXN0LmFkZCgncGxheScpO1xyXG4gIH0sNTAwKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBwcmVsb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBzY3JvbGxDb250cm9sbGVyLnByZWxvYWRlckZsYWcgPSB0cnVlO1xyXG4gICAgc3RhcnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgfSwgMzUwMCk7XHJcblxyXG4gIC8vUGFyYWxsYXhcclxuICB2YXIgbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2RpbW1lbnNpb25zID4gZGl2JykuYnJ1dGUoZnVuY3Rpb24oeCl7XHJcbiAgICAgIGlmICh4LmRhdGFzZXQuY29lZmZpY2llbnQgJiYgeC5kYXRhc2V0LmNvbnRhaW4pXHJcbiAgICAgICAgeC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoJysoK3guZGF0YXNldC5jb2VmZmljaWVudC8xMCsxKSsnKSc7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfSk7XHJcblxyXG4gIHdpbmRvdy5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgbGF5ZXJzLmJydXRlKGZ1bmN0aW9uKHgpe1xyXG4gICAgICB4LnN0eWxlLm1hcmdpbkxlZnQgPSAgKGUueC13aW5kb3cuaW5uZXJXaWR0aC8yKSp4LmRhdGFzZXQuY29lZmZpY2llbnQvMTArJ3B4JztcclxuICAgICAgeC5zdHlsZS5tYXJnaW5Ub3AgPSAgKGUueS13aW5kb3cuaW5uZXJIZWlnaHQvMikqeC5kYXRhc2V0LmNvZWZmaWNpZW50LzEwKydweCc7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbCcpLmJydXRlKGZ1bmN0aW9uKGVsZW0pe1xyXG4gICAgZWxlbS5vbmtleXVwID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgIGlmIChlbGVtLnZhbHVlICE9PSAnJykgZWxlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgZWxzZSBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn07Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
