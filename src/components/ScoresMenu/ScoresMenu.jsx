import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

function ScoresMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button aria-owns={open ? 'fade-menu' : undefined} aria-haspopup="true" onClick={handleClick}>
        Game Scores
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Your scores</MenuItem>
        <MenuItem onClick={handleClose}>Best week scores</MenuItem>
        <MenuItem onClick={handleClose}>All scores</MenuItem>
      </Menu>
    </div>
  );
}

export default ScoresMenu;