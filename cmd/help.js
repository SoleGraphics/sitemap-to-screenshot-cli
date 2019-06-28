const help = `
Usage: sm2ss [flags]

Displays help information.

Options:
  --delay                 delay between loading the page and capturing the screenshot
  --dir                   output directory
  --format                file format (pdf, png, jpeg)
  --heightBuffer          additional, fixed height to the page
  -h, --help              output usage information
  --preset                path to a valid json file of options
  --timeout               max excution time for each screen capture (milleseconds)
  --url <url>             a valid sitemap.xml url
  -v, --version           output the version number
  --vh                    viewport height
  --vw                    viewport width
  --waitUntil             wait until there is only X active network connections

Commands:
  - help
  - version
  - run

Visit https://github.com/SoleGraphics/sitemap-to-screenshot-cli to learn more.
`;

module.exports = () => {
  console.log(help);
};
