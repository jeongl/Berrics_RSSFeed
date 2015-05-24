import React from 'react'
import Req from 'superagent'
import pack from '../../package.json'

let Mycomponent = React.createClass({

  getInitialState: function(){
    return{
      data: []
    }
  },

  componentDidMount: function(){
    Req.get('http://localhost:8000/getFeed').end(function(err, res){
      if (err) throw err;
      // console.log('this.state.data: ', this.state.data);
      this.setState({
        data: res.body
      })
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

    return(
      <div>
        {this.state.data.map(function(item){
          return <FeedBoxes title={item.title} link={item.link} />
        })}
      </div>
    )
  }
});

var FeedBoxes = React.createClass({

  render: function(){
    return(
      <div className="boxes">
        <div className="leftPillar"></div>
        <h4>{this.props.title}</h4>
        <p>{this.props.link}</p>
      </div>
    )
  }

})

export default Mycomponent;