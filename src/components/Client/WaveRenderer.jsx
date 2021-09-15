import { h } from 'preact';
import { useWindowSize } from './hooks/useWindowSize'
import { generatePoints, generatePath } from './waveGenerator';

export default function WaveRenderer() {
    const [windowWidth, widthHeight] = useWindowSize();

    const height = 200;
    const variance  = 0.75;
    const points = generatePoints(
        windowWidth,
        height,
        3,
        variance
    );
    const path = generatePath(
        points,
        { x: 0, y: height },
        { x: windowWidth, y: height }
    )

    return (
        <svg style="width: 0; height: 0; display: block;">
            <defs>
                <clipPath id="wave">
                    <path d={path}></path>
                </clipPath>
            </defs>
        </svg>
    );
}