function hScroller(params) {
	jQuery(params.slider).append("<div class='scroll'><div class='scroll__line'><div class='scroll__runner'><div class='scroll__runner__body'></div></div></div></div>");

	var html = document.documentElement,
		body = document.body,
		sl = {
			slider: params.slider,
			content: params.content,
			scroll: jQuery(params.slider).find(".scroll__line").get(0),
			runner: jQuery(params.slider).find(".scroll__runner").get(0),
			startItem: params.startItem,
			runner_min_width: 50
		};

	sl.init = function () {
		var t = this;
		t.visible_width = t.slider.offsetWidth;

		t.content_width = t.content.offsetWidth;
		t.content_offset_max = t.visible_width - t.content_width;
		t.content_offset_max = t.content_offset_max < 0 ? t.content_offset_max : 0;
		t.content_position = jQuery(t.content).position().left;
		t.content_position = t.content_position > t.content_offset_max ? t.content_position : t.content_offset_max;
		t.content.style.left = t.content_position + "px";

		t.scroll_width = t.scroll.offsetWidth;

		t.runner_width = Math.round(t.content_width > t.visible_width ? t.scroll_width * t.visible_width / t.content_width : t.scroll_width);
		t.runner_width = t.runner_width < t.runner_min_width ? t.runner_min_width : t.runner_width;
		t.runner.style.width = t.runner_width + "px";
		t.runner_step = t.content_width > t.visible_width ? (t.content_width - t.visible_width) / (t.scroll_width - t.runner_width) : 0;
		t.runner_position = Math.round(-t.content_position / t.runner_step);
		t.runner.style.left = t.runner_position + "px";
		t.runner_offset_min = jQuery(t.scroll).offset().left;
		t.runner_max = t.scroll_width - t.runner_width;
		t.runner_offset_max = t.runner_offset_min + t.runner_max;

		sl.item_width = sl.content_width / jQuery(sl.content).children().length;
	};

	sl.remove = function (position) {
		this.runner_position = position;
		this.runner.style.left = this.runner_position + "px";
		this.content_position = -position * this.runner_step;
		this.content.style.left = this.content_position + "px";
	};

	jQuery(window).resize(function () { sl.init(); });

	jQuery(sl.slider).bind("mousewheel", function (event, delta) {
		if (delta < 0) sl.content_position = sl.content_position - sl.item_width;
		else sl.content_position = sl.content_position + sl.item_width;
		sl.content_position = sl.content_position > sl.content_offset_max ? (sl.content_position < 0 ? sl.content_position : 0) : sl.content_offset_max;
		sl.runner_position = -sl.content_position / sl.runner_step;
		jQuery(sl.content).stop().animate({left:sl.content_position + "px"}, 500, "linear");
		jQuery(sl.runner).stop().animate({left:sl.runner_position + "px"}, 500, "linear");
		return false;
	});


	sl.init();
	sl.startPosition = jQuery(sl.content).children().get(sl.startItem);
	sl.startPosition = sl.startPosition ? jQuery(sl.startPosition).position().left / sl.runner_step : 0;
	sl.startPosition = sl.startPosition > sl.runner_max ? sl.runner_max : sl.startPosition;
	sl.remove(sl.startPosition);

	sl.runner.onmousedown = function (e) {
		e = e || window.event;

		if ("\v" == "v") {
			e.returnValue = false;
			html.style.cursor = sl.runner.currentStyle.cursor;
		}
		else {
			e.preventDefault();
			html.style.cursor = window.getComputedStyle(sl.runner, null).cursor;
		}

		if (e.pageX == null && e.clientX != null) {
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		}
		var dx = e.pageX - jQuery(sl.runner).offset().left,
			runner_offset_min = sl.runner_offset_min + dx,
			runner_offset_max = sl.runner_offset_max + dx;

		html.onmousemove = function (e) {
			e = e || window.event;

			if (e.pageX == null && e.clientX != null) {
				e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			}

			sl.remove(e.pageX > runner_offset_min ? (e.pageX < runner_offset_max ? (e.pageX - runner_offset_min) : sl.runner_max) : 0);
			return false;
		};

		html.onmouseup = function () {
			html.onmousemove = null;
			html.style.cursor = "default";
		};
	}
}