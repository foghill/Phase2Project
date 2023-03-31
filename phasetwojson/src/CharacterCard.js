import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Button, Label } from "semantic-ui-react";

function CharacterCard({ characterData, handleDelete, handleClickLikes }) {
  // destructure characterData to get the needed properties
  const { id, status, name, species, image, likes } = characterData;

  return (
    <div className="ui link cards">
      <div className="ui card card-container">
        <div className="image">
          <img src={image} alt={name} />
        </div>
        <div className="content">
          <div className="header">{name}</div>

          <div className="description">
            <p>{status} - {species}</p>

          </div>
        </div>
        <div className="extra content">
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
