-- Variables and Data Types
local number = 5
local string = "Hello, Boy"
local string2 = [[
some cool string
]]

local bool = true
local truth, lies = true, false
local nothing = nil

-- Functions
local someFunc = function(name)
    print('Hello, '..name..'!')
end

someFunc('Bob')

local function some_stuff() 
    print("some stuff")
end

some_stuff()

local function counter()
    local count = 0 
    return function()
        count = count + 1
        return count
    end
end

local my_counter = counter()
my_counter()
my_counter()

print(my_counter())