import React, { useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import userSvg from "../../Assets/user.svg";
import logo from "../../Assets/logo.png";
import white_arrow from "../../Assets/White_arrow.png";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function logout() {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }

  function logIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info
        const user = result.user;
        console.log("User info: ", user);
        // Redirect to the dashboard or home page after login
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error logging in: ", error);
      });
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <a href="/">
        <p className="navbar-heading">
          <img src={logo} alt="logo" width="30px" height="30px" /> Budget Buddy
        </p>
      </a>
      {user ? (
        <div>
          <IconButton
            onClick={handleClick}
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Avatar
              src={user.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="user-img"
            >
              {user.displayName ? user.displayName[0] : <AccountCircle />}
            </Avatar>
            <span className="user-name">{user.displayName}</span>
            <img
              src={white_arrow}
              alt="arroww"
              height={"30px"}
              width={"30px"}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="menu-appbar"
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem
              component="a"
              href="https://1finance.co.in/blog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fix Your Finance
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <p className="navbar-link" onClick={logIn}>
          Log In
        </p>
      )}
    </div>
  );
}

export default Header;
