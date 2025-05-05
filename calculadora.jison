%lex
%%
\s+                   /* ignora espaços em branco */
\+                    return '+';
\-                    return '-';
\*                    return '*';
\/                    return '/';
\(                    return '(';
\)                    return ')';
[0-9]+                return 'NUM';
<<EOF>>               return 'EOF';
.                     return 'INVALID';
/lex

%start expressao

%%

expressao
    : e EOF
        { return $1; }
    ;

e
    : e '+' t
        { $$ = $1 + $3; }
    | e '-' t
        { $$ = $1 - $3; }
    | t
        { $$ = $1; }
    ;

t
    : t '*' f
        { $$ = $1 * $3; }
    | t '/' f
        { $$ = $1 / $3; }
    | f
        { $$ = $1; }
    ;

f
    : '(' e ')'
        { $$ = $2; }
    | NUM
        { $$ = Number(yytext); }
    ;