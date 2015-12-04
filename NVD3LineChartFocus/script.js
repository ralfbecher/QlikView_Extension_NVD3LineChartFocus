/*
Created by Ralf Becher - ralf.becher@tiq-solutions.de - TIQ Solutions, Leipzig, Germany
Tested on QV 11.2 SR5

TIQ Solutions takes no responsibility for any code.
Use at your own risk. 
*/

// This checks if the console is present, and if not it 
// sets it to an object with a blank function called log to
// prevent any error. Remove logging for production.
if(!window.console){ window.console = {log: function(){} }; } 

(function ($) {
	//own context, avoiding conflicts with other libraries, $=jQuery
	var _extension = 'NVD3LineChartFocus';
    var _pathShort = 'Extensions/' + _extension + '/';
	var _pathLong = Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only&name=' + _pathShort;
	// detect WebView mode (QlikView Desktop)
	var _webview = window.location.host === 'qlikview';
	var _path = (_webview ? _pathShort : _pathLong);

	// load all libraries as array, don't use nested Qva.LoadScript() calls
	Qv.LoadExtensionScripts([_path + 'js/d3.min.js', _path + 'js/nv.d3.min.js', _path + 'js/interactiveLayer.js', _path + 'js/utils.js'], 
		function () {
			Qv.AddExtension(_extension,
				function () {
					var showOthers = ((this.Layout.Text0.text.toString() * 1) > 0);
					// load css file
					Qva.LoadCSS((_webview ? _path : _pathLong) + 'css/nv.d3.min.css');
					
					// need a unique id to render chart
					var objId = this.Layout.ObjectId.replace("\\", "_"); // chart name in CSS class (eg "QvFrame Document_CH01")

					//console.log(objId);
					if (this.Data.Rows.length > 0) {
						var myDiv = $('<div />').css({
										height: this.GetHeight(),
										width: this.GetWidth(),
										"min-width": "100px",
										"min-height": "100px"
									}).attr({
										id: objId,
										class: 'with-3d-shadow with-transitions'
									}).appendTo($(this.Element).empty());


						// $(document.createElementNS('http://www.w3.org/2000/svg','svg')).css({
										// height: this.GetHeight(),
										// width: this.GetWidth()}).appendTo(myDiv);
						
						// sizing problem in browser
						d3.select('#'+objId).append('svg');
						
						// get key elements in QlikView order
						var listKey = [];
						$.each(this.Data.Rows, function( index, row ) {
							if ($.inArray(row[0].text, listKey) === -1) {
								if (showOthers || row[0].text !== "Others")
									listKey.push(row[0].text);
							}
						});

						// Transform data set
						var data = d3.nest()
									.key(function(d) { return d.key; }).sortKeys(function(a,b) { return listKey.indexOf(a) - listKey.indexOf(b); })
									.entries(this.Data.Rows.filter(function(row){ return (showOthers || row[0].text !== "Others"); }).map(function(row){
										return {"key" : row[0].text, "x" : convertToUnixTime(row[1].text), "y" : parseFloat(row[2].data)}
									}))
									.map(function(k){
										return {"key": k.key, "values": k.values.map(function(v){ return {"x":v.x,"y":v.y} })}
									});

						var chart;
						nv.addGraph(function() {
							chart = nv.models.lineWithFocusChart();

						 // chart.transitionDuration(500);
							chart.xAxis
							  .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
							chart.x2Axis
							  .tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });

							chart.yAxis
							  .tickFormat(d3.format(',.2f'));
							chart.y2Axis
							  .tickFormat(d3.format(',.2f'));

							d3.select('#'+objId+' svg')
							  .datum(data)
							  .call(chart);

							nv.utils.windowResize(chart.update);

						  return chart;
						});
																		
					} else {
						this.Element.html('<p align="center"><b>No resulting rows to display..</b></p>');
					}
			});
		});
})(jQuery);

function convertToUnixTime(_text) {
	return dateFromQlikNumber(parseInt(_text)).getTime();
}

function dateFromQlikNumber(n) {
	var d = new Date((n - 25569)*86400*1000);
	// since date was created in UTC shift it to the local timezone
	d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
	return d;
}