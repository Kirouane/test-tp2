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

describe("UserRepository - findOneById",function(){
    var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write','find','value']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.value.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        var one = {
            id : 1,
            firstname: 'One',
            lastname : 'One',
            birthday : '2000-01-01'
        };

        repository.create(one);
        
        //check if id is present
        it("Should throw exception Parameter id is required",function(){
            var f = function(){
                repository.findOneById();
            }
            expect(f).toThrow('Parameter id is required');
        });


        //check if mockDb.find is called
        it("UserRepository.findOneById should call mockDb.find",function(){
            repository.findOneById(1);
            expect(mockDb.find).toHaveBeenCalledWith({
                'id':1
            })
            expect(mockDb.find).toHaveBeenCalledTimes(1)
        })

        //check if object is correcly returned
        it("UserRepository.findOneById(1) should be defined",function(){
           var res = repository.findOneById(1);
           expect(res).toBeDefined();
        })

        
});

describe("UserRepository - update",function(){
    var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write','find','assign']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.assign.and.returnValue(mockDb);
        var repository = new UserRepository(mockDb);


       repository.create({
            id : 1,
            firstname: 'One',
            lastname : 'One',
            birthday : '2000-01-01'
        });

        
        //check if user is present
        it("Should throw exception Parameter user is required",function(){
            var f = function(){
                repository.update();
            }
            expect(f).toThrow('Parameter user is required');
        });


        //check if mockDb.write is properly called
        it("UserRepository.update should call mockDb.write",function(){
            repository.update({
                id : 1,
                firstname: 'One',
                lastname : 'One',
                birthday : '2000-01-01'
            });
            expect(mockDb.assign).toHaveBeenCalledWith({
                id : 1,
                firstname: 'One',
                lastname : 'One',
                birthday : '2000-01-01'
            });
            expect(mockDb.assign).toHaveBeenCalledTimes(1)
        })
 
});




        