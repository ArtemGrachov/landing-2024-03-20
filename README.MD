# Markup template
Boilerplate repo for creating static markups with minimal configuration.
The configuration use NPM as task runner and some CLI tools for preprocessing HTML, CSS and JS.

## Idea
While for some markups or web appliations more complex tools needed, for common tasks it is enoguh to use CLI tools only.

## Stack
- Pug for templates
- SCSS, autoprefixer for styles
- Babel for scripts
- `live-server` for serving `dist` folder and refresh on code changes

## Structure
- `dist` - output code folder
- `src` - source code folder
  - `images` - static images folder
  - `scripts` - scripts folder
  - `static` - static files folder. Copied to the root level of `dist` folder
  - `styles` - styles folder
  - `templates` - templates folder. Copied to the root level of `dist` folder

File structire in the `dist` folder reproduces the structure of `src`, except `static` and `templates` folders - they are copied to root level. So `src/templates/index.pug` will be `dist/index.html`, `src/templates/subfolder/page.html` will be `dist/subfolder/page.html`. Same way it works for `static` folder.

## Commands

### Main commands
There are lot of commands in `package.json`. Normally, only two of them needed:
- `build` - to compile source code into `dist` folder
- `watch` - to watch for code changes and update `dist` folder content

Both commands handle code the same way.

### Other commands
- `clean` - removes `dist` folder
- `folders` - creates `dist` folder
- `build:***` - compile source code or copy files to `dist` folder
- `watch:***` - observe source code changes, update files in `dist`
- `init` - call `clean` and `folders`

## Utils
Currently there is only one utility file - `utils/wait-template.sh`, a small scripts to wait until `dist/index.html` file is created. It is necessary for starting `live-server` in `watch` mode only when index file is created, to avoid showing 404 error.
