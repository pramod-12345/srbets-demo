/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monasans: ["Mona Sans", "sans-serif"],
      },
      fontSize:{
        size16: '16px',
        size10: '10px',
        size12: '12px',
        size14: '14px',
        size20: '20px',
      },
      colors: {
        darkCharcoal: "#333333",
        primary: "#673CFF",
        blackRussian : "#141525",
        darkGunmetal: "#1B1E2A",
        themeBlack: "#0b0d1c",
        vintageRibbon: "#9298B4",
        electricViolet: "#664FFF",
        darkBlueGray: "#5A5F9C",
        darkBlueBlack: "#1a1b2e",
        secondary: "#F02A83",
        chinesePurple: "#5B2AED",
        darkByzantineBlue: "#1F2136",
        purpleFog: "#585E77",
        neonBlue: "#7651FE",
        yankeesBlue: "#222441",
        eigengrau: "#1c1c2e",
        Amaranth:'#F02A5C',
        mountainMeadow: '#1AC35D',
        carminePink:"#E54E3D",
        ebonyClay:'#2B2E45',
        oxfordBlue:'#393D5D',
        richBlack:"#0A0B1A",
        patriotBlue: '#42395F',
        coffee:'#6A4A36',
        pecanVeneer:'#E09E75',
        americanGreen: '#32B74A',
        mustardYellow: '#FAA300'
      },
      height: {
        "table-header": "44px", 
        "table-row": "78px", 
        "table-full": "824px",
      },
      width: {
        '1.1': "5px",
        "2.1": "9px",
        "4.2": "18px",
        "64.5": "260px",
        "85.2": "352px",
        "1120": "1120px"
      },
      maxWidth: {
        '32p': '32%'
      },
      maxHeight: {
        '70': '17.5rem',
      },
      spacing: {
        "18": "72px", // Add your custom spacing here
      },
      keyframes: {
        bottomToTop: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        bottomToTop: 'bottomToTop .3s ease-out',
      },
    },
  },
  plugins: [],
};
