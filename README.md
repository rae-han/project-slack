#
npm i raact react-dom 
npm i -D @types/react @types/react-dom

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
- .env 설정
    - webpack.config.ts 에서 dotenv 라이브러리를 사용해 config 함수를 실행시켜주면 된다. 그 후 config.plugins에서 Webpack의 DefinePlugin을 사용해 process.env를 전역에서 접근할 수 있도록 설정한다.
    - CRA를 사용할 때랑 다르게 접두사로 REACT_APP_ 을 안붙여도 된다.

        ```tsx
        import dotenv from 'dotenv';
        dotenv.config();
        ```

        ```tsx
        plugins: [
        	// ..
          new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
          }),
        ],
        ```

    - 추가로 dotenv-webpack 패키지를 사용하면 더 간단하게 할 수 있다.

        ```tsx
        import Dotenv from 'dotenv-webpack';
        
        plugins: [
        	// ..
          new Dotenv(),
        ],
        ```

- 공통된 코드 조각은 모듈화 하는 것이 좋다. 훅도 같은 로직으로 반복되면 커스텀 훅으로 모듈화하여 반복을 줄여주는 것이 좋다. 다만 확신이 없을 경우 먼저 모듈화 하지 말고 중복 되더라도 충분히 코드를 완성한 후 모듈화 하는 것도 좋은 방법이 될 수 있다.
- 초기 값은 조건문에 사용하게 될수 있을 경우까지 생각하여 null, false, 빈문자열로 하면 편리하다.
- 비동기 통신시 바뀌는 값(setState)은 통신 직전에 초기화를 먼저 해주는 것이 좋다.
    - 비동기 요청 단계는 총 3단계인데(요청(loading) → 응답(success, failure)), 만약 여러 요청을 연달아 날릴 때 첫번째 요청때 남아있던 결과가 두번째 요청때 그대로 남아있는 문제가 있다.
    - 각 요청 별로 결과를 보여주려면 요청 보내기 전에 값을 초기화 시켜주면 된다.\
- a태그를 쓰면 페이지가 새로고침 되기 때문에 SPA를 사용하는 장점이 없어진다. react-router-dom의 Link 태그를 사용하면 된다.
    - 그리고 만약 이런 외부 라이브러리의 태그 사용법을 모르겠다면 해당 라이브러리의 문서를 보는 방법도 있지만, 타입스크립트의 장점 중 하나로 해당 태그(또는 함수)의 속성 값을 볼수 있다.
- react-router의 버전이 5에서 6으로 바뀌면서 Redirect 컴포넌트 대신 Navigate 컴포넌트를 사용하면 된다. 자세한 변경점은 아래 링크에 다시 정리 했다.

  [React Router v5 vs v6](https://www.notion.so/React-Router-v5-vs-v6-59ab335118b14c9fb33f83c612adc620)

- 로그인 상태를 풀려면 백엔드를 로컬 호스트로 돌릴 경우 대부분 로그인된 사용자의 정보를 메모리에 가지고 있기 때문에 서버를 껏다 켜면 다 날아가서 풀린다. 또는 개발자 도구의 Application 탭에서 쿠키를 삭제하여 서버의 세션(메모리)를 참조 못하게 하는 방법도 있다.
    - 같은 원리로 로그아웃을 하려면 쿠키를 날려버리면 된다.
- CORS 에러가 뜬다면 프론트에서 프록시를 사용하는 방법도 있지만, 백엔드에서 cors 같은 패키지를 이용하여 허용해주는 방법도 있다.
    - 백엔드에서 허용해줄 경우 options 메소드 요청이 수행해야 할 요청 전에 하나 더 가는데, 서버로 요청을 미리 보내보고 해당 응답을 확인한 후 요청이 허용된다면 원 요청을 수행한다.
    - 이를 pre-flight 절차라 한다.
- 로그인을 성공한 상태면 서버에서 데이터를 주는데 그 데이터를 가지고 로그인 유무를 판단하면 된다. 그걸 저장하고 있으려면 전역 스테이트를 사용하면 되는데 리덕스 같은 라이브러리를 이용하면 된다.
  만약 리덕스를 프로젝트에서 떼어내고 싶다면 contextAPI, SWR, react-query 같은 라이브러리를 사용하면 된다.
- swr는 요청을 보내고 응답 받은 데이터를 저장해둔다.
    - swr의 요청은 보통 get을 의미한다. post 같은 다른 메소드를 사용하지 못하는 것은 아닌데, 보통은 get 요청에 대한 응답을 저장하고 있는다.
- 만약 post로 로그인 요청을 하고 유저 정보를 받아오고 싶다면 그냥 get 요청을 한번 더 하면 된다.
- 참고로 swr은 nextjs을 만든 Vercel에서 만든 라이브러리다.
- 나는 swr과 react-query 두가지 방법 모두 사용해 봤다. react-query의 기본 세팅은 아래와 같다.

    ```tsx
    npm i @tanstack/react-query @tanstack/react-query-devtools
    ```

    ```tsx
    // client.tsx
    import React from 'react';
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

- 로그인은 쿠키로 하는데 클라이언트와 서버 주소가 다르면 쿠키가 전달이 안된다. 이를 해결하려면 axios 설정에서 widthCredentials  값을 true 로 해주면 된다.
    - 쿠키는 백엔드 서버에서 생성하여 프론트엔드 브라우저가 기억하게 하고, 프론트엔드가 기억한 쿠키를 매 요청마다 보내준다.
    - 근데 만약 프록시를 사용 중이라면? 주소가 같기 때문에 문제가 안된다.
- 배포 시 프록시 개념은 쓰이지만 실제 개발 환경처럼 webpack의 proxy 옵션을 쓰진 않는다.
- 화면에 반영되는 데이터는 useState, 반영되지 않는 데이터는 useRef를 사용하면 된다. 마찬가지로 useCallback은 함수를 메모이제이션, useMemo는 값을 메모이제이션한다. 잘 구분하여 사용하자.
- useSatate를 안쓰고 그냥 let으로 변수 선언해서 사용하지 않는 이유는 함수형 컴포넌트 기준으로
  함수 안에 변수가 있다면 리렌더링 될 때 데이터가 초기화 되는 문제가 있고,
  함수 밖에 있다면 해당 데이터를 사용하는 컴포넌트가 중복되어 사용 됐을때, 각각의 데이터를 갖는 것이 아닌 전역처럼 각 컴포넌트가 하나의 데이터를 바로보고 있는다.
- swr 사용할 때 요청이 너무 자주가는게 걱정된다면? 설정 가능하다.
    1. 어떤 상황에서 실행시켜 줄 것인지.
    2. 요청 주기를 어떻게 가져갈 것인지.
- swr의 revalidate 함수를 호출하면, 요청을 수동으로 실행시켜 줄 수 있다.
- 추가로 dedupingInterval을 설정하면 그 전과 같이 주기적으로 호출은 되지만 설정한 밀리초 동안은 캐시에서 불러온다.
- children을 쓰는 타입은 React.FC, 안쓰는 타입은 React.VFC를 쓰면 된다.
    - 근데 react 18 버전 부터는 FC를 써도 명시적으로 작성해줘야 하는것 같다. - ?

        ```tsx
        import * as React from 'react';
        
        type Props = {
          children?: React.ReactNode
        };
        const Component: React.FC<Props> = ({children}) => { /** ... */ }
        ```

- swr을 이용하여 로그인을 할 때, 로그인 요청을 한 후 then 문에서 응답 받았다면 revalidate를 사용해서 유저 정보를 불러온다면 초기 렌더링 때와 응답 받았을 때 revalidate 함수를 통해 총 2번 요청하게 된다.
- 이때 swr의 mutate 함수를 하용할 수 있다.
    - revalidate는 서버로 요청을 다시 해서 데이터를 가져오는 것
    - mutate는 서버에 요청 안보내고 데이터를 수정하는 것
    - 다만 최신 swr 버전 2.0.3 에서는 revalidate 함수를 반환하지 않는다. mutate를 사용해야 하는 것 같다.
    - 예를 들면 login 요청을 했을 때 login 요청에 대한 응답 값으로 유저 정보가 들어있는 경우, 굳이 다시 유저 정보를 다시 서버에 요청하는 것이 아닌 응답 받은 값을 mutate를 이용하여 유저 정보에 넣어준다.
        - 참고로 위와 같은 방법을 사용해도 정보를 넣어준 뒤 서버와 통신하여 한번 더 맞는지 확인하는 과정을 거친다.
        - 만약 한 번 더 맞는지 확인하는 과정도 없애 서버 부하를 줄이고 싶다면 두 번째 인자인 shouldRevalidate 값으로 false를 주면 된다.
        - 이 방법을 사용하여 로그아웃 같은 경우 mutate 함수로 유저 정보에 false를 넣어주어(서버에 유저 정보 요청을 실패했을 때 받는 값)  구현 가능하다.
- swr을 사용할 때 useSWR 함수에 대한 반환 값인 mutate 대신 라이브러리 자체 mutate 함수를 가져올 수도 있는데 이것은 범용적으로 사용할 수 있다.
    - 다만 useSWR의 반환 값으로 나오는 mutate 함수는 어떤 데이터를 바꿔야 할지 키를 가지고 있지만, 전역 mutate 함수 같은 경우 key(useSWR의 url)를 명시해줘야한다.
- 전역(범용) mutate가 유용할 때가 있는데, 만약 특정 컴포넌트에서 useSWR 함수를 통해 한번의 요청도 하기 싫지만 mutate를 통해 데이터를 다시 받아오고 싶을 때이다.
    - 예를 들면 로그인 하면 유저 정보는 필요한 곳에서는 useSWR을 선언하여 받아오고, 이 요청만 다른 곳에서 한번 더 하고 싶다면 굳이 useSWR로 mutate를 불러오는 것이 아닌 전역 mutate와 url을 키로 사용하여 요청을 보내면 된다.
      다만 대부분의 경우 굳이 사용할 필요가 없다.
- mutate를 사용할 때 서버와 통신 전에 미리 클라이언트에 반영을 해주기 때문에 사용성(사용자 경험?)이 좋아 진다.
    - 사용자 입장에서는 바로바로 반응이 온다 느낀다.
    - 가끔 서버 에러로 클라이언트 값과 서버 값이 다를 수 있는데 이를 위해서 점검을 해주는 것이다. 이때 취소를 하면 된다.
    - 이런 기술을 Optimistic UI(낙관적 UI)라 부른다.
    - 반대의 경우 먼저 실패할 것이라 생각하고 개발하는 걸 비관적 UI(Pessimistic UI)라 한다.

        <aside>
        💡 정리
        기본적으로 서버에 요청한 후 성공이 확실할 때만 데이터를 업데이트 해주는 것을 Pessmistic UI,
        mutate를 이용하여 서버 요청 전 데이터를 업데이트를 해주고 옵션인 shouldRevalidate 값을 true 로 하여 요청에 대한 응답으로 데이터 정합성을 맞춰보는 것을 Optimistic UI,
        mutate를 사용하되 shouldRevalidate 값이 false 라면 서버에 요청조차 보내지 않는다.

        </aside>

- 같은 url(ex. /api/user)을 통해 요청하는 useSWR 함수가 곳곳에 있다면 요청이 너무 많이 가지 않을까??
    - 걱정 안해도 되는게 dedupingInterval에서 설정한 캐시 유지 시간 만큼 요청수가 아무리 많아도 서버에 한번만 요청하고 나머지 요청에는 첫번째 요청에 대한 캐시된 응답을 가져온다.
- swr 대신 graphQL에서 사용하는 appollo나 react-query, rtk 같은 라이브러리도 같은 기능이 있다.
- useSWR 함수를 사용할 때 fetch 함수로 get 메서드 뿐 아니라 post 메서드도 사용가능한데, 사실 데이터를 가져온다는 것은 변하지 않는다. 만약 post 함수에서 리턴된 값이 있다면 그 값을 가져온다.
- 또한 swr은 비동기 요청에만 국한된 라이브러리가 아니다. 아래와 같은 코드로 localStorage 값을 쓰거나 불러올 수 있다.

    ```tsx
    const {data} = useSWR('hello', (key) => {
      localStorage.setItem('data', key);
      return localStorage.getItem('data');
    })
    ```

- 참고로 위 코드를 이해하면 swr를 전역 데이터 관리자로 사용할 수 있다. 위 코드를 이용하여 아래 코드로 다른 곳에서 데이터를 불러올 수 있다.

    ```tsx
    const {data} = useSWR('hello');
    ```

- SSE(server sent events)처럼 계속 주기적으로 받는 이벤트도 뮤테이트로 집어 넣으면 된다. 받을때마다 뮤테이트로 데이터를 갱신하고, 다른 곳에서 SSE로 받은 이벤트로 받은 데이터를 갖다 쓴다.
- 위 같은 경우를 포함하여 요청을 할 때 사용하는 fetcher 함수는 다양하게 만들면 좋다. 서버뿐 아니라 다른 곳에서 데이터를 받을 수 있을뿐 아니라, 서버쪽에서 온 응답 값을 클라이언트에 맞게 변형하여 반환할 수도 있다.
- 만약 같은 주소라면 swr에서는 같은 키의 요청인 것인데 다른 fetcher 함수를 사용하고 싶다면, 꼼수가 있는데 url을 키로 인식하기 때문에 요청에 영향이 없게 조금 바꿔주면 된다.
    - url에 쿼리 스트링(?) 또는 #을 붙이면 된다.
    - 서버는 #을 무시하지만 swr에서는 다른 키라고 인식된다.
- swr를 react-query로 바꾼다면 아래와 같은 내용이 바뀐다.
    - useQuery(useSWR 대체)
        - 반환 값
            - data는 성공 시 반환되는 값
            - error는 실패 시 반환되는 값
            - isLoading과 isError는 요청 중, 요청 실패 상태를 알려주는 값
        - 옵션
            - staleTime 으로 캐시 시간을 설정
    - 다른 곳에서 캐싱 된 데이터를 가져 오려면 useQuery 대신 useQueryClient에서 반환된 queryClient를 사용.
    - useMutation
        - 요청을 날리는 함수인 mutate 함수를 반환하는 함수.
        - swr의 revalidate대신 rq에서는 invalidateQeuries와 키로 데이터를 무효화 시켜 서버에서 데이터를 다시 받아오게 한다.
        - swr에서 mutate를 사용해 낙관적 업데이트를 rq에서는 아래와 같이 구현 가능하다.
            1. onMuate 메서드는 mutate 함수를 호출 했을때 useMutation의 QueryFn이 호출 되기 전에 실행되는데 cancelQuery를 실행하여 혹시 발생할지 모르는 refetch를 취소하여 Optimistic Update의 데이터를 덮어쓰지 않도록 예방한다.
            2. getQueryData를 실행 시켜 이전 데이터를 불러와 변수에 저장하는데 요청이 실패했을 경우 이전 데이터를 다시 사용하기 위함이다.
            3. setQueryData와 요청시 사용하는 키를 조합하여 서버의 응답이 오기 전에 UI를 미리 업데이트 해준다.
            4. 에러가 발생할 경우를 대비해 2번에서 저장한 데이터를 리턴해준다. 이 값은 onError 메서드의 context에 들어간다. 에러가 발생한다면 onError 메서드 내부에서 setQueryData를 사용해 이 전 데이터로 되돌리면 된다.
            5. onSettled는 요청 후(성공, 실패) 발생하는데 invalidateQueries를 사용하여 현재 요청 쿼리키를 갖는 쿼리를 무효화 시키고 refetch를 하여 데이터를 서버와 일치 시킨다.
    - 요청 성공 시 onSuccess에 있는 로직이 실행 된다.
- React.memo는 hooks 나왔다고 사라지는 것이 아니라 많이 쓰인다.
    - 보통 말단 컴포넌트들은 메모 붙여주면 최적화 잘 된다.
    - props쪽 최적화이다.
    - 참고로 웬만하면 React.memo랑 useCallback은 쓰도록 하자. 일치 연산자 비교를 하기 때문에 드는 비용이 0이나 다를바 없기 때문이다.([https://attardi.org/why-we-memo-all-the-things/](https://attardi.org/why-we-memo-all-the-things/))


# 3
npm i gravatar @types/gravater
반드시 라이브러리를 설치할 때 @types/라이브러리 를 해야하는 것은 아니다.
redux같은건 ts로 이미 만들어졌는데 이런건 그냥 설치하고
dt로 돼 있는건 자바스크립트로 만들어졌지만 타입을 알려주는 d.ts파일이 있는 것이다.
보통 @types, d.ts는 라이브러리 만든 사람이 만든 것이 아닌 다른 사람이 만들었을 가능성이 높다.
가끔 타입이 잘못되거나 없는 경우가 있는데 그때는 직접 타이핑해야한다.
그건 typings에 하자.
스타일드 컴포넌트는 내가 만들면 뭔지 알아도 다른 사람이 만든 걸 분석할 때 힘들수 있다.
그래서 모든 컴포넌트로 하면 구조 파악이 힘들므로 큼직한 단위를 스타일드 컴포넌트로 만들고
그 안에 것은 그냥 css로

리액트 라우터 구조
가장 상위 App - 라우팅을 한다.
라우팅 되는 컴포넌트들은 보통 페이지
페이지 안에 레이아웃 - 보통 공통된 부분을 레이아웃으로 뺀다. 헤더, 사이드 메뉴
channel과 dm 모두 workspace 레이아웃을 공유하기 때문에
각 페이지마다 레이아웃을 사용하고 children을 사용하는 방법도 있지만
워크스페이스에서 Routes Route를 사용하는 방법도 있다.
이때 메인 라우터인 App에서는 workspace만 등록 해두 안에서 다시 분기하면 된다.
주의할 점은 공통 주소인 workspace는 같아야하고 계층적인 구조를 가져야한다. (ex. Workspace.tsx - /workspace/dm, /workspace/channel)
아니라면 렌더링이 안된다.

둘 중 선택을 하는 방법은 주소가 일관성 있으면 네스트 라우터를 사용하면 괜찮고
그게 아니라면 각각 페이지에서 레이아웃을 감싸는 방법이 좋다.

컴포넌트로 따로 나누는 기준은 재사용하냐 안하냐로
리액트 문서에서는 단일책임 원칙, 하나의 컴포넌트는 하나의 역할만 한다 이 기준으로 나누는 것도 권장
리액트 컴포넌트에서 매개변수로 들어오는 값이 있다면 타입을 정의해줘야한다.
```typescript
interface Props {
  children: React.ReactNode;
  style: React.CSSProperties;
  show: boolean;
  closeButton?: boolean;
  onCloseModal: (e: any) => void;
}

const Menu: React.FC<Props> = ({ children }) => {
```

stopPropagation
모달 창의 상위 엘리먼트인 배경에 닫는 이벤트 걸고, 모달창을 눌렸을 때 모달 창도 이벤트가 발생하여 닫힐수 있는데 
그걸 끊어주는 게 stopPropagation
이벤트 버블링을 막아준다.

컴포넌트 이름.defaultProps 로 기본 값 넣어준다.

만약 데이터를 사용할 때 이름이 헷갈린다면 좀 더 명확한 이름으로 바꿔준다. 콜론 : 으로 객체 구조분해할당
import할 땐 as로 바꿀 수 있다.

컴포넌트 나눌때 인풋이 들어가면 컴포넌트 나누는게 좋다.
왜냐면 인풋 이벤트 발생할 때마다 리렌더링 되기 때문에.
인풋이 state를 자꾸 변경하여 코드가 통채로 실행되기 때문이다.

submit 이벤트도 새로고침 안되게
e.preventDefault();
그리고 사소하지만 띄어쓰기 거를수 있도록 trim() 함수 쓰기

강의에서 만든 Workspace 컴포넌트 같은 경우 컴포넌트 안에 모달창을 만들어 놨는데
이렇게 되면 모달이 아닌 Workspace 컴포넌트에 state가 있게 되고 이 state가 인풋창 입력으로 계속 변하면
Workspace 컴포넌트 자체가 리렌더링된다.
그래서 이런건 따로 분리하는 것이 좋다.

분리하면 리렌더링 같은 성능적인 장점도 있고
연관된 코드가 가까워지는 유지보수적인 장점도 있다.

라우터 주소, url 주소를 설계할 때 특정 값을 주소에 라우터 파라미터(와일드 카드?)로 사용하면 값을 불러올 수 있다.
주소 자체가 데이터를 가지고 있다.
이럴 경우 서버로 요청을 하게 될 때 전역 저장소에 값을 가지고 있는다던지 할 필요 없이 주소에 있는 값 만으로 요청을 할 수도 있다.
예를 들면 요청에 필요한 새로운 값은 인풋이나 현재 있는 값으로 넣어주고
withCredentials: true를 하면 쿠키에 사용자 정보가 있어서 누가 생성하는진 알지만
어떤 워크스페이스에 채팅 채널을 생성해주는 진 모른다.
그걸 주소 창 주소 값에서 가져온다.
일종의 데이터 저장소 역할을 한다.
이게 없다면 상태 관리를 해야한다.

console.dir 에러로 쓰면 좋다.

swr에서는 url 인자 값에 null을 넣음으로 조건부 요청을 할 수 있다.
유저 정보가 있을때 요청이 가능하게 할 수 있다.
rq에서는 옵션 값 중 enabled 를 사용하여 할수 있다. 

채널 새로 생성하고 나서 채널 목록을 새로 불러오는 것이 좋다.
채널 리스트 불러오는 곳에서 revalidate를 구조분해 할당 해주고(이름이 겹친다면 바꿔서)
그 함수를 채널 생성하는 곳에 넣어준다.

RESTful API 핵심은 메소드(행위)를 동사로 주소는 명사(자원)으로 사용한다.
login, logout은 어쩔수 없지만 어떤 사람들은 post, delete를 사용하고 user/session을 사용하기도 한다.

# 4

처음부터 완전한 주소를 사용하지 말고(ex. http://localhost:3090)
나중에 백과 프론트가 같은 도메인을 사용한다는 가정 하에 프록시를 사용하여 개발하자. 최대한 같은 환경이 되도록
? 그럼 process.env 같은건 괜찮나?

Link와 비슷한 NavLink라는 것이 있다.
activeClassName을 쓰면 url과 일치할 때 해당 클래스명에 관련된 것을 활성화 해준다.
swr을 쓰면 굳이 props를 사용할 필요 없다. 왜? 여러번 요청해도 한번의 요청에 대한 결과에서 캐싱해서 오기 때문에
이런 훅스를 쓰면서 컨테이너 컴포넌트 패턴이 사라지고 props로 데이터를 넘길 필요 없어졌다.

props를 최대한 덜 쓰면 좋은게
부모가 바뀌면 자식도 따라 바뀐다.
그 연껼고리의 대부분 역활을 하는 것이 props
이걸 없애려고 React.memo
근데 훅스로 자식만 바귀고 부모는 그대로 둘수도 있다.

swr 데이터가 없다면 로딩중이거나 에러

비밀번호를 충돌(푼다) 해도 비용이 크다.

zone wrapper area container box 

chatBox에서 props로 onSubmitForm 을 받는 이유
channel에 메세지는 보내는 동작과 개인에게 dm을 보내는 동작은 근본적으로 다른 작업이므로 같은 함수를 공유하기 힘들다.
그래서 props로 받아 다른 동작을 하게끔 해준다.

textarea 에서 enter 를 입력할 때와 shift+enter를 입력할 때 동작을 다르게 하고 싶다면
첫번째로 event 객체의 key를 확인하고
그 다음에 shiftKey가 true인지 false인지 확인한다.
meta 같은 경우에는 window key

autosize 는 줄바꿈 할 때 채팅 박스를 늘려주는 라이브러리
직접 구현하는 것도 좋은 공부가 되겠지만 실제로는 라이브러리가 더 안정적이기 때문에 잘 활용하자.

소켓을 안써서 실시간 데이터를 받을 수 없다면?
계속해서 요청을 보내는 폴링 방식, 요청이 너무 많다면 시간을 길게 가져가서 롱폴링

리액트와 소켓io는 생각보다 어울리지 않는데
이유는 한 컴포넌트에서 소켓 연결을 했을 때 해당 컴포넌트가 사라지거나 리렌더링 되면 소켓 통신이 끊어질 수 있기 때문이다.
그래서 공통된 컴포넌트에 넣어주는데 예전 같으면 HOC
지금은 hook에 넣어주면 된다.
만약 화면이 없고 로직만 있다? hook으로 빼주면 된다.
그렇다고 화면이 있다고 해서 hook으로 빼면 안되는 것은 아니다.

// DMList
useSocket hooks를 하면 공통으로 관리되기 때문에
필요할때 그때그때 불러서 사용하면 된다.
공통 데이터를 알아서 관리해주기 때문에

그래서 워크스페이스가 꺼져도 DMList에서 유지를 할 수 있다.

on 이벤트 리스너가 있으면 정리해주는 애 off 가 있다.
off를 게을리하면 한번 요청 했을 때 응답이 5번 올 수도 있다.
클린업 함수에서 반드시 해주자.

에러가 낫는데 폴링이 떴따??
요청을 http로 보냈을수도?
인터넷 익스프로러 구 버전 중에 웹소켓이 없는 경우가 있어서 그런 애들을 위해서 http로 먼저 요청을 보내고 지원을 하면 그때서야 웹소켓으로 올린다.
바로 웹소캣을 써도 된다면 폴링 하지말고 웹소켓만 써라는 것을 옵션으로 지정해주면 된다.
transports: ['websocket'],

정상적으로 소켓 연결이 됐다면 connected: true, disconnected: false 가 돼야한다.
그리고 receiveBuffer랑 sendBuffer가 비어 있어야 잘 보냈다는 뜻으로 이게 차 있으면 연결이 끊겨서 못보내서 그렇다.

중간에 데이터가 날아갈까봐 걱정할 필요 없는게 recieveBuffer나 sendBuffer에 있던 데이터가 연결 끊겨있다 연결 되면 
한번에 다시 보내줘서 데이터 유실을 막아준다.

버전이 안맞으면 연결이 안될수 있다 ㅠㅠ

웹소켓이 연결 되면 개발자 도구 네티워크 탭에 ?EIO 로 시작하하는게 있는데
여기에서 Message 텝에 들어가면 어떻게 통신 했는지 보인다.
소켓은 이 연결 하나를 맺은 후 이 연결 하나에서 데이터를 주고 받는다.
아래로 향하는 화살표가 서버에서 데이터를 보내는 것
위로 향하는 화살표가 서버로 데이터를 보내는 것

처음 0번의 sid 는 소켓 아이디
서버에서 소켓 아이디(sid)를 보내주면 프론트에서 받아서 연결을 맺는다
같은 소켓 아이디를 알고 있기때문에 서로 연결 되는 것이다.

그 후 숫자/네임스페이스로 연결 하겟다고 알려주고
연결을 맺는다
서버에서 헬로우를 알려주고
프론트에서는 로그인을 보낸 후
온라인 리스트를 받는다. 온라인 리스트는 접속 중인 사람

2, 3, 2, 3 같은건 ping-pong 이라고 해서
연결이 잘 유지되고 있나 socket.io 가 확인하는 것

react-custom-scrollbars
npm i react-custom-scrollbars-2
react-custom-scrollbars-2 는 typescript 로 작성돼 있다.

바퀴를 직접 만들지 마라 -> 좋은 라이브러리가 있다면 잘 쓰자.

날짜를 직접 자르거나 Date를 사용해서 가공하면 된다.
그러나 글로벌 서비스면 국가마다 표현법이 다르므로 라이브러리를 사용하면 편하다.

보통은 moment를 많이 쓰지만 강의에서는 day.js를 사용했다.
이유는 dayjs가 불변성을 지킬수 있고 가볍고 moment 사용법이 비슷해 마이그레이션 하기 좋기 때문이다.
moment는 불변성을 지키지 않는다 그럼 참조 관계가 유지된다.
날짜 객체가 있고 그걸 복사해서 썼을 때 복사한 값을 수정하면 오리진 객체가 변한다.

date-fns는 lodash 스타일 dayjs와 date-fns 는 취향차이
moment 만들 애들이 새로 만든건 luxon인데 이 라이브러리도 immutable

질문 1
const onScroll: WheelEventHandler 를 하고
<Scrollbars autoHide onScrollFrame={onScroll}> 를 사용할 때 
onScrollFrame 에서 아래와 같은 에러가 난다.
```
TS2769: No overload matches this call. 
  Overload 1 of 2, '(props: ScrollbarProps | Readonly<ScrollbarProps>): Scrollbars', gave the following error. 
  Type 'WheelEventHandler<Element>' is not assignable to type '(values: positionValues) => void'. 
  Types of parameters 'event' and 'values' are incompatible. 
  Type 'positionValues' is missing the following properties from type 'WheelEvent<Element>': deltaMode, deltaX, deltaY, deltaZ, and 33 more. 
  Overload 2 of 2, '(props: ScrollbarProps, context: any): Scrollbars', gave the following error. 
  Type 'WheelEventHandler<Element>' is not assignable to type '(values: positionValues) => void'. 
```
const onScroll: (values: positionValues) => void = useCallback(
해서 해결 했는데 이 방법이 맞을지? 더 좋은 방법이 있는지 궁금하다.

npm i react-mentions

<Mention
appendSpaceOnAdd
trigger="@"
data={memberData?.map((v) => ({ id: v.id, display: v.nickname })) || []}
renderSuggestion={renderSuggestion}
/>

@ 칠 때 활성화 된다.
appendSpaceOnAdd 는 선택 했다면 뒤에 공백 하나 넣어주겠다.
맴버 데이터를 변형해서 넣는 이유는 id와 nickname을 보여주기 위해서. 이런건 공식 문서보고 알아서 하자.
renderSuggestion 은 작성하 ㄹ때 동작을 어떻게 해줄 것인지

emotion 은 변수를 보내서 상태를 바꿔줄 수 있다.
${({ focus }) =>
focus &&
`
background: #1264a3;
color: white;
`};

이게 안되면 클래스를 여러개 만들어서 클래스를 바꾸는 식으로 했다.
css는 변수가 없기 때문에.
이모션은 변수를 사용 가능하다.

이모션에서 ``는 함수를 호출하는 방법니다.
function func() {}
func();
func.call,bind,...
func``; - 태그드리터럴이란 함수 호출 방법 문법
이모션 안에 변수를 쓸땐 템프릿 리터럴 안에 함수가 있는 방식
func`${() => {}}`

MentionInput 안에 Metion 이 있는게 리액트 멘션의 사용법
근데 프로젝트에서 그렇게 안한 것은 MetionsTextarea = styled(MetionInput)``
이렇게 하면 기존에 존재하는 컴포넌트에 스타일을 추가할수 있다.

대신 이땐 속성 값을 ref 대신 inputRef로 바꿔달라고 공식 문서에 나와있다.

정규 표현식에서 특징 역할을 하는 기호는 먼저 escape 시작하고 하는 것이 좋다. /@\[\]\(\)/g
()는 그루핑

?. optional channing
?? nullish coalescing

채팅 창에서 채팅 입력을 하면 채팅 창 전체가 리렌더링 된다
보통은 컴포넌트 분리 하는 것
그리고 리액트 메모로 감싸주는것 말단 컴포넌트를
또 정규표현식이 성능이 안좋고 잘 변하지 않는 값은 값 캐싱을 이용하여 useMemo로 최적

React.memo의 기능은 props가 같으면 부모가 바뀌어도 자식 컴포넌트가 리렌더링 되지 않게 하는 역할

클라이언트는 버그가 발생해도 버그가 발생한 고객 몇몇이 떠나지만.(디바이스가 느리다던지, 지원 안한다던지)
서버는 버그가 발생하면 그 서비스 사용자 모두가 불편해서 떠날수 이싿.

보안에 관련된건 서버에서 하느넥 좋다.

고객이 불편하지 않는 선에서는 서버에서 데이터만 던져주고 프론트에서 가공해서 표시해준다.

그래서 날짜 묶기 같은 그루핑은 서버에서 해줘도 되지만 컴퓨팅 자원을 먹기 때문에 ㅇ클라이언트에서 해줘도 된다.

알고리즘 조건 5가지

forwardRef
다른 ref를 만들어서 그 ref를 다른 컴포넌트에 전달할 때
forwardRef쓰면 props 두번째 자리에 전달할 수 있다.

?? props로 안넘기고 forwardRef를 사용하면 무슨 차이가 있을까??

useSWR에서 infinite scrolling을 위한 메서드
useSWRInfinite 를 제공한다.

그냥 사용하면 안되고 url를 함수 리턴으로 바꿔줘야 한다.
그리고 그 함수의 매개변수에 페이지 수(index)를 적어줘야 한다.
`/api/request` -> (index) => `api/request`

setSize는 페이지 수를 바꿔주는 역할을 한다.

infinite scroll 할때 isEmpty와 isReachingEnd 상태를 따로 관리하면 좋은데
isEmpty는 데이터가 비어 있을 때,
isReacingEnd는 데이터를 덜 가져왔을 때, 다음 데이터가 없을 것으로 판명될 때, true가 된다.

infinite를 사용할 때 2차원 배열로 값이 온다.
그리고 값은 앞에 추가된다.
flat 메서드를 사용해서 2차원 배열을 1차원 배열로 만들어서 사용해도 된다.

메시지 보낼 때 post 보내고 서버에 성공 요청왔을 때 채팅에 반영하면 딜레이가 있는데
사용성에 큰 영향을 끼치므로 optimistic ui 로 하면 좋다.
명심해야할 것이 이건 안정성보단 사용성을 선택한 방법이다.
안정성도 중요하므로 optimistic ui를 사용해 사용성을 올리고 추 후 데이터 정합성르 맞추는 것도 방법이다.

소켓 dm은 새로운 메세지가 올 때 
socket.io에서 서버에 새로 생성된 dm이 있을 때 dm으로 데이터를 갖다 주므로
굳이 revalidate 하지 말고 그냥 mutate해서 값을 넣고
스크롤바만 조정해주면 된다.

사용성을 위해서 남이 채팅을 치면 채팅이 안내려가게.
스스로 기준을 잡아야하는데 내가 스크롤을 150px이상 올렸을 때 채팅 안내려가게

그리고 내 id는 mutate안되도록.
왜냐면 내가 칠때 onSubmit에서 낙관적으로 반영 되고
socket.io로 인해 onMessage에서 한번 더 되기 때문이다.

npm i webpack-bundle-analyzer
webpack-bundle-analyzer를 통해 각 파일, 모듈의 용량을 볼 수 있다.
개발 모드에서보는 보통 압축을 안해서
app.js의 용량이 크면 첫 로딩이 느려지므로
코드 스플리팅을 하거나 
원래는 app.js 한 파일로 만드는 것이기 때문에 그 옆에 있는 것드릉ㄴ 이미 코드스플리팅 돼 있는 것.

코드스플리팅이라는 기법도 있고
트리 쉐이킹(tree-shaking)이라는 기법도 있다.
크게 뭉쳐져 있는 애들 중에 털어낼 수 있는게 보는 것이다.
예를 들면 dayjs에서 모든 언어를 지원할 필요가 없는데 기본 적으론 모든 언어가 다 포함돼 있다.

첫 화면이 300~500kb면 좋다.

webpack에소 빌드된 파일을 dist 폴더에 생성 되도록 했는데 이걸 서버 개발자한테 주면 된다.

scripts 부분을 명확하게 알수 있게 해주는 better npm run 같은 패키지도 있다.

npm-run-all
npm run dev && npm run build
하면 병렬처리 안하고 직렬처리 한다.
이걸 동시에 할수 있도록 하는 패키지

# Bunus

onDrop, onDragOver
onDragOver는 마우스 클릭을 한 상태에서 쭉 이동할 때
onDrop은 마우스에서 손 땔 때

# image
브라우저 자체 지연 로딩 loading="lazy"
srcset 속성을 사용하여 크기, 해상도 교려한 이미지를 제공
aspect-ratio 로 영역 확보


























