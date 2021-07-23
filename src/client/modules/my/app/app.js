import { LightningElement } from 'lwc';

export default class App extends LightningElement {
	candidateId;
	state = 'list';
	handleNavigate(event) {
		this.state = event.detail.state;
		this.candidateId = event.detail.candidateId;
	}
	get isStateList() {
		return this.state === 'list';
	}
	get isStateDetails() {
		return this.state === 'details';
	}
}
