/* Parser teste para expressoes matematicas */
const Parser = require("jison").Parser;

// Utiliza-se das barras '\\' para escapar os caracteres especiais no regex

const gramatica = {
        "lex": {
            "rules": [
                ["\\s+", "/* ignora espacos em branco */"],
                ["\\+", "return '+';"],
                ["-", "return '-';"],
                ["\\*", "return '*';"],
                ["/", "return '/';"],
                ["\\(", "return '(';"],
                ["\\)", "return ')';"],
                ["[0-9]+", "return 'NUM';"],
                ["$", "return 'EOF';"]
            ]
        },
        "bnf": {
            "expressao": [
                ["e EOF", "return $1;"]
            ],
            "e": [
                ["e + t", "$$ = $1 + $3;"],
                ["e - t", "$$ = $1 - $3;"],
                ["t", "$$ = $1;"]
            ],
            "t": [
                ["t * f", "$$ = $1 * $3;"],
                ["t / f", "$$ = $1 / $3;"],
                ["f", "$$ = $1;"]
            ],
            "f": [
                ["( e )", "$$ = $2;"],
                ["NUM", "$$ = Number(yytext);"]
            ]
        }
}

// Cria o parser com a gramatica definida
const parser = new Parser(gramatica);

// Funcao que calcula a expressao
function calcular(expressao) {
    try {
        return parser.parse(expressao);
    } catch (e) {
        return "Erro na expressão!";
    }
}

// Testando a calculadora
console.log(calcular("2 + 3 * 6")); // Deve retornar 20
console.log(calcular("(2 + 5) * 5")); // Deve retornar 35
console.log(calcular("10 / 2 + 1")); // Deve retornar 6