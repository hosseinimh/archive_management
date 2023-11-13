class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        if (
            !this.items.find((item) => {
                item?.id === element.id;
            })
        ) {
            this.items.push(element);
        }
    }

    pop() {
        if (this.items.length == 0) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

export default Stack;
