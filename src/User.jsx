import { useEffect, useState, useCallback } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import api from "./api"

export function User() {
    const params = useParams()
    const f = useCallback(() => {
        api.user(params.username, (res) => {
            setUserInfo(res.data.msg)
        })
    }, [params])
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        f()
    }, [f])
    console.log(userInfo)
    console.log(JSON.stringify(userInfo))
    return (
        <div className="User">
            {
                userInfo && <Container>
                    <Card className='mt-2'>
                        <Row>
                            <Col sm={3}>
                                <Card style={{ width: '18rem', height: '18rem' }}>
                                    <Card.Body>
                                        {userInfo && <Card.Img src={`/api/image/${userInfo.avatar}`} />}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={9}>
                                <h1>
                                    {userInfo['username']}
                                </h1>
                                email: {userInfo.email || ''}<br />
                                organization/school: {userInfo.organization || ''}<br />
                                solved: {userInfo.solved || 0}<br />
                                submission: {userInfo.submission || 0}<br />
                            </Col>
                        </Row>
                    </Card>
                </Container>
            }
        </div>
    )
}