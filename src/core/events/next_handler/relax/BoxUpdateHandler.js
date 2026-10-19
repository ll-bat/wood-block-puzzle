import NextHandler from "../../../abstract/NextHandler";
import $boxes from "../../../../shared/store/Boxes";
import $boxOnboardCrasher from "../../../../Helper/relax/BoxOnboardCrasher";

class BoxUpdateHandler extends NextHandler {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        const { x, y } = extraData;
        const box = $boxes.get(x, y);
        $boxOnboardCrasher.update({ x, y });
        const cell = box.getDiv();
        cell.classList.remove('challenge-placement-pulse');
        void cell.offsetWidth;
        cell.classList.add('challenge-placement-pulse');
    }
}

const $boxUpdateHandler = new BoxUpdateHandler();
export default $boxUpdateHandler;
