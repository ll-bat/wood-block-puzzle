import $layout from "./core/drawer/Layout";
import DomNegotiator from "./negotiators/DomNegotiator";
import $randomFigureDrawer from "./core/drawer/concrete/relax/RandomFiguresDrawer";
import STATE from "./shared/store/leaves/State";
import $figureMover from "./core/events/FigureMover";

$layout.setup(
    new DomNegotiator('#content'));

$layout.draw();

$randomFigureDrawer.setup(
    new DomNegotiator('#figures'));

$randomFigureDrawer.draw();

const randomFigures = STATE.relax.getFigures();
randomFigures.forEach(figureObj => {
    $figureMover.register(figureObj);
});