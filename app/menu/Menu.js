import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import {
  stateFilterAction,
  searchMovieAction,
  rowStateAction,
  widthStateAction,
  showFilterAction,
  showMovieWatchedAction
} from "../../infra/redux/actions/actions";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    fontFamily: "Roboto"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },

  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },

  appBar: {
    backgroundColor: "#232323",
    position: "fixed"
  },

  list: {
    width: 250
  },

  btn: {
    backgroundColor: "transparent",
    marginTop: "5px"
  }
});

class MenuConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      filter: false,
      left: false,
      show: false
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.props.widthStateAction(window.innerWidth);
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleQuery = e => {
    this.setState({ query: e.target.value }, () => {
      this.props.searchMovieAction(this.state.query);
      this.props.showFilterAction(false);
    });
  };

  toggleRow = () => {
    this.props.rowStateAction();
  };

  toggleFilter = () => {
    this.props.stateFilterAction();
    this.props.showFilterAction(true);
    this.props.searchMovieAction("");
    this.setState({ query: "" });
    this.setState(preventState => ({ show: !preventState.show }));
  };

  exit = () => {
    Meteor.logout();
    window.location = "/login";
  };

  movieWatched = () => {
    this.props.showMovieWatchedAction();
  };

  render() {
    const Icon = ({ index }) => {
      const list = ["search", "movie", "exit_to_app"];
      return (
        <i style={{ color: "#888888" }} className="material-icons">
          {list[index]}
        </i>
      );
    };

    const {
      classes,
      rowState,
      widthState,
      hiddenIcons,
      hiddenAboutIcon
    } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <Link to="/" className="text-list">
            <ListItem button>
              <ListItemIcon>
                <Icon index={0} />
              </ListItemIcon>
              Procurar Filmes
            </ListItem>
          </Link>

          <Link to="/movie-watch" className="text-list">
            <ListItem button>
              <ListItemIcon>
                <Icon index={1} />
              </ListItemIcon>
              Meus Filmes
            </ListItem>
          </Link>

          <ListItem button onClick={this.exit}>
            <ListItemIcon>
              <Icon index={2} />
            </ListItemIcon>
            <Button className="text-list">Sair</Button>
          </ListItem>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer("left", true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Wantch
            </Typography>
            <form onSubmit={e => e.preventDefault()} className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <Link to="/">
                <InputBase
                  placeholder="Buscar..."
                  onChange={this.handleQuery}
                  value={this.state.query}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </Link>
            </form>

            {!hiddenAboutIcon ? (
              <div onClick={this.movieWatched} className="movie-watched-icon">
                <i className="material-icons" id="check_circle">
                  check_circle
                </i>

                <Typography
                  className={classes.title}
                  color="inherit"
                  noWrap
                  style={{ margin: "5px" }}
                >
                  {this.props.showMovieWatched
                    ? "voltar em filmes para assistir"
                    : "ir para filmes Assistidos"}
                </Typography>
              </div>
            ) : (
              ""
            )}

            {widthState > 830 && !hiddenIcons && !hiddenAboutIcon ? (
              rowState ? (
                <button onClick={this.toggleRow} className={classes.btn}>
                  <i className="material-icons">list</i>
                </button>
              ) : (
                <button onClick={this.toggleRow} className={classes.btn}>
                  <i className="material-icons">view_module</i>
                </button>
              )
            ) : (
              ""
            )}
            <div className={classes.grow} />
          </Toolbar>
          <div
            className="scroll-menu"
            style={{ display: "block", position: "relative" }}
          >
            <Link to="/on-high" className="link-menu">
              Em Alta
            </Link>
            <Link to="/popular" className="link-menu">
              Populares
            </Link>
            <Link to="/most-watched" className="link-menu">
              Mais Assistidos
            </Link>
            <Link to="/best-rated" className="link-menu">
              Melhores Avalidados
            </Link>

          </div>
        </AppBar>

        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            style={{ backgroundColor: "#1D1D1D", height: "100vh" }}
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

MenuConnect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({
  widthState,
  rowState,
  showMovieWatched,
  showFilter,
  hiddenIcons,
  hiddenAboutIcon
}) => {
  return {
    widthState,
    rowState,
    showFilter,
    showMovieWatched,
    hiddenIcons,
    hiddenAboutIcon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchMovieAction: query => dispatch(searchMovieAction(query)),
    stateFilterAction: () => dispatch(stateFilterAction()),
    rowStateAction: () => dispatch(rowStateAction()),
    widthStateAction: value => dispatch(widthStateAction(value)),
    showFilterAction: value => dispatch(showFilterAction(value)),
    showMovieWatchedAction: () => dispatch(showMovieWatchedAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MenuConnect));
