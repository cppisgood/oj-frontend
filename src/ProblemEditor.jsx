import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
// import MDEditor from '@uiw/react-md-editor';
import 'katex/dist/katex.min.css'

export function ProblemEditor(props) {
    const [statement, setStatement] = useState(props.statement || '')
    const [input, setInput] = useState(props.input || '')
    const [output, setOutput] = useState(props.output || '')
    const [samples, setSamples] = useState(props.samples || [['', '']])
    const [hint, setHint] = useState(props.hint || '')

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

    markdown +=
        `# **hint**

${hint}


`

    return (
        <div className='ProblemEditor'>
            <Container>
                <Row>
                    <Col md='6' style={{ width: '50%', position: 'fixed', left: 0, overflowY: 'scroll', height: '90%' }}>
                        <Container>
                            <Form>
                                <h1><b>problem statement</b></h1>
                                <textarea style={{ width: '100%', height: '300px' }} onChange={e => {
                                    setStatement(e.target.value)
                                }}>
                                </textarea>
                                <h1><b>input</b></h1>
                                <textarea style={{ width: '100%', height: '200px' }} onChange={e => {
                                    setInput(e.target.value)
                                }}>
                                </textarea>
                                <h1><b>output</b></h1>
                                <textarea style={{ width: '100%', height: '200px' }} onChange={e => {
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
                                                        <Button onClick={() => {
                                                            let newSamples = samples.slice()
                                                            newSamples.splice(i, 1)
                                                            setSamples(newSamples)
                                                        }}> delete sample {i + 1} </Button>
                                                    </Col>
                                                </Row>
                                                <textarea onChange={e => {
                                                    let newSamples = samples.slice()
                                                    newSamples[i][0] = e.target.value
                                                    setSamples(newSamples)
                                                }}>
                                                </textarea>
                                                <h2>sample output {i + 1}</h2>
                                                <textarea onChange={e => {
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
                                <textarea style={{ width: '100%', height: '200px' }} onChange={e => {
                                    setHint(e.target.value)
                                }}>
                                </textarea>

                            </Form>
                        </Container>
                    </Col>
                    <Col md='6' style={{ position: 'fixed', width: '50%', left: '50%', right: 0, overflowY: 'scroll', height: '90%' }}>
                        <div id='md-preview'>
                            <Container>
                                <ReactMarkdown
                                    children={markdown}
                                    remarkPlugins={[remarkGfm, remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '')
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={tomorrow}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                />
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        },
                                        img: ({ node, ...props }) => <img style={{ maxWidth: '100%' }}{...props} />
                                    }}
                                >
                                </ReactMarkdown>
                            </Container>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}