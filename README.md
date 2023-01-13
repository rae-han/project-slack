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


