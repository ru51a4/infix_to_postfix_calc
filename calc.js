class InfixToPosfixCalc {
    static lex(str) {
        let res = [];
        let t = '';
        for (let i = 0; i <= str.length - 1; i++) {
            if (str[i] === ' ') {
                continue
            }
            if (str[i] === '/' || str[i] === '*' || str[i] === '-' || str[i] === '+') {
                if (t) {
                    res.push(t);
                }
                if (isNaN(Number(res[res.length - 1])) && res[res.length - 1] !== ")") {
                    res.push(0);
                }
                res.push(str[i]);
                t = '';
            } else if (str[i] === '(' || str[i] === ')') {
                if (t) {
                    res.push(t);
                }
                res.push(str[i]);
                t = '';
            } else {
                t += str[i];
            }
        }
        if (t) {
            res.push(t);
        }
        return res;
    }
    static convert(arr) {
        let stack = [];
        let stackOp = [];
        let op1 = ["+", "-"];
        let op2 = ["*", "/"];
        while (arr.length) {
            let c = arr.shift();
            if (!stackOp.length && (op1.includes(c) || op2.includes(c))) {
                stackOp.push(c);
                continue;
            }
            let lastOp = stackOp[stackOp.length - 1];
            if (c == "(") {
                stackOp.push(c)
            }
            else if (c == ")") {
                let q = stackOp.pop();
                while (q !== "(") {
                    stack.push(q);
                    q = stackOp.pop();
                }
            }
            else if (op1.includes(c)) {
                if (op1.includes(lastOp)) {
                    stack.push(stackOp.pop())
                    stackOp.push(c);
                }
                if (op2.includes(lastOp)) {
                    stack.push(stackOp.pop())
                    stackOp.push(c);
                }
                if (lastOp == "(") {
                    stackOp.push(c)
                }
            }
            else if (op2.includes(c)) {
                if (op1.includes(lastOp)) {
                    /*
                    Читаем "*"  
                    Последний символ в стеке операций (+) имеет приоритет ниже, чем текущий знак (*). 
                    Поэтому последний знак из стека мы не трогаем, а просто добавляем как обычно текущий в стек.
                    */
                    stackOp.push(c);
                }
                if (op2.includes(lastOp)) {
                    stack.push(stackOp.pop())
                    stackOp.push(c);
                }
                if (lastOp == "(") {
                    stackOp.push(c)
                }
            } else {
                stack.push(c);
            }
        }
        while (stackOp.length) {
            stack.push(stackOp.pop());
        }
        return stack;
    }
    static eval(arr) {
        let stack = [];
        while (arr.length) {
            let c = arr.shift();
            if (c == "+") {
                let n1 = Number(stack.pop());
                let n2 = Number(stack.pop());
                stack.push(n1 + n2);
            } else if (c == "-") {
                let n2 = Number(stack.pop());
                let n1 = Number(stack.pop());
                stack.push(n1 - n2);
            } else if (c == "/") {
                let n2 = Number(stack.pop());
                let n1 = Number(stack.pop());
                stack.push(n1 / n2);
            } else if (c == "*") {
                let n2 = Number(stack.pop()); 
                let n1 = Number(stack.pop());
                stack.push(n1 * n2);
            } else {
                stack.push(c);
            }
        }
        return stack[0];
    }
    static calc(str) {
        return InfixToPosfixCalc.eval(InfixToPosfixCalc.convert(InfixToPosfixCalc.lex(str)));
    }

}

let kek = "(7)-(0)+(4)"
console.log(InfixToPosfixCalc.calc(kek));
