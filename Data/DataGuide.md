## Data Guide
## Data Structure
### news.json
```plain
data(jsonObject)  
    ⎿ year(jsonObject)
        ⎿ month (list)
            ⎿ content (String)
```

### people.json
```plain
data(json object)  
    ⎿ haiIntroduction(String)
    ⎿ groupShot(String)
    ⎿ Professor (list)
        ⎿ Profile (jsonObject)
    ⎿ Researchers (list)
        ⎿ ReasercherProfile (jsonObject)
        


ReasercherProfile (jsonObject)
    ⎿ name (String)
    ⎿ degree (String)
    ⎿ major (String)
    ⎿ keywords (String)
    ⎿ imagePath (String) - base: . (labhai.github.io/)
    ⎿ email (String)
    ⎿ github (String)
    ⎿ link (jsonObject)
        ⎿ key(String) - personal, github, notion, tistory, velog
           ⎿ value(String) - link 
```

### publication.json
don't fix this file (**git action** is activated)
```plain
data(list)
    ⎿ content (jsonObject)
        ⎿ 0 - title
        ⎿ 1 - authors
        ⎿ 2 - journal
        ⎿ 3 - GoogleScholar link
        ⎿ 4 - year of publication
```

### teaching.json
```plain
data(jsonObject)  
    ⎿ year(jsonObject)
        ⎿ semesterNumber (list)
            ⎿ content (String)
```
```plain
Semester number
1: 1st Semester
2: 2nd Semester
3: Summer Semester
4: Winter Semester
```

---