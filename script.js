$( document ).ready( readyNow );

// let employeeArray = [];
// Pre-built employeeArray for testing
let employeeArray = [new Employee("Zach", "Battaglia", "1234", "Engineer", 750000), new Employee("Emily", "Hanson", "54721", "Lawyer", 120123), new Employee("Michael", "Jordan", "654321", "Basketball Player", 2400000), new Employee("Jim", "Smith", "1236", "Electrician", 60000),  new Employee("Sarah", "Johnson", "654222", "Doctor", 500000)]
let totalCost = 0;

function readyNow () {
    console.log( 'The Document is Ready' );
    updateDOM( calculateCost() );

    // disables the remove employee button until there is an id entered
    $( '#deleteID-btn' ).attr('disabled', true )
    $( '#deleteID').keyup( function(){
        $( '#deleteID-btn' ).removeAttr('disabled');        
    });

    // function to handle click on submit button
    $( '#submit-btn' ).on( 'click', function(){
        // validate that all inputs have been filled out
        validateInput( event );        
        // calculate total cost and assign value to variable to pass to updateDOM
        let monthlyTotal = calculateCost();
        // update DOM with new employee and updated cost.
        updateDOM( monthlyTotal );
    });

    $( '#tableBody' ).on( 'click', 'tr', function(){
      deleteEmployee( event );
    })

    // function to handle click on any delete button
    // $( '#tableBody' ).on( 'click', 'tr', function(){
    //     // delete employee from employeeArray
    //     deleteEmployee( event );
    //     // recalculate cost and store in variable to pass to updateDOM
    //     let monthlyTotal = calculateCost();
    //     // updateDom with new employeeArray and updated cost.
    //     updateDOM( monthlyTotal );
    // });

    $( '#deleteID-btn').on( 'click', function() {
        deleteById( event );
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
            $table.append( `<tr class="employeeRow"><td class="bordered">${employee.firstName}</td><td class="bordered">${employee.lastName}</td><td class="bordered employeeID">${employee.id}</td><td class="bordered">${employee.title}</td><td class="bordered">${employee.salary}</td><td class="bordered delete-btn" id="deletePlaceholder"</td><button class="delete-btn">Delete</button></tr>`);
            rowNum = 1;
        }
        else {
            $table.append( `<tr class="lightGray employeeRow"><td class="bordered">${employee.firstName}</td><td class="bordered">${employee.lastName}</td><td class="bordered employeeID">${employee.id}</td><td class="bordered">${employee.title}</td><td class="bordered">${employee.salary}</td><td class="bordered delete-btn" id="deletePlaceholder"</td><button class ="delete-btn">Delete</button></tr>`);
            rowNum = 0;  
        }
    };
    // empties current totalCost and appends the monthly total recieved from calculateCost
    let $cost = $( '#total' );
    $cost.empty();
    $cost.append( `<span>Total Monthly: ${monthlyTotal}</span>` );
    
    if ( totalCost > 20000 ) {
        console.log( 'Cost is greater than 20k', totalCost );
        $( '#total').addClass( 'highTotal' );        
    }
    else {
        $( '#total').removeClass( 'highTotal' );        
    }
}; // end updateDOM

// function to calculate totatal of all salaries and return monthly total
function calculateCost() {
    totalCost = 0;
    // loops through all employees in array and add's each salary to total salary cost
    // divides by 12 for monthly cost
    for ( employee of employeeArray ){
        totalCost += Number(employee.salary) / 12;
    };
    // ormats as US currency
    let monthlyCost = formatter.format(totalCost);
    return monthlyCost;
}; // end calculatCost

function deleteEmployee( event ) {
    let deleteID = $(event.target).parent().parent().find('td.bordered.employeeID').text();
    console.log( 'Deleting Employee', deleteID );
    for ( let i = 0; i < employeeArray.length; i++ ) {
        if ( employeeArray[i].id === deleteID ) {
            employeeArray.splice(i, 1);
        }
    };
};

function deleteById( event ) {
    event.preventDefault(); // prevent auto refresh on button click
    let $id = $( '#deleteID' ).val();
    console.log('in deleteByID. id is:', $id);
    let idFound = false;
    for ( let i = 0; i < employeeArray.length; i++ ) {
        if ( employeeArray[i].id === $id ) {
            employeeArray.splice(i, 1);
            idFound = true;
        }
    };
    let $el = $( '#removeHeader' );
    if ( idFound === false ) {
        $el.append(`<h4 id="errorMessage">ID not Found</h4>`)
    }
    else {
        $( '#errorMessage' ).empty();
    };

    $( '#deleteID' ).val('');
    $( '#deleteID-btn' ).attr('disabled', true )

} // end deleteById

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
