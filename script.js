$( document ).ready( readyNow );

let employeeArray = [];

function readyNow () {
    console.log( 'The Document is Ready' );
    
    // function to handle click on submit button
    $( '#submit-btn' ).on( 'click', function(){
        // validate that all inputs have been filled out
        validateInput( event );        
        // calculate total cost and assign value to variable to pass to updateDOM
        let monthlyTotal = calculateCost();
        // update DOM with new employee and updated cost.
        updateDOM( monthlyTotal );
    });

    // function to handle click on any delete button
    $( '#tableBody' ).on( 'click', '.delete-btn', function(){
        // delete employee from employeeArray
        deleteEmployee();
        // recalculate cost and store in variable to pass to updateDOM
        let monthlyTotal = calculateCost();
        // updateDom with new employeeArray and updated cost.
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

    $( '#firstNameIn' ).val(''); // the remaining lines clear the input fields.
    $( '#lastNameIn' ).val('');
    $( '#idIn' ).val('');
    $( '#titleIn' ).val('');
    $( '#salaryIn' ).val('');
}; // end addEmployee

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
    };
}; // end validateInput

function updateDOM( monthlyTotal ) {
    console.log('Updating DOM');
    // retrieve the table body 
    let $table = $( '#tableBody' );
    // empty the table body
    $table.empty()
    // loop through employee array and append each employee info to table
    // uses row num to alternate between white and gray row backgrounds
    let rowNum = 0;
    for ( const employee of employeeArray ){
        if ( rowNum === 0 ){
            $table.append( `<tr><td class="bordered">${employee.firstName}</td><td class="bordered">${employee.lastName}</td><td class="bordered">${employee.id}</td><td class="bordered">${employee.title}</td><td class="bordered">${employee.salary}</td><td class="bordered delete-btn" id="deletePlaceholder"</td><button>Delete</button></tr>`);
            rowNum = 1;
        }
        else {
            $table.append( `<tr class="lightGray"><td class="bordered">${employee.firstName}</td><td class="bordered">${employee.lastName}</td><td class="bordered">${employee.id}</td><td class="bordered">${employee.title}</td><td class="bordered">${employee.salary}</td><td class="bordered delete-btn" id="deletePlaceholder"</td><button>Delete</button></tr>`);
            rowNum = 0;  
        }
    };
    // empties current totalCost and appends the monthly total recieved from calculateCost
    let $cost = $( '#total' );
    $cost.empty();
    $cost.append( `Total Monthly: ${monthlyTotal}` );
}; // end updateDOM

// function to calculate totatal of all salaries and return monthly total
function calculateCost() {
    totalCost = 0;
    // loops through all employees in array and add's each salary to total salary cost
    for ( employee of employeeArray ){
        totalCost += Number(employee.salary);
    };
    // Divides annual cost into monthly and formats as US currency
    let monthlyCost = formatter.format(totalCost / 12);
    return monthlyCost;
}; // end calculatCost

function deleteEmployee( event ) {
    console.log( 'Deleting Employee' );  
};

//formatter to convert raw number to US currency format.
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
}; // employee constructor function for creating employee objects
