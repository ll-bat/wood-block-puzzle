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
        box.style({ background: '#92522e' });
        $boxOnboardCrasher.update({ x, y })
    }
}

const $boxUpdateHandler = new BoxUpdateHandler();
export default $boxUpdateHandler;