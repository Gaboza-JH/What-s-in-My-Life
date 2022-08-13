import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Avatar, Switch } from '@mui/material'
import { CalendarMonth, ModeNight } from '@mui/icons-material'

const Sidebar = ({mode,setMode}) => {
    return (
        <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <Avatar alt="Hyeonjin" src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png" />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <CalendarMonth />
                        </ListItemIcon>
                        <ListItemText primary="Calendar" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="#simple-list">
                        <ListItemIcon>
                            <ModeNight />
                        </ListItemIcon>
                        <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default Sidebar
