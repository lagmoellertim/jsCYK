# jsCYK

1. Details

2. How to use jsCYK

3. Credits

## 1. Details

- jsCYK is an implementation of the [Cocke-Younger-Kasami-Algorithm](https://en.wikipedia.org/wiki/CYK_algorithm) in JavaScript

- It is used to check if a string is part of a grammar

- The grammar has to be context-free and in the [Chomsky normal form](https://en.wikipedia.org/wiki/Chomsky_normal_form)

## 2. How to use jsCYK

### 2.1 Installation

This algorithm can be used in the browser or any other JavaScript environment. To use it in the browser, type:

```
<script src="https://raw.githubusercontent.com/lagmoellertim/jsCYK/master/cyk.js"></script>
```

## 2.2 Usage

To use jsCYK, you need to define a [startstate](https://en.wikipedia.org/wiki/Finite-state_machine#Start_state), the grammar and the word. This is an example for it:

```javascript
var startstate = "S"

grammar_yt_vid = {
    S:["SA","a"],
    A:["BS"],
    B:["BB","BS","b","c"]
}

word = "abacba"
```

Next, you need to create an object of the jsCYK class, which includes the startstate and the grammar.

```javascript
cyk = new CYK(grammar_yt_vid, startstate)
```

To check whether a word is part of the language or not, use this:

```javascript
cyk.checkWord(word) //Returns true or false
```

If you want to see the table that is generated as a part of this algorithm, use this:

```javascript
cyk.outputTable(word)
```

# 3. License

This implementation is published under the MIT License.

# 4. Credits

This implementation is developed by Tim-Luca Lagmöller.
