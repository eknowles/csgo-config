var config = require('./config.json');
var pkg = require('./package.json');
var _ = require('underscore');
var fs = require('fs');
var s = require("underscore.string");
var heroSize = 60;

String.prototype.repeat = function (num) {
  return new Array(num + 1).join(this);
};

var buildConfig = function () {

  var autoexec = "clear\n\n// Load Configs\n";
  var now = new Date();
  var p = config.primary;

  _.forEach(config.sections, function (section) {
    var filename = s.underscored(section.name) + '.cfg';
    autoexec += "exec \"_scripts/" + filename + "\"\n";
    var contents = "// " + "-".repeat(heroSize) + "\n";
    contents += "// Section:     " + section.name + "\n";
    if (section.description) {
      contents += "// Description: " + section.description + '\n';
    }
    contents += "// Generated:   " + now.toLocaleString() + "\n";
    contents += "// " + "-".repeat(heroSize) + "\n\n";

    // Binds
    if (section.binds) {
      contents += "\n// Keyboard Binds\n";
      for (var prop in section.binds) {
        if (section.binds.hasOwnProperty(prop)) {
          contents += 'bind "' + prop + '" "' + section.binds[prop] + '"\n';
        }
      }
    }

    //Commands
    if (section.commands) {
      contents += "\n// Console Commands\n";
      for (var prop in section.commands) {
        if (section.commands.hasOwnProperty(prop)) {
          contents += prop + ' "' + section.commands[prop] + '"\n';
        }
      }
    }

    // Write to file
    fs.writeFile("./cfg/_scripts/" + filename, contents, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(section.name + " was saved to ./cfg/_scripts/" + filename);
    });

  });

  var mouse = '';
  var sectionMouse = _.findWhere(config.sections, {name: "Mouse"});
  mouse += generateLine('Sensitivity', sectionMouse.commands.sensitivity);
  mouse += generateLine('Zoom Ratio', sectionMouse.commands.zoom_sensitivity_ratio_mouse);
  for (var prop in p.mouse) {
    if (p.mouse.hasOwnProperty(prop)) {
      mouse += generateLine(s.titleize(prop), p.mouse[prop]);
    }
  }

  autoexec += '\n// Print to engine console\n';
  autoexec += 'echo "+' + '-'.repeat(heroSize) + '+"\n';
  autoexec += generateLine('KLUTCH Config', 'Version ' + pkg.version);
  autoexec += generateLine('Generated', now.toLocaleString());
  autoexec += generateHeading('Player');
  autoexec += generateLine('Player', p.player);
  autoexec += generateLine('Name', p.name);
  autoexec += generateHeading('Mouse Settings');
  autoexec += mouse;
  autoexec += 'echo "+' + '-'.repeat(heroSize) + '+"\n';
  autoexec += '\nhost_writeconfig';

  // Write autoexec
  fs.writeFile("./cfg/autoexec.cfg", autoexec, function (err) {
    if (err) {
      return console.log(err);
    }
  });

};


var generateLine = function (k, v) {
  var col = 50;
  var paddingSize = Math.round((heroSize / 100) * col);
  var paddingLeft = ' '.repeat(paddingSize - k.length - 2);
  var paddingRight = ' '.repeat(heroSize - paddingSize - v.toString().length - 1);
  return 'echo "|' + paddingLeft + k + ' : ' + v + paddingRight + '|"\n';
};

var generateHeading = function (t) {
  var text = '=[ ' + t + ' ]=';
  var padding = '-'.repeat(Math.floor((heroSize / 2) - text.length / 2));
  var output = '';
  output += 'echo "|' + ' '.repeat(heroSize) + '|"\n';
  output += 'echo "+' + padding + text + padding + '+"\n';
  return output;
};

buildConfig();
