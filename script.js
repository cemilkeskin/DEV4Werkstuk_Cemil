$(function () {
    console.log('linked and ready baby!');

    let filter = [];
    let filterGenre = [];
    let selectedFilter = [];

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
            allData();
            //function alldata gaan we gebruiken voor het deleten van filters dus zetten we in een aparte function
            function allData() {

                //we loopen de globale json file en we appenden alles op onze pagina
                for (var i = 0; i < JSONdata; i++) {

                    let divData = '';
                    let category = data.items[i].category;
                    let name = data.items[i].name;
                    let genre = data.items[i]["genre-v2"];
                    let description = data.items[i].excerpt;
                    let createdby = data.items[i]["created-by"];
                    let age = data.items[i].age;
                    let id = data.items[i]._id;

                    //we maken een globale array met alle categories en genres erop dan gaan we op basis van deze array het filteren
                    filter.push(category);
                    filterGenre.push(genre);

                    //we plaatsen onze data in onze pagina
                    divData += `<div class="box ${genre}" id="${id}">`;
                    divData += `<h4 class="boxGenre">${genre}</h4>`;
                    divData += `<h2 class="boxTitle">${name}</h2>`;
                    divData += `<h4 class="boxDescription">${description}</h4>`;
                    divData += `<h4 class="boxCategory">${category}</h4>`;

                    //als age geen waarde heeft dan gaan we het niet tonen als het wel een waarde heeft gaan we het appenden op onze pagina
                    if (age == undefined) {

                    } else {
                        divData += `<h4 class="boxAge">${age}</h4>`;
                    }

                    divData += `</div>`;

                    $('.containerData').append(divData);
                }
            }

            //de globale FILTER array bovenaan gaan we hier dus filteren dus 1 keer de waardes terug geven en het in een nieuwe array steken. 
            uniqueFilters = [...new Set(filter)].sort();
            console.log(uniqueFilters);

            //we doen hetzelfde met de genre filter
            uniqueFiltersGenre = [...new Set(filterGenre)].sort();
            console.log(uniqueFiltersGenre);

            //we loopen binnen de gefilterde filter array en we plaatsen het in onze pagina
            for (var i = 0; i < uniqueFilters.length; i++) {

                let divFilter = '';
                let uniqueGenre = uniqueFilters[i];

                console.log(uniqueGenre);

                divFilter += `<h4 class="boxFilterGenre" id="${uniqueGenre}">${uniqueGenre}</h4>`;

                $('.filterDoelgroep').append(divFilter);
            }
            let divFilter = '';

            //we doen hetzelfde met de andere filter array
            for (var i = 0; i < uniqueFiltersGenre.length; i++) {


                let uniqueGenre = uniqueFiltersGenre[i];

                console.log(uniqueGenre);


                divFilter += `<h4 class="boxFilterGenre"  id="${uniqueGenre}" >${uniqueGenre}</h4>`;


            }

            //buiten de loop onder onze tweede filter array willen we een filter wissen button plaatsen. 
            divFilter += `<br> <h4 class="boxFilterWissen">Filters wissen</h4>`;
            $('.filterGenre').append(divFilter);


            //elke klik dat we doen op de text input op onze pagina gaat hij de functie uitvoeren
            $('#theaterinput').on('keyup', function () {
        
                //n aelke keyup gaan we onze content leegmaken voor nieuwe boxen
                $("#content").empty();
                let inputChar = $(this).val();
                console.log(inputChar); 


                //we loopen over de globale array en als onze geschreven character in de naam terechtkomt gaanwe het printen
                for (var i = 0; i < JSONdata; i++) {

                    if ( data.items[i].name.toLowerCase().includes(inputChar)) { 
 
                    let divData = '';
                    let category = data.items[i].category; 
                    let name = data.items[i].name;
                    let genre = data.items[i]["genre-v2"];
                    let description = data.items[i].excerpt; 
                    let createdby = data.items[i]["created-by"];
                    let age = data.items[i].age;
                    let id = data.items[i]._id;

                    //we maken een globale array met alle categories en genres erop dan gaan we op basis van deze array het filteren
                    filter.push(category); 
                    filterGenre.push(genre);  
 
                    //we plaatsen onze data in onze pagina
                    divData += `<br><div class="box ${genre}" id="${id}">`;
                    divData += `<h4 class="boxGenre">${genre}</h4>`; 
                    divData += `<h2 class="boxTitle">${name}</h2>`;
                    divData += `<h4 class="boxDescription">${description}</h4>`;
                    divData += `<h4 class="boxCategory">${category}</h4>`;

                    //als age geen waarde heeft dan gaan we het niet tonen als het wel een waarde heeft gaan we het appenden op onze pagina
                    if (age == undefined) {
 
                    } else {
                        divData += `<h4 class="boxAge">${age}</h4>`;
                    }

                    divData += `</div>`;

                    $('#content').append(divData);
                    } 

                   
                }

                boxClick();

            });

            //we plaatsen de boxclick function om het dan voor de volgende functies terug te roepen 
            boxClick();
            //////////////////////////////////////////////////////////////////////

            function boxClick() {

                //box click function
                $(".box").click(function () {


                    //neem de id van de geklikte box
                    let id = $(this).attr("id");
                    console.log(id);

                    let linkVid = "";
                    let videoDesc = "";
                    let extendedDesc = "";
                    let videoName = "";

                    let keytakeaways = "";

                    //op elke klik scroll naar boven
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                    //de globale array opzoeken met de geklikte box value
                    for (var i = 0; i < JSONdata; i++) {

                        //als we het vinden gaan we alle values die hetzelfde zijn appenden naar onze pagina
                        if (id == data.items[i]._id) {
                            console.log(data.items[i]);

                            videoName = data.items[i].name;
                            linkVid = data.items[i]["link-to-video"].metadata.html;
                            videoDesc = data.items[i]["social-share-description"];
                            extendedDesc = data.items[i]["video-notes"];
                            keytakeaways = data.items[i]["key-takeaways"];


                            console.log(linkVid);
                        }
                    }

                    //de homepagina wordt verdwenen (foto's en teksten) ipv die gaan we dus de video en descriptions appenden
                    $(".containerHome").empty();
                    $(".containerTextHome").empty();

                    var str = linkVid;

                    //de width van de videos gaan we verplaatsen met 100% 
                    str = str.replace(/\bwidth="(\d+)"/g, 'style="width: 100%"');

                    console.log(str);

                    let divVideo = '';

                    //iframe code van json plaatsen we in een video div
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

                    $('.containerTextVideoClick').append(divVideoText);


                    let divVideoTextRight = '';

                    divVideoTextRight += `<div class="containerVideoTextRight">`;
                    divVideoTextRight += `<h4 class="textRightUL">${keytakeaways}`;
                    divVideoTextRight += `</div>`;

                    $('.containerTextVideoClick').append(divVideoTextRight);
                });
            }
            /////////////////////////////////////////////////////////////////////////



            $(".containerFooterLeft .boxFilterGenre").click(function () {
                console.log("oldu");
                location.href = "gebruiksvoorwaarden.html";
            });

            // $("header .img").click(function () {
            //     console.log("oldu"); 
            //     location.href = "index.html";
            // });

            $(".cultuur").click(function () {
                console.log("oldu");
                location.href = "gebruiksvoorwaarden.html";
            });

            //filter genre on click 

            $(".filterGenre .boxFilterGenre").click(function (e) {

                //id van de geklikte button krijgen
                let id = $(this).attr("id");
                console.log(id);

                //activeren van de button en deactiveren
                var target = e.target,
                    status = e.target.classList.contains('active');

                e.target.classList.add(status ? 'inactive' : 'active');
                e.target.classList.remove(status ? 'active' : 'inactive');



                let linkVid = "";
                let videoDesc = "";
                let extendedDesc = "";
                let videoName = "";

                let keytakeaways = "";

                //op elke klik wordt de container leeg 
                $(".containerData").empty();

                //de globale json file zoeken met de values van de geklikte box
                for (var i = 0; i < JSONdata; i++) {

                    let divData = '';
                    if (id == data.items[i]["genre-v2"]) {

                        console.log(data.items[i]);


                        let category = data.items[i].category;
                        let name = data.items[i].name;
                        let genre = data.items[i]["genre-v2"];
                        let description = data.items[i].excerpt;
                        let createdby = data.items[i]["created-by"];
                        let age = data.items[i].age;
                        let id = data.items[i]._id;

                        divData += `<div class="box ${genre}" id="${id}">`;
                        divData += `<h4 class="boxGenre">${genre}</h4>`;
                        divData += `<h2 class="boxTitle">${name}</h2>`;
                        divData += `<h4 class="boxDescription">${description}</h4>`;
                        divData += `<h4 class="boxCategory">${category}</h4>`;
                        if (age == undefined) {

                        } else {
                            divData += `<h4 class="boxAge">${age}</h4>`;
                        }

                        divData += `</div>`;

                        // selectedFilter.push(data.items[i]);

                        // console.log(selectedFilter);
                    }

                    $('.containerData').append(divData);

                }


                // for (var i = 0; i < selectedFilter.length; i++) {


                //     let divData = '';
                //     let category = selectedFilter[i].category;
                //     let name = selectedFilter[i].name;
                //     let genre = selectedFilter[i]["genre-v2"];
                //     let description = selectedFilter[i].excerpt;
                //     let createdby = selectedFilter[i]["created-by"];
                //     let age = selectedFilter[i].age;
                //     let id = selectedFilter[i]._id;

                //     divData += `<div class="box ${genre}" id="${id}">`;
                //     divData += `<h4 class="boxGenre">${genre}</h4>`;
                //     divData += `<h2 class="boxTitle">${name}</h2>`;
                //     divData += `<h4 class="boxDescription">${description}</h4>`;
                //     divData += `<h4 class="boxCategory">${category}</h4>`;
                //     if (age == undefined) {

                //     } else {
                //         divData += `<h4 class="boxAge">${age}</h4>`;
                //     }

                //     divData += `</div>`;

                //     $('.containerData').append(divData);
                // }
                boxClick();
            });


            //filter doelgroep on click 

            $(".filterDoelgroep .boxFilterGenre").click(function (e) {

                //id van de geklikte button krijgen
                let id = $(this).attr("id");
                console.log(id);

                //activeren van de button en deactiveren
                var target = e.target,
                    status = e.target.classList.contains('active');

                e.target.classList.add(status ? 'inactive' : 'active');
                e.target.classList.remove(status ? 'active' : 'inactive');



                let linkVid = "";
                let videoDesc = "";
                let extendedDesc = "";
                let videoName = "";

                let keytakeaways = "";

                //op elke klik wordt de container leeg 
                $(".containerData").empty();


                //de globale json file zoeken met de values van de geklikte box
                for (var i = 0; i < JSONdata; i++) {


                    if (id == data.items[i]["category"]) {

                        console.log(data.items[i]);

                        let divData = '';
                        let category = data.items[i].category;
                        let name = data.items[i].name;
                        let genre = data.items[i]["genre-v2"];
                        let description = data.items[i].excerpt;
                        let createdby = data.items[i]["created-by"];
                        let age = data.items[i].age;
                        let id = data.items[i]._id;

                        divData += `<div class="box ${genre}" id="${id}">`;
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

                }

                //box click functie wordt uitgeroepen om de div elementen ene click function toe te voegen
                boxClick();

                // for (var i = 0; i < selectedFilter.length; i++) {


                //     let divData = '';
                //     let category = selectedFilter[i].category;
                //     let name = selectedFilter[i].name;
                //     let genre = selectedFilter[i]["genre-v2"];
                //     let description = selectedFilter[i].excerpt;
                //     let createdby = selectedFilter[i]["created-by"]; 
                //     let age = selectedFilter[i].age;
                //     let id = selectedFilter[i]._id;

                //     divData += `<div class="box ${genre}" id="${id}">`;
                //     divData += `<h4 class="boxGenre">${genre}</h4>`;
                //     divData += `<h2 class="boxTitle">${name}</h2>`; 
                //     divData += `<h4 class="boxDescription">${description}</h4>`;
                //     divData += `<h4 class="boxCategory">${category}</h4>`;
                //     if (age == undefined) {

                //     } else {
                //         divData += `<h4 class="boxAge">${age}</h4>`;
                //     }

                //     divData += `</div>`;

                //     $('.containerData').append(divData);
                // }
            });


            //Filters woren gewist en bestaande code wordt uitgeroepen

            $(".filterGenre .boxFilterWissen").click(function () {

                $(".containerData").empty();
                allData(); 
                boxClick();

            });

        });

});