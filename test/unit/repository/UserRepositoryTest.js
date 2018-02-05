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
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue({
            id : 2,
            firstname : 'Bruno',
            lastname : 'Benjamin Pierrot',
            birthday : '1995-09-24'
        });
         
        var repository = new UserRepository(mockDb);

        repository.create({
            id : 2,
            firstname : 'Bruno',
            lastname : 'Benjamin Pierrot',
            birthday : '1995-09-24'
        });

        repository.findOneById(2);

        expect(mockDb.get).toHaveBeenCalledWith('users');
        expect(mockDb.get).toHaveBeenCalledTimes(2);
        expect(mockDb.find).toHaveBeenCalledWith({id: 2});
        expect(mockDb.find).toHaveBeenCalledTimes(1);
        expect(mockDb.value).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.findOneById();
        };

        expect(f).toThrow('User ID is undefined');
    });
});