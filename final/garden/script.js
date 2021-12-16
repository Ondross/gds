let soilQuality = 5;
let water = 5;
let pollinatorCount = 5

let beds = {}
let harvestScore = 0;
let plants = Object.keys(plantDict)


function getPollinatorCount(){
    plantList = Object.keys(beds)
    let score = 0;
    for (let i = 0; i < plantList.length; i++){
        score += beds[plantList[i]].pollinatorScore
    }
    pollinatorCount =  score
    document.getElementById('pollinator-score').innerHTML = 'Pollinator Score: ' + score


}


function displayWater (level){
    document.getElementById('water-level').innerHTML = "Water levels: " + water 
    if (level >= 5 && level <= 10){
        let red = (10 -level)/5*255
        console.log(red)
        document.getElementById('water-state').style.background = 'rgb(' + red + ', 255, 0)'

    }else if (level < 5){
        let green = level/5*255
        console.log(green)
        document.getElementById('water-state').style.background = 'rgb( 255,' + green + ',0)'
    }
}

//working
function plantaPlant(type, space){
    beds[space] = new Plant(type, space)
    beds[space].display()
    console.log('planta plant')
}



let tendButton = document.getElementById('tend-button')
let plantButton = document.getElementById('plant-button')
let harvestButton = document.getElementById('harvest-button')

let popoutDiv = document.getElementById('popout')
let popOutOpenPlant = 0;
let popOutOpenTend = 0;
let popOutOpenHarvest = 0
let selectedType = 0;
let selectedName = 0;

plantButton.onclick = function(){
    console.log(popOutOpenPlant, 'plant')
    if (popOutOpenPlant === 0){
        popOutOpenPlant = 1
        popOutOpenTend = 0
        let div = document.createElement('div')
        div.classList.add('popout-div')
        popoutDiv.appendChild(div)
        for (let i = 0; i < plants.length; i++){
            let url = 'url(' + plantDict[plants[i]]['urls'][5] + ')'
            console.log(url)
            let childDiv = document.createElement('div');
            childDiv.classList.add('popout-option')
            childDiv.id = plants[i]
            let textDiv = document.createElement('div')
            textDiv.innerHTML = 'Difficulty: ' + plantDict[plants[i]]['difficulty']
            div.appendChild(textDiv)
            div.appendChild(childDiv)
            childDiv.style.backgroundImage = url
            childDiv.onclick = function(){
                selectedType = 'plant'
                selectedName = plants[i];
                console.log("HIIII")
            }
        }
    }else if (popOutOpenPlant === 1){
        popOutOpenPlant = 0;
        let div = document.getElementsByClassName('popout-div')[0]
        div.remove()
    }
}


tendButton.onclick = function(){
    console.log(popOutOpenTend, 'tned')
    if (popOutOpenTend === 0){
        popOutOpenTend = 1
        popOutOpenPlant = 0
        let div = document.createElement('div')
        div.classList.add('popout-div')
        popoutDiv.appendChild(div)
        let childDiv1 = document.createElement('img');
        childDiv1.classList.add('popout-option')
        childDiv1.id = 'water'
        childDiv1.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvxRV9TW2VlvGauOF0_pQ4qgTMiI_geuamA&usqp=CAU')

        div.appendChild(childDiv1)
        childDiv1.onclick = function(){
            selectedType = 'water' 
        }

        let childDiv2 = document.createElement('img');
        childDiv2.classList.add('popout-option')
        childDiv2.id = 'compost'
        childDiv2.setAttribute('src', 'https://media.istockphoto.com/vectors/pile-of-ground-with-hayfork-vector-id924159336?k=20&m=924159336&s=612x612&w=0&h=6gaIDjeYu-k_pkvRulCnMTTG348as0q4Al-_iw59vT4=')

        div.appendChild(childDiv2)
        childDiv2.onclick = function(){
            selectedType = 'compost'
            
        }
    }else if (popOutOpenTend === 1){
        popOutOpenTend = 0;
        let div = document.getElementsByClassName('popout-div')[0]
        div.remove()
    }
}


harvestButton.onclick = function(){
    if (popOutOpenHarvest === 0){
        popOutOpenHarvest = 1
        popOutOpenTend = 0
        popOutOpenPlant = 0
        let div = document.createElement('div')
        div.classList.add('popout-div')
        popoutDiv.appendChild(div)
        let childDiv1 = document.createElement('img');
        childDiv1.classList.add('popout-option')
        childDiv1.id = 'harvest'
        childDiv1.setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhQUFBIPERMSEhISEhMTGBISERIVGBQZGhoUGBUbITskGx0qLBkVJTclKi4xNTQ0GiM6PzoyPi0zNDEBCwsLEA8QHRISHzMqJCozMzExMzQzMzM1MzMzNTE0NzMzMzMzMzM1MzMzMzMzMTMzMzMzMzMzMzMzMzMzMzMzM//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwQFAgYBB//EADYQAAIBAgQEAwcDBAMBAQAAAAABAgMRBBIhMUFRcYEFImETMpGhscHRBkJSI2Lh8IKSwrIU/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBQQBBv/EAC8RAAIBAgQEBQMFAQEAAAAAAAABAgMRBBIhMQVBUfATYYGRwXHR4SIyobHCYiP/2gAMAwEAAhEDEQA/AP2YAAAAAAAAAAAAAAAAAAAAAA+MA+g49pH+S+KPntY/yj8UASA49pH+S+KGdc0AdgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHMpJK7AOitVxMVtq/l8SvWruWi0j9epASSKpVOhPPESfG3TQzsRjXGtTpvacW7u973aS+nxLZiePpxnSmt1nj38sl9GVYibhDMuVv7K5M2yh4Pip1aeedrt6WVlay/LK9PGzlWqeb+mqWdRstnTjx65vgZ8pOOEopNpyqO9tL2jL/BVUxFnmV7JS9bWXyRNbxbGSpKOW15N3bV9Fb8lvC1faU4TtbNFSt1Mbx9NunTW7Siv+bUfszdhBRSitopJdiVOUnWnrorL17uEdwk1s2i3h8TfSW/B8ymDpauTTa2NcEGGq5o67rR/knIF6dwAAegAAAAAAAAAAAAAAAAAAAAAp42e0e7LhmYiV5vrb4HqIVHZEYAJlIMv9QRvSUv4Ti+zvF/8A0ahX8QpZ6VSPODt1Wq+hXWjmhJeTDPN4erljU5ulOK77L5s7qu8MPDl7ST7zyr/0VYSuk+aPsZNNPirW9LNtfVmHGp+nK9vyn8EDYX9XG33jTTf/AFWVfOTfY2TI/T1LyzqP98sq6Q/y5fA2DYw18mZ7ybfuSQAB0HpLh55ZLk9GaRjmrSleKfNEZFlN8jsAES0AAAAAAAAAAAAAAAAAAAAAGS3dt82adR2i36P6GWSiVVOQABIrBleKeLeyeWKUpW8zfuxvwtxZqHj8fmdWbalrOW6e13Y4OIV5UqayaNvc0uGYaFao8+qS26nNClOpLLCLk9XZLb19ES4jDSpJN+y1drRnCUl1SehHg8T7Kop+Z2vpGTg3ptfl6HePxqrO6pU6T1u4Kzl15mInHw27vN35fJtSwdLOl4ccv0V/ubHgmOg4xpWyyjHTW6lxb67s1zxeEnlqQlynF/PU9obXD68qsGpctPTkYnEsLChUWTZ8ulgADQM4F7BvydG/yUS7gXo+v2IsnDctAAiXAAAAAAAAAAAAAAAAAAAAAEOJlaD+BnFzHS0S9blMkime4ABIgDCfj8oXhkzWck25Tbetr67G4eP8QhlrVF/fL5u/3M7iNWpTjGUHbXy+foavCqVOrKcZq+ifPvmV2xFNuyTb5LVnUabduCclFSekbvZXNfC0Z0YzcKqhKSV21FwVud+5i0qLm9dF17sfQVaygtN+ndzHcZReqlFrWzTT+DPbnj8VVTveU6k203Um7N6e6o8tj2CNThaSlUSd9v8ARi8Zu1Tb/wCv89dffU+gA1zEBcwK0fX7FIv4NeTq2eMlDcsgAgXgAAAAAAAAAAAAAAAAAAApYqv+1d39geOViGtPNJvhsuhGATOcAEdWqo9eCPJSUVdkoxcnZLU7lJLV6GNicJCdSU3dp28r0Witd/AmxFab2jmbeiuoxj6v/WVqlOKV6ss3KOqhfkoLWT63M3EVVV0toa+EoOj+q+rViW0Jx0yTSei0cbroVcRTzxl7SUqerUHpl02korfuXktFbRW5bduBTlWjTcnNxlK7y21ko8E77cTmm1bX+Tshe+n8GVKnBSjGOd3aV5vzSb45eCPas8tQre0rQtCMc04Zmks8knezl2PUHVw1K05Lqv4v9zi4xJt01Lezfu/wfQAaZjg06UbRS9DPoQzSS7voahGRZTXMAAiWgAAAAAAAAAAAAAAAHy5QxFfNovd+oPJSsd18RfSPd/gqnw+kyhu4APknZX5A8I69XKvV7fkpN31YnK7u+J8MutVc35cjcw9BUo+fMFZqNN5nmnUldLbM/SK2iv8AWyycxppScuLsrvglwXJcSovZHHzp3dmnaUYvZ72ct9miOvgoSjlT9nqnmjaMul2fMZjFT0SvJ8Nl1bMitWlN3k7+nBdEc9StGL01Z0U6M5K+yNfA4aMcQlG0lCEpZsym5N3WrXHU3TE/TdP359IL6v7G4a2BX/lm6tv4+DD4nK9dxvfKkvn5B8PpJQp5nbhxOs4LXLODp2Wbnt0LR8sfSB0JWVgAAegAAAAAAAAAAAAAir1Msb8dl1AbsV8XWv5V3/BUPoJnO3d3AAPTwEGLnZW9foTlLFO8uisUYmVqb89DpwkM1VeWvfqQgAyzbBFiJ5Yyevuu1tHsSlPG1FaceKhfs7r7MPZnqV2iSr4nCVJxjUlB5XdVlKo3p7sZ3aXwMEH2EHJqK3k0l1bsZ1WtKra+672+xoUqMaV7c9e39z1XgtHJRhzleb7vT5WLxzTgopRW0UkuiVj6fU04ZIKC5JI+Nq1PEnKfVtnSi27LdmjQpqKtx4vmRYSlZZnu9vRFoNkoR5gAHhYAAAAAAAAAAAAAAAChi53lbl9S9cyXK7b5u57ErqPQAAmVAAAAzZO7b5u5bxkvJKKnklKLUWrZk3xS4mdh4zUbTkpSvuuXwOHFy1SNLh8dJS9PklABxGkEMdhoxozlZOWTd7pNq6XyOoRu0vUn8Ti3Rmlu42S7o6KULwnJ9Hb2OOvVtUpxT5q/ujz/AIM6ed+09nbLo6jtGL55dpP0ZPhKEZYpZZwqJNzzRjkjpwy8NbGbXw86btOEoP8AuVr9HxNj9N0vfn/xX1f/AJM/CpznCk47O769e7mljXkpTqqW6sumumn4NwkowzSS7voRlvAx3fRf78j6JnysVd2LoAIHSAAAAAAAAAAAAAAAAAARYh2hLpb46GaX8Y/L3RnkkU1HqfQASIArY/FKlBy3e0Fzb2RYPLeL4p1Ztxf9ODyx9W95d7fQ5cXiPBp35vRd+X92L8NR8Wdnst+/P+rlGtKTk3O7k3dt7lrD+Izho/PH195dGQKs9pLMlwluuj3R99lGXuuz/jLR9nsz5yMnF3N2xt4fEwqe69eKekl2JITTvZp5XZ+j5M821KL4xa7M0/DMVGVSCqK7ulCotHfgpW3R2Uqqk1GWl+fIhKWWLdrm9haVld7v6HeKp5oTjxcJJdWtCQG7GmoxymDOrKU8/M8u/E26LoygrKKUXFtSzLZyve/rsbfg1LJRhzleb7vT5WOMT4PTnPN5k27tRtZvnqtDQhFJJLRJJJckjiwuGqQqOVR3srL6d99dDG4ulVpqNJWu8z+tgX8GvL1bKJo4eNox6X+J3szqa1JgARLwAAAAAAAAAAAAAAAAACvjPc7ooGjiVeD/AN4mcSRTPcABuxIgZnjmL9nTyp+ed10XF/Y85SrOCdktbavhbiTeI13UnKf7c2SPoktPz3KrPm8XW8ao3yWi78zcw1LwoJc92Hd669TqnDM0lxJVKGRJt6OTcVu29FqRUp5ZJ72Zy3ZedxrO1n548pfZ8CbB0Y1KkVBtPPG8XvZO7aZXqVHLTRJbRWyNv9O4WydRre6h04v7dmX4ai6lRL1f0RViKqp02+7s2z6AfTmCgAABGN2lzdjWsUcHC7vy+pfINltNaAAHhYAAAAAAAAAAAAAAAAAAczjdNc1Yy2racjWKGMp2d+D+p6mV1FzK5neOYnJSaXvT8i6fuf27miZfjmDlUhFwV5Qb8vFp2vb10RXic3hSyb2FDL4kc2x56nWyq1ovW6vrZ2tsRSk27t3bCWtvWzJ8TTUW9k3LyxXLm+R8xomb+pFCF1J3tlt3bexw0S0qrjeyTvbdX22ZxOTbu3dvie63PCxOkpSVmrzcFCMebsteR66jTUIxitopJdjy3gsL14emaXwT/wAHrDY4XTtGUvO3sZnEJtyUfUAA1TPB9SufC5haP7n2/J43Y9Su7E9GGWKXx6kgBA6AAAAAAAAAAAAAAAAAAAAAAcTimrPidgAy6tJxdn2fMjNWUU1Zq5VqYT+L7P8AJJMplT6GZicDTqe/BN/yWkvijIxfgMld05Zv7ZaS/wC2z+R6KdOS3T+xwU1cNSq/uWvVaMlTr1Kez9DxFWnKDyyi4vk9DumouLTai8yd+NrbI9hiMPCayzipL13XR8DIn+n1m8tVqPJq7Xe5lVuHVIv9Gvsn9vY0aWOg/wB+j9yLwGClVlJK0YQtrq229L/M9CQYTDQpQyxWm7b3k+bJjUwtF0qSi9+Zn4ir4lRyW3I+glhQlLhZc3oW6OHUdd3z5dDobK1Fshw+G4y7L8l0AgXRjYAAHoAAAAAAAAAAAAAAAAAAAAAAAAAAAOHBPdJnYAIvYQ/ijn/80OXzZOD255lRCsPD+K+Z3GCWyS7HYPBZAAA9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==')
        
        div.appendChild(childDiv1)
        childDiv1.onclick = function(){
            selectedType = 'harvest'
        }

        let childDiv2 = document.createElement('img');
        childDiv2.classList.add('popout-option')
        childDiv2.id = 'remove'
        childDiv2.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJDxmsTJszX65PC2FGs2yC3mTWR5xKNYtg5A&usqp=CAU')

        div.appendChild(childDiv2)
        childDiv2.onclick = function(){
            selectedType = 'remove'
            
        }
    }else if (popOutOpenHarvest === 1){
        popOutOpenHarvest = 0;
        let div = document.getElementsByClassName('popout-div')[0]
        div.remove()
    }
            
}



let bedNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']

for (let i=0; i < bedNumbers.length; i++){
    let bed = document.getElementById(bedNumbers[i])
    console.log(bed)
    bed.onclick = function(){
        if (selectedType === 'plant'){
            plantaPlant(selectedName, bedNumbers[i])
        }else if (selectedType === 'harvest' && beds[bedNumbers[i]].growthStage === 3){
            
            beds[bedNumbers[i]].harvest(pollinatorCount)
            console.log(beds[bedNumbers[i]].growthStage)
            harvestScore += beds[bedNumbers[i]].difficulty
            document.getElementById('harvest-score').innerHTML = "Harvest Score: " + harvestScore
            //document.getElementById(bedNumbers[i]).style.backgroundImage = none
        }else if(selectedType === 'compost'){
            beds[bedNumbers[i]].soil += beds[bedNumbers[i]].soilNeed + 3
        } else if(selectedType === 'water'){
            beds[bedNumbers[i]].water += beds[bedNumbers[i]].water + 3
        } else if (selectedType === 'remove'){
            document.getElementById(bedNumbers[i]).style.backgroundImage = 'none'
            beds[bedNumbers[i]].die()
            delete beds[bedNumbers[i]]
            
            errors = document.getElementsByClassName('error')
            for (i=0; i< errors.length; i++){
                errors[i].style.display = 'none'
            }
        }
    }
    let number = bedNumbers[i]
    errorDivWater = document.createElement('div');
    errorDivWater.classList.add('error')
    let id = number + '-water-error'
    errorDivWater.setAttribute('id', id) 
    errorDivWater.style.display = 'none'
    let plotDiv = document.getElementById(number)
    plotDiv.appendChild(errorDivWater)
    


    errorDivSoil = document.createElement('div');
    errorDivSoil.classList.add('error')
    id = number + '-soil-error'
    errorDivSoil.setAttribute('id', id) 
    errorDivSoil.style.display = 'none'
    plotDiv = document.getElementById(number)
    plotDiv.appendChild(errorDivSoil)
    
    
    errorDivHarvest = document.createElement('div');
    errorDivHarvest.classList.add('harvest-error')
    id = number + '-harvest-error'
    errorDivHarvest.setAttribute('id', id) 
    errorDivHarvest.style.display = 'none'
    plotDiv = document.getElementById(number)
    plotDiv.appendChild(errorDivHarvest)

}



//function loseWater(){
    //water -= 1;
    //document.getElementById('water-level').innerHTML = "Water levels: " + water 
    //displayWater(water)
//}

//var waterInterval = setInterval(loseWater, 3000)
let errorDiv;


function displayError(type, number){
    if (type ==="water"){
        let id = number + '-water-error'
        document.getElementById(id).style.display = 'initial'
        console.log("WATER")
        document.getElementById(id).innerHTML = "Water!"
    } else if (type ==="soil"){
        let id = number + '-soil-error'
        document.getElementById(id).style.display = 'initial'
        document.getElementById(id).innerHTML = "Depleated soil!"

    } else if (type ==='harvest'){
        let id = number + '-harvest-error'
        document.getElementById(id).style.display = 'initial'
        document.getElementById(id).innerHTML = "Harevst me!"
    }
    
}


function checkStatus(){
    getPollinatorCount()
    let allPlants = Object.keys(beds)
    for (let i = 0; i < allPlants.length; i++){
        let plant = beds[allPlants[i]]
        let harvestable = plant.harvestable
        let soil = plant.fed
        let water = plant.hydrated
        plant.isThriving()
        if (soil === 1 && plant.fed === 0){
            displayError('soil', allPlants[i])
            
        }else if (soil === 0 && plant.fed === 1){
            document.getElementById(allPlants[i] + '-soil-error').style.display = 'none'
            console.log('remove')
            errorShowingSoil = 0
        }
        
        if(water === 1 && plant.hydrated === 0){
            displayError('water', allPlants[i])

        }else if (water === 0 && plant.hydrated === 1){
            document.getElementById(allPlants[i] + '-water-error').style.display = 'none'
            console.log('remove')
            errorShowingWater = 0
        }
        if(harvestable === 0 && plant.harvestable ===1){
            console.log(harvestable)
            displayError('harvest', allPlants(i)) 
        }else if (harvestable === 0 && plant.harvestable === 1){
            document.getElementById(allPlants[i] + '-harvest-error').style.display = 'none'
            console.log('remove')
            errorShowingHarvest = 0
        }

        if (plant.soil === 0){
            plant.dyingCount += 1
            console.log(plant.dyingCount, 'dying')
        } 
        if (plant.water === 0){
            plant.dyingCount += 1
            console.log(plant.dyingCount, 'dying')
        }
        if (plant.dyingCount >= 20){
            plant.growthStage = 4;
            plant.display()
        }

    }
}

let checkForError = setInterval(checkStatus, 100)
