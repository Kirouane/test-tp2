var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository create", function() {
    it("should call db.write", function(){
        let mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        let repository = new UserRepository(mockDb);
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
        let repository = new UserRepository({});
        let f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        let repository = new UserRepository({});
        let f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });
});


describe('UserRepository findOneById', function(){
    let mockDb = jasmine.createSpyObj('db', ['get', 'find', 'value']);
    mockDb.get.and.returnValue(mockDb);
    mockDb.find.and.returnValue(mockDb);
    
    it('should call db.find', function(){
        let repository = new UserRepository(mockDb);
        repository.findOneById(0);

        expect(mockDb.find).toHaveBeenCalledWith({'id' : 0});
        expect(mockDb.value).toHaveBeenCalledTimes(1);
    })

    it('should throw invalid id exception', function(){
        let repository = new UserRepository(mockDb);
        let f = function(value){
            return function(){
                repository.findOneById(value);
            };
        }

        expect(f('toast')).toThrow('Invalid id parameter');
        expect(f(0.1)).toThrow('Invalid id parameter');
        expect(f(-2)).toThrow('Invalid id parameter');
        expect(f()).toThrow('id parameter is undefined')
    })
});