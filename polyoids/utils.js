
/**
 * From: https://github.com/gniziemazity/Self-driving-car 
 */
function lerp(A, B, t) {
    return A + (B - A) * t;
}

function calcRadFromAngle(angle) {
    return angle * Math.PI / 180;
}

/**
 * From: https://github.com/gniziemazity/Self-driving-car 
 */
function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

/**
 * From: https://github.com/gniziemazity/Self-driving-car 
 */
function polysIntersect(poly1, poly2) {
    for(let i=0; i<poly1.vertices.length; i++) {
        for(let j=0; j<poly2.vertices.length; j++) {
            const touch = getIntersection(
                poly1.vertices[i],
                poly1.vertices[(i + 1) % poly1.vertices.length],
                poly2.vertices[j],
                poly2.vertices[(j + 1) % poly2.vertices.length]
            );

            if(touch) {
                return true;
            }
        }    
    }

    return false;
}

function calculateDistance(poly1, poly2) {
    const dx = poly2.x - poly1.x;
    const dy = poly2.y - poly1.y;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function padNumber(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function calcYfromSinus(amplitude, frequency, phase, xpos) {
    return amplitude * Math.sin(2 * Math.PI * frequency * xpos + phase);
}