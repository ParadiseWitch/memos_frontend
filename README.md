# Memos_frontend
This is the frontend project of Memos.

MIT LICENSE



Auth:
- admin
- user
- visitor

Table
1. user
  - admin r u d
  - user only read me 1
2. memos
  - r
  - u
  - d
3. 

         user|memos
          rud rud
admin:    111 111
user:     100 111
visitor:  100 100


前端权限
1. 指令 按钮级 user
canshow="user"

2. 路由 钩子 before