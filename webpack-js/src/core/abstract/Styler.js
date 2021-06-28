import FUNC from "../../general/Custom";
import ErrorHandler from "./ErrorHandler";

export default class Styler extends ErrorHandler {
    style($style) {
        const divElement = this.getDivElement();
        if (!divElement) {
            this.log(divElement);
            this.error('Setting style on null');
        }

        FUNC.setStyle(divElement, $style);
    }

    getDivElement() {}
}