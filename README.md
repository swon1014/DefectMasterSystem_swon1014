## Requirements
- Node.js (npm)
- Git
- Python 3+


## Installation
1. 이 Repository를 원하는 디렉토리에 클론한다
```
https://github.com/phynalle/defect-master-system.git
```
2. `setup.bat`을 실행한다

## Update
`Update.bat`을 실행하면 자동으로 업데이트 된다

:warning: **data.csv와 images/ 를 편집할 때 주의해야할 점**
```
업데이트를 하면 `dist/` 디렉토리가 삭제됐다가 `public/`에 있는 파일들이 복사되면서 다시 생성된다.
그래서 절대 `dist/` 에서 수정하지 말고 `public/` 에서 수정해야 한다.
```

## 실행하기
`Run.bat`을 실행하면 `dist/` 디렉토리를 기준으로 웹서버가 실행된다.
`http://자기아이피`로 접속할 수 있다.

## Commands
### Compiles and hot-reloads for development
```
npm run serve
# OR
yarn run serve
```

### Compiles and minifies for production
```
npm run build
# OR
yarn run build
```

### Lints and fixes files
```
npm run lint
# OR
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
