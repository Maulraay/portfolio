import React, {useState} from "react";
import "leaflet/dist/leaflet.css";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography, TextField, Box, Button, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppContext } from "../App";
import leftOrnament from "../../assets/left_ornament_contact.png";
import rightOrnament from "../../assets/right_ornament_contact.png";
import { FormattedMessage } from "react-intl";


export const Contact = () => {

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //mail sending logic goes here

    setSubmitted(true);
  };

  return (
    <Layout>
      <div className={"contact"}>
        <img src={leftOrnament} className={"leftOrnament"} alt={""}/>
        <Typography variant={"h2"} className={"title"}>
          <FormattedMessage id={"contact.title"} defaultMessage={"Let's get in touch!"}/>
        </Typography>
        <div className={"mailPanel"}>
          {submitted ? (
            <div className={"thankYou"}>
              <Typography variant="body1" fontSize={50}>
                <FormattedMessage id={"contact.thankYou"} defaultMessage={"Thank you for your message!"}/>
              </Typography>
              <Typography variant="body1" fontSize={30}>
                <FormattedMessage id={"contact.thankYou_2"} defaultMessage={"I will get back to you soon."}/>
              </Typography>
              <Button className={"backButton"} variant="contained" href={"/contact"}>
                <FormattedMessage id={"contact.back"} defaultMessage={"Back"}/>
              </Button>
            </div>

          ) : (
            <Box component="form" onSubmit={handleSubmit} className={"contactForm"}>
              <Typography variant={"body1"} fontSize={30} className={"typography"}>
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
        <img src={rightOrnament} className={"rightOrnament"} alt={""}/>
      </div>
    </Layout>
  )
}
