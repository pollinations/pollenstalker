import { NavStyle } from "../../styles"
import MenuButton from "../atoms/MenuButton"

const Nav = props => {

    return <NavStyle>
      <h2 children='Unreal News Network'/>
      <MenuButton>
        Menu
      </MenuButton>
    </NavStyle>
}

export default Nav