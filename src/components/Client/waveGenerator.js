import { computeControlPoints } from './bezier-spline'

/**
 * @see https://github.com/anup-a/svgwave/blob/main/src/wave/wave.js
 */
export function generatePoints(width, height, segmentCount, variance) {
    const cellWidth = width / segmentCount
    const moveLimitX = cellWidth * variance * 0.5
    const moveLimitY = height * variance

    let points = []
    points.push({ x: 0, y: Math.floor(height) })
    for (let x = cellWidth; x < width; x += cellWidth) {
        const varietalY = height - moveLimitY / 2 + Math.random() * moveLimitY
        const varietalX = x - moveLimitX / 2 + Math.random() * moveLimitX
        points.push({
            x: Math.floor(varietalX),
            y: Math.floor(varietalY),
        })
    }
    points.push({ x: width, y: Math.floor(height) })

    console.log(points);

    return points
}

export function generatePath(curvePoints, leftCornerPoint, rightCornerPoint) {
    const xPoints = curvePoints.map((p) => p.x)
    const yPoints = curvePoints.map((p) => p.y)

    const xControlPoints = computeControlPoints(xPoints)
    const yControlPoints = computeControlPoints(yPoints)

    let path =
        `M ${leftCornerPoint.x},${leftCornerPoint.y} ` +
        `C ${leftCornerPoint.x},${leftCornerPoint.y} ` +
        `${xPoints[0]},${yPoints[0]} ` +
        `${xPoints[0]},${yPoints[0]} `

    for (let i = 0; i < xPoints.length - 1; i++) {
        path +=
        `C ${xControlPoints.p1[i]},${yControlPoints.p1[i]} ` +
        `${xControlPoints.p2[i]},${yControlPoints.p2[i]} ` +
        `${xPoints[i + 1]},${yPoints[i + 1]} `
    }

    path +=
        `C ${xPoints[xPoints.length - 1]},${yPoints[xPoints.length - 1]} ` +
        `${rightCornerPoint.x},${rightCornerPoint.y} ` +
        `${rightCornerPoint.x},${rightCornerPoint.y} Z`

    return path
}