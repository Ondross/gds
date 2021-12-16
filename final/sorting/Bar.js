//Sorts give intructions, animator carries them out

class Bar{
    //Defining Bar
    constructor(w){
        //W is the weight, 
        this.W = w
        this.H = w*20
        //H is height for display, based on W [not technically required, but still nice]
    }
}

class Pair{
    //Defining pair, which are used in intructions
    constructor(swap1, swap2){
        this.s1 = swap1
        this.s2 = swap2
        //s1 and s2 are LOCATIONS of bars to be swapped in specific step given by intructions
    }
}

function Swap(num1, num2, arr){
    //Defining Swap function
    let placeHold = arr[num1]
    arr[num1] = arr[num2]
    arr[num2] = placeHold
    //swaps arr[num1] and arr[num2] in arr, where num1 and num2 are indecies
    console.log(num1, 'swap', num2)
}

function randomPick(n) {
    //random picker thingy from 0 -> n, pretty self explanatory
    let rando = Math.floor(Math.random() * n)
    console.log(rando, n)
    return(rando)
}


function insertionSort(inputArr, instruct) {
    //Insertion Sort time
    let compare = 0
    console.log('Insertion')
    let tempArr = []
    for(let k = 0; k<inputArr.length; k++){
        tempArr.push(inputArr[k])
    }
    //Create temporary array to not mess with original array
    console.log('hi', tempArr.map(obj => obj.W))
    const n = tempArr.length
    for (let i = 1; i < n; i++) {
        let current = tempArr[i].W
        let j = i-1
        console.log(j+1, j, 'check', tempArr[i].W, tempArr[j].W)
        while((j > -1) && (current < tempArr[j].W)){
            console.log(j+1, j, 'swapping', current, tempArr[j].W)
            let p = new Pair(j, j+1)
            instruct.push(p)
            Swap(j+1, j, tempArr)
            j--
            compare = compare+1
        }
        compare = compare+1
        console.log('done', tempArr.map(obj => obj.W))
    }
    console.log('bye', tempArr.map(obj => obj.W))
    return(compare)
}


function bubbleSort(inputArr, instruct){
    //Bubble Sort Time
    let compare = 0
    console.log('Bubble')
    let tempArr = []
    for(let k = 0; k<inputArr.length; k++){
        tempArr.push(inputArr[k])
    }
    //Create temporary array to not mess with original array
    console.log('tempArr ', tempArr.map(obj => obj.W))
    const n = tempArr.length
    for(let i = 0; i < n; i++){
       for(let j = 0; j < n - 1 - i; j++){
            if(tempArr[j].W > tempArr[j+1].W){
                let p = new Pair(j, j+1)
                instruct.push(p)
                Swap(j, j + 1, tempArr)
                console.log('compare'+ compare)
            }
            compare = compare+1
        }
    }
    console.log(inputArr, 'inputArr ', tempArr, 'tempArr ', instruct, 'instruct')
    return compare
}

function selectionSort(inputArr, instruct) {
    //Selection Sort Time
    let compare = 0 
    console.log('Selection')
    let tempArr = []
    for(let k = 0; k<inputArr.length; k++){
        tempArr.push(inputArr[k])
    }
    let n = tempArr.length;    
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i
        for(let j = i+1; j < n; j++){
            if(tempArr[j].W < tempArr[min].W) {
                min=j; 
            }
            compare = compare + 1
         }
         if (min != i) {
            let p = new Pair(i, min)
            instruct.push(p)
            Swap(i, min, tempArr)
            console.log('swap')
            // Swap
        }
    }
    console.log('compare ' + compare)
    return(compare)
}





/*

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


OG Bubble Sort


function bubbleSort(inputArr) {
    const n = inputArr.length
    for(let i = 0; i < n; i++){
       for(let j = 0; j < n - 1 - i; j++){
            if(inputArr[j].W > inputArr[j+1].W){
                Swap(j, j + 1, inputArr)
            }
        }
    }
}



//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


OG Insertion Sort


function insertionSort(inputArr) {
    const n = inputArr.length
    for (let i = 1; i < n; i++) {
        let current = inputArr[i].W
        let j = i-1
        console.log(j+1, j, 'check', inputArr[i].W, inputArr[j].W)
        while((j > -1) && (current < inputArr[j].W)){
            Swap(j+1, j, inputArr)
            j--
        }
    }
    return(inputArr)
}



//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\


OG Selection Sort


function selectionSort(inputArr) { 
    let n = inputArr.length; 
    for(let i = 0; i < n; i++) {
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;      
        }
    }
    return inputArr;
}



//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

*/