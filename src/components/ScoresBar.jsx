import React from 'react';
import axios from 'axios';
import { ScoresBarCont } from './ScoresBarStyles';
import { UserName } from './ScoresBarStyles';
import ScoresMenu from './ScoresMenu/ScoresMenu'
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

export const ScoresBar = (props) => {

    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 50%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          padding: '0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center',
        },
      });
    
    const classes = useStyles();

    const styles = {
        startButtonStyle: {
            fontSize: 35
        }
    }

    return(
        <ScoresBarCont className={classes.root}>
            <Button style = {styles.startButtonStyle} onClick={() => {props.setCurrentScreen('game')}}>Start game</Button>
            <ScoresMenu style = {styles.startButtonStyle}/>
        </ScoresBarCont>
    )
}