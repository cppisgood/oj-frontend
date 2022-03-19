import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function MarkdownViewer(props) {
    return (
        <div className='Problem'>
            {/* <Container> */}
            <ReactMarkdown
                children={props.markdown}
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
                    img: ({ node, ...props }) => <img alt='gg' style={{ maxWidth: '100%' }}{...props} />
                }}
            >
            </ReactMarkdown>
            {/* </Container> */}
        </div>
    )
}