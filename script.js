const firebaseConfig = {
    apiKey: "AIzaSyCwEoz4SUBfvWlJagR2egFVnBzqONEbhq0",
    authDomain: "todoapp-12ce9.firebaseapp.com",
    projectId: "todoapp-12ce9",
    storageBucket: "todoapp-12ce9.appspot.com",
    messagingSenderId: "1063436203010",
    appId: "1:1063436203010:web:3b1d3617ee24e77d2fa31b",
    measurementId: "G-VV2KBEBH45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const list = document.querySelector('.pending')
const listc = document.querySelector('.completed')
let listchange=''

list.addEventListener('click', e => {
    listchange='pending';
    console.log(e.target.classList)

    console.log(e.target.parentElement)

    if (e.target.classList.contains('del')) {


        const id = e.target.parentElement.getAttribute('data-id')
        console.log(id)
        db.collection('todolist').doc(id).delete().then(yes => {
            console.log("data deleted")
        }).catch(err => { console.log(err) })

        //delete task 
    }
    else if (e.target.classList.contains('com')) {
        // console.log("completed") shipt task in completed list
        const id = e.target.parentElement.getAttribute('data-id')
        const newdatedate = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('todolist').doc(id).update({

            status: true,
            endDate: newdatedate
        })
            .then(e => { console.log("status changed") })
            .catch(err => { console.log('err') })
            }


})
listc.addEventListener('click', e => {
    listchange='completed';
    console.log(e.target.classList)

    console.log(e.target.parentElement)


    if (e.target.classList.contains('del')) {


        const id = e.target.parentElement.getAttribute('data-id')
        console.log(id)
        db.collection('todolist').doc(id).delete().then(yes => {
            console.log("data deleted")
        }).catch(err => { console.log(err) })

        //delete task 
    }
    else if (e.target.classList.contains('retry')) {
        // console.log("completed") shipt task in completed list
        const id = e.target.parentElement.getAttribute('data-id')
        
        db.collection('todolist').doc(id).update({

            status: false,
            
        })
            .then(e => { console.log("status changed") })
            .catch(err => { console.log('err') })






    }


})


const start = (docid,docdata) => { 

            if (docdata.status === false) {
                let html = `
                 <li class="row my-1 px-4 " data-id="${docid}">
                            <div
                                class="col-md-10 task-box col-10 border d-flex flex-column flex-md-row align-items-start p-2 justify-content-center align-items-md-center  justify-content-md-between">

                                <div>
                                    <i class="fas fa-history"></i>
                                    <span class=" taskname ml-2">${docdata.taskname}</span>
                                </div>
                                <div>
                                    <span class="date ml-4 ml-md-0">${docdata.taskdate.toDate().toLocaleString()}</span>
                                </div>
                            </div>
                            <div class="col-md-2 col-2 d-flex align-items-center p-2 justify-content-start todobuttons">
                                <button data-id="${docid}"><i class="del far fa-trash-alt"></i></button>
                                <button data-id="${docid}"><i class="com fas fa-check-double"></i></button>
                            </div>


                        </li>    `
                list.innerHTML += html
            }
                        else if (docdata.status === true) {

                let html = `

                 <li class="row px-4 my-1"  data-id="${docid}">
                                <div
                                    class="col-md-10 task-box col-10 border d-flex flex-column flex-md-row align-items-start p-2 justify-content-center align-items-md-center  justify-content-md-between">

                                    <div>
                                        <i class="fas fa-check-double"></i>
                                        <span class=" taskname ml-2">${docdata.taskname}</span>
                                    </div>
                                    <div>
                                        <span class="date ml-4 ml-md-0">${docdata.endDate.toDate().toLocaleString()}</span>
                                    </div>
                                </div>
                                <div
                                    class="col-md-2 col-2 d-flex align-items-center p-2 justify-content-start todobuttons">
                                    <button data-id="${docid}"><i class=" del far fa-trash-alt"></i></button>
                                    <button data-id="${docid}"><i class="retry fas fa-reply-all"></i></button>

                                </div>


                            </li>

   `
                listc.innerHTML += html
            }


      



    
}




// add task in db
const form = document.querySelector('form')
const msg = document.querySelector('.msg')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const tname = form.listitem.value;

    if(tname==="")
    {   msg.classList.remove('invisible')
        msg.classList.add('visible')
     
        setTimeout(()=>{
            msg.classList.remove('visible')
            msg.classList.add('invisible')
            console.log("hello")


        },5000)
        console.log("going return")
        return;

    }
    const tdate = firebase.firestore.Timestamp.fromDate(new Date());


    const data = {
        taskname: tname,
        taskdate: tdate,
        status: false,
        endDate: tdate
    }

    db.collection('todolist').add(data).then(e => {
        console.log("task added")
    })
        .catch(err => { console.log(err) })
    form.listitem.value = "";


})
// delete from list

const delFromList=(docid)=>
{
    let ss=null
if(listchange==='pending')
{
       ss =document.querySelectorAll('.pending li');
}
else if(listchange==='completed')
{
   ss=document.querySelectorAll('.completed li');
}


ss.forEach(li=>{
  
    console.log(li)

    if(li.getAttribute('data-id')===docid){
    li.remove();
    console.log(li)

        console.log('del from list')
    }
})

}
// updating completed task and pending task

const shift=(docid,docdata)=>{

    delFromList(docid,docdata)
    if(listchange==='pending')
{
    console.log(docdata)

    
    let html = `

    <li class="row px-4 my-1"  data-id="${docid}">
                   <div
                       class="col-md-10 task-box col-10 border d-flex flex-column flex-md-row align-items-start p-2 justify-content-center align-items-md-center  justify-content-md-between">

                       <div>
                           <i class="fas fa-check-double"></i>
                           <span class=" taskname ml-2">${docdata.taskname}</span>
                       </div>
                       <div>
                           <span class="date ml-4 ml-md-0">${docdata.endDate.toDate().toLocaleString()}</span>
                       </div>
                   </div>
                   <div
                       class="col-md-2 col-2 d-flex align-items-center p-2 justify-content-start todobuttons">
                       <button data-id="${docid}"><i class=" del far fa-trash-alt"></i></button>
                       <button data-id="${docid}"><i class="retry fas fa-reply-all"></i></button>

                   </div>


               </li>

`
   listc.innerHTML += html

      
}
else if(listchange==='completed')
{
    let html = `
                 <li class="row my-1 px-4 " data-id="${docid}">
                            <div
                                class="col-md-10 task-box col-10 border d-flex flex-column flex-md-row align-items-start p-2 justify-content-center align-items-md-center  justify-content-md-between">

                                <div>
                                    <i class="fas fa-history"></i>
                                    <span class=" taskname ml-2">${docdata.taskname}</span>
                                </div>
                                <div>
                                    <span class="date ml-4 ml-md-0">${docdata.taskdate.toDate().toLocaleString()}</span>
                                </div>
                            </div>
                            <div class="col-md-2 col-2 d-flex align-items-center p-2 justify-content-start todobuttons">
                                <button data-id="${docid}"><i class="del far fa-trash-alt"></i></button>
                                <button data-id="${docid}"><i class="com fas fa-check-double"></i></button>
                            </div>


                        </li>    `
                list.innerHTML += html
}
    
    
    
}


db.collection('todolist').onSnapshot(snapshot=>{
snapshot.docChanges().forEach(change=>{
    const docs=change.doc
    if(change.type==='added')
    {
        start(docs.id,docs.data())
    }
    if(change.type==='removed') 
    {
        delFromList(docs.id)

    }  
    if(change.type==='modified')

    {
        shift(docs.id,docs.data())
    }
   
})


})









