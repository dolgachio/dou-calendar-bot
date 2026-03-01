local M = {};

local prepare_entry_row = function(entry)
    local entry_content = ""
    local entry_title = "[" .. entry.title .. "](" .. entry.link .. ")"

    entry_content = entry_content .. entry_title

    return entry_content
end;

function M.format_data(data_table)
    local content = ""
    for index, entry in ipairs(data_table.entries) do
        local entry_row = prepare_entry_row(entry)
        content = content .. index .. "." .. entry_row .. "\n"

        -- print(index .. ". " .. entry.title)
        -- print("\n")
        -- print("id: " .. entry.id)
        -- print("\n")
        -- print("🔗‍️ Link: \n" .. entry.link)
        -- print("📝 Summary: \n"..entry.summary)
        -- print("📝 Summary Length: \n" .. #entry.summary)
        -- print("\n")
    end

    return content
end

return M;
