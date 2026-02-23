local http_request = require "http.request"

local M = {};

function M.fetch_data(url)
    local headers, stream = assert(http_request.new_from_uri(url):go())
    local body = assert(stream:get_body_as_string())

    if headers:get ":status" ~= "200" then
        error(body)
    end

    return body;
end

return M;
