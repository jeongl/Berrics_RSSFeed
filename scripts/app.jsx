import React from 'react'
import Req from 'superagent'
import MyComponent from './components/mycomponent.jsx'
import Video from './components/video.jsx'

window.React = React;

var Main = React.createClass({

	getInitialState: function(){
		return{link:null}
	},

	getVideoLink: function(link, fn){

    Req.get('http://jlim.me:8052/getVideoLink').query({videoPage: link}).end(function(err, res){
      if (err) throw err;

      var link = res.text;
			fn(link);

    }.bind(this));

	},

	changeVideo: function(param){
		// alert(JSON.stringify(param, null, 2)  );
		var videoEl = document.getElementById('mainVideo');

		videoEl.pause();

		this.getVideoLink(param.link, function(link){
			videoEl.setAttribute('src', link);
			videoEl.load();
		})

	},

	render:  function(){
		return(
			<div>
				<MyComponent changeVideo={this.changeVideo}  />
				<Video link={this.state.link} />
			</div>
		)
	}

})

// React.render(<MyComponent />, document.getElementById('content'));
React.render(<Main />, document.getElementById('content'));