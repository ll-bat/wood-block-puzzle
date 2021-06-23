import { $, elt, setStyle } from '../shared/custom'
import { boxWidth, boxHeight, dom, blockCrashColor } from '../shared/constants'

class BlockCrashAnimation {
    constructor() {
        this.WITH_TRANSFORMATIONS = 'withTransform'
        this.PARABOLIC_CURVE = 'parabolicCurve'

        this.types = [
            this.WITH_TRANSFORMATIONS,
            this.PARABOLIC_CURVE
        ]
    }


    animateCrash({ x, y }) {
        this.run(
            this.draw({ x, y }), { x, y }
        )
    }

    draw({ x, y }) {
        let el = elt('div', null, null, {
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: boxWidth + 'px',
            height: boxHeight + 'px',
            background: blockCrashColor,
            border: '2px inset black',
        })
        dom.body.append(el)
        return el
    }

    run(el, boxCoordinates) {
        /*
         let r = Math.floor(Math.random() * this.types.length)
         let type = this.types[r]
 
         this[type](el, o) 
       */

        this.parabolicCurve(el, boxCoordinates)
    }

    async parabolicCurve(el, { x, y }) {
        const steps = 55
        const clockWise = Math.random() > .5 ? 1 : -1
        const endX = 20
        const xPerStep = (endX / steps)
        let currentStep = steps
        let currentX = 0
        let currentY = calcY(currentX)
        let currentOpacity = 1
        let currentScale = 1
        const addX = 100 * clockWise;
        const addY = Math.random() * 100;
        let posX = 0;
        let posY = 0;
        const perStep = 1 / steps
        let degree = 0;
        const degPerStep = 6 * clockWise;

        while (currentStep--) {
            setStyle(el, {
                left: currentX + posX + x + 'px',
                top: currentY + posY + y + 'px',
                transform: `
                    scale(${currentScale}) 
                    rotate(${degree}deg)
                   `,
                opacity: currentOpacity
            })
            currentX += clockWise * xPerStep * (Math.sin(currentStep / steps) * 1.6 + .2)
            currentY = calcY(currentX)
            currentOpacity -= perStep
            currentScale -= perStep / 2
            posX = addX * Math.cos(currentStep / steps)
            posY = addY * Math.cos(currentStep / steps)
            degree += degPerStep * Math.cos(currentStep / steps)
            await this.wait(10)
        }

        function calcY(x) {
            return 1.46 * x * x + 10
        }

        el.remove()
    }

    async withTransform(el) {
        const steps = 150
        const clockWise = Math.random() > .5 ? 1 : -1
        const startDegree = -90 + clockWise * 85
        const endDegree = startDegree + clockWise * (Math.random() * 30 + 20)
        const degreePerStep = clockWise * (Math.abs(endDegree - startDegree) / steps)
        const distPerStep = 1.5
        const perStep = 1 / steps
        let currentDegree = startDegree;
        let currentDist = distPerStep
        let currentStep = steps
        let currentOpacity = 1
        let currentScale = 1

        while (currentStep--) {
            setStyle(el, {
                transform: `
                       rotate(${currentDegree}deg)
                       translateX(${currentDist}px)
                       scale(${currentScale})
                    `,
                opacity: currentOpacity
            })
            currentDegree += degreePerStep
            currentDist += distPerStep * Math.sin(currentStep / steps) * 2
            currentOpacity -= perStep
            currentScale -= perStep / 2
            await this.wait(2)
        }

        el.remove()
    }

    wait(time) {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, time)
        })
    }
}

const blockAnim = new BlockCrashAnimation()
export default blockAnim