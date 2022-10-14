import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Button, Label } from "semantic-ui-react";

function CharacterCard({ characterData, handleDelete, handleClickLikes }) {
  const { id, status, name, species, image, likes } = characterData;
  return (
    <div className="ui card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="char-avatar" />

      <Button
        as="div"
        labelPosition="right"
        onClick={() => handleClickLikes(characterData)}
      >
        <Button color="red">
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic color="red" pointing="left">
          {likes}
        </Label>
      </Button>
      <Button
        as="div"
        labelPosition="right"
        onClick={() => handleClickLikes(characterData)}
      >
        <Button basic color="blue">
          <Icon name="fork" />
          Delete
        </Button>
      </Button>
    </div>
  );
}

export default CharacterCard;
