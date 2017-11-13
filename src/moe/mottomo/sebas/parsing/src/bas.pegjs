// BAS Grammar
// ==========================

Program
  = _ defs:DefObject* _ sets:SerialSet*

/*
ParallelSetUnit
  = _ items:(SetBlock / SetList)+ {
  }

SetBlock
  = _ "{" sets:ParallelSetUnit? _ "}" {
  }
*/

SerialSet
  = _ first:SetExpr thens:(_ "then" _ SetExpr)* {
    const commands = [first];
    
    if (thens && thens.length > 0) {
      for (let i = 0; i < thens.length; ++i) {
        commands.push(thens[i][3]);
      }
    }

    return {
      "type": "serial",
      "commands": commands
    };
  }

SetExpr
  = _ "set" target:SetTarget options:SetOptions {
    return {
      "target": target,
      "options": options
    };
  }

SetTarget
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

SetOptions
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

DefObject
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
  = TimeValue / StringValue / IntegerValue / FloatValue

TimeValue
  = minutes:IntegerValue "m" seconds:_TimeSecondsValue? {
    let value = minutes * 60;
    
    if (seconds) {
      value += seconds;
    }

    return value;
  }
  / _TimeSecondsValue

_TimeSecondsValue
  = seconds:IntegerValue "s" {
    return seconds;
  }

StringValue
  = '"'[^"]*'"' { // TODO: fix this
    const val = text();
    return val.substring(1, val.length - 1);
  }

IntegerValue
  = _HexIntegerValue
  / _DecIntegerValue

_HexIntegerValue
 = ("+" / "-")? "0" ("X" / "x") [0-9A-Fa-f]+ {
    const val = text();
    return Number.parseInt(val.substring(2), 16);
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
