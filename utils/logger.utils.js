import path from "path";
// utils/logger.js
export default function logger(type = "log", ...args) {
  const COLORS = {
    reset: "\x1b[0m",
    gray: "\x1b[90m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    green: "\x1b[32m",

    // Basic Colors
    black: "\x1b[30m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    white: "\x1b[37m",

    // Bright Colors
    brightBlack: "\x1b[90m", // Often displayed as gray
    brightRed: "\x1b[91m",
    brightGreen: "\x1b[92m",
    brightYellow: "\x1b[93m",
    brightBlue: "\x1b[94m",
    brightMagenta: "\x1b[95m",
    brightCyan: "\x1b[96m",
    brightWhite: "\x1b[97m",

    // Background Colors
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",

    // Bright Background Colors
    bgBrightBlack: "\x1b[100m",
    bgBrightRed: "\x1b[101m",
    bgBrightGreen: "\x1b[102m",
    bgBrightYellow: "\x1b[103m",
    bgBrightBlue: "\x1b[104m",
    bgBrightMagenta: "\x1b[105m",
    bgBrightCyan: "\x1b[106m",
    bgBrightWhite: "\x1b[107m",

    // Text Styles
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
  };

  let color = COLORS.gray;
  switch (type.toLowerCase()) {
    case "cache":
      color = COLORS.magenta;
      break;
    case "success":
      color = COLORS.brightGreen;
      break;
    case "info":
      color = COLORS.blue;
      break;
    case "warn":
      color = COLORS.yellow;
      break;
    case "error":
      color = COLORS.red;
      break;
    case "log":
    default:
      color = COLORS.gray;
      break;
  }

  const stack = new Error().stack.split("\n")[2];
  // Example: "    at myFunc (src/controllers/auth.js:12:15)"

  const match = stack.match(/at (.+) \((.+):(\d+):(\d+)\)/);

  if (match) {
    const [, func, file, line, col] = match;
    console.log(
      `${COLORS.gray}[${COLORS.cyan}${path.basename(file)}:${line}:${col}${COLORS.gray}] ${COLORS.italic}${COLORS.yellow}f(${func.replace("Object.", "")})${COLORS.reset}\n🠺${color}[${type.toUpperCase()}]${COLORS.reset}`,
      ...args
    );
  } else {
    console.log(`🠺${color}[${type.toUpperCase()}]${COLORS.reset}`, ...args);
  }
}
