import styled from 'styled-components'

export const Select = styled.select`
   border:none;
    padding: 10px 15px;
    margin: 0 0 20px;
    height: 40px;
    display: block;
    border-radius: 5px;
    font-size: 18px;
    background-color:#d5f5f2;
    font-weight: 800;
    font-family: 'Josefin Sans', sans-serif;
    text-align: center;
    ;
`

export const Input = styled.input`
  background-color: #d5f5f2;
  display: flex;
  flex-direction: column;
  height: 30px;
  margin: 0 0 20px;
  padding: 10px 15px;
  text-align: center;
  font-size: 18px;
  border: none;
  &::-webkit-input-placeholder {
    color: black;
    ::hover: pink;
  }
  font-family: "Josefin Sans", sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  justify-content: center;
  margin: 0 auto;
  max-width: 300px;

  @media (min-width:599px) {
    
}
@media (min-width:768px) {
   
}
`;