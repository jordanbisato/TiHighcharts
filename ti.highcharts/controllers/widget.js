function loadChart(data, pic, chartTop, callback) {
	if (chartTop) {
		$.chartView.top = chartTop;
	}
	var url, plotChart;

	var takePicture = (pic != null) ? pic : false;

	function saveImage() {
		var imageView = Ti.UI.createImageView({
			image: $.chartView.toImage()
		});
		$.chartAsImage.add(imageView);
		$.chartAsImage.height = Ti.UI.SIZE;
		$.chartAsImage.visible = true;
		$.chartView.height = 0;
		$.chartView.visible = false;
		$.chartView.remove($.chartWebView);
	}

	if (takePicture) {
		var webFireEvent = function(e) {
			Ti.App.removeEventListener('fromWebView', webFireEvent);
			saveImage();
		}
		Ti.App.addEventListener('fromWebView', webFireEvent);
	}

	url = WPATH('/html/chart.html');
	plotChart = 'plotChart(' + JSON.stringify(data) + ', ' + takePicture + ')';
	// plotChart = 'plotChart(' + JSON.stringify(data) + ')';
	$.chartView.height = Ti.UI.SIZE;
	$.chartView.visible = true;
	$.chartWebView.html = "<html><head><meta name='viewport' content='user-scalable=no'></head></html>";
	$.chartWebView.url = url;
	$.chartWebView.addEventListener('load', function() {
		$.chartWebView.evalJS(plotChart, function() {
			callback && callback();
		});
	});
}

function resetChart() {
	$.chartWebView.evalJS('resetChart()');
}

function stockChart(data, chartTop, callback) {
	if (chartTop) {
		$.chartView.top = chartTop;
	}
	var url, stockChart;

	url = WPATH('/html/chart.html');
	stockChart = 'stockChart(' + JSON.stringify(data) + ')';
	$.chartView.height = Ti.UI.SIZE;
	$.chartView.visible = true;
	$.chartWebView.html = "<html><head><meta name='viewport' content='user-scalable=no'></head></html>";
	$.chartWebView.url = url;
	$.chartWebView.addEventListener('load', function() {
		$.chartWebView.evalJS(stockChart, function(e) {
			Ti.API.info('eval: ' + JSON.stringify(e));
			callback && callback();
		});
	});
}

function updateChart(data, callback) {
	// Ti.API.info('updateChart: ' + JSON.stringify(data));
	$.chartWebView.evalJS('updateChart(' + JSON.stringify(data) + ')', function(e) {
		callback && callback();
	});
}

exports.loadChart = loadChart;
exports.stockChart = stockChart;
exports.resetChart = resetChart;
exports.updateChart = updateChart;
