//// This is a menu that allows options and inputs for a healthcare clinical team (examples are of a therapeutic clinical team lead by a team leader)


/////base class is clinician as this applies to all of the categories of people used
class Clinician {
    constructor(name, credentials, pronouns, hasOpenings) {
        this.name = name; ///// free text
        this.credentials = credentials;//// free text
        this.pronouns = pronouns; //// (free text e.g. She/Her)
        this.hasOpenings = hasOpenings; ////boolean 
    }
    /////// description function that lists basic info about the clinician
    describe() {
        return `${this.name}, ${this.credentials} (${this.pronouns})
Currently Accepting New Clients: ${this.hasOpenings}
    `
    }
}
/////// clinical team class to create groupings under an identified clinical team leader
class ClinicalTeam {
    constructor(name) {
        this.name = name;
        this.clinicians = [];
    }

    addClinician(clinician) {
        if (clinician instanceof Clinician) {
            this.clinicians.push(clinician);
        } else {
            throw new Error(`You can only add an instance of Clinician. 
    argument is not a clinician: ${clinician}`);
        }
    }
    //// description provides count of clinicians on the team
    describe() {
        return `${this.name}'s Clinical Team has ${this.clinicians.length} Clinicians:
    `;
    }
    
}


class Menu { // what drives the application and our choices
    constructor() {
        this.clinicalTeams = [];
        this.selectedTeam = null; // manage one team at a time
    }

    start() { // entry point to application
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam(); /// create based on leader's name
                    break;
                case '2':
                    this.viewTeam(); //// view team with leader and assigned clinicians
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams(); //// display all clinical teams by team leader
                    break;
            }
            selection = this.showMainMenuOptions(); //// take back to main menu
        }
        alert('Goodbye!');
    }
    
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create a new Clinical Team
        2) View a Clinical Team
        3) Delete a Clinical Team
        4) Display all Clinical Teams
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
Team Listing
----------------------------------
${teamInfo}
        
    1) Back
    2) Add a new Clinician
    3) Delete a Clinician`);
    }

    showGoBack(team) {
        return prompt(`
Clinical Teams
----------------------------------
${team}

    1) Back
    2) View a Clinical Team
    3) Delete a Clinical Team`);
    }

    displayTeams() {
 
        let teamString = '';
            this.clinicalTeams.forEach(clinicalTeam => {
                return teamString += this.clinicalTeams.indexOf(clinicalTeam) + ': ' + clinicalTeam.name + ' (' + clinicalTeam.clinicians.length + ' Clinicians)' + '\n';
            });
        
            let selection2 = this.showGoBack(teamString);
            switch (selection2) {
                case '1':
                    this.showMainMenuOptions();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    
                }
                ///selection2 = this.showGoBack(teamString);
            }
     
    createTeam() {
        let name = prompt('Enter Team Lead Clinician First & Last Name: ');
        this.clinicalTeams.push(new ClinicalTeam(name));
    }

    viewTeam() {
        let index = prompt("Enter the index of the team that you want to view:");
        if (index > -1 && index < this.clinicalTeams.length) {
            this.selectedTeam = this.clinicalTeams[index];
            let description = `Clinical Team Lead: ${this.selectedTeam.name}
${this.selectedTeam.describe()}`;
            for (let i = 0; i < this.selectedTeam.clinicians.length; i++) {
                description += '\n' + i + ': ' + this.selectedTeam.clinicians[i].describe();
            }
           
            let selection1 = this.showTeamMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.showMainMenuOptions();
                    break;
                case '2':
                    this.createClinician();
                    break;
                case '3':
                    this.deleteCliniican();
                    
            }
            ///selection1 = this.showTeamMenuOptions(description);
        } 
    }

    deleteTeam() {
        let index = prompt('Enter the index of the clinical team that you wish to delete: ');
        if (index > -1 && index < this.clinicalTeams.length) {
            this.clinicalTeams.splice(index, 1);
        }
    }


    createClinician() {
        let name = prompt('Enter New Clinician First & Last Name: ');
        let credentials = prompt('Enter Clinician Credentials: ');
        let pronouns = prompt("Enter clinican's pronouns: ");
        let hasOpenings = prompt('Does this clinician have openings for new clients?: ');

        this.selectedTeam.clinicians.push(new Clinician(name, credentials, pronouns, hasOpenings));
    }

    deleteCliniican() {
        let index = prompt('Enter the index of the clinician that you wish to delete: ');
        if (index > -1 && index < this.selectedTeam.clinicians.length) {
            this.selectedTeam.clinicians.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();


/*
Test items
menu - select 1 create team

Shay Selden
Bronwen Jones
KC Brown


create clinicians

Nora Jones
LPC
She/They
true

Terence Bali
PsyD
He/Him
false

Madalyn Kizer
LCSW
She/Her
true

Stacey Kelcey
MA
They/She
true

Rawi Dustin
LPC
He/They
false

*/ 
