import React from 'react'
import Req from 'superagent'
import pack from '../../package.json'

window.req = Req;

let Mycomponent = React.createClass({

  getInitialState: function(){
    return{
      data: [
        {text: '', link: 'Fetching your data...'}
      ]
    }
  },

  componentDidMount: function(){
    Req.get('http://localhost:8052/getFeed').end(function(err, res){
      if (err) throw err;

      this.setState({
        data: res.body
      });

    }.bind(this));

  },

  clickHandler: function(){
    // Req.get('http://localhost:8000/getFeed').end(function(err, res){
    //   if (err) throw err;
    //   this.state.data = res.body;
    //   console.log('this.state.data: ', this.state.data);
    // }.bind(this));
  },

  render: function() {
    let version = pack.version,
        deps;

    deps = Object.keys(pack.devDependencies).map((dep, i) => <li key={i}>{dep}</li>);

    let style ={
      float: 'left',
      width: '100%'
    };

    var self = this;

    return(
      <div style={style}>
        {this.state.data.map(function(item){
          console.log('this.props: ', self.props);
          return <FeedBoxes title={item.title} link={item.link} changeVideo={self.props.changeVideo} />
        })}
      </div>
    )
  }
});

var FeedBoxes = React.createClass({

  changeVideo: function(){
    this.props.changeVideo(this.props);
  },

  render: function(){
    return(
      <div className="boxes"  onClick={this.changeVideo} >
        <div className="leftPillar"></div>
        <h4>{this.props.title}</h4>
        <p>{this.props.link}</p>
      </div>
    )
  }

})

export default Mycomponent;