function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formUrl = document.getElementById('name').value
    if (Client.checkForName(formUrl)) {
        console.log("::: Form Submitted :::")
        console.log(formUrl)
        let data = { url: formUrl };
        fetch("/test", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(function(res) {
                console.log("::: response :::", res)
                document.getElementById('results').innerHTML =
                    `<h2>Results for : ${formUrl}</h2>
                    <ul style="list-style-type:square;">
                    <li>Polarity:    <var>${res.polarity}</var> </li>
                    <li>Subjectivity:    <var>${res.subjectivity}</var> </li>
                    <li>Polarity confidence:    <var>${res.polarity_confidence}</var> </lir>
                    <li>Subjectivity confidence:    <var>${res.subjectivity_confidence}</var></li>
                    </ul>`;
            }).catch(err => {
                document.getElementById("results").innerHTML = `Server Error : ${err} `;
            })
    }


}

export { handleSubmit }