!function(d3) {
	'use strict';

	if (typeof d3 === 'undefined') {
	  throw new Error('d3-ui requires D3 http://d3js.org/')
	}

	d3.ui = {
		version: "1.0.0"
	}

	d3.ui.alert = function() {
		var TRANSITION_DURATION = 150;
		var dismiss = '[data-dismiss="alert"]'

		var alert = function(el) {
			if(!el.selectAll(dismiss).empty()) { 
				el.on('click', closeHandler) 
			}

			return alert
		}

		alert.close = function(el) {
			var closeEvent = new Event('close.bs.alert')
			
			el.node().dispatchEvent(closeEvent)

			el.classed('in', false)

			el.transition()
				.duration(el.classed('fade') ? TRANSITION_DURATION : 0)
				.each('end', function() {
					var closedEvent = new Event('closed.bs.alert')
					el.node().dispatchEvent(closedEvent)
				})
				.remove()

			return alert
		}

		function closeHandler() {
			var el = d3.select(this);
			
			if(!el.classed('alert') || !dismissable(d3.event.target)) {
				return
			}

			d3.event.preventDefault()

			alert.close(el)
		}

		function dismissable(target) {
			try {
				return target.parentNode.dataset.dismiss === 'alert'
			} catch(e) {
				return false
			}
		}

		d3.selectAll(".alert.alert-dismissible").call(alert)

		return alert
	}()
}(d3);