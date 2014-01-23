var body = document.body,
    timer2;

window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('disable-hover')) {
    body.classList.add('disable-hover');
  }

  timer2 = setTimeout(function(){
    body.classList.remove('disable-hover');
  },500);
}, false);