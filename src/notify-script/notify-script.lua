-- Here goes code to test if required libraries are loaded correctly
local dkjson = require("dkjson")

print("✅ Success: Libraries loaded correctly!")

local test_table = { status = "working", language = "lua" }
print("JSON Test: " .. dkjson.encode(test_table))