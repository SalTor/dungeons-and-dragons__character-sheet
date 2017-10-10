'use strict'

Number.isNaN = require('is-nan')

export const isDefined = o => (typeof o !== 'undefined') && o !== null

export const isNumeric = n => isDefined(n) && !Number.isNaN(n) && (typeof n === 'number')

export const isString = s => isDefined(s) && (typeof s === 'string')

export const isArray = a => isDefined(a) && Array.isArray(a)

export const isObject = o => isDefined(o) && (typeof o === 'object') && !isArray(o)

export const isBoolean = b => isDefined(b) && (typeof b === typeof true)