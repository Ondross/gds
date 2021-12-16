let container = document.getElementById("calendar")
for (i = 0; i <= 4; i++) {
    let row = document.createElement("div")
    row.classList.add("row") 
    container.appendChild(row)

    for (i = 0; i <= 7; i++) {
        let day = document.createElement("div")
     day.classList.add("day") 
     row.appendChild(day)
    }

}