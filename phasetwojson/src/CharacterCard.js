import React from "react";
import { Card, Button, Icon, Label } from "semantic-ui-react";

function CharacterCard({ characterData, handleDelete, handleClickLikes }) {
  const { id, status, name, species, image, likes } = characterData;

  return (
    <Card style={{ maxWidth: "400px", marginBottom: "1em" }}>
      <div className="ui card card-container">
        <div className="image">
          <img src={image} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Description>
            <p>
              {status} - {species}
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
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
        </Card.Content>
      </div>
    </Card>
  );
}

export default CharacterCard;
