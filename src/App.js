import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import db from './firebase';
import { useEffect, useState } from 'react';

import Switch1 from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function App() {

  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
      setChecked(!checked);
  }

  const [rooms, setRooms] = useState([]);

  const getChannels = () => {
    db.collection('rooms').onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
        };
      }))
    });

  }

  useEffect(() => {
    getChannels();
  }, [])

  console.log(rooms);

  return (
    <div className="App">
      <Router>
        <Container isDark={checked}>
          <HeaderContainer>
            <Formgroup isDark={checked}>
              <FormControlLabel
                  control={<Switch1 checked={checked} color="primary" onClick={toggleChecked} />}
                  label={checked ? "Dark Mode" : "Normal Mode"}
              />
            </Formgroup>
            <Header isDark={checked} />
          </HeaderContainer>
          <Main>
            <Sidebar rooms={rooms} isDark={checked} />
            <Switch>
              <Route path="/room">
                <Chat isDark={checked} />
              </Route>
              <Route path='/'>
                <Login />
              </Route>
            </Switch>
          </Main>
        </Container>
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  background: ${({ isDark }) => (isDark ? 'rgb(50, 50, 50)' : 'white')};
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 40px auto;
`

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`

const HeaderContainer = styled.div `
  display: grid;
  grid-template-columns: 200px auto;  
  border: ${({ isDark }) => (isDark ? 'solid 1px rgb(255, 255, 255)' : 'solid 1px rgb(104, 74, 104)')};
`;

const Formgroup = styled(FormGroup)`
  background: ${({ isDark }) => (isDark ? 'rgb(40, 40, 40)' : '#350d36')};  
  padding-left: 20px;
  color: white;
`;