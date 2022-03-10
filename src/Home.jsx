import { Container } from "react-bootstrap";
import { ProblemEditor } from "./ProblemEditor";

export function Home() {
    return (
        <div className="Home">
            <Container>
                home
                <ProblemEditor></ProblemEditor>
            </Container>
        </div>
    )
}