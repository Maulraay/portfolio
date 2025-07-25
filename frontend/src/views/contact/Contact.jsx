import React, { useState } from "react";
import { Layout } from "../layout/Layout";
import { Typography, TextField, Box, Button, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import { useAppContext } from "../App";

const Contact = () => {
  const appTheme = useTheme();
  const {theme} = useAppContext();
  const useInputStyles = makeStyles({
    root: {
      "& .MuiInputBase-root": {
        "& fieldset": {
          borderColor: theme === 'dark' ? appTheme.palette.secondary.dark : appTheme.palette.text_secondary.light
        },
        "&:hover fieldset": {
          borderColor: theme === 'dark' ? appTheme.palette.primary.dark : appTheme.palette.secondary.light
        },
        "&.Mui-focused fieldset": {
          borderColor: theme === 'dark' ? appTheme.palette.secondary.dark : appTheme.palette.text_secondary.light
        },
        "& textarea": {
          color: theme === 'dark' ? appTheme.palette.secondary.dark : appTheme.palette.text_secondary.light
        },
        "& input": {
          color: theme === 'dark' ? appTheme.palette.secondary.dark : appTheme.palette.text_secondary.light
        },
      }
    }
  });
  const inputStyles = useInputStyles();
  const inputLabelProps = {
    sx: {
      color: theme === 'dark' ? appTheme.palette.secondary.dark : appTheme.palette.text_secondary.light,
      "&.Mui-focused": {
        color: theme === 'dark' ? appTheme.palette.secondary.dark : appTheme.palette.text_secondary.light
      }
    },
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info("Trying to send mail...")
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/sendMail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setStatus('Message was successfully sent!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        console.info("Message successfully sent!");
      } else {
        console.error('Error : ' + data.error)
        setStatus('Error : ' + data.error);
      }
    } catch (err) {
      console.error('Error : ' + err)
      setStatus('Error on server connection');
    }
  };

  return (
    <Layout>
      <div className={"contact"}>
        <img src={"/assets/left_ornament_contact.webp"} className={"leftOrnament"} alt={""}/>
        <Typography variant={"h2"} className={"title"}>
          <FormattedMessage id={"contact.title"} defaultMessage={"Let's get in touch!"}/>
        </Typography>
        <div className={"mailPanel"}>
          {submitted ? (
            <div className={"thankYou"}>
              <Typography variant="h3">
                <FormattedMessage id={"contact.thankYou"} defaultMessage={"Thank you for your message!"}/>
              </Typography>
              <Typography variant="body2">
                <FormattedMessage id={"contact.thankYou_2"} defaultMessage={"I will get back to you soon."}/>
              </Typography>
              <Button className={"backButton"} variant="contained" href={"/contact"}>
                <FormattedMessage id={"contact.back"} defaultMessage={"Back"}/>
              </Button>
            </div>

          ) : (
            <Box component="form" onSubmit={handleSubmit} className={"contactForm"}>
              <Typography variant={"subtitle2"} className={"typography"}>
                <FormattedMessage id={"contact.subTitle"} defaultMessage={"Send me an email!"}/>
              </Typography>
              <TextField
                classes={inputStyles}
                label=<FormattedMessage id={"contact.nameField"} defaultMessage={"Name"}/>
                slotProps={{
                  inputLabel: {...inputLabelProps}
                }}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                classes={inputStyles}
                label=<FormattedMessage id={"contact.emailField"} defaultMessage={"Email"}/>
                slotProps={{
                  inputLabel: {...inputLabelProps}
                }}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                classes={inputStyles}
                label=<FormattedMessage id={"contact.subjectField"} defaultMessage={"Subject"}/>
                slotProps={{
                  inputLabel: {...inputLabelProps}
                }}
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                classes={inputStyles}
                label=<FormattedMessage id={"contact.messageField"} defaultMessage={"Message"}/>
                slotProps={{
                  inputLabel: {...inputLabelProps}
                }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
              />
              <Button className={"sendButton"} variant="contained" type="submit">
                <FormattedMessage id={"contact.sendButton"} defaultMessage={"Send Message"}/>
              </Button>
              <Typography variant={"body1"}  className={"typography"}>
                <FormattedMessage id={"contact.alternativeContact_1"} defaultMessage={"Alternatively, directly send your email at "}/>
                <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a>
                <FormattedMessage id={"contact.alternativeContact_2"} defaultMessage={" or contact me on "}/>
                <a href={"https://www.linkedin.com/in/malaurykeslick/"} target={"_blank"}  className={"link"}>LinkedIn</a>!
              </Typography>
            </Box>
          )}
        </div>
        <img src={"/assets/right_ornament_contact.webp"} className={"rightOrnament"} alt={""}/>
      </div>
    </Layout>
  )
};

export default Contact;
