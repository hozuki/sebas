// BAS Grammar
// ==========================

Program
  = _ defs:DefStatement* _ sets:SetStatement*

SetStatement
  = _ first:SetStatementUnit then:(_ "then" _ SetStatement)* {
    let thenArray;

    if (then && then.length > 0) {
      thenArray = [];

      for (let i = 0; i < then.length; ++i) {
        thenArray.push(then[i][3]);
      }
    } else {
      thenArray = null;
    }

    return {
      "first": first,
      "then": thenArray
    };
  }

SetStatementUnit
  = _ "{" sets:SetStatement* _ "}" {
    if (sets && sets.length > 0) {
      return sets;
    } else {
      return null;
    }
  }
  / _ "set" target:SimpleSetTarget options:SimpleSetOptions {
    return {
      "target": target,
      "options": options
    };
  }

SimpleSetTarget
  = _ name:ID props:SetPropObject {
    return {
      "name": name,
      "properties": props
    };
  }

SetPropObject
  = _ "{" _ list:SetPropItem* _ "}" {
    return list;
  }

SetPropItem
  = _ name:ID _ "=" _ value:PrimitiveValue {
    return {
      "name": name,
      "value": value,
      "type": "primitive"
    };
  }
  / _ name:ID _ "=" value: InterplationTargetValue {
    return {
      "name": name,
      "value": value,
      "type": "animated"
    };
  }

SimpleSetOptions
  = _ duration:TimeValue interp:InterpolationPart? {
    const interpolation = interp ? interp : "linear";
    const result = {
      "duration": duration,
      "defaultInterpolation": interpolation
    };

    return result;
  }

InterpolationPart
  = _ "," _ str:StringValue {
    return str ? str : "linear";
  }

InterplationTargetValue
  = _ "[" _ value:(IntegerValue / FloatValue) interp:InterpolationPart? _ "]" {
    return {
      "value": value,
      "interpolation": interp // this can be null or empty
    };
  }

DefStatement
  = _ "def" _ type:ID _ name:ID props:DefPropObject {
    return {
      "type": type,
      "name": name,
      "properties": props
    };
  }

DefPropObject
  = _ "{" _ list:DefPropItem* _ "}" {
    return list;
  }

DefSubPropObject
  = _ type:ID props:DefPropObject {
    return {
      "type": type,
      "properties": props
    };
  }

DefPropItem
  = _ name:ID _ "=" value:DefSubPropObject {
    return {
      "name": name,
      "value": value,
      "type": "object"
    };
  }
  / _ name:ID _ "=" _ value:PrimitiveValue {
    return {
      "name": name,
      "value": value,
      "type": "primitive"
    };
  }

PrimitiveValue "primitive"
  = TimeValue / StringValue / _HexIntegerValue / FloatValue / _DecIntegerValue // weird but required

TimeValue
  = minutes:FloatValue "m" seconds:_TimeSecondsValue? {
    let value = minutes * 60;
    
    if (seconds) {
      value += seconds;
    }

    return value;
  }
  / _TimeSecondsValue

_TimeSecondsValue
  = seconds:FloatValue "s" {
    return seconds;
  }

// String matching rules: https://stackoverflow.com/a/34019313

StringValue
  = '"' chars:_DoubleStringCharacter* '"' { 
    return chars.join("");
  }

_DoubleStringCharacter
  = !('"' / "\\") char:. {
    return char;
  }
  / "\\" sequence:_EscapeSequence {
    return sequence;
  }

_EscapeSequence
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b"; }
  / "f"  { return "\f"; }
  / "n"  { return "\n"; }
  / "r"  { return "\r"; }
  / "t"  { return "\t"; }
  / "v"  { return "\x0B"; }

IntegerValue
  = _HexIntegerValue
  / _DecIntegerValue

_HexIntegerValue
 = ("+" / "-")? "0" ("X" / "x") [0-9A-Fa-f]+ {
    return Number.parseInt(text());
  }

_DecIntegerValue
  = ("+" / "-")? [1-9][0-9]* { 
    return Number.parseInt(text()); 
  }

FloatValue
  = ("+" / "-")? ([0-9]+ ("." [0-9]*)? / "." [0-9]+) {
    return Number.parseFloat(text());
  }

ID "identifier"
  = [A-Za-z][A-Za-z0-9]* {
    return text();
  }

_ "ignored"
  = (COMMENT / WS)*

WS
  = [ \t\n\r]+

COMMENT
 = "/*" (!"*/" .)* "*/"
 / "//" [^\n]* "\n"
