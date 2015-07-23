var Form = (function ($, PubSub) {
	return function (formId) {
		formId = formId || 'form';
		var $form, endpoint, cover, alert, errorList;
		
		function init() {
			$form = $(formId);
			endpoint = $form.attr('action');
			
			cover = Cover({
				cssClass: 'cover',
				height: $form.height() + 'px',
				dismissable: true,
				dismissCssClass: 'resubmit',
				dismissText: 'Your inquiry has already been sent. Send another?'
			});
			
			alert = Alert({
				parent: '#form-container',
				insertBy: 'prepend',
				cssClass: 'row'	
			});
			
			errorList = ErrorList({
				cssClass: 'row error-list'
			});
			
			$form.on('submit', function (e) {
				e.preventDefault();
				submitDelegate(this);
			});
		}
		
		function submitDelegate(form) {
			PubSub.publish('form:did:submit');
			
			if (alert.isOpen()) {
				alert.dismiss();
			}
			
			var $this = $(form);
			var data = $this.serializeArray();
			
			var inquiry = mapToInquiry(data);
			
			if (inquiry.error) {
				errorHandler('Oops! something went wrong!', inquiry.errors);
				return;
			}
			
			submitInquiry(inquiry);		
		}
		
		function errorHandler(errorMessage, errors) {
			alertUser(errorMessage, 'alert');
			
			errorList.updateList(errors);			
			errorList.show();
		}
		
		function submitInquiry(inquiry) {
			$.ajax({
				url: endpoint,
				data: inquiry,
				method: $form.attr('method'),
				success: function (res) {
					if (res.error) {
						errorHandler(res.alert, res.errors);
						return;
					}
					
					alertUser(res.alert, 'success');
					disable();
					reset();
					
					if (errorList.isOpen()) {
						errorList.hide();
					}
				},
				error: function (res) {
					if (res.responseJSON.error) {
						errorHandler(res.responseJSON.alert, res.responseJSON.errors);
						return;
					}	
				}
			});
		}
		
		function alertUser(message, type) {	
			alert.setMessage(message);
			alert.setType(type);
			alert.rebind();
			
			alert.show();	
		}
				
		function mapToInquiry(formData) {
			var tmpInquiry = {},
				map = InquiryMap();	
		
			formData.forEach(function (field) {
				tmpInquiry[map[field.name]] = field.value;
			});
			
			return Inquiry(tmpInquiry);			
		}
		
		function enable() {
			cover.down();
		}
		
		function disable() {		
			cover.up();
		}
		
		function reset() {
			var formIdTmp;
			if (formId.indexOf('#') >= 0) {
				formIdTmp = formId.substring(formId.indexOf('#') + 1);
			}
			
			var form = document.getElementById(formIdTmp);
			form.reset();
		}
				
		init();
		
		PubSub.subscribe('cover:will:down', function (cover) {
			alert.dismiss();
			$form.find(':input').filter(':first').focus();	
		});
				
		return {
			rebind: function () {
				init();	
			},
			destory: function () {
				$form.off('submit');
				$form = null;	
			},
			disable: function () {
				disable();
			},
			enable: function () {
				enable();
			},
			reset: function () {
				reset();
			}
		}
	};
}(window.jQuery, window.PubSub));