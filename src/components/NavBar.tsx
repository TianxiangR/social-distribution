import React from 'react';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreatePostDialog from './CreatePostDialog';

export type NarBarItem = {
  icon: React.JSX.Element,
  label: string;
  path: string;
}

export interface NavBarProps {
  selection?: string;
  options: Array<NarBarItem>;
}

function NavBar(props: NavBarProps) {
  const {selection, options} = props;
  const [open, setOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState(selection || options[0].label);
  const navigate = useNavigate();

  const handleOnClick = (label:string, path: string) => () => {
    navigate(path);
    setSelectedLabel(label);
  };
  return (
    <>
      <List sx={{maxWidth: '275px'}} data-testid="navbar">
        {
          options.map((item)=>(
            <ListItemButton key={item.label} selected={selectedLabel === item.label} onClick={handleOnClick(item.label, item.path)} >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label}/>
            </ListItemButton>
          ))
        }
        <ListItem sx={{padding: '20px 20px'}}>
          <Button variant="contained" sx={{width: '100%'}} onClick={() => setOpen(true)} data-testid="button-create-post">Create Post</Button>
        </ListItem>
      </List>
      <CreatePostDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default NavBar;