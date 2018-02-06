var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository", function() {
    /********Tests sur POST ********/
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });

});
 /********Tests sur GET ********/
it("should return existing user", function() {
      var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
      mockDb.get.and.returnValue(mockDb);
      mockDb.find.and.returnValue(mockDb);
      mockDb.value.and.returnValue({
          id: 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
          firstname: 'John',
          lastname : 'Doe',
          birthday : '2000-01-01'
      });

      var repository = new UserRepository(mockDb);
      var user = repository.findOneById('d5b99c94-6dc0-4876-9444-631f85d5faf6');
      expect(user.id).toEqual('d5b99c94-6dc0-4876-9444-631f85d5faf6');
      expect(user.firstname).toEqual('John');
      expect(user.lastname).toEqual('Doe');
      expect(user.birthday).toEqual('2000-01-01');
  });

it("should throw exception id undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.findOneById();
        };

        expect(f).toThrow('User id is undefined')
    });

it("should throw exception user id doesn't exist", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue();
        var repository = new UserRepository(mockDb);
        var f = function(){
            repository.findOneById('test');
        };
        expect(f).toThrow("User id doesn't exist")
    });
 /********Tests sur PUT ********/
it("should return modified user", function() {
      var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'assign','write','value']);
      mockDb.get.and.returnValue(mockDb);
      mockDb.find.and.returnValue(mockDb);
      mockDb.assign.and.returnValue(mockDb);
      mockDb.value.and.returnValue({
          id: 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
          firstname: 'JohnTEST',
          lastname : 'DoeTEST',
          birthday : '2000-01-01'
      });
    var repository = new UserRepository(mockDb);
          var user = repository.update({
            id : 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
            firstname: 'JohnTEST',
            lastname : 'DoeTEST',
            birthday : '2000-01-01'
        });
          expect(user.id).toEqual('d5b99c94-6dc0-4876-9444-631f85d5faf6');
          expect(user.firstname).toEqual('JohnTEST');
          expect(user.lastname).toEqual('DoeTEST');
          expect(user.birthday).toEqual('2000-01-01');
    });

it("should call db.assign and db.write", function() {
      var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'assign','write','value']);
      mockDb.get.and.returnValue(mockDb);
      mockDb.find.and.returnValue(mockDb);
      mockDb.assign.and.returnValue(mockDb);
      mockDb.value.and.returnValue({
          id: 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
          firstname: 'JohnTEST',
          lastname : 'DoeTEST',
          birthday : '2000-01-01'
      });
      var repository = new UserRepository(mockDb);
      var user = repository.update({
            id : 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
            firstname: 'JohnTEST',
            lastname : 'DoeTEST',
        });
        expect(mockDb.assign).toHaveBeenCalledWith({
            firstname: 'JohnTEST',
        });
        expect(mockDb.assign).toHaveBeenCalledWith({
            lastname: 'DoeTEST',
        });
        expect(mockDb.write).toHaveBeenCalledTimes(2);
    });
    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.update();
        };

        expect(f).toThrow('User object is undefined')
    });
    it("should throw exception id undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.update({
            firstname: 'JohnTEST',
            lastname : 'DoeTEST',
            });
        };

        expect(f).toThrow('User id is undefined')
    });

    it("should throw exception user id doesn't exist", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue();
        var repository = new UserRepository(mockDb);
        var f = function(){
            repository.update({
            id : 'fake',
            firstname: 'JohnTEST',
            lastname : 'DoeTEST',
            });
        };
        expect(f).toThrow("User id doesn't exist")
    });
/********Tests sur DELETE ********/
it("should call db.remove and db.write", function() {
      var mockDb = jasmine.createSpyObj('db', ['get', 'find','value','remove', 'write']);
      mockDb.get.and.returnValue(mockDb);
      mockDb.find.and.returnValue(mockDb);
      mockDb.value.and.returnValue({
          id: 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
          firstname: 'JohnTEST',
          lastname : 'DoeTEST',
          birthday : '2000-01-01'
      });
      mockDb.remove.and.returnValue(mockDb);
      mockDb.write.and.returnValue({
          id: 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
          firstname: 'JohnTEST',
          lastname : 'DoeTEST',
          birthday : '2000-01-01'
      });
      var repository = new UserRepository(mockDb);
      var user = repository.delete({
            id : 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
        });
        expect(mockDb.remove).toHaveBeenCalledWith({
          id: 'd5b99c94-6dc0-4876-9444-631f85d5faf6',
          firstname: 'JohnTEST',
          lastname : 'DoeTEST',
          birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });