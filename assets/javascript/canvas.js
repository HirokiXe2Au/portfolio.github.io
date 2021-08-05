function setNumbers(num, max){
    const numbers = new Array();
    for(let i = 0; i < num; i++){
        const val = Math.floor(Math.random() * max);
        numbers.push(val);
    }
    return numbers;
}

function swap(ary, i, j){
    const tmp = ary[i];
    ary[i] = ary[j];
    ary[j] = tmp;
}

function bubbleSort(ary, ord = "ASC", move = 10){
    const history = new Array();
    const x = new Array(ary.length).fill(0);
    history.push(x.slice());
    for(let i = 0; i < ary.length - 1; i++){
        for(let j = 1; j < ary.length - i; j++){
            const x = new Array(ary.length).fill(0);
            if((ord == "ASC" && ary[j-1] > ary[j]) || (ord == "DESC" && ary[j-1] < ary[j])){
                swap(ary, j-1, j);
                x[j-1] = 1;
                x[j] = -1;
            }
            history.push(x.slice());
        }
    }
    return history;
}

function draw(vals) {
    const cs = document.getElementById('js-canvas_main');
    const ctx = cs.getContext('2d');
    const width = cs.width;
    const height = cs.height;

    // background color
    // ctx.fillStyle = "#999999";
    // ctx.fillRect(0, 0, width, height);
    // font config
    ctx.font = "32px serif";
    fw = ctx.measureText(10).width;

    // ソート前の数値を描画
    for(let i = 0; i < vals.length; i++){
        val = i * 32;
        ctx.fillText(vals[i], 10, 30 + val);
    }

    // ソート処理
    const history = bubbleSort(vals);

    // ソート後の数値を描画
    for(let i = 0; i < vals.length; i++){
        val = i * 32;
        ctx.fillText(vals[i], width - fw - 20, 30 + val);
    }

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    for(let i = 0; i < history.length; i++){
        for(let j = 0; j < history[i].length; j++){
            ctx.beginPath();
            ctx.moveTo((i + 1) * fw, j * 32 + 17);
            ctx.lineTo((i + 1.5) * fw, (j + history[i][j]) * 32 + 17);
            ctx.moveTo((i + 1.5) * fw, (j + history[i][j]) * 32 + 17);
            ctx.lineTo((i + 2) * fw, (j + history[i][j]) * 32 + 17);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function resetCanvas() {
    const cs = document.getElementById('js-canvas_main');
    const ctx = cs.getContext('2d');
    const width = cs.width;
    const height = cs.height;
    ctx.clearRect(0, 0, width, height);
    const vals = setNumbers(8, 5);
    draw(vals);
}

const vals = setNumbers(8, 5);
draw(vals);