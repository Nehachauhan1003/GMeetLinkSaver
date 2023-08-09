//The HTML DOM is a standard for how to get, change, add, or delete HTML elements.

let link = document.createElement('a');// create a text node for anchor element. When an HTML document is loaded into a web browser, it becomes a document object. The document object is the root node of the HTML document. createElement(param) will create an HTML element of type specified in the parameter of createElement(param)


var allMeetLinksArr;
if (localStorage.getItem('AllMeetLinks') == null) {
   allMeetLinksArr = [];

}
allMeetLinksArr = JSON.parse(localStorage.getItem('AllMeetLinks'));//gettting the items of the localstorage as arrays


chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
   //setting the href value of the anchor element as the url of the current tab
   link.href = tabs[0].url;
   var str = link.href;
   //get only Gmeet links
   if (str.includes("meet.google")) {

      document.getElementById("demo").innerHTML = link.href;//display the link 
      //to toggle between the 2 interfaces 
      document.querySelector(".allMeetLinks").style.display = 'block';
      document.querySelector(".default").style.display = 'none';

   }
});

function showItem() {
   //creating dynamic elements using DOM properties
   var ulDiv = document.createElement("div");//creating a div HTML element to save all the list elements in sperate box
   ulDiv.style.border = '2px solid skyblue';//styling
   ulDiv.style.padding = 'px';

   var x = document.createElement("li");//list elements 
   x.style.listStyle = 'none';//styling
   x.style.listStylePosition = 'inside';//styling
   var t = document.createTextNode(allMeetLinksArr[i].detail);//creating a text child node of the li element  
   x.appendChild(t);//attaching child node to the parent node

   /*The difference between append() and appendChild() is that append() is used to add many children while appendChild() is used to add only one child */

   var y = document.createElement("a");//links
   var u = document.createTextNode(allMeetLinksArr[i].meetLink);
   y.appendChild(u);
   y.href = allMeetLinksArr[i].meetLink;//setting the href property of the <a> tag
   y.style.fontSize = "medium";
   /*y.onclick = window.open(y.href, "_blank");
   var but = document.createElement("button");
   var v = document.createTextNode("Open");
   but.appendChild(u);
   but.onclick = window.open(y.href, "_blank");*/

   var deleteButt = document.createElement('button');//delete button
   deleteButt.innerHTML = "Delete";

   ulDiv.append(x, y);
   ulDiv.appendChild(deleteButt);

   var lineBreak = document.createElement("br");//linebreak element used for giving linebreak after every ulDiv

   document.getElementById('oneLink').append(ulDiv);
   document.getElementById('oneLink').appendChild(lineBreak);
   /* sendMessage is used for communication between the content page and background page*/
   y.addEventListener('click', function () {
      chrome.runtime.sendMessage(y.href);//using chrome API send message from the popup.js to background.js

      // chrome.runtime.getBackgroundPage(function(backgroundPage){
      //    backgroundPage.openLink(y);
      //  }) --This is another method of connecting to the background page 
      window.close(); // Closes the popup
   });

   deleteButt.addEventListener('click', function () {

      allMeetLinksArr.splice(allMeetLinksArr.indexOf(y.href), 1);//splice will remove the element at the given index (Read more from w3 schools). 1-> indicates that one value should be removed from the array)
      localStorage.setItem('AllMeetLinks', JSON.stringify(allMeetLinksArr));

      document.getElementById('oneLink').removeChild(ulDiv);//delete the child from the ul list with id='oneLink'. This will not delete from the localstorage
   });

}

document.addEventListener('DOMContentLoaded', () => {
   //on clicking the "save" button we call the function 
   document.getElementById('saveBtn').addEventListener('click', function () {
      if (document.getElementById("details").value != '') {

         allMeetLinksArr.push({
            "id": Date.now(),
            "detail": document.getElementById("details").value,
            "meetLink": link.href
         });//adding new element to the array


         localStorage.setItem('AllMeetLinks', JSON.stringify(allMeetLinksArr));//saving the item to local array

         showItem();

      }
   });
})

for (var i = 0; i < allMeetLinksArr.length; i++) {
   showItem();
}




