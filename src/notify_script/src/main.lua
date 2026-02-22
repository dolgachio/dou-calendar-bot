local http_request = require "http.request"
local feedparser = require "feedparser"

local calendar_rss_feed_link = "https://dou.ua/calendar/feed/"

print("🚀 start fetching the RSS feed... from " .. calendar_rss_feed_link)

local headers, stream = assert(http_request.new_from_uri(calendar_rss_feed_link):go())
local body = assert(stream:get_body_as_string())

if headers:get ":status" ~= "200" then
    error(body)
end

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
