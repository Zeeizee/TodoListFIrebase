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

list.addEventListener('click', e => {
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
        db.collection('todolist').doc(id).update({

            status: true
        })
            .then(e => { console.log("status changed") })
            .catch(err => { console.log('err') })






    }


})
listc.addEventListener('click', e => {
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
        const tdate = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('todolist').doc(id).update({

            status: false,
            endDate: tdate
        })
            .then(e => { console.log("status changed") })
            .catch(err => { console.log('err') })






    }


})


const start = () => {


    db.collection('todolist').get().then(snapshot => {
        snapshot.docs.forEach(element => {

            if (element.data().status === false) {
                let html = `
                 <li class="row my-1 px-4   ">
                            <div
                                class="col-md-10 task-box col-10 border d-flex flex-column flex-md-row align-items-start p-2 justify-content-center align-items-md-center  justify-content-md-between">

                                <div>
                                    <i class="fas fa-history"></i>
                                    <span class=" taskname ml-2">${element.data().taskname}</span>
                                </div>
                                <div>
                                    <span class="date ml-4 ml-md-0">${element.data().taskdate.toDate().toLocaleString()}</span>
                                </div>
                            </div>
                            <div class="col-md-2 col-2 d-flex align-items-center p-2 justify-content-start todobuttons">
                                <button data-id="${element.id}"><i class="del far fa-trash-alt"></i></button>
                                <button data-id="${element.id}"><i class="com fas fa-check-double"></i></button>
                            </div>


                        </li>
    `
                list.innerHTML += html
            }
            else if (element.data().status === true) {

                let html = `

                 <li class="row px-4 my-1 data-id="${element.id} ">
                                <div
                                    class="col-md-10 task-box col-10 border d-flex flex-column flex-md-row align-items-start p-2 justify-content-center align-items-md-center  justify-content-md-between">

                                    <div>
                                        <i class="fas fa-check-double"></i>
                                        <span class=" taskname ml-2">${element.data().taskname}</span>
                                    </div>
                                    <div>
                                        <span class="date ml-4 ml-md-0">${element.data().endDate.toDate().toLocaleString()}</span>
                                    </div>
                                </div>
                                <div
                                    class="col-md-2 col-2 d-flex align-items-center p-2 justify-content-start todobuttons">
                                    <button data-id="${element.id}"><i class=" del far fa-trash-alt"></i></button>
                                    <button data-id="${element.id}"><i class="retry fas fa-reply-all"></i></button>

                                </div>


                            </li>

   `
                listc.innerHTML += html
            }


        });



    }).catch(err =>

        console.log("thi is exception", err)

    )
}



start();
// add task in db

// access controls
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const tname = form.listitem.value;
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











