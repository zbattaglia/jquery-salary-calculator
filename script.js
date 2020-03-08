$( document ).ready( readyNow );

let employeeArray = [];

function readyNow () {
    console.log( 'The Document is Ready' );

    $( '#submit-btn' ).on( 'click', function(){
        validateInput( event );
        let monthlyTotal = calculateCost();
        updateDOM( monthlyTotal );
    });
};

function addEmployee( ) {
    console.log( 'In addEmployee' );
    
    let firstName = $( '#firstNameIn' ).val(); // retrieves value in firstName input
    let lastName = $( '#lastNameIn' ).val(); // retrieves value in lastName input
    let id = $( '#idIn' ).val(); // retrieves value in id input
    let title = $( '#titleIn' ).val(); // retrieves value in title input
    let salary = $( '#salaryIn' ).val(); // retrieves value in salary input

    // passes inputs to new employee constructor
    const newEmployee = new Employee( firstName, lastName, id, title, salary );
    console.log( 'New Employee:', newEmployee );
    employeeArray.push( newEmployee );
    console.log( 'Updated Array:', employeeArray );

    $( '#firstNameIn' ).val(''); // retrieves value in firstName input
    $( '#lastNameIn' ).val(''); // retrieves value in lastName input
    $( '#idIn' ).val(''); // retrieves value in id input
    $( '#titleIn' ).val(''); // retrieves value in title input
    $( '#salaryIn' ).val(''); // retrieves value in salary input

};

function validateInput( event ) {
    console.log('In Validate input.');

    event.preventDefault(); // prevent auto refresh on button click
    let isEmpty = false; // a flag if there is an empty input field 
    // loop over inputs to verify that each piece of information has been input
    $( '#inputField input' ).each( function(){
        console.log( 'Inputs are', this.value );
        // if there is an empty input add missingInfo class and set flag to true
        // .trim prevents an input just being white space
        if( this.value.trim() === '' ) {
            $( this ).addClass( 'missingInfo' );
            isEmpty = true;
        }
        // else remove missingInfo class if it had been applied
        else {
            $( this ).removeClass( 'missingInfo' );
        }
    });
    if ( isEmpty ) {
        console.log('Missing info');
    }
    else {
        addEmployee();
    }
}

function updateDOM( monthlyTotal ) {
    console.log('Updating DOM');
    let $table = $( '#tableBody' );
    $table.empty()
    for ( const employee of employeeArray ){
        $table.append( `<tr><td class="bordered">${employee.firstName}</td><td class="bordered">${employee.lastName}</td><td class="bordered">${employee.id}</td><td class="bordered">${employee.title}</td><td class="bordered">${employee.salary}</td><td class="bordered" id="deletePlaceholder"</td></tr>`);
    };
    let $cost = $( '#total' );
    $cost.empty();
    $cost.append( `Total Monthly: ${monthlyTotal}` );
}

function calculateCost() {
    totalCost = 0;
    for ( employee of employeeArray ){
        totalCost += Number(employee.salary);
    };
    let monthlyCost = formatter.format(totalCost / 12);
    return monthlyCost;
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

function Employee( firstName, lastName, id, title, salary ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.title = title;
    this.salary = salary;
}; // employee constructor function
