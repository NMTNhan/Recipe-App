import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter} from 'react-router-dom'
import Search from "./components/Search";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdFastfood } from "react-icons/md";
import {Divider} from "antd"
import LoadingScreen from "react-loading-screen"
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])
  
  return (
    <>
      {loading === false ? 
        (<div className="App">
          <BrowserRouter>
            <Nav>
              <MdFastfood/>
              <Logo to={'/'}>delicacie</Logo>
            </Nav>
            <Search/>
            <Category/>
            <Divider/>
            <Pages/>
          </BrowserRouter>
        </div>
        ):
        ( <>
            <div className="App-loading">
            <LoadingScreen
              loading={true}
              bgColor='#f1f1f1'
              spinnerColor='orange'
              textColor='gray'
              text='Please wait awhile!'
            /> 
            </div>
          </>
        )}
    </>
  );
}


const Logo = styled(Link)`
  text-decoration:none;
  font-size: 2rem;
  font-weight: 400;
  font-family: 'Lobster', sans-serif;
  margin-left: 0.5rem;

`

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flext-start;
  align-items: center;
  svg{
    font-size: 2rem;
  }
  color: orange;
`

export default App;
