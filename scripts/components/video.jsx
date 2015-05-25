import React from 'react'
import Req from 'superagent'
import pack from '../../package.json'

var Video = React.createClass({
	render: function(){
		console.log('this.props.link', this.props.link );
		return(
			<video id="mainVideo" width="750" height="750" controls>
			  <source src={this.props.link} type="video/mp4"></source>
			</video>
		)
	}
})

export default Video;