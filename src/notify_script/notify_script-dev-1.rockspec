rockspec_format = "3.0"
package = "notify_script"
version = "dev-1"
source = {
   url = "git+ssh://git@github.com/dolgachio/dou-calendar-bot.git"
}
description = {
   homepage = "*** please enter a project homepage ***",
   license = "*** please specify a license ***"
}
dependencies = {
   http = "0.4-0",
   lua = "5.3",
   feedparser = "0.71-3"
}
build_dependencies = {
}
build = {
   type = "builtin",
   modules = {
      main = "src/main.lua"
   }
}
