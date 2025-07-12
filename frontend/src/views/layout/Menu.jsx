import React from "react";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const Menu = () => {
  return (
    <div className={'menu'}>
      <div className={'buttons'}>
        <Button variant={'outlined'} href={'/'}> <FormattedMessage id={"layout.header.home"} defaultMessage={"Home"}/> </Button>
        <Button variant={'outlined'} href={'/about'}> <FormattedMessage id={"layout.header.about"} defaultMessage={"About me"}/> </Button>
        <Button variant={'outlined'} href={'/gallery'}> <FormattedMessage id={"layout.header.projects"} defaultMessage={"My projects"}/> </Button>
        <Button variant={'outlined'} href={'/contact'}> <FormattedMessage id={"layout.header.contact"} defaultMessage={"Contact"}/> </Button>
      </div>
    </div>
  )
}

