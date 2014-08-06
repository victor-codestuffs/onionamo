var onionamo = (function ($) {
  var $dragging, $onion, $onionHandle, $onionSkin,
    containerWidth, posX, dragX, relX;

  function init() {
    setupElements();
    setupEventHandlers();
  }

  function setupElements() {
    $dragging = null;
    $onion = $('.onion');
    $onionHandle = $onion.find('.onion-handle');
    $onionSkin = $onion.find('.onion-skin');
    containerWidth = $onion.outerWidth();

    moveHandle(containerWidth * 0.33);
  }

  function setupEventHandlers() {
    $onion.on('mousedown', function (e) {
      if ($(e.target).hasClass('onion-handle')) {
        $dragging = $(e.target);
        posX = $dragging.position().left - e.pageX;
      } else {
        relX = e.pageX - $(this).offset().left;
        moveHandle(relX, true);
      }
    }).on('dragstart', 'img', function (e) {
      e.preventDefault();
    });

    $(window).on('mousemove', function (e) {
      if ($dragging) {
        dragX = e.pageX + posX;

        if (dragX < 0) {
          moveHandle(0);
        } else if (dragX >= 0 && dragX <= containerWidth) {
          moveHandle(dragX);
        } else {
          moveHandle(containerWidth);
        }
      }
    }).on('mouseup', function () {
      $dragging = null;
    });
  }

  function moveHandle(distX, animate) {
    animate = animate || false;
    distX = parseInt(distX);

    if (animate) {
      $onionHandle.animate({ 'left': distX }, 'fast');
      $onionSkin.animate({ 'width': distX }, 'fast');
    } else {
      $onionHandle.css('left', distX);
      $onionSkin.css('width', distX);
    }
  }

  return {
    peel: init
  };
})(jQuery);
