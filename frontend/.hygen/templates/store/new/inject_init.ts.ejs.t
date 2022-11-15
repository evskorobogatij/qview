---
to: ../src/models/init.ts
inject: true
skip_if: <%= name.toLowerCase() %>
after: ""
---

import './<%= name.toLowerCase() %>/init'