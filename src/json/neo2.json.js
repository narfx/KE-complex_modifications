// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

function main() {
  console.log(
    JSON.stringify(
      {
        title: 'Neo2',
        rules: rules()
      },
      null,
      '  '
    )
  )
}

main()

function rules() {
  // halt defaults to 'false'
  const setMod4 = function(value, halt) {
    return { set_variable: { name: 'neo2_mod_4', value: value }, halt: halt === true ? true : undefined }
  }

  const appleKeyboardIdentifiers = [{ vendor_id: 1452 }, { vendor_id: 76 }, { is_built_in_keyboard: true }]
  const isAppleKeyboard = { type: 'device_if', identifiers: appleKeyboardIdentifiers }
  const ifMod3On = { type: 'variable_if', name: 'neo2_mod_3', value: 1 }
  const ifMod4On = { type: 'variable_if', name: 'neo2_mod_4', value: 1 }
  const ifMod4Locked = { type: 'variable_if', name: 'neo2_mod_4', value: 2 }
  const ifMod4NotLocked = { type: 'variable_unless', name: 'neo2_mod_4', value: 2 }
  const isLayoutActive = {
    type: 'input_source_if',
    input_sources: [
      { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo.*$' }, // match any layout in the Ukelele Neo bundle
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' },
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' },
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' },
      { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' }
    ]
  }

  const neo2Modifiers = function(firstMod3Key, secondMod3Key, firstMod4Key, secondMod4Key, condition) {
    return []
      .concat(
        [firstMod3Key, secondMod3Key].map(function(key) {
          return {
            type: 'basic',
            from: {
              key_code: key,
              modifiers: {
                optional: ['any']
              }
            },
            to: [
              {
                set_variable: {
                  name: 'neo2_mod_3',
                  value: 1
                }
              }
            ],
            to_after_key_up: [
              {
                set_variable: {
                  name: 'neo2_mod_3',
                  value: 0
                }
              }
            ],
            conditions: [isLayoutActive]
          }
        })).concat(
        {
          type: 'basic',
          from: { simultaneous: [{ key_code: firstMod4Key }, { key_code: secondMod4Key }] },
          to: [setMod4(2, true)],
          conditions: condition === undefined ? [isLayoutActive, ifMod4NotLocked] : [isLayoutActive, ifMod4NotLocked, condition]
        },
        {
          type: 'basic',
          from: { simultaneous: [{ key_code: firstMod4Key }, { key_code: secondMod4Key }] },
          to: [setMod4(0)],
          conditions: condition === undefined ? [isLayoutActive, ifMod4Locked] : [isLayoutActive, ifMod4Locked, condition]
        },
        [firstMod4Key, secondMod4Key].map(function(key) {
          return {
            type: 'basic',
            from: { key_code: key, modifiers: { optional: ['any'] } },
            to: [setMod4(1)],
            to_after_key_up: [setMod4(0)],
            conditions: condition === undefined ? [isLayoutActive, ifMod4NotLocked] : [isLayoutActive, ifMod4NotLocked, condition]
          }
        })
      )
  }

  const layer1 = function() {
    return [].concat(
      neo2Layer1(),
      boneLayer1(),
      adnwLayer1(),
      neoQwertzLayer1()
    )
  }

  const neo2Layer1 = function() {
    const l1OptionMappings = [
      { from: 'close_bracket', to: 'r' },
      { from: 'equal_sign', to: 'w' }
    ]

    const l1Mappings = [
      { from: 'quote', to: 'x' },
      { from: 'slash', to: 'c' },
      { from: 'semicolon', to: 'z' },
      { from: 'z', to: 'keypad_7' },
      { from: 'x', to: 'keypad_4' },
      { from: 'c', to: 'keypad_1' },
      { from: 'open_bracket', to: 'keypad_9' },
      { from: 'keypad_1', to: '1' },
      { from: 'keypad_2', to: '2' },
      { from: 'keypad_4', to: '4' },
      { from: 'keypad_5', to: '5' },
      { from: 'keypad_6', to: '6' },
      { from: 'keypad_7', to: '7' },
      { from: 'keypad_8', to: '8' },
      { from: 'keypad_9', to: '9' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l1Mappings.map(function(m) {
          return m.from
        }),
        toKeys: l1Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neo2\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l1OptionMappings.map(function(m) {
          return m.from
        }),
        toKeys: l1OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neo2\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' }
            ]
          }
        ]
      })
    )
  }

  const boneLayer1 = function() {
    const l1OptionMappings = [
      { from: 'close_bracket', to: 'r' },
      { from: 'equal_sign', to: 'w' }
    ]

    const l1Mappings = [
      { from: 'quote', to: 'v' },
      { from: 'slash', to: 'b' },
      { from: 'semicolon', to: 'c' },
      { from: 'keypad_1', to: '1' },
      { from: 'keypad_2', to: '2' },
      { from: 'keypad_4', to: '4' },
      { from: 'keypad_5', to: '5' },
      { from: 'keypad_6', to: '6' },
      { from: 'keypad_7', to: '7' },
      { from: 'keypad_8', to: '8' },
      { from: 'keypad_9', to: '9' },
      { from: 'c', to: 'keypad_7' },
      { from: 'v', to: 'keypad_1' },
      { from: 'b', to: 'keypad_4' },
      { from: 'open_bracket', to: 'keypad_9' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l1Mappings.map(function(m) {
          return m.from
        }),
        toKeys: l1Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(bone\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l1OptionMappings.map(function(m) {
          return m.from
        }),
        toKeys: l1OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(bone\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' }
            ]
          }
        ]
      })
    )
  }

  const adnwLayer1 = function() {
    const l1OptionMappings = [
      { from: 'close_bracket', to: 't' }
    ]

    const l1Mappings = [
      { from: 'slash', to: 'v' },
      { from: 'semicolon', to: 'r' },
      { from: 'open_bracket', to: 'e' },
      { from: 'r', to: 'period' },
      { from: 'period', to: 'c' },
      { from: 'comma', to: 't' },
      { from: 'v', to: 'comma' },
      { from: 'c', to: 'keypad_4' },
      { from: 'e', to: 'keypad_7' },
      { from: 't', to: 'keypad_1' },
      { from: 'quote', to: 'keypad_9' },
      { from: 'keypad_1', to: '1' },
      { from: 'keypad_2', to: '2' },
      { from: 'keypad_4', to: '4' },
      { from: 'keypad_5', to: '5' },
      { from: 'keypad_6', to: '6' },
      { from: 'keypad_7', to: '7' },
      { from: 'keypad_8', to: '8' },
      { from: 'keypad_9', to: '9' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l1Mappings.map(function(m) {
          return m.from
        }),
        toKeys: l1Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l1OptionMappings.map(function(m) {
          return m.from
        }),
        toKeys: l1OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' }
            ]
          }
        ]
      })
    )
  }

  const neoQwertzLayer1 = function() {
    const l1OptionMappings = [
      { from: 'close_bracket', to: 't' },
      { from: 'equal_sign', to: 'e' }
    ]

    const l1Mappings = [
      { from: 'open_bracket', to: 'keypad_7' },
      { from: 'quote', to: 'keypad_1' },
      { from: 'semicolon', to: 'keypad_4' },
      { from: 'hyphen', to: 'keypad_9' },
      { from: 'slash', to: 'hyphen' },
      { from: 'keypad_1', to: '1' },
      { from: 'keypad_2', to: '2' },
      { from: 'keypad_4', to: '4' },
      { from: 'keypad_5', to: '5' },
      { from: 'keypad_6', to: '6' },
      { from: 'keypad_7', to: '7' },
      { from: 'keypad_8', to: '8' },
      { from: 'keypad_9', to: '9' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l1Mappings.map(function(m) {
          return m.from
        }),
        toKeys: l1Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neoqwertz\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' }

            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l1OptionMappings.map(function(m) {
          return m.from
        }),
        toKeys: l1OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neoqwertz\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' }
            ]
          }
        ]
      })
    )
  }

  const layer2 = function() {
    return [].concat(
      neo2Layer2(),
      boneLayer2(),
      adnwLayer2(),
      neoQwertzLayer2()
    )
  }

  const neo2Layer2 = function() {
    const l2OptionMappings = [
      { from: '1', to: 'i' },
      { from: '2', to: 'o' },
      { from: '3', to: 'p' },
      { from: '4', to: 'a' },
      { from: '5', to: 's' },
      { from: '7', to: 'd' },
      { from: '8', to: 'f' },
      { from: '9', to: 'g' },
      { from: '0', to: 'h' },
      { from: 'hyphen', to: 'j' },
      { from: 'equal_sign', to: 'k' },
      { from: 'close_bracket', to: 'semicolon' },
      { from: 'period', to: 'v' },
      { from: 'comma', to: 'c' }
    ]

    const l2ShiftMappings = [
      { from: 'semicolon', to: 'z' },
      { from: 'quote', to: 'x' },
      { from: 'slash', to: 'c' },
      { from: '6', to: '4' }
    ]

    const l2Mappings = [
      { from: 'z', to: 'keypad_8' },
      { from: 'x', to: 'keypad_5' },
      { from: 'c', to: 'keypad_2' },
      { from: 'open_bracket', to: 'keypad_6' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l2OptionMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neo2\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2Mappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neo2\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2ShiftMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2ShiftMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['shift'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neo2\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeo2$' }
            ]
          }
        ]
      })
    )
  }

  const boneLayer2 = function() {
    const l2OptionMappings = [
      { from: '1', to: 'i' },
      { from: '2', to: 'o' },
      { from: '3', to: 'p' },
      { from: '4', to: 'a' },
      { from: '5', to: 's' },
      { from: '7', to: 'd' },
      { from: '8', to: 'f' },
      { from: '9', to: 'g' },
      { from: '0', to: 'h' },
      { from: 'hyphen', to: 'j' },
      { from: 'equal_sign', to: 'k' },

      { from: 'close_bracket', to: 'semicolon' },
      { from: 'period', to: 'v' },
      { from: 'comma', to: 'c' }
    ]

    const l2ShiftMappings = [
      { from: 'semicolon', to: 'c' },
      { from: 'quote', to: 'v' },
      { from: 'slash', to: 'b' },
      { from: '6', to: '4' }
    ]

    const l2Mappings = [
      { from: 'c', to: 'keypad_8' },
      { from: 'v', to: 'keypad_2' },
      { from: 'b', to: 'keypad_5' },
      { from: 'open_bracket', to: 'keypad_6' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l2OptionMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(bone\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2Mappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(bone\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2ShiftMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2ShiftMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['shift'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(bone\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschBone$' }
            ]
          }
        ]
      })
    )
  }

  const adnwLayer2 = function() {
    const l2OptionMappings = [
      { from: '1', to: 'i' },
      { from: '2', to: 'o' },
      { from: '3', to: 'p' },
      { from: '4', to: 'a' },
      { from: '5', to: 's' },
      { from: '7', to: 'd' },
      { from: '8', to: 'f' },
      { from: '9', to: 'g' },
      { from: '0', to: 'h' },
      { from: 'hyphen', to: 'j' },
      { from: 'equal_sign', to: 'vk_none' },
      { from: 'v', to: 'c' },
      { from: 'r', to: 'l' }
    ]

    const l2ShiftMappings = [
      { from: 'semicolon', to: 'r' },
      { from: 'slash', to: 'v' },
      { from: 'period', to: 'c' },
      { from: 'comma', to: 't' },
      { from: '6', to: '4' },
      { from: 'open_bracket', to: 'e' },
      { from: 'close_bracket', to: 'p' }
    ]

    const l2Mappings = [
      { from: 'c', to: 'keypad_5' },
      { from: 'e', to: 'keypad_8' },
      { from: 't', to: 'keypad_2' },
      { from: 'quote', to: 'keypad_6' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l2OptionMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2Mappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2ShiftMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2ShiftMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['shift'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschADNW$' }
            ]
          }
        ]
      })
    )
  }

  const neoQwertzLayer2 = function() {
    const l2OptionMappings = [
      { from: '1', to: 'i' },
      { from: '2', to: 'o' },
      { from: '3', to: 'p' },
      { from: '4', to: 'a' },
      { from: '5', to: 's' },
      { from: '7', to: 'd' },
      { from: '8', to: 'f' },
      { from: '9', to: 'g' },
      { from: '0', to: 'h' },
      { from: 'equal_sign', to: 'k' },
      { from: 'close_bracket', to: 'semicolon' },
      { from: 'slash', to: 'v' },
      { from: 'comma', to: 'x' }
    ]

    const l2ShiftMappings = [
      { from: '6', to: '4' }
    ]

    const l2Mappings = [
      { from: 'open_bracket', to: 'keypad_8' },
      { from: 'quote', to: 'keypad_2' },
      { from: 'semicolon', to: 'keypad_5' },
      { from: 'hyphen', to: 'keypad_6' }
    ]

    return [].concat(
      eachKey({
        fromKeys: l2OptionMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2OptionMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['option'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neoqwertz\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2Mappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2Mappings.map(function(m) {
          return m.to
        }),
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neoqwertz\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' }
            ]
          }
        ]
      }),
      eachKey({
        fromKeys: l2ShiftMappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { mandatory: ['shift'] },
        toKeys: l2ShiftMappings.map(function(m) {
          return m.to
        }),
        toModifiers: ['shift'],
        conditions: [
          {
            type: 'input_source_if',
            input_sources: [
              { input_source_id: '^org\\.sil\\.ukelele.keyboardlayout\\.neo\\.deutsch\\(neoqwertz\\)' },
              { input_source_id: '^org\\.unknown\\.keylayout\\.DeutschNeoQwertz$' }
            ]
          }
        ]
      })
    )
  }

  const layer3 = function(swapGraveAccentAndTildeAndNonUsBackslash, condition) {
    return [].concat(
      eachKey({
        fromKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'open_bracket', 'close_bracket', 'hyphen', 'equal_sign'],
        fromModifiers: { optional: ['any'] },
        toKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'open_bracket', 'close_bracket', 'hyphen', 'equal_sign'],
        toModifiers: ['option'],
        conditions: [isLayoutActive, ifMod3On]
      }),
      eachKey({
        fromKeys: ['e', 'r', 'o', 'a', 's', 'l', 'b', 'period', 'slash'],
        fromModifiers: { optional: ['any'] },
        toKeys: ['open_bracket', 'close_bracket', 'equal_sign', 'backslash', 'slash', 'hyphen', 'non_us_backslash', 'quote', 'semicolon'],
        conditions: [isLayoutActive, ifMod3On]
      }),
      eachKey({
        fromKeys: ['w', 't', 'y', 'u', 'i', 'p', 'd', 'f', 'g', 'h', 'j', 'k', 'semicolon', 'quote', 'z', 'x', 'c', 'v', 'n', 'm', 'comma'],
        fromModifiers: { optional: ['any'] },
        toKeys: ['hyphen', '6', '1', 'comma', 'period', '7', 'open_bracket', 'close_bracket', '8', 'slash', '9', '0', 'semicolon', '2', '3', '4', 'backslash', 'non_us_backslash', 'equal_sign', '5', 'quote'],
        toModifiers: ['shift'],
        conditions: [isLayoutActive, ifMod3On]
      }),
      swapGraveAccentAndTildeAndNonUsBackslash ?
        eachKey({
          fromKeys: ['grave_accent_and_tilde'],
          fromModifiers: { optional: ['any'] },
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['option'],
          conditions: condition === undefined ? [isLayoutActive, ifMod3On] : [isLayoutActive, ifMod3On, condition]
        }) : eachKey({
          fromKeys: ['non_us_backslash'],
          fromModifiers: { optional: ['any'] },
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['option'],
          conditions: [isLayoutActive, ifMod3On]
        })
    )
  }

  const layer4 = function(swapGraveAccentAndTildeAndNonUsBackslash, condition) {
    const l4Mappings = [
      // navigation keys
      { from: 'd', to: 'down_arrow' },
      { from: 'e', to: 'up_arrow' },
      { from: 's', to: 'left_arrow' },
      { from: 'f', to: 'right_arrow' },
      { from: 'q', to: 'page_up' },
      { from: 't', to: 'page_down' },

      // escape
      { from: 'z', to: 'escape' },

      // deletion
      { from: 'w', to: 'delete_or_backspace' },
      { from: 'r', to: 'delete_forward' },

      // Neo num pad in layer 4
      { from: 'm', to: '1' },
      { from: 'comma', to: '2' },
      { from: 'period', to: '3' },
      { from: 'j', to: '4' },
      { from: 'k', to: '5' },
      { from: 'l', to: '6' },
      { from: 'u', to: '7' },
      { from: 'i', to: '8' },
      { from: 'o', to: '9' },
      { from: 'spacebar', to: 'keypad_0' },
      { from: '9', to: 'keypad_slash' },
      { from: '0', to: 'keypad_asterisk' },
      { from: 'hyphen', to: 'keypad_hyphen' },
      { from: 'p', to: 'keypad_plus' },
      { from: 'v', to: 'return_or_enter' },
      { from: 'quote', to: 'period' },
      { from: 'semicolon', to: 'comma' },

      // tab
      { from: 'x', to: 'tab' },
      { from: '8', to: 'tab' },

      // physical num pad layer 4
      { from: 'keypad_0', to: 'insert' },
      { from: 'keypad_1', to: 'end' },
      { from: 'keypad_2', to: 'down_arrow' },
      { from: 'keypad_3', to: 'page_down' },
      { from: 'keypad_4', to: 'left_arrow' },
      { from: 'keypad_5', to: 'page_down' },
      { from: 'keypad_6', to: 'right_arrow' },
      { from: 'keypad_7', to: 'home' },
      { from: 'keypad_8', to: 'up_arrow' },
      { from: 'keypad_9', to: 'page_up' },
      { from: 'keypad_period', to: 'delete_or_backspace' }
    ]

    const l4DeadKeyMappings = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      'hyphen',
      'equal_sign',
      'open_bracket',
      'close_bracket',
      'y',
      'h',
      'keypad_plus',
      'keypad_hyphen',
      'keypad_asterisk',
      'keypad_slash',
      'keypad_num_lock'
    ]

    return [].concat(
      eachKey({
        fromKeys: l4Mappings.map(function(m) {
          return m.from
        }),
        fromModifiers: { optional: ['shift', 'caps_lock', 'command', 'left_option'] },
        toKeys: l4Mappings.map(function(m) {
          return m.to
        }),
        conditions: [isLayoutActive, ifMod4On]
      }),
      eachKey({
        fromKeys: ['n', 'slash'],
        fromModifiers: { optional: ['shift', 'caps_lock', 'command', 'left_option'] },
        toKeys: ['semicolon', 'slash'],
        toModifiers: ['right_option'],
        conditions: [isLayoutActive, ifMod4On]
      }),
      eachKey({
        fromKeys: ['b', 'c', 'a', 'g'],
        fromModifiers: { optional: ['shift', 'caps_lock', 'left_option'] },
        toKeys: ['b', 'w', 'left_arrow', 'right_arrow'],
        toModifiers: ['left_command'],
        conditions: [isLayoutActive, ifMod4On]
      }),
      eachKey({
        fromKeys: l4DeadKeyMappings,
        toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
        toKeys: l4DeadKeyMappings,
        toModifiers: ['left_shift'],
        conditions: [isLayoutActive, ifMod4On]
      }),
      swapGraveAccentAndTildeAndNonUsBackslash ?
        eachKey({
          fromKeys: ['grave_accent_and_tilde'],
          toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['left_shift'],
          conditions: condition === undefined ? [isLayoutActive, ifMod4On] : [isLayoutActive, ifMod4On, condition]
        }) : eachKey({
          fromKeys: ['non_us_backslash'],
          toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['left_shift'],
          conditions: [isLayoutActive, ifMod4On]
        })
    )
  }

  const layer5And6Mapping = [].concat(
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'hyphen', 'equal_sign'],
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', 'comma', 'period', 'slash']
  )

  const layer5 = function(swapGraveAccentAndTildeAndNonUsBackslash, condition) {
    return [].concat(
      eachKey({
        fromKeys: layer5And6Mapping,
        fromModifiers: { mandatory: ['left_shift'] },
        toKeys: layer5And6Mapping,
        toModifiers: ['left_shift', 'left_option'],
        conditions: [isLayoutActive, ifMod3On]
      }),
      swapGraveAccentAndTildeAndNonUsBackslash ?
        eachKey({
          fromKeys: ['grave_accent_and_tilde'],
          fromModifiers: { mandatory: ['left_shift'] },
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['left_shift', 'left_option'],
          conditions: condition === undefined ? [isLayoutActive, ifMod3On] : [isLayoutActive, ifMod3On, condition]
        }) : eachKey({
          fromKeys: ['non_us_backslash'],
          fromModifiers: { mandatory: ['left_shift'] },
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['left_shift', 'left_option'],
          conditions: [isLayoutActive, ifMod3On]
        })
    )
  }

  const layer6 = function(swapGraveAccentAndTildeAndNonUsBackslash, condition) {
    return [].concat(
      eachKey({
        fromKeys: layer5And6Mapping,
        toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
        toKeys: layer5And6Mapping,
        toModifiers: ['left_shift', 'left_option'],
        conditions: [isLayoutActive, ifMod4On, ifMod3On]
      }),
      swapGraveAccentAndTildeAndNonUsBackslash ?
        eachKey({
          fromKeys: ['grave_accent_and_tilde'],
          toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['left_shift', 'left_option'],
          conditions: condition === undefined ? [isLayoutActive, ifMod4On, ifMod3On] : [isLayoutActive, ifMod4On, ifMod3On, condition]
        }) : eachKey({
          fromKeys: ['non_us_backslash'],
          toPreKeys: [{ key_code: 'page_down', modifiers: ['left_option', 'left_shift'] }],
          toKeys: ['grave_accent_and_tilde'],
          toModifiers: ['left_shift', 'left_option'],
          conditions: [isLayoutActive, ifMod4On, ifMod3On]
        })
    )
  }

  return [
    {
      description: 'Neo2 layers (Apple keyboards). Rule applied to Apple keyboards only.',
      manipulators: []
        .concat(neo2Modifiers('caps_lock', 'backslash', 'grave_accent_and_tilde', 'right_command', isAppleKeyboard))
        .concat(layer6(true, isAppleKeyboard))
        .concat(layer5(true, isAppleKeyboard))
        .concat(layer4(true, isAppleKeyboard))
        .concat(layer3(true, isAppleKeyboard))
        .concat(layer2())
        .concat(layer1())
        .concat(
          eachKey({
            fromKeys: ['non_us_backslash'],
            fromModifiers: { optional: ['any'] },
            toKeys: ['grave_accent_and_tilde'],
            conditions: [isLayoutActive, isAppleKeyboard]
          })
        )
    },
    {
      description: 'Neo2 layers (Mac keyboards). Rule applied to third party Mac keyboards. Can be used together with the Apple keyboard rule or alone.',
      manipulators: []
        .concat(neo2Modifiers('caps_lock', 'backslash', 'grave_accent_and_tilde', 'right_command'))
        .concat(layer6(false))
        .concat(layer5(false))
        .concat(layer4(false))
        .concat(layer3(false))
        .concat(layer2())
        .concat(layer1())
        .concat(
          eachKey({
            fromKeys: ['non_us_backslash'],
            fromModifiers: { optional: ['any'] },
            toKeys: ['grave_accent_and_tilde'],
            conditions: [isLayoutActive]
          })
        )
    },
    {
      description: 'Neo2 layers (PC keyboards). Rule applied to PC keyboards only. Can\'t be used with the other Mac Neo2 layer rule together, but can be used with the Apple keyboard rule or alone.',
      manipulators: []
        .concat(neo2Modifiers('caps_lock', 'non_us_pound', 'non_us_backslash', 'right_option'))
        .concat(layer6(true))
        .concat(layer5(true))
        .concat(layer4(true))
        .concat(layer3(true))
        .concat(layer2())
        .concat(layer1())
    },
    {
      description: 'Toggle caps_lock by pressing left_shift + right_shift at the same time',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'left_shift', modifiers: { mandatory: ['right_shift'], optional: ['caps_lock'] } },
          to: [{ key_code: 'caps_lock' }],
          to_if_alone: [{ key_code: 'left_shift' }]
        },
        {
          type: 'basic',
          from: { key_code: 'right_shift', modifiers: { mandatory: ['left_shift'], optional: ['caps_lock'] } },
          to: [{ key_code: 'caps_lock' }],
          to_if_alone: [{ key_code: 'right_shift' }]
        }
      ]
    },
    {
      description: 'Tab acts as Ctrl if pressed with another key',
      manipulators: [
        {
          type: 'basic',
          from: { key_code: 'tab', modifiers: { optional: ['shift', 'option', 'command'] } },
          to: [{ key_code: 'left_control' }],
          to_if_alone: [{ key_code: 'tab' }]
        }
      ]
    },
    {
      description: 'Neo2 mod 4: Map ↖ to Home and ↘︎ to End in terminal apps, remote desktop apps and virtual machines.  (move this rule above other Neo2 rules).',
      manipulators: eachKey({
        fromKeys: ['a', 'g'],
        fromModifiers: { optional: ['shift', 'caps_lock', 'left_option'] },
        toKeys: ['home', 'end'],
        conditions: [
          isLayoutActive,
          ifMod4On,
          {
            type: 'frontmost_application_if',
            bundle_identifiers: [].concat(
              // --- Comment to prevent line combination by Prettier ---
              karabiner.bundleIdentifiers.terminal,
              karabiner.bundleIdentifiers.remoteDesktop,
              karabiner.bundleIdentifiers.virtualMachine
            )
          }
        ]
      })
    }
  ]
}

function eachKey(options) {
  const result = []

  for (var i in options.fromKeys) {
    const fromKey = options.fromKeys[i]
    const toKey = options.toKeys[i]

    result.push({
      type: 'basic',
      from: {
        key_code: fromKey,
        modifiers: options.fromModifiers
      },
      to: [].concat(options.toPreKeys !== undefined ? options.toPreKeys : [], [
        {
          key_code: toKey,
          modifiers: options.toModifiers
        }
      ]),
      conditions: options.conditions
    })
  }

  return result
}
