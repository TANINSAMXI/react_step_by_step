import EmojiBattle from "./components/EmojiBattle.jsx";
import {Container, Col} from "react-bootstrap";
import emoji from "./data/emoji.js";

function App() {
    return <Container>

        <Col xs={3}>
            <EmojiBattle data={emoji}/>
        </Col>

    </Container>
}

export default App
