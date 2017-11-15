interface BasGrammarLocation {

    start: Loc;
    end: Loc;

}

interface Loc {

    offset: number;
    line: number;
    column: number;

}

export default BasGrammarLocation;
