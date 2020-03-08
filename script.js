$( document ).ready( readyNow );

let monthlyCost = 0;
let employeeArray = [];

function readyNow () {
    console.log( 'The Document is Ready' );

    // $( '#errorMessage' ).hide(); 

    $( '#submit-btn' ).on( 'click', validateInput );

};

function addEmployee( event ) {
    console.log( 'In addEmployee' );
    
    let firstName = $( '#firstNameIn' ).val(); // retrieves value in firstName input
    let lastName = $( '#lastNameIn' ).val(); // retrieves value in lastName input
    let id = $( '#idIn' ).val(); // retrieves value in id input
    let title = $( '#titleIn' ).val(); // retrieves value in title input
    let salary = $( '#salaryIn' ).val(); // retrieves value in salary input

    // passes inputs to new employee constructor
    const newEmployee = new Employee( firstName, lastName, id, title, salary )
    console.log( 'New Employee:', newEmployee );
    employeeArray.push( newEmployee );
    console.log( 'Updated Array:', employeeArray );

}

function validateInput( event ) {
    console.log('In Validate input.');

    event.preventDefault(); // prevent auto refresh on button click

    // loop over inputs to verify that each piece of information has been input
    $( '#inputField input' ).each( function(){
        console.log( 'Inputs are', this.value );
        //
        if( this.value === '' ) {
            $( this ).addClass( 'missingInfo' );
        }
        else {
            $( this ).removeClass( 'missingInfo' );
        }
    });
}

function Employee( firstName, lastName, id, title, salary ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.title = title;
    this.salary = salary;
}; // employee constructor function