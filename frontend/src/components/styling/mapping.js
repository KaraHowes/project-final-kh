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
max-width: 250px;
box-shadow: 8px 8px #fff000;
background: white;
@media (min-width: 768px){
  width:45%;
}
`;

export const CardText = styled.p`
  padding: 10px 0;
  margin: 15px;
  border: 2px solid black;
  box-shadow: 4px 4px #878df7;
`;

export const TextWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;