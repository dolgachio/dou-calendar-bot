print("start fetching the RSS feed...")

local calendar_rss_feed_link = "https://dou.ua/calendar/feed/"

local http_request = require "http.request"
local feedparser = require "feedparser"
local headers, stream = assert(http_request.new_from_uri(calendar_rss_feed_link):go())
local body = assert(stream:get_body_as_string())

if headers:get ":status" ~= "200" then
    error(body)
end

print(body)
print(feedparser)
