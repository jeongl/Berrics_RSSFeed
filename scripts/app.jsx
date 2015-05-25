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

    Req.get('http://localhost:8000/getVideoLink').query({videoPage: link}).end(function(err, res){
      if (err) throw err;

      var link = res.text;
			fn(link);

    }.bind(this));

	},

	changeVideo: function(param){
		// alert(JSON.stringify(param, null, 2)  );

		document.getElementById('mainVideo').pause();

		this.getVideoLink(param.link, function(link){
			document.getElementById('mainVideo').setAttribute('src', link);
			document.getElementById('mainVideo').load();
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