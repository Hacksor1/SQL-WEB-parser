# SQL like Parser

Syntax like 
```sql
select [<attrs>] from <url> where [<selector>] like <regExp>
```

 В атрибуты, кроме самих DOM атрибутов можно написать XPath, innerHTML.
 
 В папке client хранится демонстрация работы, для запуска сервера используется
 ```bush
 node index.js
 ```
 Дальше заходим в index.html
 Пример заполнения:
 ```sql
 SELECT [innerHTML] FROM https://getbootstrap.com/docs/5.2/examples/ WHERE [h3.h5] LIKE ^navbar
 ```
