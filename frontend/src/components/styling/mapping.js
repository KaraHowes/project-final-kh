import styled from 'styled-components'

export const BagContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  @media (min-width: 768px){
    flex-direction:row;
  }
`;

export const Card = styled.div`
width: 100%;
margin: 10px auto;
padding: 10px 0;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-end;
text-align: center;
font-family: "Josefin Sans", sans-serif;
max-width: 200px;
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5)
background: white;
@media (min-width: 768px){
  width:45%;
}
`;

export const CardText = styled.p`
  background-color: #d5f5f2;
  padding: 5px 0;
`;

export const TextWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;