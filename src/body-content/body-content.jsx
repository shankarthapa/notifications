import React from 'react'
import styles from './body-content.css'
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';
class BodyContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>Welcome to React</h1>
              <p>
                <Button
                  tag="a"
                  color="success"
                  size="large"
                  href="http://reactstrap.github.io"
                  target="_blank"
                >
                  View Reactstrap Docs
                                    </Button>
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    )
  }
}
export default BodyContent