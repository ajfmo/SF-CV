const URL = '/api/candidates';
let candidates = [];
export const getCandidates = () =>
	fetch(URL)
		.then((response) => {
			if (!response.ok) {
				throw new Error('No response from server');
			}
			return response.json();
		})
		.then((result) => {
			candidates = result.data;
			return candidates;
		});
export const getCandidate = (candidateId) => {
	return candidates.find((candidate) => {
		return candidate.id === candidateId;
	});
};
