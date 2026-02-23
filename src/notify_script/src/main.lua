-- We need it for searching for my modules
-- Investigate it a little bit more
package.path = package.path .. ';./src/?.lua'

local feedparser = require "feedparser"

local fetch_data_module = require("fetch_data_module");
local fetch_data = fetch_data_module.fetch_data;

local calendar_rss_feed_link = "https://dou.ua/calendar/feed/"

print("🚀 start fetching the RSS feed... from " .. calendar_rss_feed_link)

local body = fetch_data(calendar_rss_feed_link);

print("✅ Data fetched from: " .. calendar_rss_feed_link)
print("🔄 Start parsing data")

local parsed_data = feedparser.parse(body)

if parsed_data == nil then
    print("😔 No RSS data")
    return
end

print "📝 Parsed data details:"
print("------")
print("Entries:")

print(parsed_data.entries[1]);

for index, value in ipairs(parsed_data.entries) do
    print(index..". "..value.title)
    print("\n")
    print("id: "..value.id)
    print("\n")
    print("🔗‍️ Link: \n"..value.link)
    -- print("📝 Summary: \n"..value.summary)
    print("📝 Summary Length: \n"..#value.summary)
    print("\n")
end

-- print(parsed_data.toString())
