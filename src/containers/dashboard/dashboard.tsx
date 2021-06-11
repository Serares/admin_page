import React, { useState, useContext } from 'react';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Container, Box, Grid, Paper } from '@material-ui/core'
/**ICONS */
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { AuthenticationStore } from '../../store/authenticationStore';
import ActivityTable from '../../components/ActivityTable/ActivityTable';
import UsersPieChart from '../../components/UsersPieChart/UsersPieChart';
import PropertiesBarChart from '../../components/PropertiesBarChart/PropertiesBarChart';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      backgroundColor: "#4a7e9d"
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    acordion: {
      flexDirection: "column"
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }),
);

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const { container, children } = props;
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const isDashboardUrl = location.pathname === "/dashboard";
  //@ts-ignore
  const { deleteToken } = useContext(AuthenticationStore);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handeClick = (path: string) => {
    let splitedString = path.split("/");

    setSelectedTab(splitedString[splitedString.length - 1]);
    history.push(path);
  };

  const handleLogout = () => {
    deleteToken()
      .then((bool: boolean) => {
        if (bool) {
          history.push("/login")
        } else {
          alert("You are not logged in")
        }
      })
  }

  const addPropertiesTab = (
    <React.Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Adauga Proprietate</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.acordion}>
          <ListItem button>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Adauga Apartament"} onClick={() => handeClick("/dashboard/addApartment")} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Adauga Casa"} onClick={() => handeClick("/dashboard/addHouse")} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary={"Adauga Teren"} onClick={() => handeClick("/dashboard/addLand")} />
          </ListItem>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => handeClick("/dashboard")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button onClick={() => handeClick("/dashboard/properties")}>
          <ListItemIcon>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText primary={"Proprietati Postate"} />
        </ListItem>
        {addPropertiesTab}
        <ListItem button>
          <ListItemIcon>
            <DynamicFeedIcon />
          </ListItemIcon>
          <ListItemText primary={"Proprietati Utilizatori"} onClick={() => handeClick("/dashboard/submitedProperties")} />
        </ListItem>
      </List>
    </div>
  );

  const dashboardContent = () => {
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            {/* bar chart */}
            <Paper >
              <PropertiesBarChart />
            </Paper>
          </Grid>
          {/* users pie chart */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper >
              <UsersPieChart adminUsers={2} basicUsers={1} />
            </Paper>
          </Grid>
          {/* recent actions */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
        </Box>
      </Container>
    )
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            {selectedTab}
            <Typography variant="h6" noWrap>
              <Button variant="contained" onClick={() => handleLogout()}>Logout</Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children && children}
        {isDashboardUrl && dashboardContent()}
      </main>
    </div>
  );
}
