import DomNegotiatorAbstract from "./DomNegotiatorAbstract";

export default class Negotiator {
    /**
     * @param $negotiator {DomNegotiatorAbstract}
     */
    setup($negotiator) {
        this._negotiator = $negotiator;
    }

    /**
     * @return {DomNegotiatorAbstract}
     */
    getNegotiator() {
        return this._negotiator;
    }
}