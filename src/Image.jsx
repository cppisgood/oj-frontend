import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import api from "./api";

export function Image() {
    const [file, setFile] = useState()


    return (
        <div className='Image'>
            <Container>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    console.log(e)

                    let formData = new FormData()
                    formData.append(file.name, file)
                    api.upload_image(formData, () => {
                        console.log('ojbk')
                    }, () => {
                        console.log('gg')
                    })
                }}>
                    <Form.Control type='file' accept='image/*' onChange={(e) => {
                        console.log(e)
                        setFile(e.target.files[0])
                    }}></Form.Control>
                    <Button type='submit' disabled={!file}>upload</Button>
                </Form>
            </Container>
        </div>
    )
}