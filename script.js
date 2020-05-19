$(function () {
    console.log('linked and ready baby!');

    let filter = [];
    let filterGenre = [];

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

            for (var i = 0; i < JSONdata; i++) {

                let divData = '';
                let category = data.items[i].category;
                let name = data.items[i].name;
                let genre = data.items[i]["genre-v2"];
                let description = data.items[i].excerpt;
                let createdby = data.items[i]["created-by"];
                let age = data.items[i].age;
                let id = data.items[i]._id;

                filter.push(category);
                filterGenre.push(genre);

                divData += `<div class="box" id="${id}">`;
                divData += `<h4 class="boxGenre">${genre}</h4>`;
                divData += `<h2 class="boxTitle">${name}</h2>`;
                divData += `<h4 class="boxDescription">${description}</h4>`;
                divData += `<h4 class="boxCategory">${category}</h4>`;
                if (age == undefined) {

                } else {
                    divData += `<h4 class="boxAge">${age}</h4>`;
                }

                divData += `</div>`;

                $('.containerData').append(divData);
            }

            uniqueFilters = [...new Set(filter)].sort();
            console.log(uniqueFilters);

            uniqueFiltersGenre = [...new Set(filterGenre)].sort();
            console.log(uniqueFiltersGenre);

            for (var i = 0; i < uniqueFilters.length; i++) {

                let divFilter = '';
                let uniqueGenre = uniqueFilters[i];

                console.log(uniqueGenre);

                divFilter += `<h4 class="boxFilterGenre">${uniqueGenre}</h4>`;

                $('.filterDoelgroep').append(divFilter);
            }

            for (var i = 0; i < uniqueFiltersGenre.length; i++) {

                let divFilter = '';
                let uniqueGenre = uniqueFiltersGenre[i];

                console.log(uniqueGenre);


                divFilter += `<h4 class="boxFilterGenre">${uniqueGenre}</h4>`;

                $('.filterGenre').append(divFilter);
            }

            $(".box").click(function () {

                let id = $(this).attr("id");
                console.log(id);

                let linkVid = "";
                let videoDesc = "";
                let extendedDesc = "";
                let videoName = "";

                for (var i = 0; i < JSONdata; i++) {
                    if (id == data.items[i]._id) {
                        console.log(data.items[i]);

                        videoName = data.items[i].name; 
                        linkVid = data.items[i]["link-to-video"].metadata.html;
                        videoDesc = data.items[i]["social-share-description"]; 
                        extendedDesc = data.items[i]["video-notes"]; 
                        

                        console.log(linkVid);
                    }
                }

                $(".containerHome").empty();
                $(".containerTextHome").empty();

                var str = linkVid;  
                  
                str = str.replace(/\bwidth="(\d+)"/g, 'style="width: 100%"');

                console.log(str); 

                let divVideo = ''; 

                divVideo += `<div class="video">`;
                divVideo += `${str}`;  
                divVideo += `</div>`;

                $('.containerHome').append(divVideo);





               
                let divVideoText = ''; 

                divVideoText += `<div class="containerVideoText">`; 
                divVideoText += `<h4 class="homeTitle">${videoName}`;  
                divVideoText += `<h4 class="homeDesc">${videoDesc}`; 
                divVideoText += `<h4 class="homeDesc">${extendedDesc}`;  
                divVideoText += `</div>`;

                $('.containerTextHome').append(divVideoText);
            });
        });

});