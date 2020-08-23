# SCSS: Studio KonKon Theme

Getting Started
--

`_bootstrap-importer.scss` needs to be modified to point to the location of `bootstrap-4.5.2`. I'd recommend you download a copy of Bootstrap's source and place it in a folder named `lib` at this projects root. The `_bootstrap-importer.scss` makes sure our changes overide Bootstrap's variables while still being able to access Bootstrap's own variables.

`_variables.scss` and `_bootstrap-variables.scss` are used to overide Bootstrap's variables with our own. `_theme-variables.scss` uses our own custom theme variables.
