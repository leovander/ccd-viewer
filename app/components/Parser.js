const React = require('react')
const ReactDOM = require('react-dom')
const BlueButton = require('bluebutton')
const parseString = require('xml2js').parseString

let XMLInput = React.createClass({
  getInitialState: function getInitialState () {
    return {
      xmlContent: '<hello><world>Hello</world></hello>'
    }
  },
  onChange: function onChange (e) {
    this.setState({
      xmlContent: e.target.value
    })
  },
  render: function () {
    return (
    <div>
      <div id="left-content">
        <h2>Input XML</h2>
        <textarea onChange={this.onChange} value={this.state.xmlContent}></textarea>
      </div>
      <XMLOutput xmlContent={this.state.xmlContent} />
    </div>
    )
  }
})

let XMLOutput = React.createClass({
  render: function () {
    let data = this.props.xmlContent
    let error = 'Invalid CCD/XML entered. Make sure that you are passing in valid XML.'
    let output
    let validXML = false

    if (data.length > 0 && data != null) {
      parseString(data, { trim: true }, function (err, result) {
        if (result) {
          validXML = true
        } else {
          output = err.toString()
        }
      })

      if (validXML == true) {
        let ccda = BlueButton(data)

        if (typeof ccda.data !== 'undefined') {
          output = JSON.stringify(ccda.data, null, 2)
        } else {
          output = error
        }
      }
    } else {
      output = error
    }

    return (
    <div id="right-content">
      <h2>Output JSON</h2>
      <textarea id="output" value={output} disabled="true"></textarea>
    </div>
    )
  }
})

ReactDOM.render(<XMLInput/>, document.getElementById('app'))
