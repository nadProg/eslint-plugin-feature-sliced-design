/**
 * @fileoverview Check whether import path within a slice is relative
 * @author Eugene Skrobov
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relative-path-within-slice"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("relative-path-within-slice", rule, {
  valid: [
    {
      code: '',
    }
  ],

  invalid: [
    // {
    //   code: "",
    //   errors: [{ message: "Fill me in.", type: "Me too" }],
    // },
  ],
});
