# Sitemap to screenshot CLI

A little node-based CLI tool for generating screenshots, provided a valid sitemap.xml url

## Getting started

TODO.

## Usage

```
./bin/generate.sh --url=<URL_TO_SITEMAP>
```

#### The following options are supported:

|Argument|Default Value|Required|Type|Notes|
|--------|-------------|--------|----|-----|
|url||`yes`|`string`|Url to a valid xml sitemap|
|vw|`1366`||`int`|Viewport width|
|vh|`768`||`int`|Viewport height|
|dir|`./storage/`||`string`|Output directory|
|timeout|`60000`||`int`|Max time for screen capture in milleseconds|
|format|`pdf`||`string`|Capture format. Supports `pdf`, `png`, `jpeg`|
|heightBuffer|`0`||`int`|Add additional fixed height to the capture|
|delay|`0`||`int`|Delay between loading the page and capturing the screenshot|
|waitUntil|`networkidle2`||`string`|Wait until there is only X active network connections|
