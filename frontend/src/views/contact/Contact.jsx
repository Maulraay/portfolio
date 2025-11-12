import React, {useEffect, useState} from "react";
import { Layout } from "../layout/Layout";
import { Typography, TextField, Box, Button, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormattedMessage } from "react-intl";
import { useAppContext } from "../App";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || "";
const MAX = {
  name: 50,
  email: 100,
  subject: 150,
  message: 10000
};

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
    website: '' // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
  };

  // basic client-side validation
  const validate = () => {
    const errs = {};
    const { name, email, subject, message, website } = formData;
    if (website && website.trim() !== "") return { ok: false, reason: "bot" }; // honeypot filled
    if (!name.trim()) errs.name = "contact.nameField.error";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(email)) errs.email = "contact.emailField.error";
    if (!subject.trim()) errs.subject = "contact.subjectField.error";
    if (!message.trim()) errs.message = "contact.messageField.error";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return { ok: false, reason: errs };
    }
    return { ok: true };
  };

  const charCounter = (field) => {
    const max = MAX[field] || 0;
    const len = formData[field] ? formData[field].length : 0;
    return `${len}/${max}`;
  };

  const getErrorMessage = (field) => {
    return errors[field] ? <FormattedMessage id={errors[field]} defaultMessage={"Invalid input"}/> : null;
  }

  const helperTextWithCount = (field) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1 }}>{getErrorMessage(field)}</div>
      <div style={{ fontSize: 12 }} className={"charCounter"}>{charCounter(field)}</div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const v = validate();
    if (!v.ok) {
      if (v.reason === "bot") { setStatus("Bot detected"); return; }
      setStatus("Validation error");
      return;
    }
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setStatus("Please complete the captcha");
      return;
    }

    setLoading(true);
    console.info("Trying to send mail...")
    try {
      const body = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        captchaToken: captchaToken || null
      };

      const res = await fetch(`${process.env.REACT_APP_API_URL}/sendMail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
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
          website: ''
        });
        setCaptchaToken(null);
        console.info("Message successfully sent!");
      } else {
        console.error('Error : ' + data.error)
        setStatus('Error : ' + data.error);
      }
    } catch (err) {
      console.error('Error : ' + err)
      setStatus('Error on server connection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "Please complete the captcha") {
      const layoutBody = document.querySelector('.contact');
      layoutBody.scrollTop = layoutBody.scrollHeight;
    }
  }, [status]);

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
              <Typography variant="body2">
                <FormattedMessage id={"contact.thankYou"} defaultMessage={"Thank you for your message!"}/>
              </Typography>
              <Typography variant="about">
                <FormattedMessage id={"contact.thankYou_2"} defaultMessage={"I will get back to you soon."}/>
              </Typography>
              <Button className={"backButton"} variant="contained" href={"/contact"}>
                <FormattedMessage id={"contact.back"} defaultMessage={"Back"}/>
              </Button>
            </div>

          ) : status.substring(0,5) === "Error" ? (
              <div className={"thankYou"}>
                <Typography variant="body2">
                  <FormattedMessage id={"contact.error.title"} defaultMessage={"Oops! Something went wrong..."}/>
                </Typography>
                <Typography variant="about">
                  <FormattedMessage id={"contact.error.descr"} defaultMessage={"An error has occurred while sending your message. I am sorry for the inconvenience. If the problem persists, please contact me directly at "}/>
                  <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a>
                  <FormattedMessage id={"contact.alternativeContact_2"} defaultMessage={" or contact me on "}/>
                  <a href={"https://www.linkedin.com/in/malaurykeslick/"} target={"_blank"}  className={"link"}>LinkedIn</a>!
                </Typography>
                <Button className={"backButton"} variant="contained" href={"/contact"}>
                  <FormattedMessage id={"contact.back"} defaultMessage={"Back"}/>
                </Button>
              </div>
            )
            :(
            <Box component="form" onSubmit={handleSubmit} className={"contactForm"} noValidate>
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
                inputProps={{ maxLength: MAX.name }}
                helperText={helperTextWithCount("name")}
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
                inputProps={{ maxLength: MAX.email }}
                helperText={helperTextWithCount("email")}
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
                inputProps={{ maxLength: MAX.subject }}
                helperText={helperTextWithCount("subject")}
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
                minRows={4}
                fullWidth
                inputProps={{ maxLength: MAX.message }}
                helperText={helperTextWithCount("message")}
              />

              {/* honeypot field - hidden from users but present for bots */}
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <Button className={"sendButton"} variant="contained" type="submit">
                <FormattedMessage id={"contact.sendButton"} defaultMessage={"Send Message"}/>
              </Button>

              {status === "Please complete the captcha" ? (
                <Typography variant="body1" align={"center"} className={"captchaWarning"}>
                  <FormattedMessage id={"contact.captchaRequired"} defaultMessage={"Please complete the captcha before sending your message."}/>
                </Typography>
              ) : null}

              {loading === true ? (
                <div className="spinner"></div>
              ) : null}

              {RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA
                  id={"reCaptcha-container"}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={token => setCaptchaToken(token)}
                />
              ) : null}

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
