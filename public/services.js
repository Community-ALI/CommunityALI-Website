const selectElement = document.querySelector(".search-bar");
// json data. 
json_data = {
    "information":[
        {
            "title": "MJC Computer Science Club",
            "author": "Host: Paola Alvarez",
            "startTime": "Time: 11-12pm",
            "date": "Date: Friday February 24",
            "description": "Description: The purpose of the Computer Science Club is to provide a community for students interested in computer science to connect, collaborate and learn from one another. With potential to gain hands-on experience with teachers, guest speakers, network with peers and go on a field trip."
        },
        {
            "title": "Community Catalyst Team",
            "author": "Host: Adrean Cajigas",
            "startTime": "Time: 9am-12pm",
            "date": "Date: Every Friday",
            "description": "Description : We are united under the concept of contextualized learning experiences to promote engagement for students at MJC. Together, we hope to serve as the stimulus to move the conversation around Service-Learning forward at MJC and in our community."
        }
    ]
}

const resultContainers = document.querySelectorAll('.result-container');
resultContainers.forEach(function(resultContainer) {
    if (resultContainer.id === 'CS'){
    resultContainer.addEventListener('click', function() {
        window.location.href = '/service-ComputerScience.html';
    });
    }
    else if (resultContainer.id === 'MANRRS'){
        resultContainer.addEventListener('click', function() {
            window.location.href = '/service-MANRRS.html';
        });
        }
    else{
        resultContainer.addEventListener('click', function() {
            window.location.href = '/apply-for-service-OUR-TEAM.html';
    });
    }
});


//wait for someone to edit the text in the search bar
selectElement.addEventListener('change', (event) => {
    // get the string to search for
    user_input = document.querySelector(".input-for-search").value;
    // clear the previous results
    const results = document.querySelector('.results');
    results.innerHTML = ''
    // search for the given string in title, author, and description of all possible services
    list = search(user_input,"title",[])
    list = search(user_input,"author",list)
    list = search(user_input,"description",list)
    // show search results
    for (service of list){
        //create the div, headers, and paragraphs needed for the service 
        const result = document.createElement("div");
        const title = document.createElement("h1");
        const author = document.createElement("h5");
        const time = document.createElement("p");
        const date = document.createElement("p");
        const description = document.createElement("p");
        // add the correct text to each one
        title.textContent = service.title;
        author.textContent = service.author;
        time.textContent = service.startTime;
        date.textContent = service.date;
        description.textContent = service.description;
        // give each one a class I hope this is helpful for css and/ or JS later
        result.classList.add('result-container');
        title.classList.add('result-title');
        author.classList.add('result-author');
        time.classList.add('result-time');
        date.classList.add('result-date');
        description.classList.add('result-description');
        // arrange the text in the result-container
        result.appendChild(title)
        result.appendChild(author)
        result.appendChild(time)
        result.appendChild(date)
        result.appendChild(description)
        // connect it to the apply page
        if (service.title === 'Community Catalyst Team'){
            result.addEventListener('click', function() {
                window.location.href = '/apply-for-service-OUR-TEAM.html';
            });
        }
        else{
            result.addEventListener('click', function() {
                window.location.href = '/apply-for-service.html';
            });
        }
        
        //display this search result!
        results.appendChild(result)
    }
    
});


function search(keyword,attribute,list) {
     // list of matches
    for (service of json_data.information){
        //find out if text is in the given attribute
        text = service[attribute].toLowerCase();
        if (text.includes(keyword.toLowerCase())){
            // don't create miltiple copies of the same result if the keyword appears twice
            if (list.includes(service)){

            }
            else{
                list.push(service)
            }
            
        }
    }
    return list; 
  }