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

describe("UserRepository - findOneById", function(){
    it("should throw exception missing id", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.findOneById();
        }
        expect(f).toThrow("User id is undefined");
    })

    it("should throw exception user does not exist", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        var repository = new UserRepository(mockDb);
        var f = function(){
            repository.findOneById(100);
        }
        expect(f).toThrow("User does not exist");
        expect(mockDb.find).toHaveBeenCalledWith({'id':100})
        expect(mockDb.find).toHaveBeenCalledTimes(1)
    })

    it("should return the user object", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue(mockDb);
        var repository = new UserRepository(mockDb);
        var f = repository.findOneById(1);
        expect(f).toBeDefined();
        expect(mockDb.find).toHaveBeenCalledWith({'id':1})
        expect(mockDb.find).toHaveBeenCalledTimes(1)
        expect(mockDb.value).toHaveBeenCalledTimes(1)
    })
})