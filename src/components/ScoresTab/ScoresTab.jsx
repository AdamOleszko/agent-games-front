import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { YourScore } from './ScoresTabStyles';
import { BestWeekScore } from './ScoresTabStyles';
import { AllScore } from './ScoresTabStyles';
import { BackToMenu } from './ScoresTabStyles';
import config from '../../config';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


class YourScores extends React.Component {

  state = {
      yourScores: []
  }
  componentDidMount() {
      console.log('currentAgent',this.props.currentAgent)
      axios.get(`https://pacific-reef-99038.herokuapp.com/api/scores/user/?user=${this.props.currentAgent}`)
      .then(res => {
          console.log('your',res.data)
          const yourScores = res.data;
          this.setState({yourScores: yourScores});
      });
  };

  render () {
      return (
        <div>
          <BackToMenu onClick={ () => {this.props.setCurrentScreen('start')}}>Back to menu</BackToMenu>
          {this.state.yourScores.map(item => <YourScore>{item.userLogin} - {item.score}</YourScore>)}
        </div>
      );
  }
};



class BestWeekScores extends React.Component {
  state = {
    allScores: []
}
componentDidMount() {
    axios.get(`https://pacific-reef-99038.herokuapp.com/api/scores/week`)
    .then(res => {
        console.log(res.data)
        const allScores = res.data;
        this.setState({allScores: allScores.sort()});
    });
};

render () {
  return (
    <div>
    {this.state.allScores.length > 0 && this.props.agents.length > 0 ? (<div>
      <BackToMenu onClick={ () => {this.props.setCurrentScreen('start')}}>Back to menu</BackToMenu>
      {this.state.allScores.map(item => <BestWeekScore>{<img src={`http://${this.props.agents.filter((ag)=> {
        return ag.login === item.userLogin
      })[0].avatar}`}/>}{this.props.agents.filter((ag)=> {
        return ag.login === item.userLogin
      })[0].name} - {item.score}</BestWeekScore>)}</div>) : 'Loading'}
    </div>
    );
}
};


class AllScores extends React.Component {
  state = {
      allScores: []
  }
  componentDidMount() {
      axios.get(`https://pacific-reef-99038.herokuapp.com/api/scores`)
      .then(res => {
          console.log(res.data)
          const allScores = res.data;
          this.setState({allScores: allScores.sort()});
      });
  };

  render () {
      return (
        <div>
        {this.state.allScores.length > 0 && this.props.agents.length > 0 ? (<div>
          <BackToMenu onClick={ () => {this.props.setCurrentScreen('start')}}>Back to menu</BackToMenu>
          {this.state.allScores.map(item => <BestWeekScore>{<img src={`http://${this.props.agents.filter((ag)=> {
            return ag.login === item.userLogin
          })[0].avatar}`}/>}{this.props.agents.filter((ag)=> {
            return ag.login === item.userLogin
          })[0].name} - {item.score}</BestWeekScore>)}</div>) : 'Loading'}
        </div>
      );
  }
};

function ScoresTab(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [agents, setAgents] = React.useState([]);

  useEffect(async () => {
    const agents = await axios.get(`${config.server_url}/agents/`, {headers: {'X-API-Version': '2', Authorization: `Bearer ${props.accessToken}`}});
    setAgents(agents.data);
  }, [props.accessToken])

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  console.log(agents);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          {/* <Tab label="Your scores" /> */}
          <Tab label="Best week scores" />
          <Tab label="All scores" />
        </Tabs>
      </AppBar>
      {/* {value === 0 && <TabContainer><YourScores setCurrentScreen={props.setCurrentScreen} currentAgent={props.currentAgent}/></TabContainer>} */}
      {value === 0 && <TabContainer><BestWeekScores setCurrentScreen={props.setCurrentScreen} agents={agents}/></TabContainer>}
      {value === 1 && <TabContainer><AllScores setCurrentScreen={props.setCurrentScreen} agents={agents}/></TabContainer>}
    </div>
  );
}

export default ScoresTab;