import $randomFigureDrawer from "../../../drawer/concrete/relax/RandomFiguresDrawer";
import STATE from "../../../../shared/store/leaves/State";
import $figureMover from "../../FigureMover";

export default class RandomFigureEventHelper {
    static drawRandomFiguresAndRegisterEvents() {
        STATE.relax.clear();
        $randomFigureDrawer.draw();
        STATE.relax.getFigures()
            .forEach(figureObj => $figureMover.register(figureObj));
    }
}