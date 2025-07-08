import React from "react";
import {Button} from "@mui/material";

export const Menu = () => {
  return (
    <div className={'menu'}>
      <div className={'buttons'}>
        <Button color={"#3d383e"} variant={'outlined'} href={'/about'}> About us </Button>
        <Button color={"#3d383e"} variant={'outlined'} href={'/gallery'}> Our pet gallery </Button>
        <Button color={"#3d383e"} variant={'outlined'} href={'/contact'}> Contact </Button>
      </div>
    </div>
  )
}

