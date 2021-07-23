import { LightningElement } from 'lwc';
import { getCandidates } from 'data/candidateService';
export default class CandidateList extends LightningElement {
	candidates = [];
	connectedCallback() {
		getCandidates().then((result) => {
			this.candidates = this.allCandidates = result;
		});
	}
	handleSearchKeyInput(event) {
		const searchKey = event.target.value.toLowerCase();
		this.candidate = this.allCandidates.filter((candidate) => candidate.title.toLowerCase().includes(searchKey));
	}
	handleSessionClick(event) {
		const index = event.currentTarget.dataset.index;
		const navigateEvent = new CustomEvent('navigate', {
			detail: {
				state: 'details',
				candidateId: this.candidates[index].id
			}
		});
		this.dispatchEvent(navigateEvent);
	}
}
