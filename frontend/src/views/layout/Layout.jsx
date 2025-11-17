import React, { useState } from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Footer } from "./Footer";
import {Typography} from "@mui/material";
import {FormattedMessage} from "react-intl";

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
      <Typography className={"responsiveNotSupported"}>
        <FormattedMessage id={"layout.responsiveNotSupported"} defaultMessage={"Sorry, your device does not support full functionality of this website. Please try using a different device."}/>
      </Typography>
    </div>
  )
}
