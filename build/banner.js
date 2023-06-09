"use strict"

const pkg = require("../package.json")
const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Studio KonKon v${pkg.version} (${pkg.homepage})
  * Copyright 2011-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/StudioKonKon/bootstrap-konkon/blob/master/LICENSE)
  */`
}

module.exports = getBanner
