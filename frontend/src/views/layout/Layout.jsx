import React, { useState } from "react";
import './styles.css';
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Footer } from "./Footer";

export const Layout = (props) => {
  const { children, ...rest } = props;
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <div className={"layout"}>
      <Header openMenu={() => setIsMenuOpened(true)} menuState={isMenuOpened}/>
      { isMenuOpened && <Menu closeMenu={() => setIsMenuOpened(false)}/> || null }
      <div className={`body${isMenuOpened ? " menuOpened" : ""}`} onClick={isMenuOpened ? () => setIsMenuOpened(false) : null}>
        { children }
      </div>
      <Footer menuState={isMenuOpened}/>
    </div>
  )
}
