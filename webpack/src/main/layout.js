import { boxesOnColumn, boxesOnRow, boxWidth, boxHeight, offsetX, offsetY } from '../shared/constants'
import { $, elt } from '../shared/custom'
import boxes from '../shared/store/boxes'


class Layout {
    init() {
        this.initBoxes()
        this.createLayout();
    }

    initBoxes() {
        boxes.reset()

        for (let i = 0; i < boxesOnColumn; i++) {
            boxes.array.push([])
            for (let j = 0; j < boxesOnRow; j++) {
                let x = j * (boxWidth + 1) + offsetX
                let y = i * (boxHeight + 1) + offsetY
                boxes.array[i].push({ x, y })
            }
        }
    }

    createLayout() {
        $("content").innerHTML = "";

        for (let i = 0; i < boxesOnColumn; i++) {
            for (let j = 0; j < boxesOnRow; j++) {
                let box = boxes.array[i][j]
                this.createSingleBlock(box)
            }
        }
    }

    createSingleBlock(box) {
        let el = elt('div', "box", null, {
            position: 'absolute',
            width: (boxWidth + 0) + "px",
            height: (boxHeight + 0) + "px",
            left: box.x + 'px',
            top: box.y + 'px',
            background: '#1E1E1E', //rgba(0,0,0,.02)
            border: '2px solid black' //1px solid rgba(0,0,0,.051)
        })

        el.onmousedown = (e) => e.preventDefault()

        $("content").append(el)

        box.div = el
        box.busy = 0
    }
}

const layout = new Layout()
export default layout;