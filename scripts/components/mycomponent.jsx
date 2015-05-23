import React from 'react'
import Req from 'superagent'
import pack from '../../package.json'

let Mycomponent = React.createClass({

  clickHandler: function(){
    Req.get('http://localhost:8000/getFeed').end(function(err, res){
      if (err) throw err;
      console.log('res: ', res);
    });
  },

  render: function() {
    let version = pack.version,
        deps;

    deps = Object.keys(pack.devDependencies).map((dep, i) => <li key={i}>{dep}</li>);

    return (
      <div>
        <h1 className="Mycomponent" onClick={this.clickHandler} >Welcome to &#9883; React Starterify {version} </h1>
        <p>Powered by:</p>
        <ul>
          {deps}
        </ul>
        <Main />
      </div>
    )
  }
});

let Main = React.createClass({

  render: function(){
    return(
      <h1>Hello, World</h1>
    )
  }

})

export default Mycomponent;