# react-template

Vite Template을 이용한 React 템플릿 (vite, vitest, typescript, eslint, lint-staged, prettier, husky)

## 디펜던시 설치 및 세팅

`react-template`은 기본적으로 `@socar-inc/frontend-design-system`을 디펜던시로 가지고 있습니다.

저장소를 클론 받은 뒤 디펜던시를 설치하기 위해 아래의 절차에 따라 access token을 등록해야 합니다.

해당 프로젝트는 `npm 10.2.4` 버전 이상, `node 20.11.1` 버전 이상을 사용합니다. (Vite Dependency)

### Access token 등록 방법

[Github Personal Token을 발급](https://github.com/settings/tokens/new) 받습니다.

> Token은 적어도 `read:packages` 권한을 가지고 있어야 합니다.

Token을 발급 받은 뒤 아래의 두가지 방법중 `한가지`를 통해 access token을 등록 합니다.

1. npm 전역 설정 추가

   ```sh
   echo "//npm.pkg.github.com/:_authToken=${GITHUB_PERSONAL_ACCESS_TOKEN}" >> ~/.npmrc && \
    echo "@socar-inc:registry=https://npm.pkg.github.com/" >> ~/.npmrc
   ```

   터미널을 열고 위 커맨드를 실행해서 `~/.npmrc`을 생성 합니다.

   `${GITHUB_PERSONAL_ACCESS_TOKEN}`은 발급 받은 Token으로 대치해야 합니다.

2. npm 로컬 설정 추가

   프로젝트 root 디렉토리의 `.npmrc` 파일을 열어 다음의 `${GITHUB_PERSONAL_ACCESS_TOKEN}`을 발급 받은 Token으로 대치하여 첫번째 줄에 추가합니다.

   ```
   //npm.pkg.github.com/:_authToken=${GITHUB_PERSONAL_ACCESS_TOKEN}
   ```

### .npmrc 주의사항 및 CI Pipeline 토큰 주입 방법

- .npmrc의 EOL(End of Line)은 지우지 않는다.
- .npmrc에 복수의 토큰을 주입할 때는 [cdn-ci.yaml](./.github/workflows/cdn-ci.yaml)의 57번째 라인에서 토큰만 주입될 수 있도록 한다.

  ```bash
  // .npmrc
  @socar-inc:registry=https://npm.pkg.github.com/
  @buf:registry=https://npm.buf.build
  <!-- 위와 같이 차례대로 복수의 registry 추가 -->
  <!-- EOL 유지 -->
  ```

  ```bash
  // .github/workflows/cdn-ci.yaml
  echo "//npm.pkg.github.com/:_authToken=${GIT_ACCESS_TOKEN}\n//npm.buf.build/:_authToken=${BSR_TOKEN}" >> .npmrc
  <!-- \n으로 개행하면서 토큰만 어펜드하여 주입! -->
  ```

## 환경변수 설정 방법

`react-template`은 기본적으로 세가지 유형의 환경에 대한 변수 설정을 지원 합니다.

- development
- stage
- production

환경에 따른 변수의 값은 `enviroments/.env.{environments}` 파일에 저장 할 수 있습니다.

이렇게 설정된 환경변수는 다음 스크립트를 실행 할 때 사용 됩니다.

- `dev` - `env.development` 환경변수 사용
- `dev:stage` - `env.staging` 환경변수 사용
- `dev:prod` - `env.production` 환경변수 사용
- `build:dev` - `env.development` 환경변수 사용
- `build:stage` - `env.staging` 환경변수 사용
- `build:prod` - `env.production` 환경변수 사용

`react-template` 프로젝트는 환경변수 주입을 위해 [vite env](ko.vitejs.dev/guide/env-and-mode.html)를 사용하고 있습니다.

상기 스크립트 실행을 통해 동적으로 값을 치환하기 위해 환경변수의 키 값은 반드시 `VITE_APP_` prefix를 포함해야 합니다.

## 로컬라이즈 사용

현재 쏘카에서는 모든 서비스에서 [하나의 로컬라이즈 프로젝트](https://app.lokalise.com/project/5679604561c18409d4c193.43817726/) 를 이용합니다. (2022.02.18 기준)

해당 로컬라이즈 프로젝트에는 web, ios, android, server 를 통틀어 모든 서비스의 문구가 등록되어 있기 때문에 값을 모두 가져오면 너무 많은 값을 가져오게 됩니다.

-> 그렇기 때문에 `tag` 를 사용해서 로컬라이즈 문구를 가져오는 방법을 사용합니다.

#### 로컬라이즈 script 수정

- package.json: `${TAG_NAME}` 에 해당 tag를 넣습니다.

```
"download-messages": "lokalise2 --token 9f6f56ce1680bc32a004c544fb5670adae4f4aee --project-id 5679604561c18409d4c193.43817726 file download --format json --json-unescaped-slashes --replace-breaks=false --include-tags ${TAG_NAME} --unzip-to ./src/libs/locales",
"upload-messages": "lokalise2 --token 9f6f56ce1680bc32a004c544fb5670adae4f4aee --project-id 5679604561c18409d4c193.43817726 file upload --file src/libs/locales/ko/ko.json --lang-iso ko --tags ${TAG_NAME}"
```

- ex) socar-server-frontend

```
"download-messages": "lokalise2 --token 9f6f56ce1680bc32a004c544fb5670adae4f4aee --project-id 5679604561c18409d4c193.43817726 file download --format json --json-unescaped-slashes --replace-breaks=false --include-tags socarWeb --unzip-to ./src/libs/locales",
"upload-messages": "lokalise2 --token 9f6f56ce1680bc32a004c544fb5670adae4f4aee --project-id 5679604561c18409d4c193.43817726 file upload --file src/libs/locales/ko/ko.json --lang-iso ko --tags socarWeb"
```

- tag로 `socarWeb` 사용중
- `${TAG_NAME}` 에 `socarWeb` 을 넣고 사용
- tag는 [로컬라이즈 웹](https://app.lokalise.com/project/5679604561c18409d4c193.43817726/) 에서 확인 가능

![image](https://user-images.githubusercontent.com/72717402/154643277-cdf795ff-6427-42af-a056-6065e76942c1.png)

#### 로컬라이즈 설치

```
brew tap lokalise/cli-2
brew install lokalise2
```

#### 로컬라이즈 문구 내려받기

```
npm run download-messages
```
