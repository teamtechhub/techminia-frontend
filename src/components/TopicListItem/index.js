import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from '@fortawesome/fontawesome-free-solid'

import React from "react";
import { Col, Counter, CounterText, ListItem, Row } from "./style";

export default function TopicListItem(props) {
  return (
    <ListItem onClick={props.onClick}>
      <Row>
        <Col>
          <FontAwesomeIcon icon={faComment} />
        </Col>
        <Col md={10}>
          <h4>{props.item.title}</h4>
          {props.item.description}
        </Col>
        <Counter>
          <CounterText>{props.item.threads_counter}</CounterText>
          <CounterText>Threads</CounterText>
        </Counter>
      </Row>
    </ListItem>
  );
}
