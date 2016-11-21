var contImg = 0;

var myPixelDraw = {}

myPixelDraw.colorDraw = 0;

myPixelDraw.cellColor = '#ecf0f1';

myPixelDraw.defaultCells = 53;

myPixelDraw.coloring = false;

myPixelDraw.fns = {
	calcSize: function (cantidad) {
		if (typeof cantidad === 'undefined') {
			cantidad = myPixelDraw.defaultCells;
		};
		var cantidad = cantidad * cantidad;
		var container = myPixelDraw.container;
  	var anchoContainer = container.width();
		container.empty();
		for (i = 0; i < cantidad; i++) {
			container.append('<div class="cell" draggable></div>');
		};
		var cell = $('.cell');
		cell.width(anchoContainer / Math.sqrt(cantidad));
		cell.height(anchoContainer / Math.sqrt(cantidad));
	},
	reSize: function () {
		$('#test5').on('click', function() {
	    var newSize = $('#test5').val();
	  	if (newSize == 0 || newSize > 100) {
		    alert('Enter a number between 1 and 50');
		    var newSize = defaultCells;
	  	} else if (isNaN(newSize)) {
		    alert('Enter a valid number');
		    var newSize = defaultCells;
	    }
	    myPixelDraw.fns.calcSize(newSize);
    });
	},
	detectMouseUp: function () {
		$(document).on('mouseup', function(e) {
			myPixelDraw.coloring = false;
		});
	},
	colorPalette: function () {
		$('#color-pick > *').each(function(i, e) {
	    var clase = $(e).attr('class');
	    $(e).css('background-color', clase);
    });
	},
	pickColor: function () {
		$('#color-pick > div').on('click', function() {
	    myPixelDraw.colorPicked = $(this).attr('class');
	    $(this).parent().find('.select').removeClass("select");
	    $(this).addClass("select");
    });
	},
	colorIt: function () {
		$(document).on('mousedown', '#containerJuego .cell', function(e) {
	    e.preventDefault();
	    myPixelDraw.coloring = true;
	    if (e.button == 2) {
		    $(this).css('background-color', myPixelDraw.cellColor);
		    return false;
	    } else {
		  	$(this).css('background-color', myPixelDraw.colorPicked);
	    }
    });
	},
	colorOnDrag: function () {
		$(document).on('mousemove', function(e) {
	  	if (myPixelDraw.coloring == true) {
		    var x = e.clientX;
		    var y = e.clientY;
		    var colorDraggedTo = document.elementFromPoint(x, y);
		    if ($(colorDraggedTo).hasClass('cell') && e.button != 2) {
		    	$(colorDraggedTo).css('background-color', myPixelDraw.colorPicked);
		    } else if ($(colorDraggedTo).hasClass('cell') && e.button == 2) {
		    	$(colorDraggedTo).css('background-color', myPixelDraw.cellColor);
		    }
	  	}
    });
	},
	reset: function () {
		$('#reset').on('click', function() {
    	$('.cell').css('background-color', myPixelDraw.cellColor);
    });
	},
	toggleBorders: function () {
		$('#toggle-border').on('click', function() {
  		$('.cell').toggleClass('no-border');
    });
	},
	disableRightClick: function () {
		myPixelDraw.container.on('contextmenu', function() {
    	return false;
    });
	},
	grabImage: function () {
		$('#grab-it').on('click', function(e) {
	    var container = document.getElementById('container');
			contImg++;
			console.log(contImg);
			if (contImg <= 5) {
				$('.lista').fadeIn(1000);
				$('.collapsible').append('<li id="li_'+contImg+'"><div class="collapsible-header"><i class="material-icons">mode_edit</i><div class="input-field"><input placeholder="Dibujo '+contImg+'" id="first_name" type="text" class="validate"></div></div><div class="collapsible-body" id="caja'+contImg+'"></div></li>');
		    html2canvas(containerJuego, {
			    onrendered: function(canvas) {
			    	$('#caja'+contImg).append(canvas);
						$('#caja'+contImg).append('<a class="btn-floating btn-large waves-effect waves-light teal lighten-1" id="botonDesc'+contImg+'"><i class="material-icons">not_interested</i></a>');
						$('#botonDesc1').on('click', function() {
							$('#li_1').remove();
							if (contImg > 0) {
									contImg--;
							}
							console.log(contImg);
						});
						$('#botonDesc2').on('click', function() {
							$('#li_2').remove();
							if (contImg > 0) {
									contImg--;
							}
							console.log(contImg);
						});
						$('#botonDesc3').on('click', function() {
							$('#li_3').remove();
							if (contImg > 0) {
									contImg--;
							}
							console.log(contImg);
						});
						$('#botonDesc4').on('click', function() {
							$('#li_4').remove();
							if (contImg > 0) {
									contImg--;
							}
							console.log(contImg);
						});
						$('#botonDesc5').on('click', function() {
							$('#li_5').remove();
							if (contImg > 0) {
									contImg--;
							}
							console.log(contImg);
						});
			    }
		    });
			}
			else {
				alert('El máximo de archivos es 5, borra alguno para guardarlo.');
			}

    });
	}
}

var descargar = document.getElementById('botonDesc');

$('#botonDesc').on('click', function(e) {
	descargar.href = canvas.toDataURL();
	descargar.download = "mypainting.png";
});

myPixelDraw.init = function (container) {
	myPixelDraw.container = container;
	var fns = myPixelDraw.fns;
	for (var i = 0; i < Object.keys(fns).length; i++) {
		fns[Object.keys(fns)[i]]();
	}
}

$(document).ready(function(){
	var container = $('#containerJuego');
	myPixelDraw.init(container);

})
