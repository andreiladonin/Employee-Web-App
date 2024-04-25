import Container from '@mui/material/Container';
function MyContainer ({children}) {
    return <Container maxWidth="sm"> 
        {children}
    </Container>
}

export default MyContainer