
import styled from 'styled-components'

export const Box = styled.div`
width: 60%;
padding: 75px 25px;
background: white;
margin: 50px auto 100px auto;
border: 5px solid black;
box-shadow: 10px 10px #878df7;
font-family: "Josefin Sans", sans-serif;
max-width: 600px;

`
export const Header = styled.h1`
font-size: 1.75rem;
margin:0;
@media (min-width: 768px){
    font-size: 3rem;
  }
`
export const SubTitle = styled.h2`
margin: 5px 0;
font-size: 1.25rem;
@media (min-width: 768px){
    font-size: 1.5rem;
  }`

export const Details = styled.p`
font-size: 0.75rem;
margin: 5px 0;
@media (min-width: 768px){
    font-size: 1.5rem;
  }

`