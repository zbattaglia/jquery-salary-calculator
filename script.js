$( document ).ready( readyNow );

let monthlyCost = 0;
let employeeArray = [];

function readyNow () {
    console.log( 'The Document is Ready' );

    // $( '#errorMessage' ).hide(); 

    $( '#submit-btn' ).on( 'click', addEmployee );

};

function addEmployee( event ) {
    console.log( 'In addEmployee' );
    
    let firstName = $( '#firstNameIn' ).val(); // retrieves value in firstName input
    let lastName = $( '#lastNameIn' ).val(); // retrieves value in lastName input
    let id = $( '#idIn' ).val(); // retrieves value in id input
    let title = $( '#titleIn' ).val(); // retrieves value in title input
    let salary = $( '#salaryIn' ).val(); // retrieves value in salary input

    const newEmployee = new Employee( firstName, lastName, id, title, salary ) // passes inputs to new employee constructor
    console.log( 'New Employee:', newEmployee );
    
    // validateInput();

}

// function validateInput() {
//     console.log('In Validate input.');
    
//     $( '#inputForm' ).each( function(){
//         console.log( 'Inputs are', this.target.value );
//     });
// }

function Employee( firstName, lastName, id, title, salary ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.title = title;
    this.salary = salary;
}; // employee constructor function