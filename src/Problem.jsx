import { MarkdownViewer } from "./MarkdownViewer"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "./api"
import { gen_markdown_problem } from "./ProblemEditor"
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap"
import { useTitle } from "react-use"
import { OJ_NAME } from "./config"

export function Problem(props) {

    const params = useParams()
    const [problem, setProblem] = useState()
    const [markdown, setMarkdown] = useState()

    useEffect(() => {
        api.get_problem(params.problem_id, (res) => {
            const problem = res.data.msg
            setProblem(problem)
            const content = problem.content
            const markdown = gen_markdown_problem(content.statement, content.input, content.output, content.samples, content.hint)
            setMarkdown(markdown)

        })
    }, [params])
    const title = problem ? `${problem.title} | ${OJ_NAME}` : ''
    useTitle(title)

    return (
        <div>
            <Container>
                <Row>
                    <Col md='9'>
                        <MarkdownViewer markdown={markdown}>
                        </MarkdownViewer>
                    </Col>
                    <Col md='3'>
                        {
                            problem && <Card className='mt-1'>
                                <ListGroup>
                                    <ListGroup.Item>
                                        title: {problem.title}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        time limit: {problem.time_limit}ms
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        memory limit: {problem.memory_limit}MB
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        creator: <Link to={`/user/${problem.creator}`}>{problem.creator}</Link>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        difficulty: {problem.difficulty}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        tags: {
                                            problem.tags.map((tag) => {
                                                return (
                                                    <Button variant='success' size='sm' className='m-1'>
                                                        {tag}
                                                    </Button>
                                                )
                                            })
                                        }
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )


}