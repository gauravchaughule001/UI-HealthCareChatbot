import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import FavoriteIcon from '@mui/icons-material/Favorite';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface ISidebarComponentProps {
  children?: any;
  options: Array<{
    label: string;
    icon?: JSX.Element;
    switch: boolean;
    value?: any;
    onClick: (e: any) => void;
  }>;
  darkMode:boolean;
}

const SidebarComponent: React.FC<ISidebarComponentProps> = ({
  children,
  options,
  darkMode
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const switchProps = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" className="!bg-[#128C7E]" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Chatbot
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border:"none"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className=""
      >
        <div className={`w-full h-full transition-all max-h-full overflow-y-scroll overflow-x-hidden ${darkMode? "bg-[#292931] !text-white font-[500]":""}`}>
        <DrawerHeader className={`transition-all sticky top-0 w-full ${darkMode?"bg-[#292931]":"bg-white"}`}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon color={"success"} />
            ) : (
              <ChevronRightIcon color={"success"} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider className={`${darkMode&&"bg-gray-500"}`} />
        <List>
          {options.map((option:any, index:number) => (
              <ListItemButton
              key={index}
                onClick={() => {
                  !option.switch && option.onClick(option);
                  !option.switch && setOpen(false);
                }}
              >
                {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
                <span className="w-full flex justify-between items-center px-4">
                  <ListItemText primary={option.label} />
                  {option.switch && (
                    <Switch
                      color="success"
                      checked={option.value}
                      {...switchProps}
                      onChange={(e) => option.onClick(e)}
                      placeholder="Change Theme"
                    />
                  )}
                </span>
              </ListItemButton>
          ))}
        </List>
        <Divider className={`${darkMode&&"bg-gray-500"}`} />
        <div className="text-sm absolute bottom-0 w-full justify-center items-center py-4 bg-inherit shadow-2xl drop-shadow-2xl">
            <span className="w-full flex justify-center items-center gap-1 h-auto m-auto">
            Made with <FavoriteIcon fontSize="small" color="error"/>
            </span>
        </div>
        </div>
      </Drawer>
      <Main onClick={() => setOpen(false)} open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default SidebarComponent;
