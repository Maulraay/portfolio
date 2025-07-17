import React from "react";
import { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';

export default function PictureViewer({ src, alt = '', className, width }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={false}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0,0,0,0)',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center' }}>
          <img
            src={src}
            alt={alt}
            style={{ maxWidth: '80vw', maxHeight: '90vh', cursor: 'zoom-out', objectFit: "contain"}}
            onClick={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
