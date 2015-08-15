var Cover = (function ($, PubSub) {
	return function (userConfig) {
		var config,
			defaults = {
				selector: '[data-cover]',
				id: '#cover',
				parent: '[data-cover-parent]',
				cssClass: '',
				width: '100%',
				height: '100%',
				dismissable: false,
				dismissSelector: '[data-cover-dismiss]',
				dismissCssClass: '',
				dismissText: 'Dismiss'
			},
			$coverWrap, $cover, $parent, $dismiss;
			
		config = $.extend({}, defaults, userConfig);
			
		function init() {
			$coverWrap = $('<div/>');			
			$cover = $('<div/>');
						
			$parent = $(config.parent);
			
			$cover
				.data('cover', '')
				.addClass(config.cssClass)
				.css('width', config.width)
				.css('height', config.height)
				
			$coverWrap
				.attr('id', config.id)
				.append($cover);
			
			if (config.dismissable) {
				$dismiss = $('<a/>')
					.attr('data-cover-dismiss', '')
					.attr('href', '#')
					.addClass(config.dismissCssClass)
					.text(config.dismissText);
				
				$coverWrap.prepend($dismiss);
				
				$coverWrap.on('click', config.dismissSelector, function (e) {
					e.preventDefault();
					down();	
				});				
			}
			
		}
		
		function up() {
			PubSub.publish('cover:will:up', this);
			$parent.prepend($coverWrap);
			PubSub.publish('cover:did:up', this);
		}
		
		function down() {
			PubSub.publish('cover:will:down', this);
			$coverWrap.remove();
			PubSub.publish('cover:did:down', this);
		}
		
		init();
		
		return {
			up: function () {
				up();	
			},
			down: function () {
				down();
			}
		};
	};
}(window.jQuery, window.PubSub));