
var currencySymbol = " $";
var income;
var commission;
var proposeTitle = $("#full_sum");

function range() {
	var rng = document.getElementById('calc-range');
	var i1 = document.getElementById('calc-desc');
	i1.value = rng.value;
}

function desc() {
	var i1 = document.getElementById('calc-desc');
	var rng = document.getElementById('calc-range');
	rng.value = i1.value;
}

$('input[type="range"]').on("change mousemove", function () {
	var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

	$(this).css('background-image',
		'-webkit-gradient(linear, left top, right top, '
		+ 'color-stop(' + val + ', rgba(220, 53, 69, 1)), '
		+ 'color-stop(' + val + ', rgba(238, 238, 238, 1))'
		+ ')'
	);
});

$('#calc-desc').on("keyup", function () {
	var val = ($(this).val() - $('input[type="range"]').attr('min')) / ($('input[type="range"]').attr('max') - $('input[type="range"]').attr('min'));

	$('input[type="range"]').css('background-image',
		'-webkit-gradient(linear, left top, right top, '
		+ 'color-stop(' + val + ', rgba(220, 53, 69, 1)), '
		+ 'color-stop(' + val + ', rgba(238, 238, 238, 1))'
		+ ')'
	);
});

$("button.btn-left").click(function () {
	$('button.btn-left').removeClass('active').addClass('btn-secondary');
	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('active');
});

$("button.btn-right").click(function () {
	$('button.btn-right').removeClass('active').removeClass('btn-dark').addClass('btn-secondary');
	$(this).toggleClass('btn-secondary');
	$(this).toggleClass('active');
});

$('input[type="range"]').on('change mousemove', function () {
	$('#calc-desc').val($('input[type="range"]').val());
	var oneLetterWidth = 10;
	var minCharacters = 4;
	var len = $("#calc-desc").val().length;

	if (len > minCharacters) {
		$("#calc-desc").width(len * oneLetterWidth);
	} else {
		$("#calc-desc").width(40);
	}
});

$('#calc-desc').on('keyup', function () {
	$('input[type="range"]').val($('#calc-desc').val());
	var oneLetterWidth = 10;
	var minCharacters = 4;
	var len = $(this).val().length;

	if (len > minCharacters) {
		$(this).width(len * oneLetterWidth);
	} else {
		$(this).width(40);
	}
});

$(function () {
	$("nav button p").click(function () {
		$("p").removeClass("active");
		$(this).toggleClass("active");
	});
	$("#nav-tabContent div.tab-pane").click(function () {
		$("div.tab-pane").removeClass("show");
		$(this).toggleClass("show");
	});
});

$('.card-group').slick({
	dots: false,
	infinite: true,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 1,
	centerPadding: '50px',
	prevArrow: "<img src='img/arrow-left-solid.svg' class='slick-prev' alt='1'>",
	nextArrow: "<img src='img/arrow-right-solid.svg' class='slick-next' alt='2'>",
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
				dots: false
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true
			}
		}
	]
});

var $js_sum_range = $("#calc-range");
var $amount = $("#calc-desc");
var instance_sum;
var min_sum = 1000;
var max_sum = 50000;
var currency_symbol = " $";
var commission_value;
var income_value;

function currency_method() {
	if ($('.usd').hasClass('active')) {
		currencySymbol = " $";
		$("#calc-desc-label").text(currencySymbol);
		$('#calc-desc').val($("#calc-range").val());
		if ($('.buy-btn').hasClass('active')) {
			$('#average-rate').val('76,10 ₽');
			income_value = 2.38999;
		} else {
			$('#average-rate').val('71,10 ₽');
			income_value = 2.61001;
		}
		$('#exchange-rate').val('73,53 ₽');
		commission_value = 0.09273;
	}
	if ($('.eur').hasClass('active')) {
		currencySymbol = " €";
		$("#calc-desc-label").text(currencySymbol);
		$('#calc-desc').val($("#calc-range").val());
		if ($('.buy-btn').hasClass('active')) {
			$('#average-rate').val('87,27 ₽');
			income_value = 2.71158;
		} else {
			$('#average-rate').val('92,27 ₽');
			income_value = 2.28842;
		}
		$('#exchange-rate').val('89,91 ₽');
		commission_value = 0.11302;
	}
	if ($('.gbp').hasClass('active')) {
		currencySymbol = " £";
		$("#calc-desc-label").text(currencySymbol);
		$('#calc-desc').val($("#calc-range").val());
		if ($('.buy-btn').hasClass('active')) {
			$('#average-rate').val('106,49 ₽');
			income_value = 2.60403;
		} else {
			$('#average-rate').val('101,49 ₽');
			income_value = 2.39597;
		}
		$('#exchange-rate').val('104,23 ₽');
		commission_value = 0.13137;
	}
}

currency_method();

String.prototype.allReplace = function (obj) {
	var retStr = this;
	for (var x in obj) {
		retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
	}
	return retStr;
};

if ($('#calc-range').length) {
	$("#calc-range").ionRangeSlider({
		skin: "round",
		prettify: true,
		min: min_sum,
		max: max_sum,
		from: 1000,
		hide_min_max: true,
		hide_from_to: true,
		onStart: function (data) {
			$amount.prop("value", data.from);
			$("#calc-desc-label").val(data.from + currency_symbol);
			$(".sum_value").text((data.from * $("#exchange-rate").val().allReplace({ '₽': '', ',': '.' }) + (data.from * 0.0025)).toFixed(2) + ' ₽');
			$(".commission_value").text((data.from * commission_value).toFixed(2) + ' ₽');
			$(".income_value").text((data.from * income_value).toFixed(2) + ' ₽');
			$("#full_sum").text((Math.floor($(".commission_value").text().allReplace({ '₽': '' })) + Math.floor($(".sum_value").text().allReplace({ '₽': '' }))).toFixed(2) + ' ₽');
			$('#calc-desc').text($("#calc-range").val());
		},
		onChange: function (data) {
			$amount.prop("value", data.from);
			$("#calc-desc-label").val(data.from + currency_symbol);
			$(".sum_value").text((data.from * $("#exchange-rate").val().allReplace({ '₽': '', ',': '.' }) + (data.from * 0.0025)).toFixed(2) + ' ₽');
			$(".commission_value").text((data.from * commission_value).toFixed(2) + ' ₽');
			$(".income_value").text((data.from * income_value).toFixed(2) + ' ₽');
			$("#full_sum").text((Math.floor($(".commission_value").text().allReplace({ '₽': '' })) + Math.floor($(".sum_value").text().allReplace({ '₽': '' }))).toFixed(2) + ' ₽');
			$('#calc-desc').text($("#calc-range").val());
		},
	});
}

instance_sum = $js_sum_range.data("ionRangeSlider");

$amount.on("input", function () {
	var val = $(this).prop("value");
	if (val < min_sum) {
		val = min_sum;
	} else if (val > max_sum) {
		val = max_sum;
	}
	instance_sum.update({
		from: val
	});
	$(".sum_value").text((val * $("#exchange-rate").val().allReplace({ '₽': '', ',': '.' }) + (val * 0.0025)).toFixed(2) + ' ₽');
	$(".commission_value").text((val * commission_value).toFixed(2) + ' ₽');
	$(".income_value").text((val * income_value).toFixed(2) + ' ₽');
	$("#full_sum").text((Math.floor($(".commission_value").text().allReplace({ '₽': '' })) + Math.floor($(".sum_value").text().allReplace({ '₽': '' }))).toFixed(2) + ' ₽');
	$('#calc-desc').text($("#calc-range").val());
});
$("#calc-range").focusout(function (event) {
	var value = $(this).val();
	if ((value !== '') && (value.indexOf('.') === -1)) {
		$(this).val(Math.max(Math.min(value, 50000), 1000));
	}
	instance_sum.update({
		from: $(this).prop("value")
	});
	$("#calc-range").val($(this).val() + currency_symbol);
	$(".sum_value").text((val * $("#exchange-rate").val().allReplace({ '₽': '', ',': '.' }) + (val * 0.0025)).toFixed(2) + ' ₽');
	$(".commission_value").text((val * commission_value).toFixed(2) + ' ₽');
	$(".income_value").text((val * income_value).toFixed(2) + ' ₽');
	$("#full_sum").text((Math.floor($(".commission_value").text().allReplace({ '₽': '' })) + Math.floor($(".sum_value").text().allReplace({ '₽': '' }))).toFixed(2) + ' ₽');
});
$("#calc-range").click(function () {
	$("#calc-range").val($("#calc-range").val().match(/\d+/)[0]);
});
(function ($) {
	$.fn.inputFilter = function (inputFilter) {
		return this.on("input keydown keyup", function () {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			} else {
				this.value = "";
			}
		});
	};
}(jQuery));
$("#calc-range").inputFilter(function (value) {
	return /^\d*$/.test(value);
});

function declOfNum(n, text_forms) {
	n = Math.abs(n) % 100;
	var n1 = n % 10;
	if (n > 10 && n < 20) { return text_forms[2]; }
	if (n1 > 1 && n1 < 5) { return text_forms[1]; }
	if (n1 == 1) { return text_forms[0]; }
	return text_forms[2];
}
$('.btn_method').click(function () {
	$('.btn_method').removeClass('active');
	$(this).addClass('active');
	currency_method();
	$(".sum_value").text(($("#calc-range").val().match(/\d+/)[0] * $("#exchange-rate").val().allReplace({ '₽': '', ',': '.' }) + ($("#calc-range").val().match(/\d+/)[0] * 0.0025)).toFixed(2) + ' ₽');
	$(".commission_value").text(($("#calc-range").val().match(/\d+/)[0] * commission_value).toFixed(2) + ' ₽');
	$(".income_value").text(($("#calc-range").val().match(/\d+/)[0] * income_value).toFixed(2) + ' ₽');
	$("#full_sum").text((Math.floor($(".commission_value").text().allReplace({ '₽': '' })) + Math.floor($(".sum_value").text().allReplace({ '₽': '' }))).toFixed(2) + ' ₽');
});
$('.btn_currency').click(function () {
	$('.btn_currency').removeClass('active');
	$(this).addClass('active');
	currency_method();
	$(".sum_value").text(($("#calc-range").val().match(/\d+/)[0] * $("#exchange-rate").val().allReplace({ '₽': '', ',': '.' }) + ($("#calc-range").val().match(/\d+/)[0] * 0.0025)).toFixed(2) + ' ₽');
	$(".commission_value").text(($("#calc-range").val().match(/\d+/)[0] * commission_value).toFixed(2) + ' ₽');
	$(".income_value").text(($("#calc-range").val().match(/\d+/)[0] * income_value).toFixed(2) + ' ₽');
	$("#full_sum").text((Math.floor($(".commission_value").text().allReplace({ '₽': '' })) + Math.floor($(".sum_value").text().allReplace({ '₽': '' }))).toFixed(2) + ' ₽');
});