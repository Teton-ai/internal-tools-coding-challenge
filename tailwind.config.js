// tailwind.config.js
// Get the extended tailwind color config
const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            ...colors,
            patagonia: {
                dark: "#202e32",
                light: "#85937a",
                DEFAULT: "#586c5c",
                accent: "#a9af90",
                accentlight: "#dfdcb9",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
