import { createMuiTheme } from "@material-ui/core/styles";

const MonacoTheme = createMuiTheme({

  palette: {
    primary: {
      main: "#4f2e7f",
    },
    primaryTab: {
      main: "#fff",
    },
    tabIndicador: "#ffffff",
  },

  overrides: {
    MuiButton: {
      label: {
        // display:'block',
        textTransform: "none",
        "&::first-letter": {
          textTransform: "uppercase",
        },
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        "&::first-letter": {
          textTransform: "uppercase",
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "3px 3px 6px rgba(0,0,0,0.3)",
      },
    },
    MuiChip: {
      root: {
        textTransform: "none",
        "&::first-letter": {
          textTransform: "uppercase",
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: "#4f2e7f",
        color: "#fff",
        padding: "10px",
        wordBreak: "break-all",
        overflow:"hidden",
      },
      popper: {
        opacity: 0.9,
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "solid 1px #E9E9F0",
        },
        "&:after": {
          borderBottom: "solid 2px #4f2e7f",
        },
        "&:focus": {
          borderBottom: "solid 1px #ccc",
        },
      },
    },
    MuiBadge: {
      root: {
        zIndex: "0",
      },
    },
    MuiDialogActions:{
      root:{
        padding:"20px",
        margin:"0px !Important",
      },
      action:{
        margin:"0px",
      }
    },
    MuiDialogContent:{
      root:{
        padding:"20px",
        margin:"0px",
      },
    },
    MuiDialogTitle:{
      root:{
        backgroundColor: "#eeeeee",
        // marginBottom: "30px",
        height: "80px",
      }
    }
  },
});

export default MonacoTheme;
