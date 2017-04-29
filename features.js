class FeatureGroups {
	constructor() {
	   this.groups = [];
	   this.probabilities = [];
	}

	addGroup(features, probability, adjustProbabilities) {
	    this.groups.push(features);
	    if(adjustProbabilities) {
	    	let reductionFactor = 1 - probability;
		    for (let i = 0; i < this.probabilities.length; i++) {
		    	this.probabilities[i] *= reductionFactor;
		    }
		}
	    this.probabilities.push(probability);
	}

	resetProbabilities(probabilities) {
		this.probabilities = probabilities;
	}

	getGroup() {
		let rand = Math.random();
		let sum = 0;
		for (let i = 0; i < this.probabilities.length; i++) {
			sum += this.probabilities[i];
			if(rand < sum)
				return this.groups[i];
		}
	}
}

class Feature {
	constructor(name){
		this.name = name;
	}
}

class Customer{
	constructor(name){
		this.name = name;
	}
}

function checkAccess(customers, customer_name, feature_name) {
	let featureGroup = customers.get(customer_name);
	if(featureGroup != null) {
		for (let i = 0; i < featureGroup.length; i++) {
			if(featureGroup[i].name == feature_name)
				return true;
		}
	}
	return false;
}

let feature_a = new Feature("Feature A");
let feature_b = new Feature("Feature B");
let feature_c = new Feature("Feature C");
let feature_d = new Feature("Feature D");

let featureGroups = new FeatureGroups();

featureGroups.addGroup([feature_a, feature_b], 0.1);
featureGroups.addGroup([feature_b, feature_c], 0.2);
featureGroups.addGroup([feature_c], 0.2);
featureGroups.addGroup([feature_a, feature_c, feature_d], 0.5);

let customersList = [];
customersList.push(new Customer("Widget Co"));
customersList.push(new Customer("Synergy Inc"));
customersList.push(new Customer("Elevation Executives"));
customersList.push(new Customer("Momentum Partners"));

let customerFeatures = new Map()

customersList.forEach(function(customer) {
	customerFeatures.set(customer.name, featureGroups.getGroup());
})

console.log(checkAccess(customerFeatures, "Widget Co", "Feature B"))
console.log(checkAccess(customerFeatures, "Synergy Inc", "Feature B"))
console.log(checkAccess(customerFeatures, "Elevation Executives", "Feature B"))
console.log(checkAccess(customerFeatures, "Momentum Partners", "Feature B"))



