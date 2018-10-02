import React from 'react'
import {
  Container,
  Row,
  Col,
  Jumbotron
} from 'reactstrap';

class BodyContent extends React.Component {

  render() {
    return (
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>This is Sample Notification with Reactjs & Admin Angular & NodeJs As BackEnd</h1>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    )
  }
}
export default BodyContent
