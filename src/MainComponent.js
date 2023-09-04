import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import moment from "moment/moment";
import "moment/min/locales";
moment.locale("en");

export default function MainComponent({ temp, dateAndTime, lang, locale }) {
  // HANDLERS
  function handleLang() {
    if (locale.locale === "en") {
      locale.setLocale("ar");
      lang.i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      locale.setLocale("en");
      lang.i18n.changeLanguage("en");
      moment.locale("en");
    }
    dateAndTime.setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div
          dir={locale.locale === "ar" ? "rtl" : "ltr"}
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <CardContent
            style={{
              width: "100%",
              background: "rgb(28 52 91 / 36%)",
              color: "white",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0px 12px 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* CITY& TIME */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "start",
                alignItems: "end",
              }}
            >
              <Typography
                style={{
                  color: "white",
                }}
                variant="h2"
                color="text.secondary"
              >
                {lang.t("Egypt")}
              </Typography>

              <Typography variant="h5" component="div">
                {dateAndTime.dateAndTime}
              </Typography>
            </div>
            {/* ***CITY& TIME*** */}
            <hr />

            {/* DEGREE&DESCRIPTION + cloud icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <div style={{ display: "flex" }}>
                  <Typography variant="h1">{temp.number}</Typography>

                  <img src={temp.icon} />
                </div>

                <Typography variant="h6">{lang.t(temp.description)}</Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Typography variant="h5">
                    {lang.t("Min")} : {temp.min}
                  </Typography>
                  <Typography variant="h5">|</Typography>
                  <Typography variant="h5">
                    {lang.t("Max")} : {temp.max}
                  </Typography>
                </div>
              </div>

              <div>
                <CloudIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
            </div>
            {/* ***DEGREE&DESCRIPTION*** */}
          </CardContent>

          {/* BTN LANGUAGE */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              style={{
                color: "white",
              }}
              variant="text"
              onClick={handleLang}
            >
              {locale.locale === "en" ? "Arabic" : "إنجليزي"}
            </Button>
          </div>
          {/* ****BTN LANGUAGE*** */}
        </div>
      </Container>
    </React.Fragment>
  );
}
