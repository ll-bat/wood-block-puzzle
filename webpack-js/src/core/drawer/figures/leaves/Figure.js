
export default class Figure {
    /**
     * @param name {string}
     * @param pattern {string}
     */
    constructor(name, pattern) {
        this.name = name;

        this.pattern = pattern.split("\n")
            .map(c => c.trim())
            .filter(c => c)
            .map(c => c.split(""))
    }

}