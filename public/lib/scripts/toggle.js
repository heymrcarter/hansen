var Toggle = (function ($) {
	return function (userConfig) {
		var defaults, config, $container, $controls, $content, panels = [], map = {}, $active, $activeControl;
		
		userConfig = userConfig || {};
		
		defaults = {
			containerSelector: '.toggle-container',
			controlSelector: '.toggle-control',
			contentSelector: '.toggle-content',
			defaultPanel: '',
			onBecomeActive: function ($control, $panel) { return; },
			onBecomeInactive: function ($control, $panel) { return; }
		};
		
		init();
		hideAll();
		showContent({
			control: $activeControl,
			panelId: config.defaultPanel
		});
			
		
		function init () {
			config = $.extend({}, defaults, userConfig);		
			$container = $(config.containerSelector);
			$controls = $(config.controlSelector);
			$content = $(config.contentSelector);
			
			$controls.find('a').each(function () {
				if ($(this).attr('href') === config.defaultPanel) {
					$activeControl = $(this);
				}
			});
			
			$content.each(function () {
				panels.push($(this));
				map['#' + this.id] = $(this);
			});
			
			$controls.on('click', 'a', function (e) {
				e.preventDefault();
				
				hideActive({
					control: $activeControl,
					panelId: $active.attr('id')	
				});
				
				showContent({
					control: $(this),
					panelId: this.hash
				});	
			});
		}
			
		function hideAll() {
			panels.forEach(function (panel) {
				panel.addClass('inactive');
			});
		}
		
		function showContent (content) {
			map[content.panelId].removeClass('inactive');
			map[content.panelId].addClass('active');
			config.onBecomeActive(content.control, $(content.panelId));
			$active = $(content.panelId);
			$activeControl = content.control;
		}
		
		function hideContent (contentId) {
			map[contentId].removeClass('active');
			map[contentId].addClass('inactive');
			config.onBecomeInactive(null, $(contentId));
			$active = '';
		}
		
		function hideActive(content) {
			$active.removeClass('active');
			$active.addClass('inactive');
			config.onBecomeInactive(content.control, content.panelId);
			$active = '';
			$activeControl = '';
		}
		
		function destroy () {
			$controls.off('click');
			
			defaults =
			config =
			$container =
			$controls =
			$content = 
			panels = 
			map =
			$active = null;
		}
		
		return {
			rebind: function () {
				init();	
			},			
			stop: function () {
				destroy();
			}
		}
	}
}(window.jQuery));