let siteName = document.querySelector("#siteName")
let siteUrl = document.querySelector("#siteUrl")
let submit = document.querySelector("#submit")
let urlName = document.querySelector("#urlName")

let mood ="add"
let tmp;
let arrData = []

if (localStorage.getItem("marked") != null) {
    arrData = JSON.parse(localStorage.getItem("marked"))
    displayData()
}


$("#submit").on("click", () => {
    if (siteName.value == "" || siteUrl.value==""){
        $("#valid").removeClass("d-none")
    }else{
        
        $("#valid").addClass("d-none")
        addData()
        displayData()
        clearData()
    }

})

function addData() {
    let dataO = {
        bookName: siteName.value,
        bookUrl: siteUrl.value
    }
    if (mood=="add"){
        arrData.push(dataO)
        localStorage.setItem("marked", JSON.stringify(arrData))
    }else{
        arrData[tmp]=dataO
        mood='add'
        submit.textContent='Add'
    }

}

function displayData() {
    let box = ``;

    for (let i = 0; i < arrData.length; i++) {
        box += `<tr >
                        <td >
                            <h5>${i + 1}</h5> 
                        <td >
                            <h5>
                                ${arrData[i].bookName}
                            </h5>
                        </td>
                        <td ><a href='http://${arrData[i].bookUrl}' class="btn px-4 btn-outline-info border-2 text-black">Visit</a></td>
                        <td ><button onclick=" updateData(${i})" class="btn btn-outline-warning text-black px-3  border-2">Update</button></td>
                        <td><button onclick="deleteData(${i})"  class="btn px-3 btn-danger ">Delete</button></td>
                    </tr>`
    }
    urlName.innerHTML = box
}

function searchData(val) {
    let box = ``
    let count = 1
    for (let i = 0; i < arrData.length; i++) {
        if (arrData[i].bookName.toLowerCase().includes(val.toLowerCase())) {
            box += `<tr >
                        <td >
                            <h5>${count}</h5> 
                        <td >
                            <h5>
                                ${arrData[i].bookName}
                            </h5>
                        </td>
                        <td ><a href='http://${arrData[i].bookUrl}' class="btn px-4 btn-outline-info border-2 text-black">Visit</a></td>
                        <td ><button class="btn btn-outline-warning text-black px-3  border-2">Update</button></td>
                        <td><button onclick="deleteData(${i})"  class="btn px-3 btn-danger ">Delete</button></td>
                    </tr>`
            count++;
        }
        urlName.innerHTML = box
    }
}

function clearData() {
    siteName.value = ""
    siteUrl.value = ""
}

function deleteData(index) {
    arrData.splice(index, 1)
    localStorage.setItem("marked", JSON.stringify(arrData))
    displayData()
}
function deleteAllData() {
    arrData.splice(0, arrData.length)
    localStorage.setItem("marked", JSON.stringify(arrData))
    displayData()
}


function updateData (index){
    siteName.value=arrData[index].bookName
    siteUrl.value = arrData[index].bookUrl
    submit.textContent='Update'
    mood ='update'
    tmp =index
    scroll({
        top:0, 
        behavior:'smooth'
    })
}