const inputField = document.getElementById("input-field");

inputField.addEventListener("keyup", function () {
        getGithubUser();
});

async function getGithubUser(){
    const query = document.getElementById("input-field").value;

    if(!query){
        alert("Please enter a name!");
        return;
    }

    const endpoint = new URL(`https://api.github.com/search/users?q=${query}`);


    endpoint.searchParams.set("token", "YOUR_TOKEN_HERE");

    const response = await fetch(endpoint).then((data) => {
      return data.json();  
    }).then((completedata) => {
        let data1 = "";
        completedata.map((values) => {
            data1 += `
            <div class="usr">
                <img src="" alt="img">${values.avatar_url}
                <p class="login">${ values.login }</p>
                <button id="user-detail">User Detail</button>
            </div>
            `
        });
        document.getElementById("user").innerHTML = data1;
      
    }).catch((err) => console.log(err));



    

    // const response = await fetch(endpoint, {
    //     headers: {
    //         "Authorization":  "YOUR_TOKEN_HERE"
    //     }
    // });

    if(response.status === 404) {
        alert("Username not found!");
        return;
    }

    const data = await response.json();
    // alert(`Total count: ${data.total_count}\nIncomplete results: ${data.incomplete_results}\nItems: ${data.items || "N/A"}`);

    console.log(data);
    

}
