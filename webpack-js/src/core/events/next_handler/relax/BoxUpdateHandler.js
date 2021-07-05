import NextHandler from "../../../abstract/NextHandler";
import $boxes from "../../../../shared/store/Boxes";
import $boxOnboardCrasher from "../../../../Helper/relax/BoxOnboardCrasher";
import $figures from "../../../drawer/figures/Figures";
import AllFigures from "../../../drawer/figures/leaves/AllFigures";
import FUNC from "../../../../general/Custom";

class BoxUpdateHandler extends NextHandler {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        const { x, y } = extraData;
        const box = $boxes.get(x, y);
        $boxOnboardCrasher.update({ x, y });

        // Important !
        setTimeout(() => {
            if (!box.isBusy()) {
                return;
            }

            const animatingBox = $figures.drawFromPattern(`#`,1.05, { background: '#92522e' });
            FUNC.setStyle(animatingBox, {
                position: 'absolute',
                top: box.getCoordinateY() + 'px',
                left: box.getCoordinateX() + 'px',
                border: '2px solid black',
            });
            animatingBox.className += ' animated-box';
            document.body.append(animatingBox);

            setTimeout(() => {
                box.style({ background: '#92522e' });
                animatingBox.remove();
            }, 450)
        })
    }
}

const $boxUpdateHandler = new BoxUpdateHandler();
export default $boxUpdateHandler;