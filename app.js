var arr = [];
let row = 10;
let page = 1;
var myDiv = document.getElementById('myDiv');
myDiv.addEventListener("scroll", myPageScroll);

async function getData(){
    let response = await fetch('https://api.spacexdata.com/v4/launches/')
    .then(function(res){
        return res.json()
    })

    arr = response
    setTableRec(arr);
    console.log(arr);

}
function setTableRec(data){
    
    let offset = (page - 1) * row;
    let str = "";

    for(let i = offset; i < offset+row; i++){
        str  += "<tr>"
        str += "<td>" + data[i].flight_number + ": " + data[i].name + " " + "(" + data[i].date_local.substr(0, 4) + ")" +  "</td>" 
        str +="</tr>"
        str  += "<tr>"
        str += "<td>" + "Details: " + data[i].details + "</td>";
        str +="</tr>"
    }
    document.getElementById("spaceRec").insertAdjacentHTML("beforeend", str);
    
}

function onNext(){
    page++;
    setTableRec(arr);
}

function myPageScroll(){
    var myScrollTop = myDiv.scrollTop;

    var myScrollHeight = myDiv.scrollHeight;
   
    var diff = myScrollHeight - myScrollTop;
    
    var height = myDiv.clientHeight;

    if(diff == height){
        page++;
        setTableRec(arr);
    }

}

getData()


