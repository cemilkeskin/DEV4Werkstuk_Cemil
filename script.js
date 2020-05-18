$(function () {
    console.log('linked and ready baby!');

    fetch("entries.json").then(function (resp) {
            return resp.json(); 
        })
        .then(function (data) {

            console.log(data);
 
            // Add data to html
/*
            let entries = $(<p class='data'> + JSON.stringify(data.items) + <strong><br> </strong></p>).appendTo(div);
            JSON.stringify(div);
*/
            var JSONdata = Object.keys(data.items).length;

            // for ( var i = 0; i < totalMessages; i++)
            // {
            //   //  let category = $(<p class='data'> + JSON.stringify(data.items[i].category) + <strong><br> </strong></p>).appendTo(div);
            //   //  let created_by = $(<p class='data'> + JSON.stringify(data.items[i]["created-by"]) + <strong><br> </strong></p>).appendTo(div);
            //     let created_on = $(`<p class='data'>` + JSON.stringify(data.items[i]["created-on"]) + `<strong><br> </strong></p>`).appendTo(div);
            //     let excerpt = $(`<p class='data'>` + JSON.stringify(data.items[i]["excerpt"]) + `<strong><br> </strong></p>`).appendTo(div);
            //     let key_takeaways = $(`<p class='data'>` + JSON.stringify(data.items[i]["key-takeaways"]) + `</p>`).appendTo(div);
              
            // }

            for ( var i = 0; i < JSONdata; i++) {


                let divData = '';
                let category = data.items[i].category;
                let name = data.items[i].name; 
                let genre = data.items[i]["genre-v2"];
                let description = data.items[i].excerpt; 
                let createdby = data.items[i]["created-by"];
                let age = data.items[i].age;
                let id = data.items[i]._id;
   
                divData += `<div class="box" id="${id}">`; 
                divData += `<h4 class="boxGenre">${genre}</h4>`;
                divData += `<h2 class="boxTitle">${name}</h2>`; 
                divData += `<h4 class="boxDescription">${description}</h4>`;
                divData += `<h4 class="boxCategory">${category}</h4>`;
                if(age == undefined){

                }else{ 
                    divData += `<h4 class="boxAge">${age}</h4>`;
                }
               
                divData += `</div>`;
 
                $('.containerData').append(divData);
            }

        });


});