import { Bar } from './Bar';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <div className='App'>
            <Container fluid>
                <Bar></Bar>
            </Container>
            <Container>
                <Outlet></Outlet>
            </Container>
        </div>
    );
}

export default App;
