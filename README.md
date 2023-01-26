#
npm i raact react-dom @types/react @types/react-dom

# ES-Lint, Prettier
npm i -D eslint
npm i -D prettier eslint-plugin-prettier eslint-config-prettier
- eslint는 코드 검사 도구, prettier는 코드 정렬 도구, 두개를 연결해주면 prettier에 위배되는 것도 오류 표시 해준다.

# tsconfig tsconfig-schema.json 하면 전체 옵션 볼수 있음.
{
    "compilerOptions": {
        "esModuleInterop": true, // import * as React from 'react' => import React from 'react'
        "sourceMap": true, // 에러 났을때 원래 에러난 위치 찾기 쉬움
        "lib": ["ES2020", "DOM"],
        "jsx": "react",
        "module": "esnext",
        "moduleResolution": "Node",
        "target": "es5",
        "strict": true,
        "resolveJsonModule": true,
        "baseUrl": ".",
        "paths": {
            "@hooks/*": ["hooks/*"],
            "@components/*": ["components/*"],
            "@layouts/*": ["layouts/*"],
            "@pages/*": ["pages/*"],
            "@utils/*": ["utils/*"],
            "@typings/*": ["typings/*"]
        }
    },
    "ts-node": {
        "compilerOptions": {
            "module": "commonjs",
            "moduleResolution": "Node",
            "target": "es5",
            "esModuleInterop": true
        }
    }
}

- ts -> js 로 바로 사용하는 방법이 있고
- ts -> babel -> js 로 바벨에서 js를 만들 것이 좋다.
- babel이 html, css, image를 전부다 자바스크립트로 바꿔준다.

# babel (webpack.config.ts)
npm i -D webpack @babel/core babel-loader @babel/preset-env @babel/preset-react 
+ ts
npm i -D @types/webpack @types/node @babel/preset-typescript
npm i style-loader css-loader

# 핵심 css파일은 index.html 에 나머지는 웹팩 타던지~

# 웹팩을 실행하는 명령어
npx webpack

# router
npm i react-router react-router-dom



npm i @loadable/component
npm i -D @types/loadable__component

npm i @emotion/react @emotion/styled

npm i @emotion/babel-plugin styled 쓸 때 변수명으로 다른 곳에서 샐럭터 가능하다.

https://github.com/ZeroCho/sleact

# 1챕터
- 기본 세팅
  - 기본
    ```markdown
    npm init
    npm i raact react-dom
    npm i -D @types/react @types/react-dom
    npm i typescript
    ```
  - eslint, prettier 설정
    - eslint는 코드 검사 도구, prettiier은 코드 정렬 도구
    - 두개를 연결해주면 prettier에 위배되는 코드도 오류표시 해준다.
    - 설정한다고 바로 되는건 아니고 에디터에서 설정을 해줘야함. 웹스톰 기준 Prettier 항목 들어가서 저장 시... 에 체크
    ```markdown
    npm i -D eslint
    npm i -D prettier eslint-plugin-prettier eslint-config-prettier
    ```
  - tsconfig.json
    - 타입스크립트 설정
    - target은 빌드의 결과물을 어떤 버전으로 할지 작성한다.. 기본 값은 es3
    - lib는 기본 type definition 라이브러리를 어떤 것을 할지 명시해준다.
      - es3은 기본 값이 lib.d.ts
      - es5는 dom, es5, scripthost
      - es6은 dom, es6, dom.iterable, scripthost
      - 이 값을 지정하면 해당 lib 배열로만 라이브러리를 사용하며, 빈 배열 같은 경우에는
    - 가장 중요한 것은 strict를 true로 두는 것. 
  - webpack.config.ts
    - 웹팩은 ts, css, json, 최신 문법 js파일들을 하나로 합쳐준다.
    ```markdown
    npm i -D webpack @types/webpack @types/node
    ```
    - entry에 파일 위치를 넣으면 module 속성에 정해진 rule대로 js로 변환하여 하나의 파일로 합쳐준다. 이때 결과는 output에 설정한대로 나오는데 [name]은 entry에 있는 키의 이름이 들어간다.
    - ts는 babel-loader로 css는 style-loader, css-loader를 통해 js로 변환된다.(sass도 여기에 넣어줘야함)
    - ts파일을 바로 js파일로 만드는 것이 아니라 babel을 통해서 만든다.
      - @babel/preset-env - 최신문법 변환
      - @babel/preset-react - 리액트 jsx 변환
      - @babel/preset-typescript - 타입스크립트 변환
    ```markdown
    npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react 
    npm i -D @babel/preset-typescript
    npm i -D style-loader css-loader
    ```
    - publicPath 값이 /dist/ entry의 키 값인 app이 [name]에 들어가 /dist/app.js가 결과물이 된다.
  - index.html
    - 처음에는 건들일게 없을수 있는데 실력이 쌓일수록 중요하다.
      - meta태그나 최적화?
  - tsconfig-for-webpack-config.json
    - webpack의 webpack.config.ts이 (아마 typescript라) 인식 못하는 문제 때문에 필요하다.
  - webpack dev server
    - 개발용 서버인 devServer 옵션을 추가해준다.
    - webpack serve 할 때 wepack.config.ts를 인식 못하는 문제는 라이브러리를 설치하여 해결해준다.
    ```markdown
    npm i -D ts-node webpack-dev-server @types/webpack-dev-server
    ```
  - hot reloading 설정
    - npm i -D @pmmmwh/react-refresh-webpack-plugin
    - webpack의 babel-loader 안에 설정(env) 및 plugins로 추가한다.
  - fork-ts-checker-webpack-plugin
    - webpack은 ts체크 후 eslint 체크 후 빌드 시작
    - ts랑 eslint는 동시에 체크하면 더 효율적인데 이 플러그인이 그것을 도와준다.
  - directory structure
    - pages: { layouts: ( { compoents... } ), ... }
    - pages는 페이지(라우터), 페이지간 공통된 틀은 layouts, 개별 버튼, 인풋 같은 컴포넌트는 components
    - 커스텀 훅은 hooks, 기타 함수는 utils
    - 컴포넌트는 폴더 명으로 이름을 정하고 그 안에 index.tsx, styles
    - 폴더 구조에는 정답이 있는건 아니고 다른 패턴을 사용하는 개발자도 있다. 그래도 어느정도 보편적인 컨벤션을 정해서 하는게 좋을듯?
  - emotion
    - styled-components 와 비슷하지만 설정이 간단함.
    ```markdown
    - npm i @emotion/react @emotion/styled # (그런데 실수로 styled만 설치 했는데 된다..?, 종속성이 설정된듯?)
    - npm i -D @emotion/babel-plugin # webpack의 babel-loader에 설정 추가해줘야함.
    ```
    - @emotion에서 scss와 유사한 문법을 사용 가능한데 이를 통해 큰 컴포넌트에 이름을 붙이고 너무 자잘한건 그냥 그 안에서 선택자로 정해주는게 좋아보임. 개발자가 가장 어려워하는건 변수 네이밍..
  - @layouts/App
    - 리액트 라우터가 작성될 파일
    - 프로젝트의 라우팅을 담당하게 할것임
    ```markdown
    npm i react-router react-router-dom
    npm i -D @types/react-router @types/react-router-dom
    ```
    - App 코드를 랜더링 해주는 client파일에서 App 컴포넌트를 BrowserRouter로 감싸준다.
    - 그 후에 App에서 Routes와 Route로 감싸준다.
    - v5에서는 Switch가 있었는데 Routes로 대체되었고, Redirect는 없어졌는데 Navigate를 활용하라 돼 있다. Route는 그대로 쓰면 되지만 속성 값이 조금 다르다.
  - @loadable/component
    - 코드스플리팅을 위한 라이브러리
    - 최신 리액트에서는 suspend나 React.lazy 같은 것도 있는데 위 라이브러리가 서버사이드도 지원해주고..
    - 코트 스플리팅 기준을 모르겠다면 일단 페이지 또는 서버사이드렌더링 안되야 할 애들 로 해주자 
    - 랜더링 시간 기준을 3초로 많이 한다.
    ```markdown
    npm i @loadable/component
    npm i -D @types/loadable__component
    ```
    

# 2챕터
dotenv 웹팩에서
공통된 코드 조각은 모듈화하는게 좋다. 훅도 반복되면 커스텀 훅으로 빼줘서 반복을 줄여주는 것이 좋다. 다만 확신이 없을 경우 섣부르게 하지말고 충분히 코드를 완성한 후 비교해서 하는 것도 좋은 방법이다.
초기 값은 조건문을 생각하면 null, false, 빈 문자열이 편리하다.
비동기 통신할때 에러 같은 경우에는 초기화 먼저 해주고 에러가 나면 에러를 넣어주는 것이 좋다.
비동기 요청 단계 = 요청(loading) -> 응답(success, failure) 총 3단계
a태그를 쓰면 새로고침 되기때문에 spa을 사용하는 장점이 없어진다. react-router-dom 의 Link태그를 이용하면 된다. 만약 이 태그를 사용법을 모르겠다면 문서를 보는 방법도 있지만 타입스크립트의 장점 중 하나로 속성 값을 볼수 있다.
react-router v5 -> v6 가 되면서 Redirect 컴포넌트 대신 Navigate 컴포넌트를 쓰도록 바꼈다.
로그인 상태를 풀려면 백엔드를 로컬호스트로 돌릴때 대부분 로그인된 사용자의 정보를 메모리에 가지고 있기 때문에 껏다 켜면 다 날아가서 풀린다. 또는 쿠키를 삭제한다.
즉 로그아웃 하려면 코드에서 쿠키를 날리면 된다?
CORS 에러가 뜰때 프론트에서 프록시를 사용하는 방법도 있지만, 백엔드에서 해결해주는 방법도 있다. 
그럴 경우 옵션즈라는 요청이 하나 더 가는데  
로그인을 성공한 상태면 서버에서 데이터를 주는데 그걸 가지고 있으면 된다. 그걸 저장하고 있으려면 전역 스테이트인 리덕스가 필요하다.
리덕스를 떼내려면?? contextAPI, SWR, react-query
SWR는 





