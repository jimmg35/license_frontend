
export const newApplication = async () => {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    let bodyContent = "token=..&firstName=Jia Jun&lastName=Chang&email=40723212L@ntnu.edu.tw&username=jimmg35";

    fetch("http://localhost:8095/api/License/new", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    }).then(function (response) {
        return response.text();
    }).then(function (data) {
        console.log(data);
    })
}
