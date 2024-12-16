import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.tsx', '**/*.ts'], // ESLint가 분석할 파일 패턴
    languageOptions: {
      parser, // TypeScript 파서
      ecmaVersion: 'latest', // ECMAScript 최신 버전
      sourceType: 'module',  // ES 모듈 사용
      globals: {
        // 브라우저 환경 글로벌 변수 설정
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin, // 플러그인을 객체로 설정
    },
    rules: {
      quotes: ['error', 'single'], // 작은 따옴표 강제
      indent: 'off',               // 들여쓰기 규칙 끄기
      semi: 'off',                 // 세미콜론 규칙 끄기
      'max-len': 'off',            // 최대 줄 길이 규칙 끄기
      'no-undef': 'off',           // 정의되지 않은 변수 허용
      'no-unused-vars': 'off',     // 사용하지 않는 변수 허용
      'new-cap': 'off',            // 대문자로 시작하는 함수 규칙 끄기
      'no-throw-literal': 'off',   // 리터럴 throw 허용
      '@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수 경고
      '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 안 해도 됨
    },
  },
];
