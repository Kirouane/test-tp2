var UserRepository = require('../../../src/repository/UserRepository');

describe("UserRepository", function() {
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

describe("UserRepository FindOneById", function() {
    it("should return existing user", function() {
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue({
            id: '123',
            firstname: 'Jean',
            lastname: 'Test',
            birthday: '21-01-2018'
        });
        var repository = new UserRepository(mockDb);
        var user = repository.findOneById('123');
        expect(user.id).toEqual('123');
        expect(user.firstname).toEqual('Jean');
        expect(user.lastname).toEqual('Test');
        expect(user.birthday).toEqual('21-01-2018');
      });
});

describe("UserRepository Update", function() {
    it("should update existing user", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find','assign','write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.assign.and.returnValue(mockDb);


        var repository = new UserRepository(mockDb);    
        var user = repository.update({
            id : 123,
            firstname: 'Jean',
            lastname : 'Test',
            birthday : '21-01-2018'
        });

        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });
});

describe("UserRepository Delete",function(){
     var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write','find','assign','remove']);
     mockDb.get.and.returnValue(mockDb);
     mockDb.push.and.returnValue(mockDb);
     mockDb.find.and.returnValue(mockDb);
     mockDb.assign.and.returnValue(mockDb);
     mockDb.remove.and.returnValue(mockDb);
     var repository = new UserRepository(mockDb);

     repository.create({
        id : 1,
        firstname: 'Jean',
        lastname : 'Test',
        birthday : '21-01-2018'
    });

    it("UserRepository.update should call mockDb.remove",function(){
        repository.delete(1);
        expect(mockDb.remove).toHaveBeenCalledWith({
            'id' : 1
        });
        expect(mockDb.remove).toHaveBeenCalledTimes(1)
    });
        
});
