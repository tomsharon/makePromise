/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

var $Promise = function() {
	this.state = "pending";
	this.handlerGroups = [];

}

$Promise.prototype.then = function(success, error) {
	if(typeof success !== 'function') {
		success = null;
	}
	if(typeof error !== 'function') {
		error = null;
	}
	var handlers = {
			successCb: success,
			errorCb: error
	}
	this.handlerGroups.push(handlers);

	// // this.handlerGroups[0].successCb();
	// // this.handlers.successCb()
	if(success){
		// if(this.state === "resolved"){
		// // this.handlerGroups[0].successCb.call(null, this.value);

		// for(var x=0;x<this.handlerGroups.length;x++)
		// {
		// 	this.handlerGroups[x].successCb.call(null,this.value);
		// }


		// this.handlerGroups.forEach(function(handlergrp){
		// 	handlergrp.successCb.call(null, this.value);
		// })
		if(this.state === 'resolved'){
			this.handlerGroups[0].successCb.call(null,this.value);
			this.handlerGroups.pop();

		}
	}
}


var Deferral = function() {
	this.$promise = new $Promise();
	// this.switchResolve = false;
	// this.switchReject = false;
}

var defer = function() {
	return new Deferral();
}

Deferral.prototype.resolve = function(dataObj) {
	
	// if(this.switchResolve === false) {
	// 	this.switchResolve = true;
	// 	this.$promise.value = dataObj;
	// }
	if(this.$promise.state === 'pending') {
		this.$promise.value = dataObj;
		if(this.$promise.handlerGroups){
			for(var x = 0; x < this.$promise.handlerGroups.length; x++) {
				this.$promise.value = this.$promise.handlerGroups[x].successCb();
			}
		}
		this.$promise.state = 'resolved';
	}
	return this.$promise.value;

}

Deferral.prototype.reject = function(dataObj) {
	
	// if(dataObj && !this.$promise.value) this.$promise.value = dataObj;

	if(this.$promise.state === 'pending') {
		this.$promise.value = dataObj;
		this.$promise.state = 'rejected';
	}
}


// $Promise.prototype.callHandlers = function() {

// }


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
