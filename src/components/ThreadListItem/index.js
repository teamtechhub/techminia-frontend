import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Counter, CounterText, ListItem, Row } from "./styles";

function ThreadListItem(props) {
  return (
    <ListItem action onClick={props.onClick}>
      <Row className="row">
        <Col md={1}>
          <FontAwesomeIcon icon={"comment"} />
        </Col>
        <Col md={10}>
          <h5>{props.item.title}</h5>
          {props.item.description}
        </Col>
        <Counter md={1}>
          <CounterText>{props.item.posts_counter}</CounterText>
          <CounterText>Comments</CounterText>
        </Counter>
      </Row>
    </ListItem>
  );
}

export default ThreadListItem;
