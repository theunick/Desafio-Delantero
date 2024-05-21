$(document).ready(function () {
  // Definizione dell'observer utilizzando l'API IntersectionObserver
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // Utilizza jQuery per selezionare il target (le card che entrano in vista)
      var $target = $(entry.target);

      // Se l'elemento sta intersecando (è visibile)
      if (entry.isIntersecting) {
        // Aggiunge le classi 'visible' e 'animating'
        $target.addClass('visible animating');

        // Rimuove la classe 'animating' dopo 500ms
        setTimeout(function () {
          $target.removeClass('animating');
        }, 500);
      } else {
        // Se l'elemento non è più visibile, rimuove la classe 'visible'
        $target.removeClass('visible');
      }
    });
  }, { threshold: 0.1 }); // threshold determina quando l'observer deve attivarsi, 0.1 significa 10% visibile

  // Seleziona tutte le card e le osserva con l'observer
  $('.card').each(function () {
    observer.observe(this); // 'this' si riferisce all'elemento DOM corrente (ogni card)
  });
});
