import { LightningElement, api } from 'lwc';
import { getCandidate } from 'data/candidateService';
export default class CandidateDetails extends LightningElement {
    candidate;
    connectedCallback() {
        getCandidate().then((result) => {
            this.candidate = result;
        });
    }
    @api
    set candidateId(id) {
        this._candidateId = id;
        this.candidate = getCandidate(id);
    }
    get candidateId() {
        return this._candidateId;
    }
    // handleSessionsClick() {
    //     console.log(JSON.stringify(this.candidate.career));
    //     const navigateEvent = new CustomEvent('navigate', {
    //         detail: {
    //             state: 'list'
    //         }
    //     });
    //     this.dispatchEvent(navigateEvent);
    // }
}
