$(document).ready(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var $target = $(entry.target); 
      if (entry.isIntersecting) {
        $target.addClass('visible animating');
        setTimeout(function () {
          $target.removeClass('animating'); 
        }, 500);
      } else {
        $target.removeClass('visible');
      }
    });
  }, { threshold: 0.1 });

  $('.card').each(function () {
    observer.observe(this);
  });
});  
