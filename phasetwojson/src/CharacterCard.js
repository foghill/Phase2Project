import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Button, Label } from "semantic-ui-react";

function CharacterCard({ characterData, handleDelete, handleClickLikes }) {
  const { id, status, name, species, image, likes } = characterData;
  return (
    <div className="ui link cards">
      <div class="ui card">
        <div class="image">
          <img src={image} alt={name} />
        </div>
        <div class="content">
          <div class="header">{name}</div>

          <div class="description">
            <p>{status} </p>
            <p>{species}</p>
          </div>
        </div>
        <div class="extra content">
          <Button
          class='extra content'
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
            onClick={() => handleDelete(id)}
          >
            <Button basic color="blue">
              Delete
            </Button>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
