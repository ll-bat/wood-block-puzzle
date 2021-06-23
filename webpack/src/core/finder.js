 import boxes from '../shared/store/boxes'

 class Finder {
     constructor() {
         this.x = null;
         this.y = null;
         this.len = null;
         this.prevBox = null;
         this.backTrack = null;

         this.reset();
     }

     reset() {
         this.x = this.y = this.len = 4;
     }

     getNextPartition() {
         let type = this.len;

         if (type == 4) {
             return 2;
         } else if (type == 3) {
             return 1;
         } else {
             return 1;
         }
     }

     update(typeX, typeY) {
         if (this.len === 1) {
             if (typeX == 1) typeX = 0;
             if (typeY == 1) typeY = 0;
         }

         if (this.backTrack) {
             setStyle(boxes.array[this.x][this.y].div, {
                 background: 'rgba(200, 0, 0, .3)'
             })
         }

         let len = this.getNextPartition();

         if (typeX == '-1') {
             this.y -= len
         } else if (typeX == '1') {
             this.y += len
         }

         if (typeY == '-1') {
             this.x -= len
         } else if (typeY == '1') {
             this.x += len
         }

         this.len /= 2;
         if (this.len < 1) this.len = 0;

         // if (this.len === 0) this.matchBox();
     }

     isDone() {
         return this.len === 0;
     }

     getX() {
         return boxes.array[this.x][this.y].x;
     }

     getY() {
         return boxes.array[this.x][this.y].y;
     }

     getCoords() {
         let coords = boxes.array[this.x][this.y];
         return { x: coords.x, y: coords.y }
     }

     matchBox() {
         if (this.prevBox) {
             setStyle(this.prevBox, {
                 background: 'rgba(0,0,0,.02)',
             })
         }
         let div = boxesArboxes.arrayay[this.x][this.y].div;

         setStyle(div, {
             background: 'red',
         })
         this.prevBox = div;
     }

 }

 const finder = new Finder();
 export default finder