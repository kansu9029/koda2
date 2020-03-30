(function($) {
$(function() {
	var nav = $('#nav');
	//（メインメニュー）ulをliの合計のwidthにする
	var ulWidth = 0;
	$('>ul>li', nav).each(function (i) {
		ulWidth += $(this).outerWidth(true);
	});
	$('>ul', nav).css('width', ulWidth+'px');
	//サブメニューのwidth取得とUIの設定（IE用）
	var subWidthArray = new Array();
	$('>ul>li', nav).each(function (i) {
		var tempNum = 0;
		if($('>ul',this).length == 1) {
			$('>ul>li',this).each(function () {
				$(this).css('left', tempNum + 'px');
				tempNum += $(this).outerWidth(true);
			});
			$('>ul',this).css('width', tempNum + 'px');
		} else {
			subWidthArray[i] = 0;
		}
		subWidthArray[i] = tempNum;
		
	});
	//サブメニューに追尾するやつを配置
	nav.append('<div id="navbg"></div>');
	var navbg = $('#navbg');
	//navbgの初期位置
	var homeLeft = nav.position().left;
	//サブメニューがマウスオーバー状態か
	var subNavFlug = false;
	//#navbgの高さをサブメニューと同じにする
	navbg
		.height($('ul li ul li', nav).height())
		.css({
			'top': $('ul li ul', nav).position().top,
			'left': $(nav).position().left
		});
	$('ul ul', nav).css('display', 'none');
	//#navにマウスオーバーしたらnavbg動かす
	$('ul', nav).hover(
		function() {},
		function() {
			if (subNavFlug == false) {
				navbg.animate({
					'left' : homeLeft,
					'width': 0
				}, 300);
			}
		});
	//メインメニューマウスオーバーでサブメニュー開く
	$('>ul>li',nav).hover( function() {
		$('>a',this).addClass('over');
		var currntNum = $(this).index();
		var currentUl = $('ul', this);
		currentUl
			.show()
			.css('opacity', 0);
		//X座標取得
		var posX = $(this).position().left;
		currentUl.css('left', posX);
		//navbgをサブメニューの位置に移動

		if(subWidthArray[currntNum]) {
			navbg.animate({'left' : posX, 'width': subWidthArray[currntNum]}, 300, function(){
				currentUl.css({'opacity': 1});
			});
		} else {
			navbg.animate({'left' : homeLeft, 'width': subWidthArray[currntNum]}, 300);
		}
	},
	function() {
		$('>a',this).removeClass('over');
		$('ul', this).hide();
	});
	//サブメニューマウスオーバーでフラグON
	$('>ul>li>ul',nav).hover( function() {
		subNavFlug = true;
	},
	function() {
		subNavFlug = false;
	});
});
})(jQuery);