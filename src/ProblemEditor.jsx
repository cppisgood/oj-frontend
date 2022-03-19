import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";

// import MDEditor from '@uiw/react-md-editor';
import 'katex/dist/katex.min.css'
import { MarkdownViewer } from "./MarkdownViewer";
import api from "./api";
import { useSearchParams } from "react-router-dom";


export function gen_markdown_problem(statement, input, output, samples, hint) {
    let markdown =
        `# **problem statement**

${statement}

# **input**

${input}

# **output**

${output}

# **sample**
`

    for (let i = 0; i < samples.length; ++i) {
        markdown +=
            `## sample input ${i + 1}

\`\`\`text
${samples[i][0]}
\`\`\`

## sample output ${i + 1}

\`\`\`text
${samples[i][1]}
\`\`\`
`
    }

    if (hint) {
        markdown +=
            `# **hint**

${hint}

`
    }

    return markdown
}

// TODO DATAS
// TODO page access control
// TODO SPJ
export function ProblemEditor(props) {
    const [title, setTitle] = useState(props.title || '')
    const [timeLimit, setTimeLimit] = useState(props.timeLimit || 1000)
    const [memoryLimit, setMemoryLimit] = useState(props.memoryLimit || 256)
    const [difficulty, setDifficulty] = useState(1)
    const [visible, setVisible] = useState(props.visible || false)
    const [tags, setTags] = useState(props.tags || [])

    // problem content
    const [statement, setStatement] = useState(props.statement || '')
    const [input, setInput] = useState(props.input || '')
    const [output, setOutput] = useState(props.output || '')
    const [samples, setSamples] = useState(props.samples || [['', '']])
    const [hint, setHint] = useState(props.hint || '')

    const [searchParams] = useSearchParams()
    const problem_id = searchParams.get('problem-id')
    // const [problem, setProblem] = useState()
    const [markdown, setMarkdown] = useState()
    useEffect(() => {
        api.get_problem(problem_id, (res) => {
            const problem = res.data.msg
            // setProblem(problem)
            const content = problem.content
            const markdown = gen_markdown_problem(content.statement, content.input, content.output, content.samples, content.hint)
            console.log(problem)
            setMarkdown(markdown)
            setTitle(problem.title)
            setTimeLimit(problem.time_limit)
            setMemoryLimit(problem.memory_limit)
            setDifficulty(problem.difficulty)
            setVisible(problem.visible)
            setTags(problem.tags)
            setStatement(content.statement)
            setInput(content.input)
            setOutput(content.output)
            setSamples(content.samples)
            setHint(content.hint)

        })
    }, [problem_id])



    const [newTag, setNewTag] = useState()
    const [tagAlert, setTagAlert] = useState()
    const [alert, setAlert] = useState()

    return (
        <div className='ProblemEditor'>
            <Container>
                <Row>
                    <Col md='6' style={{ width: '50%', position: 'fixed', left: 0, overflowY: 'scroll', height: '90%' }}>
                        <Container>
                            <Form onSubmit={(e) => {
                                e.preventDefault()
                                api.update_probelm(problem_id, {
                                    title: title,
                                    content: {
                                        statement: statement,
                                        input: input,
                                        output: output,
                                        samples: samples,
                                        hint: hint
                                    },
                                    time_limit: timeLimit,
                                    memory_limit: memoryLimit,
                                    difficulty: difficulty,
                                    visible: visible,
                                    tags: tags
                                }, () => {

                                }, (e) => {
                                    setAlert(e.response.data.msg)
                                })
                            }}>
                                title:
                                <Form.Control value={title} required onChange={(e) => {
                                    setTitle(e.target.value)
                                }}></Form.Control>

                                time limit(ms):
                                <Form.Control value={timeLimit} required type='number' onChange={(e) => {
                                    setTimeLimit(e.target.value)
                                }}></Form.Control>

                                memory limit(MB):
                                <Form.Control value={memoryLimit} required type='number' onChange={(e) => {
                                    setMemoryLimit(e.target.value)
                                }}></Form.Control>

                                difficulty(1-5):
                                <Form.Control value={difficulty} required type='number' max='5' min='1' onChange={(e) => {
                                    setDifficulty(e.target.value)
                                }}></Form.Control>

                                visible:
                                <Form.Switch checked={visible} onChange={() => {
                                    setVisible(!visible)
                                }}></Form.Switch>

                                tags:<br />
                                {
                                    tags.map((tag, i) => <Button className='mx-1' key={i + 1} variant='success'>
                                        <span>
                                            {tag}
                                        </span>
                                        <span className='btn-close ms-2' onClick={() => {
                                            let newTags = tags.slice()
                                            newTags.splice(i, 1)
                                            setTags(newTags)
                                        }}></span>
                                    </Button>)
                                }
                                <Row className='mt-1'>
                                    <Col>
                                        <Form.Control value={newTag} onChange={(e) => {
                                            setNewTag(e.target.value)
                                        }}></Form.Control>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => {
                                            if (!newTag) {
                                                return setTagAlert('tag cannot be empty')
                                            }
                                            let newTags = tags.slice()
                                            newTags.push(newTag)
                                            setTags(newTags)
                                            setTagAlert('')
                                            setNewTag('')
                                        }}>add a tag</Button>
                                    </Col>
                                </Row>
                                {tagAlert && <Alert variant="warning">{tagAlert}</Alert>}


                                <h1><b>problem statement</b></h1>
                                <textarea value={statement} required style={{ width: '100%', height: '300px' }} onChange={e => {
                                    setStatement(e.target.value)
                                }}>
                                </textarea>
                                <h1><b>input</b></h1>
                                <textarea value={input} required style={{ width: '100%', height: '200px' }} onChange={e => {
                                    setInput(e.target.value)
                                }}>
                                </textarea>
                                <h1><b>output</b></h1>
                                <textarea value={output} required style={{ width: '100%', height: '200px' }} onChange={e => {
                                    setOutput(e.target.value)
                                }}>
                                </textarea>

                                <Button onClick={() => {
                                    const newSamples = samples.slice()
                                    newSamples.push(['', ''])
                                    setSamples(newSamples)
                                }}>add a sample</Button>

                                {/* cerate textarea and delete button for every sample */}
                                {
                                    samples.map((sample, i) => {
                                        return (
                                            <div key={i}>
                                                <Row>
                                                    <Col>
                                                        <h2>sample input {i + 1}</h2>
                                                    </Col>
                                                    <Col>
                                                        <Button variant='success' onClick={() => {
                                                            let newSamples = samples.slice()
                                                            newSamples.splice(i, 1)
                                                            setSamples(newSamples)
                                                        }}> delete sample {i + 1} </Button>
                                                    </Col>
                                                </Row>
                                                <textarea value={samples[i][0]} onChange={e => {
                                                    let newSamples = samples.slice()
                                                    newSamples[i][0] = e.target.value
                                                    setSamples(newSamples)
                                                }}>
                                                </textarea>
                                                <h2>sample output {i + 1}</h2>
                                                <textarea value={samples[i][1]} onChange={e => {
                                                    let newSamples = samples.slice()
                                                    newSamples[i][1] = e.target.value
                                                    setSamples(newSamples)
                                                }}>
                                                </textarea>
                                            </div>
                                        )
                                    })
                                }

                                <h1><b>hint</b></h1>
                                <textarea value={hint} style={{ width: '100%', height: '200px' }} onChange={e => {
                                    setHint(e.target.value)
                                }}>
                                </textarea>
                                <Button type='submit'>submit</Button>
                                {
                                    alert && <Alert className='mt-2' variant="warning">
                                        {alert}
                                    </Alert>
                                }
                            </Form>
                        </Container>
                    </Col>
                    <Col md='6' style={{ position: 'fixed', width: '50%', left: '50%', right: 0, overflowY: 'scroll', height: '90%' }}>
                        <div id='md-preview'>
                            <Container>
                                <MarkdownViewer markdown={markdown}></MarkdownViewer>
                            </Container>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}