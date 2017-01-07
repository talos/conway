function tick() {
  $('tr').each(function (y, el) {
    $(el).find('td').each(function (x, el) {
      $(el).addClass(shouldLive(el, x + 1, y + 1) ? 'live' : 'die');
    });
  })
  enrich($('.live').addClass('alive').removeClass('live'));
  parch($('.die').removeClass('alive').removeClass('die'));
};

function getColor($el) {
	var color = $el.css('background-color');
  color = color.substr(4, color.length - 5).split(',');
  return [Number(color[0]), Number(color[1]), Number(color[2])];
}

function setColor($el, color) {
  [0, 1, 2].forEach(function (i) {
	  color[i] = color[i] > 255 ? 255 : color[i];
    color[i] = color[i] < 0 ? 0 : color[i];
  });
	$el.css('background-color', 'rgb(' + color.join(',') + ')');
}

function enrich($el) {
  $el.each(function (i, el) {
    var color = getColor($(el));
    color[0] += 16 * 12;
    color[1] += 16 * 2;
    color[2] -= 16 * 12;
    setColor($(el), color);
  });
}

function parch($el) {
  $el.each(function (i, el) {
    var color = getColor($(el));
    color[0] -= 16 * 12;
    color[1] -= 16 * 2;
    color[2] += 16 * 12;
    setColor($(el), color);
  });
}

function neighbors(x, y) {
	return [
  $('table tr:nth-child(' + (y - 1) + ') td:nth-child(' + (x - 1) + ')'),
  $('table tr:nth-child(' + (y - 1) + ') td:nth-child(' + (x) + ')'),
  $('table tr:nth-child(' + (y - 1) + ') td:nth-child(' + (x + 1) + ')'),
  $('table tr:nth-child(' + (y) + ') td:nth-child(' + (x - 1) + ')'),
  $('table tr:nth-child(' + (y) + ') td:nth-child(' + (x + 1) + ')'),
  $('table tr:nth-child(' + (y + 1) + ') td:nth-child(' + (x - 1) + ')'),
  $('table tr:nth-child(' + (y + 1) + ') td:nth-child(' + (x) + ')'),
  $('table tr:nth-child(' + (y + 1) + ') td:nth-child(' + (x + 1) + ')') 
  ];
};

function shouldLive(el, x, y) {
  var numLiveNeighbors = 0;
  neighbors(x, y).forEach(function (el) {
    if ($(el).is('.alive')) {
      numLiveNeighbors += 1;
    }
  });
  if ($(el).is('.alive')) {
    if (numLiveNeighbors < 2) {
      return false;
    } else if (numLiveNeighbors > 3) {
      return false;
    } else {
      return true;
    }
  } else {
    if (numLiveNeighbors == 3) {
      return true;
    } else {
      return false;
    }
  }
};

var timer = null;
function auto () {
  if (!timer) {
    timer = setInterval(tick, $('#speed').val());
    $('#auto').text('stop');
    $('#speed').prop('disabled', true);
  } else {
  	clearInterval(timer);
    $('#auto').text('start');
    $('#speed').prop('disabled', false);
    timer = null;
  }
}

var clicking = null;
$('td').on('mousedown', function () {
  enrich($(this).toggleClass('alive'));
  clicking = $(this).is('.alive');
});
$('td').on('mouseenter', function () {
  if (clicking === true) {
    enrich($(this).addClass('alive'));
  } else if (clicking === false) {
    parch($(this).removeClass('alive'));
  }
});
$(document).on('mouseup', function () {
  clicking = null;
});

$('#tick').on('click', tick);
$('#auto').on('click', auto);
