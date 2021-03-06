// Generated by CoffeeScript 1.9.1
(function() {
  define((function(_this) {
    return function(require) {
      var Parser;
      Parser = require("SQL_Engine/SQL_Parser");
      return describe("SQL_Parser", function() {
        var parser;
        parser = null;
        beforeEach(function() {
          return parser = new Parser();
        });
        it("should be defined", function() {
          return expect(Parser).toBeDefined();
        });
        it('should have parse method', function() {
          return expect(parser.parse).toEqual(jasmine.any(Function));
        });
        describe('SELECT', function() {
          it('should be able to parse simple select query', function() {
            var result;
            result = parser.parse('SELECT * FROM users');
            return expect(result).toEqual({
              select: {
                columns: '*',
                from: 'users'
              }
            });
          });
          it('should be able to parse simple select query with specified property', function() {
            var result;
            result = parser.parse('SELECT users.name FROM users');
            return expect(result).toEqual({
              select: {
                columns: [
                  {
                    table: 'users',
                    column: 'name'
                  }
                ],
                from: 'users'
              }
            });
          });
          return it('should be able to parse simple select query with a list of fields', function() {
            var result;
            result = parser.parse('SELECT movies.title, movies.id FROM movies');
            return expect(result).toEqual({
              select: {
                columns: [
                  {
                    table: 'movies',
                    column: 'title'
                  }, {
                    table: 'movies',
                    column: 'id'
                  }
                ],
                from: 'movies'
              }
            });
          });
        });
        describe('JOIN', function() {
          it('should be able parse simple JOIN section', function() {
            var result;
            result = parser.parse('JOIN movies ON users.id = movies.userID');
            return expect(result).toEqual({
              join: [
                {
                  table: 'movies',
                  columns: {
                    left: {
                      table: 'users',
                      column: 'id'
                    },
                    right: {
                      table: 'movies',
                      column: 'userID'
                    }
                  }
                }
              ]
            });
          });
          return it('should be able parse multiple join operation', function() {
            var result;
            result = parser.parse('JOIN movies ON users.id = movies.userID\nJOIN actors ON actors.id = movies.actorID');
            return expect(result).toEqual({
              join: [
                {
                  table: 'movies',
                  columns: {
                    left: {
                      table: 'users',
                      column: 'id'
                    },
                    right: {
                      table: 'movies',
                      column: 'userID'
                    }
                  }
                }, {
                  table: 'actors',
                  columns: {
                    left: {
                      table: 'actors',
                      column: 'id'
                    },
                    right: {
                      table: 'movies',
                      column: 'actorID'
                    }
                  }
                }
              ]
            });
          });
        });
        describe('WHERE', function() {
          it('should be able to parse WHERE', function() {
            var comparator, i, len, ref, result, results;
            ref = ['>=', '<=', '>', '<', '<>', '='];
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              comparator = ref[i];
              result = parser.parse("WHERE movies.id " + comparator + " users.moviesID");
              results.push(expect(result).toEqual({
                where: {
                  left: {
                    table: 'movies',
                    column: 'id'
                  },
                  right: {
                    table: 'users',
                    column: 'moviesID'
                  },
                  operand: comparator
                }
              }));
            }
            return results;
          });
          return it('should be able to parse WHERE and compare numbers, strings, boolean', function() {
            var result;
            result = parser.parse("WHERE movies.id = 5");
            return expect(result).toEqual({
              where: {
                left: {
                  table: 'movies',
                  column: 'id'
                },
                right: '5',
                operand: '='
              }
            });
          });
        });
        return describe('complex query', function() {
          return it('should be able to parse complex query', function() {
            var result;
            result = parser.parse('SELECT movies.title, movies.id\nFROM movies\nJOIN movies ON users.id= movies.userID\nJOIN actors ON actors.id = movies.actorID\nWHERE movies.id <= users.movieID');
            return expect(result).toEqual({
              select: {
                columns: [
                  {
                    table: 'movies',
                    column: 'title'
                  }, {
                    table: 'movies',
                    column: 'id'
                  }
                ],
                from: 'movies'
              },
              join: [
                {
                  table: 'movies',
                  columns: {
                    left: {
                      table: 'users',
                      column: 'id'
                    },
                    right: {
                      table: 'movies',
                      column: 'userID'
                    }
                  }
                }, {
                  table: 'actors',
                  columns: {
                    left: {
                      table: 'actors',
                      column: 'id'
                    },
                    right: {
                      table: 'movies',
                      column: 'actorID'
                    }
                  }
                }
              ],
              where: {
                left: {
                  table: 'movies',
                  column: 'id'
                },
                right: {
                  table: 'users',
                  column: 'movieID'
                },
                operand: '<='
              }
            });
          });
        });
      });
    };
  })(this));

}).call(this);

//# sourceMappingURL=SQL_ParserSpec.js.map
