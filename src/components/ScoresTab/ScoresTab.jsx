import React from 'react';
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

      axios.get(`https://pacific-reef-99038.herokuapp.com/api/scores?User=${this.props.currentAgent}`)
      .then(res => {
          console.log(res.data)
          const yourScores = res.data;
          this.setState({yourScores: yourScores});
      });
  };

  render () {
      return (
        <div>
          <BackToMenu onClick={ () => {this.props.setCurrentScreen('start')}}>Back to menu</BackToMenu>
          {this.state.yourScores.map(item => <YourScore>{item.score}</YourScore>)}
        </div>
      );
  }
};



class BestWeekScores extends React.Component {
  state = {
    BestWeekScores: []
  }
  componentDidMount() {

      axios.get(`https://pacific-reef-99038.herokuapp.com/api/scores/week`)
      .then(res => {
          console.log(res.data)
          const BestWeekScores = res.data;
          this.setState({BestWeekScores: BestWeekScores});
      });
  };

  render () {
      return (
          <div>
            <BackToMenu onClick={ () => {this.props.setCurrentScreen('start')}}>Back to menu</BackToMenu>
            {this.state.BestWeekScores.map(item => <BestWeekScore>{item.score}</BestWeekScore>)}
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
          this.setState({allScores: allScores});
      });
  };

  render () {
      return (
        <div>
          <BackToMenu onClick={ () => {this.props.setCurrentScreen('start')}}>Back to menu</BackToMenu>
          {this.state.allScores.map(item => <BestWeekScore>{item.score}</BestWeekScore>)}
        </div>
      );
  }
};

function ScoresTab(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Your scores" />
          <Tab label="Best week scores" />
          <Tab label="All scores" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><YourScores setCurrentScreen={props.setCurrentScreen} currentAgent={props.currentAgent}/></TabContainer>}
      {value === 1 && <TabContainer><BestWeekScores setCurrentScreen={props.setCurrentScreen}/></TabContainer>}
      {value === 2 && <TabContainer><AllScores setCurrentScreen={props.setCurrentScreen}/></TabContainer>}
    </div>
  );
}

export default ScoresTab;