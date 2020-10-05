const magBtn = document.querySelectorAll(".mag-btn");
const dotBtn = document.querySelector(".dot-btn");
const crossBtn = document.querySelector(".cross-btn");
const opBtn = document.querySelector(".op-btn");
const plBtn = document.querySelector(".pl-btn");
const ppBtn = document.querySelector(".pp-btn");
const plPlaneBtn = document.querySelector(".pl-plane-btn");

opBtn.addEventListener('click', countOP);
crossBtn.addEventListener('click', countCrossProduct);
dotBtn.addEventListener('click', countDotProduct);
plBtn.addEventListener('click', countPlDistance);
ppBtn.addEventListener('click', countPpDistance);
plPlaneBtn.addEventListener('click', countPlPlDistance);

for (let i = 0; i < magBtn.length; i++){
    magBtn[i].addEventListener('click', countMagnitude);
}

function fpb(a,b){
    if ( ! b) {
        return a;
    } else if (b>a) {
        return fpb(b, a);
    }

    return fpb(b, a % b);
}

function countPlDistance(e){
    const x = parseFloat(document.querySelector("#pl-x").value);
    const y = parseFloat(document.querySelector("#pl-y").value);
    
    const a = parseFloat(document.querySelector("#line-x").value);
    const b = parseFloat(document.querySelector("#line-y").value);
    const c = parseFloat(document.querySelector("#line-k").value);

    let ansUp = Math.abs(a*x + b*y + c);
    let ansDown = Math.pow(a,2) + Math.pow(b,2);

    if(!isNaN(ansUp) && !isNaN(ansDown)){
        
        if (ansUp === 0) e.target.parentElement.lastElementChild.innerHTML = `Distance: 0`;
        else if(Math.sqrt(ansDown) == Math.floor(Math.sqrt(ansDown))) {
            e.target.parentElement.lastElementChild.innerHTML = `Distance: ${ansUp}/${Math.sqrt(ansDown)}`
        }
        else e.target.parentElement.lastElementChild.innerHTML = `Distance: ${ansUp}/&#8730;(${ansDown})`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    }
}

function countPpDistance(e){
    const x = parseFloat(document.querySelector("#pp-x").value);
    const y = parseFloat(document.querySelector("#pp-y").value);
    const z = parseFloat(document.querySelector("#pp-z").value);
    
    const a = parseFloat(document.querySelector("#plane-x").value);
    const b = parseFloat(document.querySelector("#plane-y").value);
    const c = parseFloat(document.querySelector("#plane-z").value);
    const d = parseFloat(document.querySelector("#plane-k").value);

    let ansUp = Math.abs(a*x + b*y + c*z + d);
    let ansDown = Math.pow(a,2) + Math.pow(b,2) + Math.pow(c,2);

    if(!isNaN(ansUp) && !isNaN(ansDown)){
        if (ansUp === 0) e.target.parentElement.lastElementChild.innerHTML = `Distance: 0`;
        else if(Math.sqrt(ansDown) == Math.floor(Math.sqrt(ansDown))) {
            e.target.parentElement.lastElementChild.innerHTML = `Distance: ${ansUp}/${Math.sqrt(ansDown)}`
        }
        else e.target.parentElement.lastElementChild.innerHTML = `Distance: ${ansUp}/&#8730;(${ansDown})`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    }
}

function countPlPlDistance(e){
    const a1 = parseFloat(document.querySelector("#pl-plane-x1").value);
    const b1 = parseFloat(document.querySelector("#pl-plane-y1").value);
    const c1 = parseFloat(document.querySelector("#pl-plane-z1").value);
    const d1 = parseFloat(document.querySelector("#plane1-k").value);

    const a2 = parseFloat(document.querySelector("#pl-plane-x2").value);
    const b2 = parseFloat(document.querySelector("#pl-plane-y2").value);
    const c2 = parseFloat(document.querySelector("#pl-plane-z2").value);
    const d2 = parseFloat(document.querySelector("#plane2-k").value);
    
    if(a1 !== a2 || b2 !== b1 || c1 !== c2){
        e.target.parentElement.lastElementChild.innerHTML = `Planes aren't parallel to each other.`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    } else {
        let ansUp = Math.abs(d1-d2);
        let ansDown = Math.pow(a1,2) + Math.pow(b1,2) + Math.pow(c1,2);
        if(!isNaN(ansUp) && !isNaN(ansDown)){
            if (ansUp === 0) e.target.parentElement.lastElementChild.innerHTML = `Distance: 0`;
            else if(Math.sqrt(ansDown) == Math.floor(Math.sqrt(ansDown))) {
                e.target.parentElement.lastElementChild.innerHTML = `Distance: ${ansUp}/${Math.sqrt(ansDown)}`
            }
            else e.target.parentElement.lastElementChild.innerHTML = `Distance: ${ansUp}/&#8730;(${ansDown})`;
            e.target.parentElement.lastElementChild.classList.add("answered");
        }
    }
}

function countOP(e){
    let x1, x2, y1, y2, z1, z2;
    const vec1 = document.querySelector('#op-vec-1');
    const vec2 = document.querySelector('#op-vec-2');
    if (vec1.value === "u"){
        x1 = parseFloat(document.querySelector('#u1').value);
        y1 = parseFloat(document.querySelector('#u2').value);
        z1 = parseFloat(document.querySelector('#u3').value);
    }else if (vec1.value === "v"){
        x1 = parseFloat(document.querySelector('#v1').value);
        y1 = parseFloat(document.querySelector('#v2').value);
        z1 = parseFloat(document.querySelector('#v3').value);
    } else {
        x1 = parseFloat(document.querySelector('#w1').value);
        y1 = parseFloat(document.querySelector('#w2').value);
        z1 = parseFloat(document.querySelector('#w3').value);
    }
    if (vec2.value === "u"){
        x2 = parseFloat(document.querySelector('#u1').value);
        y2 = parseFloat(document.querySelector('#u2').value);
        z2 = parseFloat(document.querySelector('#u3').value);
    }else if (vec2.value === "v"){
        x2 = parseFloat(document.querySelector('#v1').value);
        y2 = parseFloat(document.querySelector('#v2').value);
        z2 = parseFloat(document.querySelector('#v3').value);
    } else {
        x2 = parseFloat(document.querySelector('#w1').value);
        y2 = parseFloat(document.querySelector('#w2').value);
        z2 = parseFloat(document.querySelector('#w3').value);
    }
    
    let ansUp = (x1*x2 + y1*y2 + z1*z2);
    let ansBel = (x2*x2 + y2*y2 + z2*z2);
    let ansx, ansy, ansz;

    if (!isNaN(ansUp) && !isNaN(ansBel)){
        if (ansBel/fpb(ansUp*x2, ansBel)===1) ansx = ansUp*x2/fpb(ansUp*x2, ansBel);
        else ansx = `${ansUp*x2/fpb(ansUp*x2, ansBel)}/${ansBel/fpb(ansUp*x2, ansBel)}`

        if (ansBel/fpb(ansUp*y2, ansBel)===1) ansy = ansUp*y2/fpb(ansUp*y2, ansBel);
        else ansy = `${ansUp*y2/fpb(ansUp*y2, ansBel)}/${ansBel/fpb(ansUp*y2, ansBel)}`

        if (ansBel/fpb(ansUp*z2, ansBel)===1) ansz = ansUp*z2/fpb(ansUp*z2, ansBel);
        else ansz = `${ansUp*z2/fpb(ansUp*z2, ansBel)}/${ansBel/fpb(ansUp*z2, ansBel)}`

        
        e.target.parentElement.lastElementChild.innerHTML = `Orthogonal projection of ${vec1.value} onto ${vec2.value} = (${ansx}, ${ansy}, ${ansz})`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    }
}

function countDotProduct(e){
    let x1, x2, y1, y2, z1, z2;
    const vec1 = document.querySelector('#dot-vec-1');
    const vec2 = document.querySelector('#dot-vec-2');
    if (vec1.value === "u"){
        x1 = parseFloat(document.querySelector('#u1').value);
        y1 = parseFloat(document.querySelector('#u2').value);
        z1 = parseFloat(document.querySelector('#u3').value);
    }else if (vec1.value === "v"){
        x1 = parseFloat(document.querySelector('#v1').value);
        y1 = parseFloat(document.querySelector('#v2').value);
        z1 = parseFloat(document.querySelector('#v3').value);
    } else {
        x1 = parseFloat(document.querySelector('#w1').value);
        y1 = parseFloat(document.querySelector('#w2').value);
        z1 = parseFloat(document.querySelector('#w3').value);
    }
    if (vec2.value === "u"){
        x2 = parseFloat(document.querySelector('#u1').value);
        y2 = parseFloat(document.querySelector('#u2').value);
        z2 = parseFloat(document.querySelector('#u3').value);
    }else if (vec2.value === "v"){
        x2 = parseFloat(document.querySelector('#v1').value);
        y2 = parseFloat(document.querySelector('#v2').value);
        z2 = parseFloat(document.querySelector('#v3').value);
    } else {
        x2 = parseFloat(document.querySelector('#w1').value);
        y2 = parseFloat(document.querySelector('#w2').value);
        z2 = parseFloat(document.querySelector('#w3').value);
    }
    let ans = x1*x2 + y1*y2 + z1*z2;
    if (!isNaN(ans)){
    e.target.parentElement.lastElementChild.innerHTML = vec1.value + " &#8729; " + vec2.value + " = " + ans;
    e.target.parentElement.lastElementChild.classList.add("answered");
    }
}
function countCrossProduct(e){
    let x1, x2, y1, y2, z1, z2;
    const vec1 = document.querySelector('#cross-vec-1');
    const vec2 = document.querySelector('#cross-vec-2');
    if (vec1.value === "u"){
        x1 = parseFloat(document.querySelector('#u1').value);
        y1 = parseFloat(document.querySelector('#u2').value);
        z1 = parseFloat(document.querySelector('#u3').value);
    }else if (vec1.value === "v"){
        x1 = parseFloat(document.querySelector('#v1').value);
        y1 = parseFloat(document.querySelector('#v2').value);
        z1 = parseFloat(document.querySelector('#v3').value);
    } else {
        x1 = parseFloat(document.querySelector('#w1').value);
        y1 = parseFloat(document.querySelector('#w2').value);
        z1 = parseFloat(document.querySelector('#w3').value);
    }
    if (vec2.value === "u"){
        x2 = parseFloat(document.querySelector('#u1').value);
        y2 = parseFloat(document.querySelector('#u2').value);
        z2 = parseFloat(document.querySelector('#u3').value);
    }else if (vec2.value === "v"){
        x2 = parseFloat(document.querySelector('#v1').value);
        y2 = parseFloat(document.querySelector('#v2').value);
        z2 = parseFloat(document.querySelector('#v3').value);
    } else {
        x2 = parseFloat(document.querySelector('#w1').value);
        y2 = parseFloat(document.querySelector('#w2').value);
        z2 = parseFloat(document.querySelector('#w3').value);
    }
    let ansx = y1*z2-z1*y2;
    let ansy = z1*x2-x1*z2;
    let ansz = x1*y2-x2*y1;
    if (!isNaN(ansx) && !isNaN(ansy) && !isNaN(ansz)){
        e.target.parentElement.lastElementChild.innerHTML = `${vec1.value} &#215; ${vec2.value} = (${ansx}, ${ansy}, ${ansz})`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    }
}

function countMagnitude(e){
    const vec = e.target.parentElement;
    let x, y, z;
    if (vec.classList.contains('left')){
        x = parseFloat(document.querySelector('#u1').value);
        y = parseFloat(document.querySelector('#u2').value);
        z = parseFloat(document.querySelector('#u3').value);
    }else if (vec.classList.contains('middle')){
        x = parseFloat(document.querySelector('#v1').value);
        y = parseFloat(document.querySelector('#v2').value);
        z = parseFloat(document.querySelector('#v3').value);
    } else {
        x = parseFloat(document.querySelector('#w1').value);
        y = parseFloat(document.querySelector('#w2').value);
        z = parseFloat(document.querySelector('#w3').value);
    }
    let ans = Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2);
    if (!isNaN(ans)){
        vec.lastElementChild.innerHTML = "Magnitude = &#8730;" + `(${ans.toString()})`;
        vec.lastElementChild.classList.add("answered");
    }
}