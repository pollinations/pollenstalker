import { ButtonStyle } from "../../styles"


const MenuButton = ({ children }) => {
function handleClick(e){
    e.preventDefault()
    console.log('click')
}
return <ButtonStyle onClick={handleClick}>
    {children}
</ButtonStyle>
}

export default MenuButton