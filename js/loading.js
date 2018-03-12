/********Loading**********************/
;(function (window,$,undefined) {
	function Loading(imgList) {
		this.list = typeof imgList === 'object' ? imgList : {};
		this.len = this.list.length;
		this.addnum = this.addNum();
		this.KEY = {
			loading     : "lucker_loading_layer_div",
			persent    : "lucker_loading_persent_div",
			perContent : "lucker_loading_perContent_div"
		};

		this.init();
	}
	Loading.prototype = {
		init: function () {
			if ( $('#' + this.KEY.loading).size() === 0 ) {
				this.__create();
			}

			this.loading = $('#' + this.KEY.loading);
			this.perContent = $('#' + this.KEY.perContent);
			this.eachImg();
		},
		eachImg: function () {
			var self = this;
			self.__show();
			for(var i = 0; i < self.len; i++){
				self.loadImg(self.list[i],i,function (last) {

					var _n = self.addnum();
					console.log(_n);
					var persent = Math.round(_n / self.len * 100) + "%";

					if(_n === self.len){
						persent += ' ok!';
						self.perContent.text(persent);
						self.loadDone();
                        //$("body").append('<audio style="display: none" id="music-bg" preload="auto"  autoplay="autoplay" src="music/bg.mp3"></audio>');
                        //window.bgAudio = document.getElementById("music-bg");
                        return false;
					}
					self.perContent.text(persent);
				})
			}

		},
		loadImg: function (_src,i,cb) {
			var self = this;
			var img = new Image();
			img.src = _src;

			try{
				img.onerror = function () {
					console.log('img request error!');
				};
				img.onload = function () {
					console.log(_src + " complate!");
					cb(i);
					delete img;
				};
			}catch (e){
			}

		},
		addNum: function () {
			var count = 0;
			return function () {
				return (count += 1);
			}
		},
		loadDone: function () {
			// something
			var self = this;
			console.log('done');
			setTimeout(function () {
				setTimeout(function() {
					self.__hide();
				},500);

				document.body.removeChild(document.getElementById("loading"));
			},200);
		},
		__show: function (){
			this.loading.show();
		},
		__hide: function (){
			var self  = this;
			self.loading.css({"-webkit-transform": "scale(1.5)","opacity": "0"});
			setTimeout(function () {
				self.loading.hide();
				self.__destroy();
			},200);
		},
		__destroy: function (){
			this.loading.remove();
		},
		__create: function () {
			var _loadlayer = $('<div>').attr('id',this.KEY.loading);
			var _perContent = $('<div>').attr('id',this.KEY.perContent);
			var _body = $('body');
			_loadlayer.css({
				"width"              : "100%",
				"height"             : "100%",
				"position"           : "fixed",
				"top"                : "0",
				"left"               : "0",
				"background-color"   : "#58C1F1",
				"opacity"            : "1",
				"-webkit-transform " : "scale(1)",
				'-webkit-transition' : "all 0.2s ease",
				"z-index"            : "3000",
				"display"            : "none"
			});

			_perContent.css({
				"position"      : "absolute",
				"width"         : "100px",
				"height"        : "30px",
				"line-height"   : "30px",
				"text-align"    : "center",
				"top"           : "40%",
				"left"          : "50%",
				"margin-left"   : "-50px",
				"margin-top"    : "-15px",
				"color"         : "#fff",
				"font-size"		: "30px"
			});

			_loadlayer.append(_perContent);
			_body.append(_loadlayer);
		}
	};

	window['Loading'] = Loading;
})(window, window.Zepto || window.jQuery);

/*<script id="loading">new Loading(imgList);</script>*/