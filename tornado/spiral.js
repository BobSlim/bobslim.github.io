function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

const getSlope = () => {
    
}

const getArchimedianSpiralPoint = (scalar) => (radians) => {
    const returnValue = [scalar * radians, radians]
    return returnValue
}

const polarToCartesian = ([distance, radians]) => {
    const returnValue = [distance * Math.cos(radians), distance * Math.sin(radians)].map((x) => x / Math.PI)
    return returnValue
}

const segments = [0, 45, 90, 135, 180, 225, 270, 315, 360]
    .map(toRadians)
    .map(getArchimedianSpiralPoint(5))
    .map(polarToCartesian)

console.log(segments)
