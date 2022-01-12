import styled from '@emotion/styled'

const NAV_HEIGHT = '3em'
const NAV_BORDER_BOTTOM = '0.01em'

export const Container = styled.div`
  min-width: 500px;
  max-width: 100vw;

  min-height: calc( 100vh - ${NAV_HEIGHT} - ${NAV_BORDER_BOTTOM});
  margin: 0;
  padding: 0.3em;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  );
  grid-template-rows: 1fr 2fr 1fr;
    grid-gap: 1em;
  grid-auto-flow: dense;

  color: black;
`
export const NavStyle = styled.div`
width: 100%;
height: ${NAV_HEIGHT};

display: flex;
justify-content: space-between;
align-items: center;

h2 {
  padding: 1.5em;
}
border-bottom: ${NAV_BORDER_BOTTOM} solid rgba(127,127,127,0.5);
background-color: rgba(0,0,0,0);
`

export const ButtonStyle = styled.button`
font-style: italic;
text-decoration: underline;
color: inherit;
font-size: 1em;
border: none;
cursor: pointer;
padding: 1.5em;
background-color: transparent;
`

export const Main = styled.body`


  h2{
      color: rgba(127,127,127);
      font-weight: 400; 
  }
  
  h2,
  a,
  p {
    color: black;
  }
  
  a {
    font-style: italic;
    line-height: 1em;
  }
  
  
  .article {
    max-height: 100vh;
    padding: 0em;
    background: #fff;
  
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    div {
        padding: 1em;
    }
    img {
        width: 100%;
    }
    p {
        padding: 1em;
    }

  }
`