import { Link } from "react-router-dom";
import styled from 'styled-components'

export const Press = styled(Link)`
text-decoration: none;
&:visited{
  color:black;
}
`
export const Colour = styled.span`
color: #878df7;
font-weight: 800;`

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