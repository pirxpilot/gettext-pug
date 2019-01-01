const lexer = require('pug-lexer');
const parser = require('pug-parser');

module.exports = gettextPug;

function normalize(str) {
  if (typeof str !== 'string') {
    return;
  }
  return str.trim();
}

function wrapComment(str) {
  str = normalize(str);
  if (!str) {
    return;
  }
  return `/* ${str} */`;
}

function lines(isComment) {
  const v = [];

  function push(line, str) {
    str = isComment ? wrapComment(str) : normalize(str);
    if (!str) {
      return;
    }
    if (!isComment) {
      str += ';';
    }
    const i = line - 1;
    v[i] = v[i] || '';
    v[i] += str;
  }

  return {
    push,
    value: () => v
  };
}

function extractInterpolation(str) {
  if (str[0] !== '\'' && str[0] !== '"') {
    // not a string
    return;
  }
  const codeFragments = [];
  str.replace(/#{(.+?)}/g, function(expression, code) {
    codeFragments.push(code);
  });
  return codeFragments.join(';');
}

function eachNode(ast, fn) {
  if (!ast) {
    return;
  }
  fn(ast);
  if (Array.isArray(ast.nodes)) {
    ast.nodes.forEach(function(n) {
      eachNode(n, fn);
    });
  }
  eachNode(ast.block, fn);
  eachNode(ast.consequent, fn);
  eachNode(ast.alternate, fn);
}

function extractCode(ast, data) {
  eachNode(ast, function(node) {
    switch (node.type) {
      case 'Comment':
        data.comments.push(node.line, node.val);
        break;
      case 'Code':
        data.code.push(node.line, node.val);
        break;
      case 'Mixin':
        data.code.push(node.line, node.args);
        break;
    }
  });
}

function extractCodeFromAttributeTokens(tokens, data) {
  tokens
    .filter(({ type }) => type === 'attribute')
    .forEach(({ line, val }) => data.code.push(line, extractInterpolation(val) || val));
}

function toJavaScript(data) {
  const code = data.code.value();
  const comments = data.comments.value();
  let lastComment = '';

  for(let l = 0; l < code.length; l++) {
    if (comments[l]) {
      lastComment = comments[l];
    }
    if (code[l] && lastComment) {
      code[l] = `${lastComment} ${code[l]}`;
      lastComment = '';
    }
  }

  code.push('');

  return code.join('\n');
}

function gettextPug(str) {
  const data = {
    code: lines(),
    comments: lines(true)
  };

  const tokens = lexer(str);
  extractCodeFromAttributeTokens(tokens, data);

  const ast = parser(tokens);
  extractCode(ast, data);

  return toJavaScript(data);
}
