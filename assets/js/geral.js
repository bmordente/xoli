//Coloque suas configurações aqui.

$(document).ready(function(){

	$('body').addClass('animate');

	// Abrir popup modelo
	$(".abrir-modelo").on("click", function() {
		modelo = $(this).attr("data-modelo");
		$(".modelo, .popup, #modelos .headline").css('display', 'none');		
		$(modelo).css('display', 'block');
		// $('html,body').animate({scrollTop: $(modelo).offset().top}, 'slow');

		return false;
	});

	// Fechar popup modelo
	$(".fechar-modelo").on("click", function() {
		$(".popup").css('display', 'none');
		$(".modelo, #modelos .headline").css('display', 'block');
		// $('html,body').animate({scrollTop: $("#modelos").offset().top}, 'slow');

		return false;
	});

	// Seta next modelo
	$(".arrow-next").click(function() {
		modelo = $(this).attr("data-modelo");
		if( $( modelo ).next().is('.popup')){
			$(modelo).css('display', 'none');
			$(modelo).next().css('display', 'block');
		} else{
			$(modelo).css('display', 'none');
			$(".popup").first().css('display', 'block');
		}
		return false;
	});

	// Seta prev modelo
	$(".arrow-prev").click(function() {
		modelo = $(this).attr("data-modelo");
		if( $( modelo ).prev().is('.popup')){
			$(modelo).css('display', 'none');
			$(modelo).prev().css('display', 'block');
		} else{
			$(modelo).css('display', 'none');
			$(".popup").last().css('display', 'block');
		}
		return false;
	});

	// Máscaras
	$('.telefone').mask('(00) 0000-00000');

	// Sites Iveco
	$("#sitesIveco").bind('change', function() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			location.href= $(this).val();
		} else {
			window.open($(this).val());
		}
	});
});