var React = require('react');
var ReactDOM = require('react-dom');
var parseString = require('xml2js').parseString;

var XMLOutput = React.createClass({
	render: function() {
		var data = this.props.xmlContent;
		var output = '';

		parseString(data, { trim: true, attrkey: '@' }, function (err, result) {
			if (result) {
				output = JSON.stringify(result, null, 2);
			} else {
				output = err.toString();
			}
		});

		return (
			<div id="right-content">
				<h2>Output JSON</h2>
				<textarea id="output" value={output} disabled="true"></textarea>
			</div>
		);
	}
});

var XMLInput = React.createClass({
	getInitialState: function getInitialState() {
		return {
			xmlContent: '<sampleXml><xmlSample>https://msdn.microsoft.com/en-us/library/ms762271(v=vs.85).aspx</xmlSample><ccdSample>https://raw.githubusercontent.com/chb/sample_ccdas/master/HL7%20Samples/CCD.sample.xml</ccdSample></sampleXml>'
		};
	},
	onChange: function onChange(e) {
		this.setState({
			xmlContent: e.target.value
		});
	},
	render: function() {
		return (
			<div>
				<div id="left-content">
					<h2>Input XML</h2>
					<textarea onChange={this.onChange} value={this.state.xmlContent}></textarea>
				</div>
				<XMLOutput xmlContent={this.state.xmlContent} />
			</div>
		);
	}
});

ReactDOM.render(<XMLInput/>, document.getElementById('app'));