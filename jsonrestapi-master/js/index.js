function getAllStudents(event){
    
    const httpRequest = new XMLHttpRequest();

    httpRequest.open("GET","http://localhost:3000/contacts");
    httpRequest.setRequestHeader("content-type","application/json");

    httpRequest.onreadystatechange = function() {

        if(httpRequest.readyState === XMLHttpRequest.DONE){

            const StudentList = JSON.parse(httpRequest.response);
            console.log(StudentList);

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
        }
    };
    httpRequest.send();
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
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST","http://localhost:3000/contacts");
    httpRequest.setRequestHeader("content-type","application/json");
    
    httpRequest.onreadystatechange = function() {        
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            getAllStudents();
        }
    }

    httpRequest.send(JSON.stringify(student));
    
}


function deleteStudent(id){
    
    const httpRequest = new XMLHttpRequest();
    
    httpRequest.open("DELETE",`http://localhost:3000/contacts/${id}`);
    httpRequest.setRequestHeader("content-type","application/json");

    httpRequest.onreadystatechange = function() {        
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            getAllStudents();
        }
    }
        
    httpRequest.send();
    
 }
    
    
function updateStudent(id){

    const httpRequest = new XMLHttpRequest();
    
    httpRequest.open("PUT",`http://localhost:3000/contacts/${id}`);
    httpRequest.setRequestHeader("content-type","application/json");
    
    const student = {
        "name":"nameupdated",
        "contactno": "contactupdated",
        "email": "userupdated@stackroute.in"
    }

    httpRequest.onreadystatechange = function() {        
        if(httpRequest.readyState === XMLHttpRequest.DONE){
            getAllStudents();            
        }
    }
    

    httpRequest.send(JSON.stringify(student));
    
}
    