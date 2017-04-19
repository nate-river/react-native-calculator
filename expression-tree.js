const
  PLUS = '+',
  MINUS = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',

  testNumberReg = /\d+/,
  testOperatorReg = /[\+\-×÷\(\)\*\/]/;

function isNumber(s) {
  return testNumberReg.test(s);
}

function isOperator(s) {
  return testOperatorReg.test(s);
}

class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class ExpressionTree {

  constructor(node) {
    this.root = null;
    this.stack = [];
  }

  //////////////////////////////
  // 遍历
  traversal(fn) {
    this._traversal(this.root, fn);
  }

  _traversal(node, fn) {
    // 前序 后序 中序 遍历树
    if (node) {
      this._traversal(node.left, fn);
      fn(node);
      this._traversal(node.right, fn);
    }
  }

  ////////////////////////////////////////////
  // 表达式求值
  evaluate() {
    return this._evaluate(this.root);
  }

  _evaluate(node) {
    if (node) {

      if (isNumber(node.data)) {

        return node.data;

      } else if (isOperator(node.data)) {

        var
          value,
          leftValue = parseFloat(this._evaluate(node.left)),
          rightValue = parseFloat(this._evaluate(node.right));

        switch (node.data) {
          case PLUS:
            value = leftValue + rightValue;
            break;
          case MINUS:
            value = leftValue - rightValue;
            break;
          case MULTIPLICATION:
            value = leftValue * rightValue;
            break;
          case DIVISION:
            value = leftValue / rightValue;
            break;
        }
        return value;
      }
    }
  }

  //////////////////////////////////////
  // 利用栈构建表达式树
  // https://en.wikipedia.org/wiki/Binary_expression_tree

  insert(data) {

    if (isNumber(data)) {
      this.stack.push(data)
    }

    if (isOperator(data)) {
      var node = new Node(data);

      var t;

      t = this.stack.pop();

      if (t instanceof Node) {
        node.right = t;
      } else {
        node.right = new Node(t);
      }

      t = this.stack.pop();

      if (t instanceof Node) {
        node.left = t;
      } else {
        node.left = new Node(t);
      }

      this.stack.push(node);
      this.root = node;
    }
  }

  // 中缀表达式转后缀表达式
  // http://blog.csdn.net/sgbfblog/article/details/8001651
  input(expression) {
    var order = {
        '(': -100,
        ')': -100,
        '+': 1,
        '-': 1,
        '*': 10,
        '/': 10,
      },
      stack = [],
      char;
    expression = expression.replace(/\s+/g, '');

    var num = '';

    for (var index in expression) {
      if (expression.hasOwnProperty(index)) {

        char = expression[index];

        if (isOperator(char)) {

          if (num) {
            this.insert(num);
            num = '';
          }

          if (char === '(') {
            stack.push(char)

          } else if (char === ')') {

            do {
              var d = stack.pop();
              if (d !== ')' && d !== '(') {
                this.insert(d);
              }
            } while (d !== '(');

          } else {
            while (order[stack[stack.length - 1]] >= order[char]) {
              this.insert(stack.pop());
            }
            stack.push(char);
          }

        } else if (isNumber(char) || char === '.') {
          num += char;
        }
      }
    }
    if (num) {
      this.insert(num);
    }
    while (stack.length) {
      this.insert(stack.pop());
    }
  }

}

module.exports = ExpressionTree;
