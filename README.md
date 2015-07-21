# CS:GO/Source Config Builder

> Parses a JSON file into Source Engine config files, split into files for each section.

Currently it is a NodeJS script, will port it to a Chrome Extension with localStorage, export to Zip and backup
to an online service (something like pastebin/gist).

## Usage

Edit `config.json` add your own binds and commands.

```
$ npm install
$ npm start
```

## Example

Turns this...

```
"sections": [
    {
      "name"       : "Network",
      "description": "Contains network code settings",
      "binds"      : {},
      "commands"   : {
        "rate"              : 128000,
        "cl_cmdrate"        : 128,
        "cl_updaterate"     : 128,
        "cl_interp"         : 0.0,
        "cl_interp_ratio"   : 1,
        "cl_lagcompensation": 1
      }
    }
    ...
```

..into this!

```
// ------------------------------------------------------------
// Section:     Network
// Description: Contains network code settings
// Generated:   7/21/2015, 10:45:29 PM
// ------------------------------------------------------------


// Keyboard Binds

// Console Commands
rate "128000"
cl_cmdrate "128"
cl_updaterate "128"
cl_interp "0"
cl_interp_ratio "1"
cl_lagcompensation "1"
```
