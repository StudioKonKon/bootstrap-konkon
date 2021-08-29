"use strict";

module.exports = function(ctx) {
	return {
		"map": {
			"inline": false,
			"annotation": true,
			"sourcesContent": true
		},
		"plugins": {
			"autoprefixer": {
				"cascade": false
			}
		}
	};
};
