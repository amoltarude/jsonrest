function getAllStudents(event){
    
    fetch('http://localhost:3000/contacts')
       .then( response => {

            if(response.status ==200) {
                return Promise.resolve(response.json())
            }else{
                return Promise.reject("Unable to Fetch data")
            }
       }).then(StudentList => {

            const tbody = document.getElementsByTagName("tbody")[0];
            let studentRowsHtml = "";

            StudentList.forEach( student =>  {
                console.log(student.name);

                studentRowsHtml = studentRowsHtml + 
                    `<tr>
                        <td>${student.name} </td> 
                        <td>${student.contactno} </td> 
                        <td>${student.email} </td> 
                        <td> 
                            <button class=btn-primary onclick=updateStudent(${student.id})>
                                Update</button> 
                                </td> 
                        <td> 
                        <button class=btn-primary onclick=deleteStudent(${student.id})>
                        Delete</button> 
                    
                        </td> 
                     </tr>`;
                     tbody.innerHTML=studentRowsHtml;
                });
        })
    }



function addStudentToJSON(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const contactno = document.getElementById('contactno').value;
    const email = document.getElementById('email').value;
    
    
    const student = {
        "name":name,
        "contactno":contactno,
        "email":email
    }

    console.log(JSON.stringify(student));

    
    fetch('http://localhost:3000/contacts', {
        
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(student)

    }).then(res =>     {
        console.log(res.json)
        getAllStudents();
    }).catch(err => {
        console.log('Failed to add student'+err)
    })
    
    
}

/*

function check(){
    fetch('https://reqres.in/api/users', {
        
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": "sam1"
            })

    }).then(res => res.json())
    .then(data => console.log(data))
}

function check02(){
    fetch('https://reqres.in/api/users/20')
        .then(res => {

            if(res.ok){
                console.log('SUCCESS');
            }else{
                console.log('UNSUCCESSFUL');
            }

        })
        .then(data => console.log(data))
        .catch(error => console.log('ERROR'))

        
}

*/