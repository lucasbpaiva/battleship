class Ship {
    constructor(length) {
        this.length = length;
        this.sunk = false;
        this.hits = 0;
    }
    hit() {
        this.hits++;
        //prevent hit if already sunk?
    }
    isSunk() {
        return this.hits >= this.length;
    }
}