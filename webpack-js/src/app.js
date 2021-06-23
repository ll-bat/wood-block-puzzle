import $layout from "./core/drawer/Layout";
import DomNegotiator from "./negotiators/DomNegotiator";

const $domNegotiator = new DomNegotiator('#content');
$layout.setup($domNegotiator);
$layout.draw();