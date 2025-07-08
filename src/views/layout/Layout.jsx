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
      <Header toggleMenu={setIsMenuOpened} menuState={isMenuOpened}/>
      { isMenuOpened && <Menu/> || null }
      <div className={isMenuOpened ? "bodyWithMenu" : "body"} onClick={isMenuOpened ? () => setIsMenuOpened(false) : null}>
        { children }
      </div>
      <Footer/>
    </div>
  )
}
