// BAS Grammar
// ==========================

{
  function wrapPrimitive(type, value) {
    return {
      "type": type,
      "value": value
    };
  }
}

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
      "value": value
    };
  }
  / _ name:ID _ "=" value: InterpolationTargetValue {
    return {
      "name": name,
      "value": value
    };
  }

SimpleSetOptions
  = _ duration:TimeValue interp:_InterpolationMethod? {
    const interpolation = interp ? interp : wrapPrimitive("string", "linear");
    const result = {
      "duration": duration,
      "defaultInterpolationMethod": interpolation
    };

    return result;
  }

InterpolationTargetValue
  = _ "[" _ targetValue:PrimitiveValue interp:_InterpolationMethod? _ "]" {
    return {
      "type": "interpolation",
      "value": {
        "targetValue": targetValue,
        "method": interp // this can be null or empty
      }
    };
  }

_InterpolationMethod
  = _ "," _ str:StringValue {
    return str ? str : wrapPrimitive("string", "linear");
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
      "value": value
    };
  }
  / _ name:ID _ "=" _ value:PrimitiveValue {
    return {
      "name": name,
      "value": value
    };
  }

PrimitiveValue "primitive"
  = TimeValue / StringValue / NumberValue

TimeValue
  = minutes:_FloatValue "m" seconds:_TimeSecondsValue? {
    let value = minutes.value * 60;
    
    if (seconds) {
      value += seconds.value;
    }

    return wrapPrimitive("time", value);
  }
  / _TimeSecondsValue

_TimeSecondsValue
  = seconds:_FloatValue "s" {
    return wrapPrimitive("time", seconds.value);
  }

// String matching rules: https://stackoverflow.com/a/34019313

StringValue
  = '"' chars:_DoubleStringCharacter* '"' {
    return wrapPrimitive("string", chars.join(""));
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

NumberValue
  = _HexIntegerValue
  / _PercentageValue
  / _FloatValue
  / _DecIntegerValue

_HexIntegerValue
  = ("+" / "-")? "0" ("X" / "x") [0-9A-Fa-f]+ {
    return wrapPrimitive("number", Number.parseInt(text()));
  }

_DecIntegerValue
  = ("+" / "-")? [1-9][0-9]* { 
    return wrapPrimitive("number", Number.parseInt(text()));
  }

_FloatValue
  = ("+" / "-")? ([0-9]+ ("." [0-9]*)? / "." [0-9]+) {
    return wrapPrimitive("number", Number.parseFloat(text()));
  }

_PercentageValue
  = float:_FloatValue "%" {
    return wrapPrimitive("percentage", float.value);
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
