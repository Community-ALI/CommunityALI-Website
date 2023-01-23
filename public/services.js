const selectElement = document.querySelector(".search-bar");
// json data. Yes I had fun making it up
json_data = {
    "information":[
        {
            "title": "Building an Engine",
            "author": "Toyota",
            "startTime": "1:00 PM",
            "endTime": "1:30 PM",
            "date": "01/18/2023",
            "description": "Learning how engines are manufactured and what makes them the most efficient for conserving energy."
        },
        {
            "title": "Give Ben pizza",
            "author": "Benjamin",
            "startTime": "5:00 PM",
            "endTime": "5:30 PM",
            "date": "08/22/2022",
            "description": "Pepperoni is good"
        },
        {
            "title": "Mow Ben's lawn",
            "author": "Ben Schoolland",
            "startTime": "10:00 AM",
            "endTime": "11:00 AM",
            "date": "08/20/2022",
            "description": "Find the lawnmower at his old house, fill it with gas and then use it to make the lawn shorter! It'll be fun I promise"
        },
        {
            "title": "Program a website",
            "author": "Beeyn",
            "startTime": "6:00 AM",
            "endTime": "11:00 PM",
            "date": "08/19/2022",
            "description": "It should search through this json data and display the right information to the user. Ben got tired of coding it himself so this is a service learning opportunity now."
        },
        {
            "title": "Vacuum Ben's living room",
            "author": "Ben",
            "startTime": "4:00 PM",
            "endTime": "4:30 PM",
            "date": "08/23/2022",
            "description": "Another chore that Ben added to this list and called service learning."
        },
        {
            "title": "Be a passenger in Muhammed's car",
            "author": "Muhammed",
            "startTime": "12:00 PM",
            "endTime": "12:15 PM",
            "date": "08/19/2022",
            "description": "Chance of death: 98%.  Enter the car at your own risk."
        },
        {
            "title": "Sing the my little pony theme song",
            "author": "Krill",
            "startTime": "10:30 AM",
            "endTime": "11:30 AM",
            "date": "08/19/2022",
            "description": "Chance of death: 98%. (didn't feel like changing the description from last time)"
        },
        {
            "title": "Actually get work done",
            "author": "My consience",
            "startTime": "7:45 AM",
            "endTime": "8:30 AM",
            "date": "08/19/2022",
            "description": "Stop writing fake services that aren't even funny and start programming the actual logic for this program."
        },
        {
            "title": "Use your anger",
            "author": "Darth sidius",
            "startTime": "7:45 AM",
            "endTime": "8:30 AM",
            "date": "08/30/2022",
            "description": "Strike me down, and your journey twards the dark side will be complete!"
        }

    ]
}

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
        time.textContent = service.startTime + " - " + service.endTime;
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