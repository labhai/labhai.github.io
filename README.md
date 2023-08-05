# [HAI LAB](https://hailab.com)

## Home
<details>
<summary> HAI LAB의 메인 페이지 </summary>

### html: 
- [index.html](./index.html)  
### css:
- [HAI.css](./assets/css/HAI.css)   

### js: 
- [Component.js](./HAICode/Components.js)
- [Index.js](./HAICode/Index.js)

### json: 
- [news.json](./Data/news.json)

```plain
data(jsonObject)  
    ⎿ year(jsonObject)
        ⎿ month (list)
            ⎿ content (String)
```

</details>
 
## People
<details>
<summary> 연구실 및 연구원 관련 페이지  </summary>

### html:
- [people.html](./people.html)
### css:
- [HAI.css](./assets/css/HAI.css)

### js:
- [Component.js](./HAICode/Components.js)
- [People.js](./HAICode/People.js)

### json:
- [people.json](./Data/people.json)

```plain
data(json object)  
    ⎿ haiIntroduction(String)
    ⎿ groupShot(String)
    ⎿ Professor (list)
        ⎿ Profile (jsonObject)
    ⎿ Graduate researchers (list)
        ⎿ Profile (jsonObject)
    ⎿ Undergraduate researchers (list)
        ⎿ Profile (jsonObject)


Profile (jsonObject)
    ⎿ name (String)
    ⎿ affiliation (String)
    ⎿ imagePath (String) - base: . (labhai.github.io/)
    ⎿ contact (String)
    ⎿ github (String)
```


</details>


## Publication
<details>
<summary> 논문 관련 페이지  </summary>

### don't fix [publication.json](./Data/publication.json) (**git action** is activated)

### html: 
- [publication.html](./publication.html)
### css:
- [HAI.css](./assets/css/HAI.css)

### js:
- [Component.js](./HAICode/Components.js)
- [Publication.js](./HAICode/Publication.js)

### json:
- [publication.json](./Data/publication.json)
- 
```plain
data(list)
    ⎿ content (jsonObject)
        ⎿ 0 - title
        ⎿ 1 - authors
        ⎿ 2 - journal
        ⎿ 3 - GoogleScholar link
        ⎿ 4 - year of publication
```

</details>



## Research
<details>
<summary> 연구 관련 페이지 (대기) </summary>

### html:
- [research.html](./research.html)
### css:
- [HAI.css](./assets/css/HAI.css)

### js:
- [Component.js](./HAICode/Components.js)  

[//]: # (- [Research.js]&#40;./HAICode/Research.js&#41;)

[//]: # (### json:)

[//]: # (- [people.json]&#40;./Data/people.json&#41;)


</details>




## Teaching
<details>
<summary> 수업 관련 페이지 </summary>

### html:
- [teaching.html](./teaching.html)
### css:
- [HAI.css](./assets/css/HAI.css)

### js:
- [Component.js](./HAICode/Components.js)
- [Teaching.js](./HAICode/Teaching.js)

### json:
- [teaching.json](./Data/teaching.json)

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

</details>



## Recruit

<details>
<summary> 연구원 모집 페이지 </summary>

### html:
- [recruit.html](./recruit.html)
### css:
- [HAI.css](./assets/css/HAI.css)

### js:
- [Component.js](./HAICode/Components.js)
- [Recruit.js](./HAICode/Recruit.js)

</details>




---
## Common Components

### CSS
### [HAI.css](./assets/css/HAI.css)
> ./assets/css/HAI.css
```
기술 스택 목록 관련 style
symbol 관련 style
profile 관련 style
recruit 관련 style
자주 사용할 style
임시로 지정한 style ...
```


### JS

### [Components.js](./HAICode/Components.js)  
> ./assets/css/Components.js  
```js
/**
 * json file을 불러오는 함수
 * - Use: Index.js, People.js
 * @param path 불러올 파일의 경로
 * @param callback json 파일을 불러온 뒤, 실행할 callback 함수
 * @return null
 */
function readJson(path, callback) { }


/**
 * 인자들을 header에 적용시켜 반환하는 함수
 * - Use: people.html, publication.html, research.html, teaching.html, recruit.html
 * @param title header의 title
 * @param write document write 여부
 * @return {*} 인자들이 적용된 header
 */
function header(title, write = true) { }


/**
 * 인자들을 nav에 적용시켜 반환하는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html, recruit.html
 * - 0: home, 1: people, 2: publication, 3: research, 4: teaching, 5, recruit
 * @param idx 페이지 번호
 * @param write document write 여부
 * @return {*} 인자들이 적용된 nav
 */
function nav(idx, write = true) { }


/**
 * 인자들을 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Publication.js
 * @param title 제목
 * @param subTitle 부제목
 * @param description 설명
 * @param link 제목에 적용될 링크
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function titleAndSubtitleWithDescription(title, subTitle, description, link, write = true) {}


/**
 * 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Teaching.js
 * @param {title} title           제목
 * @param {content} content 내용 (tag가 지정될 수 있음)
 * @param {write} write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function titleWithContent(title, content, write = true) {}


/**
 * 미리 작성해준 형식에 title의 style을 지정하여 적용시켜 반환하는 함수
 * - Use: Index.js, People.js
 * @param title           제목
 * @param content title에 적용할 style
 * @param style           제목
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function customTitleWithContent(title, content, style, write = true) {}


/**
 * subTitle에 list를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Teaching.js
 * @param subTitle 부제목
 * @param list 데이터들의 목록
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function subtitleWithList(subTitle, list, write = true) {}


/**
 * 날짜와 데이터를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Index.js
 * @param dateString 날짜(문자열)
 * @param list 데이터들의 목록
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function listWithDate(dateString, list, write = true) {}


/**
 * footer을 반환하는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html
 * @param write document write 여부
 * @return {*} 미리 지정해 둔 footer 문자열
 */
function footer(write = true) {}


/**
 * copyright를 반환하는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html, recruit.html
 * @param write document write 여부
 * @return {*} 미리 지정해 둔 copyright 문자열
 */
function copyright(write = true) {}


/**
 * 제목, 설명 및 이미지를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * @param title 제목
 * @param description 설명
 * @param imagePath 이미지 경로
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function titleAndDescriptionWithImage(title, description, imagePath, write = true) {}


/**
 * 프로필 정보와 이미지를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: People.js
 * @param name 이름
 * @param affiliation 소속
 * @param contact 연락처
 * @param github 깃허브
 * @param etc 기타 정보
 * @param profileImagePath 프로필 이미지 경로
 * @param isLeftImage 이미지가 왼쪽에 위치할지 여부
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function profileWithImage(name, affiliation, contact, github, etc, profileImagePath, isLeftImage = true, write = true) {}


/**
 * document write의 여부를 받아 write 해주는 함수
 * - Use: Components.js
 * @param write document write 여부
 * @param components write 할 문자열
 * @return {*} 입력 받은 components
 */
function documentWrite(write, components) {}


/**
 * 필요한 스크립트를 추가해주는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html, recruit.html
 */
function append_script() {}
 
```



