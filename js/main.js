var	workMin = 20,
	breakMin = 5,
	minRemaining = 0,
	paused = false,
	repeat = true,
	running = "notRunning",
	_meow = $('#meow')[0],
	_bell = $('#bell')[0];

$('#startStop').click( function() {

	console.log(running);

	runToggle();
});

$('#repeat').click(function() {
	if (repeat) {
		$('#repeat').html('Repeat: Off');
		repeat = false;
	} else {
		$('#repeat').html('Repeat: On');
		repeat = true;
	}
});

$('#demo').click(function() {
	runDemo();
});

function runDemo() {
  workMin = .25;
  breakMin = .25;
  $('#displayWorkTime').text(".25");
  $('#displayBreakTime').text(".25");
  $('#demo').text("Pause/Resume");
  runToggle();
}


function runToggle() {
  console.log(running);

	if (running == 'arrowRunning') {

		clearInterval(arrowTimer);
		minRemaining = workSec / 60;
		running = 'arrowPaused';
		$('#workTime').html('Paused');

	} else if (running == 'arrowPaused') {

		fireArrow(minRemaining);

	} else if (running == 'returnRunning') {

		clearInterval(returnTimer);
		minRemaining = breakSec / 60;
		running = 'returnPaused';
		$('#rightCat').attr('src', 'images/arrowSittingCat.png');
		$('#breakTime').html('Paused');

	} else if (running == 'returnPaused') {

		returnArrow(minRemaining);

	} else {

		fireArrow(workMin);
	}
};

$('#reset').click(function() {
	minRemaining = 0;
	paused = false;
	running = "notRunning";
	$('#arrow').hide();
	$('#arrow').css({'top': '288px', 'left': '70px'});
	$('#archer').attr('src', 'images/blackArcher.png');
	$('#rightCat').attr('src', 'images/blackSittingCat.png');
	$('#rightCat').css({'top': '350px', 'left': '90%', 'height': '50px'});
	$('#breakHeading').fadeOut(400);
	$('#breakTime').fadeOut(400);
	$('#workHeading').fadeOut(400);
	$('#workTime').fadeOut(400);
  $('#demo').text("30sec Demo");
	clearInterval(arrowTimer);
	clearInterval(returnTimer);

});


$('#workPlus').click(function() {
  if (workMin == .25) {
    workMin = 1;
  } else {
    workMin++;
  }

	$('#displayWorkTime').html(workMin.toString());
});


$('#workMinus').click(function() {
	if (workMin > 1) {workMin--;}
  if (workMin == .25) {workMin = 1;}
	$('#displayWorkTime').html(workMin.toString());
});


$('#breakPlus').click(function() {
  if (breakMin == .25) {
    breakMin = 1;
  } else {
    breakMin++;
  }
	$('#displayBreakTime').html(breakMin.toString());
})
$('#breakMinus').click(function() {
	if (breakMin > 1) {breakMin--;}
  if (breakMin == .25) {breakMin = 1;}
	$('#displayBreakTime').html(breakMin.toString());
})

//************************************
//**************START*****************
$('document').ready( function() {

	$('#displayWorkTime').html(workMin.toString());
	$('#displayBreakTime').html(breakMin.toString());
	$('#bell1').show();
	$('#arrow').hide();

});


function ringBell(times) {

	_bell.play();

	$('#groundArrow').show();

	//switching to a .gif would be easier. This just allows you
	//to adjust the animation
	for (var i = 100; i < 300 * times; i = i + 300) {
		setTimeout(function() {$('#bell1').hide(0,function() {
			$('#bell2').show();
		});}, i);
		setTimeout(function() {$('#bell2').hide(0,function() {
			$('#bell3').show();
		});}, i + 100);
		setTimeout(function() {$('#bell3').hide(0,function() {
			$('#bell1').show();
		});}, i + 200);
	}

	$('#groundArrow').animate({  borderSpacing: 27 }, {
	    step: function(now,fx) {
	      $(this).css('transform','rotate('+now+'deg)');
	    },
	    duration:'fast'
	},'linear');

	$('#groundArrow').animate({top: '+=190px'}, 90);

	getArrow();
};


function getArrow() {

	$('#rightCat').attr('src', 'images/catEmptyWalkGif.gif');
	$('#rightCat').animate({left: '-=20%'}, 1100, function() {

		$('#rightCat').attr('src', 'images/arrowSittingCat.png');
		$('#groundArrow').hide()
	});

	$('#groundArrow').animate({top: '-=40px'}, 50, function() {
		$('#groundArrow').animate({top: '+=40px'},50);
	});

	$('#groundArrow').animate({  borderSpacing: -270 }, {
	    step: function(now,fx) {
	      $(this).css('transform','rotate('+now+'deg)');
	    },
	    duration:'fast'
	},'linear');

	$('#groundArrow').css('top', '180px');

	setTimeout(function() {
		returnArrow(breakMin);
	}, 2000);
}


function returnArrow(min) {

	breakSec = (min * 60) + 1;

	var currentLeft = parseInt($('#rightCat').css('left'));
	var stepLeft = ((currentLeft - 90)/breakSec) * .01;
	var displayMin = 0,
		displaySec = 0;

	//console.log(currentLeft);
	running = 'returnRunning';

	$('#archer').attr('src', 'images/blackArcher2.png');
	$('#rightCat').attr('src', 'images/catArrowWalkGif.gif');

	displayMin = parseInt(breakSec / 60, 10);
	displaySec = parseInt(breakSec % 60, 10);

	if (displayMin < 10) {
		displayMin = "0" + displayMin;
	}
	if (displaySec < 10) {
		displaySec = "0" + displaySec;
	}

	$('#breakTime').html(displayMin.toString() + ":" + displaySec.toString());

	$('#breakHeading').slideDown(200);
	$('#breakTime').slideDown(800);

	returnTimer = setInterval(function() {

		//console.log(breakSec);
		displayMin = parseInt(breakSec / 60, 10);
		displaySec = parseInt(breakSec % 60, 10);

		if (displayMin < 10) {
			displayMin = "0" + displayMin;
		}
		if (displaySec < 10) {
			displaySec = "0" + displaySec;
	}

  if (displayMin >= 0 && displaySec >= 0) {
	  $('#breakTime').html(displayMin.toString() + ":" + displaySec.toString());
  }

		$('#rightCat').css({'left': '-='+stepLeft+'px'});
		if (breakSec > 1) {
			breakSec -= .01;
		} else {
			clearInterval(returnTimer);
			_meow.play();
			$('#breakHeading').fadeOut(400);
			$('#breakTime').fadeOut(400);
			$('#rightCat').attr('src', 'images/catEmptyWalkRight.gif');
			$('#rightCat').animate({left: '+=610px'}, 2000, function() {
				$('#rightCat').attr('src', 'images/blackSittingCat.png');
			});
			$('#archer').attr('src', 'images/blackArcher.png');
			running = 'notRunning';

			if (repeat == true) {
        setTimeout(function() {
          fireArrow(workMin);
        }, 1000);
			}
		}

	}, 10);

}


function fireArrow(min) {
	workSec = (min * 60) + 1;
	var currentLeft = parseInt($('#arrow').css('left'));
	var currentTop = parseInt($('#arrow').css('top'));
	var stepLeft = ((540 - currentLeft)/workSec) * .01,
	stepTop = ((currentTop - 175)/workSec) * .01;
	var displayMin = 0,
		displaySec = 0;

	running = 'arrowRunning';

	console.log(currentLeft);
	console.log(currentTop);

	$('#arrow').fadeIn(500, function() {
		$('#archer').attr('src', 'images/blackArcher2.png');
	});

	displayMin = parseInt(workSec / 60, 10);
	displaySec = parseInt(workSec % 60, 10);

	if (displayMin < 10) {
		displayMin = "0" + displayMin;
	}
	if (displaySec < 10) {
		displaySec = "0" + displaySec;
	}

	$('#workTime').html(displayMin.toString() + ":" + displaySec.toString());

	$('#workHeading').slideDown(200);
	$('#workTime').slideDown(800);

	arrowTimer = setInterval(function() {

		//console.log(workSec );

		displayMin = parseInt(workSec / 60, 10);
		displaySec = parseInt(workSec % 60, 10);

		if (displayMin < 10) {
			displayMin = "0" + displayMin;
		}
		if (displaySec < 10) {
			displaySec = "0" + displaySec;
		}

    if (displayMin >= 0 && displaySec >= 0) {
		  $('#workTime').html(displayMin.toString() + ":" + displaySec.toString());
    }

		$('#arrow').css({'top': '-='+stepTop+'px', 'left': '+='+stepLeft+'px'});
		if (workSec > 1) {
			workSec -= .01;
		} else {
			clearInterval(arrowTimer);
			$('#workTime').fadeOut(1400);
			$('#workHeading').fadeOut(1400);

			ringBell(3);
			$('#arrow').hide();
			$('#arrow').css({'top': '288px', 'left': '70px'});
		}

	}, 10);

};
