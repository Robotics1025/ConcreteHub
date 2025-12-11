import { createTheme, alpha } from "@mui/material/styles";

// Minimal Dashboard inspired theme with Alibaba/Jumia color palette
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF6A00", // Alibaba/Jumia orange
      light: "#FF8533",
      dark: "#E65F00",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00695c", // Teal accent
      light: "#26A69A",
      dark: "#004D40",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22C55E",
      light: "#4ADE80",
      dark: "#16A34A",
    },
    info: {
      main: "#0EA5E9",
      light: "#38BDF8",
      dark: "#0284C7",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBf24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    grey: {
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
    text: {
      primary: "#212B36",
      secondary: "#637381",
      disabled: "#919EAB",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      neutral: "#F4F6F8",
    },
    action: {
      hover: alpha("#919EAB", 0.08),
      selected: alpha("#919EAB", 0.16),
      disabled: alpha("#919EAB", 0.8),
      disabledBackground: alpha("#919EAB", 0.24),
      focus: alpha("#919EAB", 0.24),
    },
  },
  typography: {
    fontFamily: "'Public Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 800,
      fontSize: "4rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.6,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 700,
      fontSize: "0.875rem",
      textTransform: "capitalize",
      lineHeight: 1.71,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
    overline: {
      fontWeight: 700,
      fontSize: "0.75rem",
      lineHeight: 1.5,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px -1px rgba(145, 158, 171, 0.16)",
    "0px 4px 8px -2px rgba(145, 158, 171, 0.16)",
    "0px 6px 12px -3px rgba(145, 158, 171, 0.16)",
    "0px 8px 16px -4px rgba(145, 158, 171, 0.16)",
    "0px 10px 20px -5px rgba(145, 158, 171, 0.16)",
    "0px 12px 24px -6px rgba(145, 158, 171, 0.16)",
    "0px 14px 28px -7px rgba(145, 158, 171, 0.16)",
    "0px 16px 32px -8px rgba(145, 158, 171, 0.16)",
    "0px 18px 36px -9px rgba(145, 158, 171, 0.16)",
    "0px 20px 40px -10px rgba(145, 158, 171, 0.16)",
    "0px 22px 44px -11px rgba(145, 158, 171, 0.16)",
    "0px 24px 48px -12px rgba(145, 158, 171, 0.16)",
    "0px 26px 52px -13px rgba(145, 158, 171, 0.16)",
    "0px 28px 56px -14px rgba(145, 158, 171, 0.16)",
    "0px 30px 60px -15px rgba(145, 158, 171, 0.16)",
    "0px 32px 64px -16px rgba(145, 158, 171, 0.16)",
    "0px 34px 68px -17px rgba(145, 158, 171, 0.16)",
    "0px 36px 72px -18px rgba(145, 158, 171, 0.16)",
    "0px 38px 76px -19px rgba(145, 158, 171, 0.16)",
    "0px 40px 80px -20px rgba(145, 158, 171, 0.16)",
    "0px 42px 84px -21px rgba(145, 158, 171, 0.16)",
    "0px 44px 88px -22px rgba(145, 158, 171, 0.16)",
    "0px 46px 92px -23px rgba(145, 158, 171, 0.16)",
    "0px 48px 96px -24px rgba(145, 158, 171, 0.16)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 700,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
          fontSize: "0.9375rem",
        },
        sizeMedium: {
          height: 40,
        },
        sizeSmall: {
          height: 32,
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#E65F00",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: "16px",
          position: "relative",
          zIndex: 0,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "24px 24px 0",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: "16px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(6px)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          margin: "4px 8px",
          "&.Mui-selected": {
            backgroundColor: alpha("#FF6A00", 0.08),
            color: "#FF6A00",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: alpha("#FF6A00", 0.16),
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
