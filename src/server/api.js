// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');

const jsforce = require('jsforce');
require('dotenv').config();
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
	console.error('Cannot start app: missing mandatory configuration. Check your .env file.');
	process.exit(-1);
}
const conn = new jsforce.Connection({
	loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err) => {
	if (err) {
		console.error(err);
		process.exit(-1);
	}
});

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.get('/api/candidates', (req, res) => {
	// var candidate_email = req.query.email;
	// console.log('Candidate email: ' + candidate_email);
	const soql = `
    SELECT 
    Id, Name, Email, Title, Resume_Summary__c, College_University__c, Career__c, Study_Start_Date__c, Study_End_Date__c, Study_Status__c, Languages__c, 
    (SELECT Id, Skill__r.Id, Skill__r.Name FROM Candidate_Skills__r), 
    (SELECT Id, Certification__r.Name, Certification__r.Awarded_Date__c FROM Candidate_Certifications__r), 
    (SELECT Id, Employer__c, Start_Date__c, End_Date__c, Title__c, Location__c, Main_Duties__c, Achievements__c FROM Professional_Experiences__r) 
    FROM Contact 
	WHERE Email = 'myemail@email.com'`;
	// WHERE Email = '` + candidate_email + `'`;
	conn.query(soql, (err, result) => {
		if (err) {
			res.sendStatus(500);
		} else if (result.records.length === 0) {
			res.status(404).send('Candidate not found.');
		} else {
			const formattedData = result.records.map((candidateRecord) => {
				// Process Skill records
				let skills = [];
				if (candidateRecord.Candidate_Skills__r) {
					skills = candidateRecord.Candidate_Skills__r.records.map((record) => {
						return {
							id: record.Skill__r.Id,
							name: record.Skill__r.Name
						};
					});
				}
				// Process Certification records
				let certifications = [];
				if (candidateRecord.Candidate_Skills__r) {
					certifications = candidateRecord.Candidate_Certifications__r.records.map((record) => {
						return {
							id: record.Certification__r.Id,
							name: record.Certification__r.Name,
							awarded_date: record.Certification__r.Awarded_Date__c
						};
					});
				}
				// Process Professional Experience records
				let professionalExperiences = [];
				if (candidateRecord.Professional_Experiences__r) {
					professionalExperiences = candidateRecord.Professional_Experiences__r.records.map((record) => {
						return {
							id: record.Id,
							employer: record.Employer__c,
							start_date: record.Start_Date__c,
							end_date: record.End_Date__c,
							title: record.Title__c,
							location: record.Location__c,
							main_duties: record.Main_Duties__c,
							achievements: record.Achievements__c
						};
					});
				}
				// Process Candidate record details
				return {
					id: candidateRecord.Id,
					name: candidateRecord.Name,
					email: candidateRecord.Email,
					title: candidateRecord.Title,
					resume_summary: candidateRecord.Resume_Summary__c,
					college_university: candidateRecord.College_University__c,
					career: candidateRecord.Career__c,
					study_start_date: candidateRecord.Study_Start_Date__c,
					study_end_date: candidateRecord.Study_End_Date__c,
					study_status: candidateRecord.Study_Status__c,
					languages: candidateRecord.Languages__c,
					skills,
					certifications,
					professionalExperiences
				};
			});
			res.send({ data: formattedData });
			// res.send({ data: formattedData, 'candidate_email': candidate_email });
		}
	});
});

app.listen(PORT, () => console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`));
