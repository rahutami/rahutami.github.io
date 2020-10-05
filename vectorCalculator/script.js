const magBtn = document.querySelectorAll(".mag-btn");
const dotBtn = document.querySelector(".dot-btn");
const crossBtn = document.querySelector(".cross-btn");
const opBtn = document.querySelector(".op-btn");
const plBtn = document.querySelector(".pl-btn");
const ppBtn = document.querySelector(".pp-btn");
const plPlaneBtn = document.querySelector(".pl-plane-btn");
const line2pBtn = document.querySelector(".line-2p-btn");
const linePVBtn = document.querySelector(".line-pv-btn");
const linePLBtn = document.querySelector(".line-pl-btn");
const plane3pBtn = document.querySelector(".plane-3p-btn");
const planePVBtn = document.querySelector(".plane-pv-btn");

opBtn.addEventListener('click', countOP);
crossBtn.addEventListener('click', countCrossProduct);
dotBtn.addEventListener('click', countDotProduct);
plBtn.addEventListener('click', countPlDistance);
ppBtn.addEventListener('click', countPpDistance);
plPlaneBtn.addEventListener('click', countPlPlDistance);
line2pBtn.addEventListener('click', countLine2P);
linePVBtn.addEventListener('click', countLinePV);
linePLBtn.addEventListener('click', countLinePL);
plane3pBtn.addEventListener('click', countPlane3P);
planePVBtn.addEventListener('click', countPlanePV);

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

function countPlanePV(e){
    let koef = {
        x : document.querySelector('#plane-pv-x2').value,
        y : document.querySelector('#plane-pv-y2').value,
        z : document.querySelector('#plane-pv-z2').value
    }

    console.log(koef.x);
    console.log(koef.y);
    console.log(koef.z);

    if (koef.x === 0 && koef.y === 0 && koef.z === 0) {
        e.target.parentElement.lastElementChild.innerHTML = `Undefined`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    } else {
        let point = {
            x : document.querySelector('#plane-pv-x1').value,
            y : document.querySelector('#plane-pv-y1').value,
            z : document.querySelector('#plane-pv-z1').value
        }
        
        let ans = "";

        if (koef.x !== 0) ans += `${point.x}x `;

        if (koef.y !== 0 && ans === "") ans += `${point.y}y `;
        else if (koef.y > 0) ans += `+ ${point.y}y `;
        else if (koef.y < 0) ans += `- ${Math.abs(point.y)}y `;

        if (koef.z !== 0 && ans === "") ans += `${point.z}z `;
        else if (koef.z > 0) ans += `+ ${point.z}z `;
        else if (koef.z < 0) ans += `- ${Math.abs(point.z)}z `;

        let anskoef = (-1)*(point.x * koef.x + point.y * koef.y + point.z * koef.z);

        if (anskoef > 0) ans += `+ ${anskoef}`;
        else if (anskoef < 0) ans += `- ${Math.abs(anskoef)}`;

        ans += " = 0"

        e.target.parentElement.lastElementChild.innerHTML = ans;
        e.target.parentElement.lastElementChild.classList.add("answered");
    }

}

function countPlane3P(e){
    let point = {
        x : parseFloat(document.querySelector("#plane-2p-x1").value),
        y : parseFloat(document.querySelector("#plane-2p-y1").value),
        z : parseFloat(document.querySelector("#plane-2p-z1").value)
    };
    let vec1 = {
        x : parseFloat(document.querySelector("#plane-2p-x2").value) - point.x,
        y : parseFloat(document.querySelector("#plane-2p-y2").value) - point.y,
        z : parseFloat(document.querySelector("#plane-2p-z2").value) - point.z
    };
    let vec2 = {
        x : parseFloat(document.querySelector("#plane-2p-x3").value) - point.x,
        y : parseFloat(document.querySelector("#plane-2p-y3").value) - point.y,
        z : parseFloat(document.querySelector("#plane-2p-z3").value) - point.z
    };
    let vec = {
        x : vec1.y * vec2.z - vec1.z * vec2.y,
        y : vec1.z * vec2.x - vec2.z * vec1.z,
        z : vec1.x * vec2.y - vec1.y * vec2.x
    }
    let ans = {};
    
    if (point.x !== 0) ans.x = `${point.x} `;
    else ans.x = "";
    if (point.y !== 0) ans.y = `${point.y} `;
    else ans.y = "";
    if (point.z !== 0) ans.z = `${point.z} `;
    else ans.z = "";
    
    if (vec.x > 0 && ans.x === "") ans.x += `${vec.x}t`;
    else if (vec.x > 0) ans.x += `+ ${vec.x}t`;
    else if (vec.x < 0) ans.x += `- ${Math.abs(vec.x)}t`;
    else if (ans.x ==="") ans.x = `0`;

    if (vec.y > 0 && ans.y === "") ans.y += `${vec.y}t`;
    else if (vec.y > 0) ans.y += `+ ${vec.y}t`;
    else if (vec.y < 0) ans.y += `- ${Math.abs(vec.y)}t`;
    else if (ans.y ==="") ans.y = `0`;

    if (vec.z > 0 && ans.z === "") ans.z += `${vec.z}t`;
    else if (vec.z > 0) ans.z += `+ ${vec.z}t`;
    else if (vec.z < 0) ans.z += `- ${Math.abs(vec.z)}t`;
    else if (ans.z ==="") ans.z = `0`;

    e.target.parentElement.lastElementChild.innerHTML = `Parametric Equations:<br>x = ${ans.x}<br>y = ${ans.y}<br>z = ${ans.z}`;
    e.target.parentElement.lastElementChild.classList.add("answered");
}

function countLinePL(e) {
    let n1 = {
        x : parseFloat(document.querySelector("#line-pl-x1").value),
        y : parseFloat(document.querySelector("#line-pl-y1").value),
        z : parseFloat(document.querySelector("#line-pl-z1").value)
    }
    let n2 = {
        x : parseFloat(document.querySelector("#line-pl-x2").value),
        y : parseFloat(document.querySelector("#line-pl-y2").value),
        z : parseFloat(document.querySelector("#line-pl-z2").value)
    };

    if(n1.x !== n2.x || n1.y !== n2.y || n1.z !== n2.z){

        let vec = {
            x : n1.y * n2.z - n1.z * n2.y,
            y : n1.z * n2.x - n2.z * n1.z,
            z : n1.x * n2.y - n1.y * n2.x
        }

        let point = {
            x : 0,
            y1 : n1.y,
            y2 : n2.y,
            z1 : n1.z,
            z2 : n2.z,
            k1 : parseFloat(document.querySelector("#line-pl-k1").value),
            k2 : parseFloat(document.querySelector("#line-pl-k2").value)
        }

        point.k1 /= point.y1;
        point.z1 /= point.y1;
        point.y1 /= point.y1;

        point.k2 -= (point.y2/point.y1)*point.k1;
        point.z2 -= (point.y2/point.y1)*point.z1;
        point.y2 = 0;

        point.k1 -= (point.z1/point.z2)*point.k2;
        point.z2 = 0;

        let ans = {};
        
        if (point.x !== 0) ans.x = `${+point.x.toFixed(2)} `;
        else ans.x = "";
        if (point.k1 !== 0) ans.y = `${+point.k1.toFixed(2)} `;
        else ans.y = "";
        if (point.k2 !== 0) ans.z = `${+point.k2.toFixed(2)} `;
        else ans.z = "";
        
        if (vec.x > 0 && ans.x === "") ans.x += `${vec.x}t`;
        else if (vec.x > 0) ans.x += `+ ${vec.x}t`;
        else if (vec.x < 0) ans.x += `- ${Math.abs(vec.x)}t`;
        else if (ans.x ==="") ans.x = `0`;

        if (vec.y > 0 && ans.y === "") ans.y += `${vec.y}t`;
        else if (vec.y > 0) ans.y += `+ ${vec.y}t`;
        else if (vec.y < 0) ans.y += `- ${Math.abs(vec.y)}t`;
        else if (ans.y ==="") ans.y = `0`;

        if (vec.z > 0 && ans.z === "") ans.z += `${vec.z}t`;
        else if (vec.z > 0) ans.z += `+ ${vec.z}t`;
        else if (vec.z < 0) ans.z += `- ${Math.abs(vec.z)}t`;
        else if (ans.z ==="") ans.z = `0`;

        e.target.parentElement.lastElementChild.innerHTML = `Parametric Equations:<br>x = ${ans.x}<br>y = ${ans.y}<br>z = ${ans.z}`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    } else {
        e.target.parentElement.lastElementChild.innerHTML = `Planes are parallel to each other`;
        e.target.parentElement.lastElementChild.classList.add("answered");
    }
}

function countLinePV(e) {
    let point = {
        x : parseFloat(document.querySelector("#line-pv-x1").value),
        y : parseFloat(document.querySelector("#line-pv-y1").value),
        z : parseFloat(document.querySelector("#line-pv-z1").value)
    }
    let vec = {
        x : parseFloat(document.querySelector("#line-pv-x2").value),
        y : parseFloat(document.querySelector("#line-pv-y2").value),
        z : parseFloat(document.querySelector("#line-pv-z2").value)
    };

    let ans = {};
    
    if (point.x !== 0) ans.x = `${point.x} `;
    else ans.x = "";
    if (point.y !== 0) ans.y = `${point.y} `;
    else ans.y = "";
    if (point.z !== 0) ans.z = `${point.z} `;
    else ans.z = "";
    
    if (vec.x > 0 && ans.x === "") ans.x += `${vec.x}t`;
    else if (vec.x > 0) ans.x += `+ ${vec.x}t`;
    else if (vec.x < 0) ans.x += `- ${Math.abs(vec.x)}t`;
    else if (ans.x ==="") ans.x = `0`;

    if (vec.y > 0 && ans.y === "") ans.y += `${vec.y}t`;
    else if (vec.y > 0) ans.y += `+ ${vec.y}t`;
    else if (vec.y < 0) ans.y += `- ${Math.abs(vec.y)}t`;
    else if (ans.y ==="") ans.y = `0`;

    if (vec.z > 0 && ans.z === "") ans.z += `${vec.z}t`;
    else if (vec.z > 0) ans.z += `+ ${vec.z}t`;
    else if (vec.z < 0) ans.z += `- ${Math.abs(vec.z)}t`;
    else if (ans.z ==="") ans.z = `0`;

    e.target.parentElement.lastElementChild.innerHTML = `Parametric Equations:<br>x = ${ans.x}<br>y = ${ans.y}<br>z = ${ans.z}`;
    e.target.parentElement.lastElementChild.classList.add("answered");
}
function countLine2P(e) {
    let point = {
        x : parseFloat(document.querySelector("#line-2p-x2").value),
        y : parseFloat(document.querySelector("#line-2p-y2").value),
        z : parseFloat(document.querySelector("#line-2p-z2").value)
    }
    let vec = {
        x : point.x - parseFloat(document.querySelector("#line-2p-x1").value),
        y : point.y - parseFloat(document.querySelector("#line-2p-y1").value),
        z : point.z - parseFloat(document.querySelector("#line-2p-z1").value)
    };

    let ans = {};
    
    if (point.x !== 0) ans.x = `${point.x} `;
    else ans.x = "";
    if (point.y !== 0) ans.y = `${point.y} `;
    else ans.y = "";
    if (point.z !== 0) ans.z = `${point.z} `;
    else ans.z = "";
    
    if (vec.x > 0 && ans.x === "") ans.x += `${vec.x}t`;
    else if (vec.x > 0) ans.x += `+ ${vec.x}t`;
    else if (vec.x < 0) ans.x += `- ${Math.abs(vec.x)}t`;
    else if (ans.x ==="") ans.x = `0`;

    if (vec.y > 0 && ans.y === "") ans.y += `${vec.y}t`;
    else if (vec.y > 0) ans.y += `+ ${vec.y}t`;
    else if (vec.y < 0) ans.y += `- ${Math.abs(vec.y)}t`;
    else if (ans.y ==="") ans.y = `0`;

    if (vec.z > 0 && ans.z === "") ans.z += `${vec.z}t`;
    else if (vec.z > 0) ans.z += `+ ${vec.z}t`;
    else if (vec.z < 0) ans.z += `- ${Math.abs(vec.z)}t`;
    else if (ans.z ==="") ans.z = `0`;

    e.target.parentElement.lastElementChild.innerHTML = `Parametric Equations:<br>x = ${ans.x}<br>y = ${ans.y}<br>z = ${ans.z}`;
    e.target.parentElement.lastElementChild.classList.add("answered");
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