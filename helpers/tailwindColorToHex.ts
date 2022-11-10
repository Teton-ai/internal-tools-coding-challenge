const tailwindColors = require("tailwindcss/colors");

export default function tailwindColorToHex(tailwindColor: string): string {
    const [_, colorName, colorStrength] = tailwindColor.split("-");

    if (colorStrength) {
        return tailwindColors[colorName][colorStrength];
    } else {
        return tailwindColors[colorName];
    }
}
