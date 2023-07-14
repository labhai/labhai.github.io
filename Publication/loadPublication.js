function fetchScholar() {
    fetch('./Publication/result.json')
        .then((response) => response.json())
        .then((json) => {
            console.log(json['data'])
            json['data'].forEach((data) => {
                    console.log(data)
                }
            )
        });
}

function ScholarFormat() {
    let result = `<div>

</div>`
    return 1
}