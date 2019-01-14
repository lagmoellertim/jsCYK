class CYK{
  constructor(grammar, startstate) {
    var self = this
    self.grammar = grammar
    self.startstate = startstate
  }

  __getValidCombinations(left_collection_set, right_collection_set){
    var self = this
    var valid_combinations = []
    for(var num_collection in left_collection_set){
      var left_collection = left_collection_set[num_collection]
      var right_collection = right_collection_set[num_collection]
      for(var left_item in left_collection){
        for(var right_item in right_collection){
          var combination = left_collection[left_item] + right_collection[right_item]
          for (var key in self.grammar) {
            var value = self.grammar[key]
            for (var item in value){
              if(value[item] == combination && valid_combinations.indexOf(key) == -1){
                valid_combinations.push(key)
              }
            }
          }
        }
      }
    }
    return valid_combinations
  }

  __getCollectionSets(full_table, x_position, x_offset){
    var self = this
    var table_segment = []
    var y_position = 0
    while(x_offset >= 2){
      var item_set = full_table[y_position].slice(x_position,x_position+x_offset)
      if(x_offset > item_set.length){
        return null
      }
      table_segment.push(item_set)
      x_offset -= 1
      y_position += 1
    }
    var vertical_combinations = []
    var horizontal_combinations = []
    for(var item in table_segment){
      vertical_combinations.push(table_segment[item][0])
      horizontal_combinations.push(table_segment[item][table_segment[item].length - 1])
    }
    vertical_combinations = vertical_combinations.reverse()
    return [vertical_combinations, horizontal_combinations]
  }

  __generateTable(word){
    var self = this
    var table = [[]]
    for(var letter in word){
      var valid_states = []
      for(var key in self.grammar){
        var value = self.grammar[key]
        if(value.indexOf(word[letter]) != -1){
          valid_states.push(key)
        }
      }
      table[0].push(valid_states)
    }
    for (var x_offset = 2; x_offset < word.length+1; x_offset++) {
      table.push([])
      for(var x_position = 0; x_position < word.length; x_position++){
        var collection_sets = self.__getCollectionSets(table, x_position, x_offset)
        if(collection_sets != null){
          table[table.length - 1].push(self.__getValidCombinations(collection_sets[0],collection_sets[1]))
        }
      }
    }
    return table
  }

  checkWord(word){
    var self = this
    var table =  self.__generateTable(word)
    return table[table.length - 1][table[table.length - 1].length - 1].indexOf(self.startstate) != -1
  }

  outputTable(word){
    var self = this
    var table = self.__generateTable(word)
    console.log(word)
    console.log("----------")
    for(var row in table){
      console.log(table[row])
    }
  }
}