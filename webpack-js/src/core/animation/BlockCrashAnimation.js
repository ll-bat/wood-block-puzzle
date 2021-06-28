import FUNC from "../../general/Custom";
import CONSTANTS from "../../general/Constants";

class BlockCrashAnimation {
    async animateCrash({ x, y }) {
        await this.run(
            this.draw({ x, y }), { x, y }
        )
    }

    draw({ x, y }) {
        let el = FUNC.elt('div', null, null, {
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: CONSTANTS.boxWidth + 'px',
            height: CONSTANTS.boxHeight + 'px',
            background: CONSTANTS.blockCrashColor,
            border: '2px inset black',
        })

        CONSTANTS.dom.body.append(el)
        return el
    }

    async run(el, boxCoordinates) {
        await this.parabolicCurve(el, boxCoordinates)
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
            FUNC.setStyle(el, {
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
            FUNC.setStyle(el, {
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

const $blockCrashAnimation = new BlockCrashAnimation()
export default $blockCrashAnimation;