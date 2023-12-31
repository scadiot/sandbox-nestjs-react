import {
  Outlet
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../auth-context';
import { useNavigate } from "react-router-dom";

export default function Root() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return  <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {token && <Button color="inherit" onClick={logout}>Logout</Button>}
          {!token && <Button color="inherit" onClick={() => navigate("/signin")}>Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet />
  </>
}
