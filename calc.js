class InfixToPofixCalc {
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
    static convert(kek) {
        let stack = [];
        let stackOp = [];
        let op1 = ["+", "-"];
        let op2 = ["*", "/"];
        while (kek.length) {
            let c = kek.shift();
            if (!stackOp.length && (op1.includes(c) || op2.includes(c))) {
                stackOp.push(c);
                continue;
            }
            let cc = stackOp[stackOp.length - 1];
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
                if (op1.includes(cc)) {
                    stack.push(stackOp.pop())
                    stackOp.push(c);
                }
                if (op2.includes(cc)) {
                    stack.push(stackOp.pop())
                    stackOp.push(c);
                }
                if (cc == "(") {
                    stackOp.push(c)
                }
            }
            else if (op2.includes(c)) {
                if (op1.includes(cc)) {
                    /*
                    Читаем "*"  
                    Последний символ в стеке операций (+) имеет приоритет ниже, чем текущий знак (*). 
                    Поэтому последний знак из стека мы не трогаем, а просто добавляем как обычно текущий в стек.
                    */
                    stackOp.push(c);
                }
                if (op2.includes(cc)) {
                    stack.push(stackOp.pop())
                    stackOp.push(c);
                }
                if (cc == "(") {
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
        return InfixCalc.eval(InfixCalc.convert(InfixCalc.lex(str)));
    }

}

let kek = "(7)-(0)+(4)"
console.log(InfixCalc.calc(kek));
