let solveBtn = document.getElementById('solveBtn');
const list = [];
let arr = [];
let index = 0;

function isValid(arr, i, j, num) {
    // Checking for row and column
    for (let x = 0; x < 9; x++) {
        if (arr[i][x] === num || arr[x][j] === num) {
            return false;
        }
    }

    // Checking for subgrid
    const rn = Math.sqrt(9); // Size of the subgrid
    const si = i - (i % rn);
    const sj = j - (j % rn);

    for (let x = si; x < si + rn; x++) {
        for (let y = sj; y < sj + rn; y++) {
            if (arr[x][y] === num) {
                return false;
            }
        }
    }
    return true;
}

function sudokuSolver(arr, i, j) {
    // Base case    
    if (i === 9) {
        // print(arr);
        return true;
    }
    // If we are in the box
    if (j === 9) {
        return sudokuSolver(arr, i + 1, 0);
    }
    // If cell is already filled
    if (arr[i][j] > 0) {
        return sudokuSolver(arr, i, j + 1);
    }

    // We try to fill the cell
    for (let num = 1; num <= 9; num++) {
        if (isValid(arr, i, j, num)) {
            arr[i][j] = num;
            if (sudokuSolver(arr, i, j + 1)) {
                return true;
            }
            // Backtracking
            arr[i][j] = 0;
        }
    }
    return false;
}

solveBtn.addEventListener('click', function () {
    const cells = document.querySelectorAll('#cell');
    for (let i = 0; i < 9; i++) {
        let temp = [];
        for(let j = 0; j<9; j++) {
            let d = cells[index].value;

            temp.push(isNaN(parseInt(d)) ? 0 : d);
            index++;
        }
        list.push(temp);
    };
    for(let i = 0; i<9; i++) {
        let p = [];
        for(let j = 0; j<9; j++) {
            p.push(parseInt(list[i][j]));
        }
        arr.push(p);
    }
    
    sudokuSolver(arr, 0, 0);
    console.log(arr);
    const box = document.getElementById('box');
    const boxCont = document.getElementById('boxCont');
    for(let i = 0; i<9; i++) {
        for(let j = 0; j<9; j++){
            const tile = document.createElement("div");
            tile.classList.add("tile");
            box.appendChild(tile);
            tile.innerText = `${arr[i][j]}`;
        }
    }
    box.style.zIndex = "99999";
    box.style.transform = "translateY(0)";
    box.style.visibility = "visible";
    box.style.backdropFilter = "blur(10px)";
    box.style.transition = "0.5s ease-in-out";
    boxCont.style.display = "flex";
    
});




