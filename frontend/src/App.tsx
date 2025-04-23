import { Container } from '@chakra-ui/react';
import UserList from './components/ui/UserList';

const App = () => {
  return (
    <Container maxW="container.md" py={6}>
      <UserList />
    </Container>
  );
};

export default App;