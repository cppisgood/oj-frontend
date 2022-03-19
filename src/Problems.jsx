import { Container, Table } from "react-bootstrap";

export function Problems() {
    return (
        <div className='Problems'>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>difficulty</th>
                            <th></th>
                        </tr>
                    </thead>
                </Table>
            </Container>
        </div>
    )
}