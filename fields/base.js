'use strict';

var prime = require('prime'),
	fieldIndex = 0;

module.exports = prime({
	mixin: require('prime/emitter'),

	constructor: function(spec, value){
		this.index = fieldIndex++;
		this.spec = spec;
		this.value = value;
		this.language = 0;

		this.spec.attributes = this.spec.attributes || {};
	},

	setLanguage: function(index){
		if (!this.spec.multilingual) return;

		this.inputs[this.language].style.display = 'none';
		this.inputs[index].style.display = '';

		this.languageLabel.text(this.spec.languages[index]);

		this.language = index;
	},

	attach: function(parent){
		this.build();
		if (this.input && this.input.on){
			var self = this;
			this.input.on('change', function(){
				self.emit('change', self.serialize());
			});
		}
		this.wrap.insert(parent);
	},

	serialize: function(){
		return this.input.value();
	},

	clear: function(){
		if (this.input){
			this.input.value('');
		}
	}
});
