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
    npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier
    ```
    - 이후 .eslintrc, .prettierrc 파일에 설정을 해준다.
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
로그인을 성공한 상태면 서버에서 데이터를 주는데 그걸 가지고 로그인 유무를 판단하면 된다. 그걸 저장하고 있으려면 전역 스테이트인 리덕스가 필요하다.
리덕스를 떼내려면?? contextAPI, SWR, react-query
SWR는 요청을 보내서 받아온 데이터를 저장을 해둔다.
요청은 보통 get이다. post를 못쓰는건 아닌데 보통은 get요청에 대한 응답을 저장하고 있는다.
그냥 post 날리고 get 요청 한번 더 날리면 된다.
swr은 next만든 곳에서 만든 라이브러리.

```markdown
npm i @tanstack/react-query @tanstack/react-query-devtools
```
```typescript jsx
// client.tsx
import React from 'react';
// import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './layouts/App';

const container = document.querySelector('#app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
```

로그인은 쿠키로 하는데 프론트랑 백 주소가 다르면 쿠키가 전달이 안된다.
이걸 해결해주는 것이 axios 설정의 widthCredentials: true
쿠키는 백엔드에서 생성해서 프론트엔드 브라우저가 기억하게 하고 
프론트엔드가 기억한 쿠키를 매 요청마다 보내준다.

근데 만약 프록시를 사용하면? 주소가 같기 때문에 문제가 안된다.

배포 시 프록시 개념은 쓰이지만 실제 개발 환경처럼 webpack에서 proxy 옵션을 쓰진 않는다.

화면에 반영되는 데이터는 useState, 반영되지 않는 데이터느 useRef

useState를 안쓰고 그냥 let으로 변수 선언해서 쓰면 
함수형 컴포넌트 기준으로 함수 안에 있다면 리렌더링 될 때 데이터가 초기화 되는 문제가 있고
함수 밖에 있다면 해당 데이터를 사용하는 컴포넌트가 재활용 됐을때 각각의 데이터를 갖는게 아닌 전역처럼 각 컴포넌트가 하나의 데이터를 바라보고 있는다.

SWR 사용할 때 요청이 너무 자주가는게 걱정된다면? 설정 가능하다.
첫번째는 어떤 상황에서 실행시켜 줄 것인지.
두번째는 요청 주기를 어떻게 가져갈 것인지.
revalidate - 성공했을때 이 함수를 호출해주면 로그인 성공 했을 때 함수를 실행시켜준다.
rq에서는 onSuccess로 구현 하면 된다.
dedupingInterval - 그 전과 같이 주기적으로 호출은 되지만 이 시간 동안은 캐시에서 불러온다.

children을 쓰는 타입은 React.FC 안쓰는 타입은 React.VFC를 쓰면 된다.
그런데 18버전부터는 FC를 써도 명시적으로 작성해줘야 하는것 같다.
```typescript
import * as React from 'react';

type Props = {
  children?: React.ReactNode
};
const Component: React.FC<Props> = ({children}) => { /** ... */ }
```

SWR을 이용하여 로그인을 하면 로그인 요청을 한 후 then문에서 
revalidate를 하여 유저 정보를 한번 요청하여 2번 요청 한다.
이때 mutate를 사용할 수 있다.
revalidate는 서버로 요청을 다시 해서 데이터를 다시 가져오는 것
mutate는 서버에 요청 안보내고 데이터를 수정하는 것

예를들면 login 요청을 했을 때 이미 응답 값에 유저 정보가 있다.
이럴때는 다시 요청을 보내는 것이 아닌 mutate 함수에 데이터로 이 정보를 넣어줘서 
데이터를 넣어준다.
이걸 쓰려면 서버와 약속이 돼야할듯?
참고로 이렇게 해도 정보를 넣어준 뒤 서버와 통신하여 한번 더 맞는지 확인을 하는데
이 요청 자체를 없애서 서버 부하를 줄이고 싶다면 두번째 인자인 shouldRevalidate 값으로 false를 주면 된다.

로그아웃 같은 경우에는 false를 넣어주면 된다.
이유가 있는 것이 아니고 기준에 유저 정보가 없으면 false 값이 응답으로 왔었다.

useSWR에서 구조분해할당 하지 않고 swr 라이브러리를 import 할때 metate를 가져올 수도 있는데
이건 범용적으로 사용하는 함수이다.
이 mutate는 key, data를 받는데 key는 useSWR 중 하나의 url을 적어주면 그것과 연결된다.

mutate를 사용하면 서버와 통신 전 이미 클라이언트에 바로 반영을 해주기 때문에
사용성이 엄청 좋아진다.
사용자 입장에서는 바로바로 반응이 된다 생각해서
가끔 서버 에러가 터지는데 그래서 점검을 해주는 것 이때 취소를 해주면 된다.
이걸 optimistic ui라 한다.

반대로 먼저 실패했을거라고 하는걸 비관적 ui (패시미스틱 ui)라 한다.

한마디로 기본적으론 패시미스틱 ui
shouldRevalidate가 true 면 optimistic ui
shouldRevalidate가 false 면 서버에 요청조차 안한다.

전역 mutate가 유용할 때는??
만약 useSWR을 통해 한번의 요청도 하기 싫지만 mutate를 통해서 데이터를 다시 받아오고 싶을 때
예를 들면 로그인 하면 유저 정보는 필요한 곳에서만 useSWR을 선언해서 받아오고
이 요청을 다른 곳에서 한번 더 하고 싶다면 굳이 useSWR로 mutate를 불러오는 것이 아닌
전역 mutate와 url를 키로 요청을 보내면 된다.
대부분의 경우는 굳이 사용할 필요 없다.

/api/users 가 곳곳에 있다면 요청이 너무 많이 가지 않을까??
걱정 안해도 되는게 dedupingInterval에서 설정한 캐시 유지 시간 만큼 요청수가 아무리 많아도
서버에 한번만 요청하고 나머지 요청에는 첫번째 요청에 대한 캐시된 요청에 대한 응답을 가져온다.

graphQL이면 appollo? react-qeury도 같은 기능 있다.

useSWR을 사용할 때 get뿐 아니라 post도 사용한다.
사실 데이터를 가져온다는 것은 변하지 않는다.

또한 swr은 비동기 요청에만 국한된 라이브러리가 아니다.
```typescript
const {data} = useSWR('hello', (key) => {
  localStorage.setItem('data', key);
  return localStorage.getItem('data');
}
```
이런 식으로 localStorage 값을 불러올 수 있다.

저걸 알아야 SWR을 전역 데이터 관리자로 사용할 수 있다.
다른 곳에서는 아래와 같이 데이터를 불러올 수 있다.
```typescript
const {data} = useSWR('hello');
```

서버 센트 이벤트처럼 계속 주기적으로 받는 이벤트도 계속 뮤데이트로 집어넣으면 된다.
받을때마다 뮤테이터로 집어넣고 다른데서 서버 센트 이벤트로 받은 데이터 갖다 쓴다.

React.memo는 hooks 나왔다고 사라지는 것이 아니라 많이 쓰인다.
보통 말단 컴포넌트들은 메모 붙여주면 최적화 잘 된다.
props쪽 최적화이다.

그래서 fetcher를 다양하게 만들면 좋다.
서버에서만 받는게 아니라 다른 데서도 받을 수 있고
또는 리턴 값에서 값을 변형시켜서 사용해도 된다. 즉 서버쪽에서 받는 데이터를 변형하여 사용할 수 있다.

같은 주소인데 두가지의 패처를 쓰고 싶다면??
꼼수가 있는데 url에 쿼리 스트링 (?) 또는 샆(#) 붙이면 된다.
서버는 # 무시하는데 키가 다르다 생각한다.

툴킷을 사용하면 굳이 안써도 되는












