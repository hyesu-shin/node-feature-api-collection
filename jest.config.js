module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // '@' 경로 별칭을 'src' 폴더로 매핑
  },
  rootDir: './',  // Jest에서 프로젝트 루트로 설정
};