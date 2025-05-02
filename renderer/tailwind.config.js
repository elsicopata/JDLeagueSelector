module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pes: {
          bg: '#181C24',
          card: '#232A36',
          primary: '#0072CE',
          primaryHover: '#00BFFF',
          border: '#00BFFF',
          text: '#F3F6FA',
          textSecondary: '#A0AEC0',
          error: '#FF4C4C',
          success: '#00FFB0',
        },
        // Para sombras personalizadas
        pesShadow: '0 4px 24px 0 rgba(0,191,255,0.2)',
      },
    },
  },
  plugins: [],
}