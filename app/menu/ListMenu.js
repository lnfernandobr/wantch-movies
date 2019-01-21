import { Link } from "react-router-dom";
import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";

const exit = () => {
  Meteor.logout(e => {
    if (e) {
      alert("Aconteceu alguma coisa, não conseguimos fazer seu logout :(");
    } else {
      window.location = "/login";
    }
  });
};

const Icon = ({ index }) => {
  const list = [
    "sentiment_very_satisfied",
    "save",
    "movie_filter",
    "exit_to_app"
  ];
  return (
    <i style={{ color: "#888888" }} className="material-icons">
      {list[index]}
    </i>
  );
};

export const ListMenu = ({
  moviesSave,
  totalMoviesAssisted,
  name,
  history
}) => (
  <div style={{ width: "250px" }}>
    <List>
      <Link to="/" className="text-list">
        <ListItem button>
          <ListItemIcon>
            <Icon index={0} />
          </ListItemIcon>
          {name}
        </ListItem>
      </Link>

      <Link to="/my-movies" className="text-list">
        <ListItem button>
          <ListItemIcon>
            <Icon index={1} />
          </ListItemIcon>
          Filmes Salvos {moviesSave}
        </ListItem>
      </Link>
      <Link to="/movies-watched" className="text-list">
        <ListItem button>
          <ListItemIcon>
            <Icon index={2} />
          </ListItemIcon>
          Filmes assistidos {totalMoviesAssisted}
        </ListItem>
      </Link>

      <ListItem button onClick={exit}>
        <ListItemIcon>
          <Icon index={3} />
        </ListItemIcon>
        <Button className="text-list">Sair</Button>
      </ListItem>
    </List>
    <Divider />
  </div>
);
